import React,{useRef,useState,useEffect}  from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const  AlertDialog=(props)=> {


    return (
      <div>
        <Dialog
          disableBackdropClick="false"
          style={{zIndex:10000}}
          open={props.open}
          onClose={()=>props.handleDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
                {props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
              {
                  (!props.pendingProcess) ? (
                      <>
                        <Button onClick={()=>props.handleDialogClose()} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={()=>props.handleDialogConfirm()} color="primary" autoFocus>
                            Agree
                        </Button> 
                        </>
                    ) : null
                }
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default AlertDialog;

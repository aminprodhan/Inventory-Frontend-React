import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import axios from 'axios';

import {
    defaultRouteLink,
    getAccessTokenName,
    userLogout,
    isLoginExist
} from "../common/config";
import {
    getCookieKeyInfo,
    setCookie,
    removeCookie
} from "../common/CookieService";
import { Link } from "react-router-dom";
import NavBar from './nav/NabBar';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  
const Header = props => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const [menuList, setMenuList] = useState([]);
    const [submenuList, setsubmenuList] = useState([]);
    const [loading, setLoading] = useState([]);
    const [submenu, setsubmenu] = useState([]);
    const [menuState, setMenuState] = useState({});

    const data = {
        submenu: []
    };
    const [formData, setformData] = useState(data);

    

    const fetchAllmenu = async () => {
        const res = await axios.get(defaultRouteLink + "/api/get-menu-submenu");
        // console.log(res.data.submenu);
        setMenuList(res.data.list.list);
        setLoading(false);
    };
    useEffect(() => {
        //fetchAllmenu();
    }, []);

    const handleClick = (e) => {
        //console.log("edd="+!menuState[e]);
        setMenuState(oldState => ({
            [e]: !menuState[e]  }));
    };

    return (
        <div className="main-wrapper slide-nav" style={{marginTop:5}}>
            <NavBar {...props} /> 
        </div>
    );
};
export default compose(withRouter, connect(null, null))(Header);

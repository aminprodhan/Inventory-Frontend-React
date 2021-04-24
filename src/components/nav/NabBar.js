import React,{ useState,useEffect }  from 'react';
import { fade, makeStyles,useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import {defaultRouteLink} from '../../common/config';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
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
import Button from '@material-ui/core/Button';
import {useDispatch,useSelector} from 'react-redux';
import { SET_DRAWER_BOOLEAN } from '../../actions/user_types';
import {userLogout,isLoginExist,resetSession} from "../../common/config";
import {getAccessTokenName,getAccessTokenNameInfo} from '../../common/config';
import { getCookieKeyInfo } from '../../common/CookieService';
import axios from 'axios'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    root_navbar: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    root: {
        display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        //width: `calc(100% - ${drawerWidth}px)`,
        width: `calc(100% - 0px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        
      },
      drawerPaper: {
        width: drawerWidth,
        top:'64px;'
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
            flexGrow: 1,
            padding: 0,
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
      },
      contentShift: {
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },

  }));
  
  export default function NavBar(props) {

    const dispatch=useDispatch();
    const open=useSelector(state=>state.auth.drawerOpen);

    const userId=getCookieKeyInfo(getAccessTokenName);
    const userInfo=getCookieKeyInfo(getAccessTokenNameInfo);

    const classes = useStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [menuList, setMenuList] = useState([]);
    const [menuState, setMenuState] = useState({});
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [loading, setLoading] = useState([]);
    const [opens, setOpen] = React.useState(true);

    const handleLoginSoftware=()=>{
        //window.location=getApiMainSoftware;
    }

    const fetchAllmenu = async () => {
        const res = await axios.get(defaultRouteLink + "/api/get-menu-submenu");
        setMenuList(res.data.list.list);
        setLoading(false);
    };
    useEffect(() => {
        //fetchAllmenu();
    }, []);

    const handleDrawerOpen = () => {
        //setOpen(!open);
        dispatch({
          type:SET_DRAWER_BOOLEAN,
          value:!open,
      });
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
      


    };

    const handleLogout = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        resetSession(function(){
           props.history.push(defaultRouteLink + "/admin_login");
        });

      };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const handleClick = (e) => {
        setMenuState(oldState => ({
            [e]: !menuState[e]  }));
    };
  
    return (
        <div className={classes.root}>
            <CssBaseline />
            
             <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Task Manage -> {userInfo.name}
                        </Typography>

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                          {/* <Button onClick={handleLoginSoftware} variant="contained" color="secondary">
                              Main Software
                          </Button> */}

                            {/* <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                                </Badge>
                            </IconButton> */}
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
          

                    </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawer
                className={classes.drawer}
                style={{top:'20px'}}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                
                <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                    <Link
                                        to={defaultRouteLink + `/admin_dashboard`}>
                                        Dashboard
                                    </Link>
                            </ListSubheader>
                        }
                        className={classes.root_navbar}
                        >
                        {menuList.map(function(item, index) {
                                return (
                                    <div>
                                        <ListItem button onClick={()=>handleClick(item.id)}>
                                            <ListItemIcon>
                                                <InboxIcon />
                                            </ListItemIcon> 
                                            <ListItemText primary={item.name}/>
                                            {menuState[item.id] ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        {item.sub_menu.map(sub => {
                                                return (
                                                    <Collapse in={menuState[item.id]} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            <ListItem button className={classes.nested}>
                                                                <Link
                                                                    to={defaultRouteLink + `/${sub.link_id}`}>
                                                                    {sub.name}
                                                                </Link>
                                                            </ListItem>
                                                        </List>
                                                    </Collapse>
                                                );
                                            })}
                                    </div>
                                )
                        })
                                
                        }
                        </List>
            </Drawer>
            <main
                
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}>
                <div className={classes.drawerHeader} />
                <div style={{margin:0,padding:0}} className="col-12">
                    {props.children}  
                </div>
                  
            </main>                 
      </div>
  );
}
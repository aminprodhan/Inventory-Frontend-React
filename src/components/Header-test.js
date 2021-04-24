import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
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
import Dashboard from "./Dashboard";
import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
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
        fetchAllmenu();
    }, []);

    const handleClick = e => {
        // console.log("edd="+!menuState[e]);
        setMenuState(oldState => ({
            [e]: !menuState[e]
        }));
    };

    return (
        <div className="main-wrapper slide-nav">
            <div className="header">
                <div className="container-fluid">
                    <div className="header-left">
                        <a id="toggle-menu" href="#sidebar" className="logo">
                            <i className="icofont-navigation-menu"></i>
                        </a>
                    </div>
                    <div className="header-right">
                        <div className="page-title-box pull-left">
                            <h3>
                                <span style={{color:"red"}}>Textile Engineering College,</span> <span style={{color:"blue"}}>Noakhali E-Store</span>
                            </h3>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <ul className="nav navbar-nav navbar-right user-menu pull-right">
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle"
                                        href="#"
                                        role="button"
                                        id="profileLinkDropdown"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <i className="far fa-user"></i>
                                        </span>{" "}
                                        Admin
                                    </a>

                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="profileLinkDropdown"
                                    >
                                        <a
                                            className="dropdown-item logOut"
                                            href="#"
                                        >
                                            Profile
                                        </a>
                                        <a
                                            className="dropdown-item logOut"
                                            href="#"
                                        >
                                            Password Change
                                        </a>
                                        <a
                                            className="dropdown-item logOut"
                                            onClick={() => userLogout(props)}
                                            href=""
                                        >
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div className="dropdown mobile-user-menu pull-right">
                            <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fa fa-ellipsis-v"></i>
                            </a>
                            <ul className="dropdown-menu pull-right">
                                <li>
                                    <a
                                        className="logOut"
                                        onClick={() => userLogout(props)}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar opened" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="nested-list-subheader"
                                >
                                    <Link
                                        to={
                                            defaultRouteLink +
                                            `/admin_dashboard`
                                        }
                                    >
                                        Dashboard
                                    </Link>
                                </ListSubheader>
                            }
                            className={classes.root}
                        >
                            {menuList.map(function(item, index) {
                                console.log("item testing =" + item.isChecked);
                                return (
                                    <div>
                                        <ListItem
                                            button
                                            onClick={() => handleClick(item.id)}
                                        >
                                            <ListItemIcon>
                                                <InboxIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={item.name} />
                                            {menuState[item.id] ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItem>
                                        {item.sub_menu.map(sub => {
                                            return (
                                                <Collapse
                                                    in={menuState[item.id]}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <List
                                                        component="div"
                                                        disablePadding
                                                    >
                                                        <ListItem
                                                            button
                                                            className={
                                                                classes.nested
                                                            }
                                                        >
                                                            <Link
                                                                to={
                                                                    defaultRouteLink +
                                                                    `/${sub.link_id}`
                                                                }
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        </ListItem>
                                                    </List>
                                                </Collapse>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </List>
                    </div>
                </div>
            </div>
            <div className="page-wrapper">{props.children}</div>
        </div>
    );
};
export default compose(withRouter, connect(null, null))(Header);

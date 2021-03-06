import React from "react";
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { logout } from "../store";

import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import LabelIcon from "@material-ui/icons/Label";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useHistory, useLocation } from "react-router-dom";
import Lock from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import HowToRegIcon from "@material-ui/icons/HowToReg";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { format } from "date-fns";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#E7ECEF",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    appBarOptions: {
      display: "flex",
      flexDirection: "row",
      marginLeft: 10,
      marginRight: 10,
    },
    appBarOptionButtons: {
      whiteSpace: "nowrap",
    },
    icon: {
      minWidth: '30px'
    }
  };
});

function Layout({ children, handleClick, isLoggedIn, auth }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const drawerItems = [
    {
      text: "Companies",
      icon: <ShowChartIcon color="secondary" />,
      path: "/Companies",
    },
    {
      text: "Tags",
      icon: <LabelIcon color="secondary" />,
      path: "/Tags",
    },
    {
      text: "GitHub Repo",
      icon: <GitHubIcon color="secondary" />,
      path: "/GitHub",
    },
  ];

  const loggedOutMenuItems = [
    {
      text: "Login",
      icon: <LockOpenIcon color="secondary" />,
      path: "/login",
    },
    {
      text: "Sign Up",
      icon: <HowToRegIcon color="secondary" />,
      path: "/signup",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          {!isLoggedIn ? (
            <Typography className={classes.date}></Typography>
          ) : (
            <Typography className={classes.date}>
              Welcome, {auth.username}
            </Typography>
          )}
          <List className={classes.appBarOptions}>
            {!isLoggedIn ? (
              loggedOutMenuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => history.push(item.path)}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className={classes.appBarOptionButtons}
                  ></ListItemText>
                </ListItem>
              ))
            ) : (
              <ListItem button key="Logout" onClick={handleClick}>
                <ListItemIcon className={classes.icon}>
                  <Lock color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Logout"></ListItemText>
              </ListItem>
            )}
          </List>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Investment Analyzer
          </Typography>
        </div>

        {/* list / links */}
        <List>
          {drawerItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div class={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Layout);

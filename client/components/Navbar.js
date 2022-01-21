import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      <AppBar>
        <Toolbar>
          <Typography variant="h4">Investment Analyzer</Typography>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <ButtonGroup variant="contained" color="primary">
                <Button component={Link} to={"/Companies"}>
                  Companies
                </Button>
                <Button component={Link} to={"/Tags"}>
                  Tags
                </Button>
                <Button href="#" onClick={handleClick}>
                  Logout
                </Button>
              </ButtonGroup>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <ButtonGroup variant="contained" color="primary">
                <Button component={Link} to={"/login"}>
                  Login
                </Button>
                <Button component={Link} to={"/signup"}>
                  Sign Up
                </Button>
              </ButtonGroup>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
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

export default connect(mapState, mapDispatch)(Navbar);

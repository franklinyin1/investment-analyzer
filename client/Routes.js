import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Companies from "./components/Companies";
import { me } from "./store";
import Tags from "./components/Tags";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Companies} />
          <Route path="/Tags" component={Tags} />
          <Route path="/Companies" component={Companies} />
          <Route path='/GitHub' component={() => {
            window.location.href = 'https://github.com/franklinyin1/investment-analyzer';
            return null;
          }}/>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup" component={Signup} />
          <Redirect to="/Companies" />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

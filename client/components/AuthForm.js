import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: "block",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
})


/**
 * COMPONENT
 */
const AuthForm = props => {
  const classes = useStyles();
  const history = useHistory();
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <TextField
          label="Username"
          variant="outlined"
          name="username"
          className={classes.field}
        />
        </div>
        <div>
          <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          className={classes.field}
        />
        </div>
        <div>
        <Button
          type="submit"
          variant="outlined"
          className={classes.button}
        >
          {displayName}
        </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

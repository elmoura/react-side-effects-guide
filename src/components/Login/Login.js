import React, { useReducer, useEffect, useState, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/AuthContext";
import Input from "../UI/Input/Input";

const EMAIL_INPUT_ACTION = "EMAIL_INPUT";
const EMAIL_INPUT_BLUR = "EMAIL_BLUR";
const PASSWORD_INPUT_ACTION = "PASSWORD_INPUT";
const PASSWORD_INPUT_BLUR = "PASSWORD_BLUR";

const validateEmail = (email) => email.includes("@");
const validatePassword = (password) => password.trim().length > 6;

const emailReducer = (state, action) => {
  if (action.type === EMAIL_INPUT_ACTION) {
    return {
      value: action.value,
      isValid: validateEmail(action.value),
    };
  }

  if (action.type === EMAIL_INPUT_BLUR) {
    return {
      value: state.value,
      isValid: validateEmail(state.value),
    };
  }

  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === PASSWORD_INPUT_ACTION) {
    return {
      value: action.value,
      isValid: validatePassword(action.value),
    };
  }

  if (action.type === PASSWORD_INPUT_BLUR) {
    return {
      value: state.value,
      isValid: validatePassword(state.value),
    };
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const { onLogin } = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const timer = setTimeout(
      () => setFormIsValid(emailState.isValid && passwordState.isValid),
      200
    );

    return () => clearTimeout(timer);
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    const { value } = event.target;

    dispatchEmail({ type: EMAIL_INPUT_ACTION, value });
  };

  const passwordChangeHandler = (event) => {
    const { value } = event.target;

    dispatchPassword({ type: PASSWORD_INPUT_ACTION, value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: EMAIL_INPUT_BLUR });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: PASSWORD_INPUT_BLUR });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          label="E-mail"
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

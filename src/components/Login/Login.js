import React, {
  useReducer,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
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

  const isEmailValid = emailState.isValid;
  const isPasswordValid = passwordState.isValid;

  useEffect(() => {
    const timer = setTimeout(
      () => setFormIsValid(isEmailValid && isPasswordValid),
      200
    );

    return () => clearTimeout(timer);
  }, [isEmailValid, isPasswordValid]);

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

    if (formIsValid) {
      return onLogin(emailState.value, passwordState.value);
    }

    if (!isEmailValid) {
      return emailInputRef.current.focus();
    }

    if (!isPasswordValid) {
      return passwordInputRef.current.focus();
    }
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          label="E-mail"
          value={emailState.value}
          isValid={isEmailValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          isValid={isPasswordValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

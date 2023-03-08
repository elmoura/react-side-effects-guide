import { useRef, useImperativeHandle, forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(({ id, label, isValid = true, ...rest }, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => ({ focus: activate }));

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input ref={inputRef} id={id} {...rest} />
    </div>
  );
});

export default Input;

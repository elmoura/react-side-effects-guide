import classes from "./Input.module.css";

const Input = ({ id, label, isValid = true, ...rest }) => {
  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
    </div>
  );
};

export default Input;

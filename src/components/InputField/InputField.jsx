import style from "./InputField.module.scss";

export const InputField = (props) => {
  return (
    <>
      {props.labelText && (
        <label className={style.labelStyle}>{props.labelText}</label>
      )}
      {
        // Note - Controlled to uncontrolled input
        props.type === "submit" ? (
          <input
            className={style.inputStyle}
            type={props.type}
            value={props.text}
          ></input>
        ) : (
          <input
            autocomplete={props.autocomplete}
            className={style.inputStyle}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            required={props.required}
          ></input>
        )
      }
    </>
  );
};

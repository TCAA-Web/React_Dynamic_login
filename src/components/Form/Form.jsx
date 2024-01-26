import { forwardRef } from "react";
import style from "./Form.module.scss";

export const Form = forwardRef(function Form(props, ref) {
  const { submitAction, children, activeForm, setActiveForm } = props;

  return (
    <form
      ref={ref}
      className={style.formStyle}
      onSubmit={(e) => submitAction(e)}
    >
      <button onClick={() => setActiveForm(activeForm === 0 ? 1 : 0)}>
        {activeForm ? "Sign in" : "Sign up"}
      </button>
      {children}
    </form>
  );
});

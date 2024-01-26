import { Form } from "./components/Form/Form";
import { InputField } from "./components/InputField/InputField";
import SignUpConstructor from "../src/constructors/signUpConstructor.json";
import SignInConstructor from "../src/constructors/signInConstructor.json";
import { useContext, useEffect, useRef, useState } from "react";
import { SendMessage } from "./components/SendMessage/SendMessage";
import { UserContext } from "./context/UserContext";

function App() {
  // Feedback message state
  const [message, setMessage] = useState();

  // State for toggling active form (either 1 or 0) eg. true/false
  const [activeForm, setActiveForm] = useState(0);

  // Context to save user data when signed in
  const { setUserData } = useContext(UserContext);

  // Baseline URL for the login
  const baseUrl = "http://localhost:8081/";

  // All the form constructors to toggle between
  const formArray = [SignUpConstructor, SignInConstructor];

  // Ref for resetting form fields when user changes from signIn to signUp.
  const formRef = useRef();

  // Submit actions for the login - can do both sign up and sign in.
  const handleSubmit = (url, event) => {
    event.preventDefault();
    let body = new URLSearchParams();

    if (!event.target.email.value || !event.target.password.value) {
      setMessage("Please enter a valid email address and password");
      return;
    }

    if (event.target.name.value) {
      body.append("name", event.target.name.value);
    }

    body.append("email", event.target.email.value);
    body.append("password", event.target.password.value);

    let options = {
      method: "POST",
      body: body,
    };

    fetch(baseUrl + url, options)
      .then((res) => res.json())
      .then((data) =>
        data.accessToken ? setUserData(data) : setMessage(data)
      );
  };

  // Effect to reset form and message when user changes signUp to signIn
  useEffect(() => {
    setMessage("");
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [activeForm]);

  return (
    <>
      <Form
        activeForm={activeForm}
        setActiveForm={setActiveForm}
        ref={formRef}
        submitAction={(event) =>
          handleSubmit(activeForm ? "sign-in" : "sign-up", event)
        }
      >
        <p>{activeForm ? "Sign in" : "Sign up"}</p>
        {message && <b>{message}</b>}
        {formArray[activeForm].form.map((input, index) => {
          return <InputField key={index} {...input} />;
        })}
      </Form>
      <SendMessage />
    </>
  );
}

export default App;

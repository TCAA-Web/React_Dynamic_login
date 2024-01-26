import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Form } from "../Form/Form";
import { InputField } from "../InputField/InputField";

export const SendMessage = () => {
  const { userData } = useContext(UserContext);

  const submitMessage = (e) => {
    e.preventDefault();
    const url = "http://localhost:8081/message/create";
    const body = new URLSearchParams();
    body.append("message", e.target.message.value);
    const options = {
      method: "POST",
      body: body,
      headers: {
        Authorization: "Bearer " + userData.accessToken,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <section>
      {userData && (
        <>
          <p>NAME: {userData?.name}</p>
          <p>EMAIL: {userData?.email}</p>

          <Form submitAction={(e) => submitMessage(e)}>
            <InputField
              type="textfield"
              placeholder="Enter some message"
              name="message"
            />
            <InputField type="submit" value="Send message" />
          </Form>
        </>
      )}
    </section>
  );
};

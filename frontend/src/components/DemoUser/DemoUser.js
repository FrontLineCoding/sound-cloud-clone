import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const DemoUser = () => {
  const dispatch = useDispatch();
  const [email] = useState("user1workbaby");
  const [password] = useState("password1");

  const handleSubmit = (e) => {
    return dispatch(
      sessionActions.login({
        email,
        password
      })
    );
  };

  return (
    <button onClick={handleSubmit}>
      Demo Login
    </button>
  );
};

export default DemoUser;

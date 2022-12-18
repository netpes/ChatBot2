import "./signup.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "../values";

export default function Login() {
  const [role, setRole] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const { userid, setUserId } = useContext(GetData);
  const { userName, setUserName } = useContext(GetData);

  async function Handler(e) {
    e.preventDefault();
    //need to state
    const res = await axios.post("http://localhost:2000/login", {
      email,
      password,
    });
    setUserData(res.data.id);
    setUserName(res.data.name);
    setRole(res.data.role);
    next();
  }
  function next() {
    setUserId(userData);

    if (role == "user") {
      navigate("/userChat");
    } else if (role == "admin") {
      navigate("/adminChat");
    }
    //
  }

  return (
    <div className={"modal-content animate"}>
      <form className={"form"} method="post" onSubmit={Handler}>
        <div className="imgcontainer">
          <img
            src={"https://www.w3schools.com/howto/img_avatar2.png"}
            alt="Avatar"
            className={"avatar"}
          />
        </div>
        <div className="container1">
          <label>Email:</label>
          <input
            id={"email"}
            className={"signUpInput"}
            onChange={(e) => setEmail(e.target.value)}
            type={"text"}
            name={"email"}
          />
          <label>Password:</label>
          <input
            id={"pass"}
            className={"signUpInput"}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            name={"password"}
          />

          <button type={"Submit"}>Login</button>
        </div>
      </form>
    </div>
  );
}

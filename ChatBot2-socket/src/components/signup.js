import "./signup.css";

export default function Signup() {
  return (
    <div className={"div_form"}>
      <form
        className={"modal-content animate"}
        method={"post"}
        action={"http://localhost:2000/signup"}
      >
        <div className="container1">
          <label>Name:</label>
          <input className={"signUpinput"} type={"text"} name={"name"} />
          <label>Password:</label>
          <input
            className={"signUpinput"}
            type={"password"}
            name={"password"}
          />
          <label>Email:</label>
          <input className={"signUpinput"} type={"email"} name={"email"} />
          <button type={"Submit"}>Signup</button>
        </div>
      </form>
    </div>
  );
}

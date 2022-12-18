import React, { useState } from "react";
import { useContext } from "react";
import { GetData } from "../values";

export default function SendMessage(props) {
  let center = false;
  const { userName, setUserName } = useContext(GetData);
  const { userId, setUserId } = useContext(GetData);

  //if date is differente write the date span (JS change class to active)
  let sender = "anon";
  if (props.values.sender && userName) {
    sender = props.values.sender;
    if (sender === userName || userId === sender) {
      center = true;
    }
  }

  return (
    <div className={"message"}>
      <p className={center ? "text text-only" : "text"}>
        {props.values.message}
      </p>
      {/*<p className="message">{sender}</p>*/}
      <p className="time"> {props.values.time}</p>
    </div>
  );
}

// <div className="message">
//     <p className="text">Enter Here Message From</p>
// </div>
// <div className="message text-only">
//     <p className="text">if same time send here</p>
// </div>

// <div className="message text-only">
//     <div className="response">
//         <p className="text">Enter Here Response</p>
//     </div>
// </div>
// <div className="message text-only">
//     <div className="response">
//         <p className="text">if same time send here</p>
//     </div>
// </div>
// <p className="response-time time"> Timeeee</p>
//

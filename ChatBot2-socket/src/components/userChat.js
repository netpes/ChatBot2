import "./userChat.css";
import { io } from "socket.io-client";
import React, { useContext, useEffect, useState } from "react";
import { GetData } from "../values";
import SendMessage from "../handles/sendMessage";

export default function UserChat() {
  const [socket, setSocket] = useState();
  const { userId, setUserId } = useContext(GetData);
  const [giveChat, setGiveChat] = useState([]);
  const inputat = document.getElementById("input");
  const [input, setInput] = useState();

  useEffect(() => {
    setSocket(
      io.connect("http://localhost:2000", { transports: ["websocket"] })
    );
  }, []);

  useEffect(() => {
    socket?.on("connect", () => {
      socket.emit("join-room", userId);
      socket?.on("chat message", function (msg) {
        console.log("why not? " + msg);
        setGiveChat((prev) => [...prev, msg]);
        window.scrollTo(0, document.body.scrollHeight);
      });

      //getting chats from server
      socket?.on("send-chats", (chats) => {
        setGiveChat([...chats]);
        console.log("this is chats", chats);
      });
    });
  }, [socket]);

  function HandleSub(event) {
    event.preventDefault();
    const message = { message: input, sender: userId };
    setGiveChat((prev) => [...prev, message]);

    if (input !== null) {
      socket?.emit("chat message", input, userId, userId);
      inputat.value = " ";
      setInput("");
    }
    // console.log(input);
  }

  return (
    <div className="container">
      <div className="row">
        <nav className="menu">
          <ul className="items">
            <li className="item">
              <i className="fa fa-home" aria-hidden="true"></i>
            </li>
            <li className="item">
              <i className="fa fa-user" aria-hidden="true"></i>
            </li>
            <li className="item">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </li>
            <li className="item item-active">
              <i className="fa fa-commenting" aria-hidden="true"></i>
            </li>
            <li className="item">
              <i className="fa fa-file" aria-hidden="true"></i>
            </li>
            <li className="item">
              <i className="fa fa-cog" aria-hidden="true"></i>
            </li>
          </ul>
        </nav>

        <section className="discussions">
          <div className="discussion search">
            <div className="searchbar">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input type="text" placeholder="Search..."></input>
            </div>
          </div>
        </section>
        <section className="chat">
          <div className="header-chat">
            <i className="icon fa fa-user-o" aria-hidden="true"></i>
            <p className="name">Chat support</p>
            <i
              className="icon clickable fa fa-ellipsis-h right"
              aria-hidden="true"
            ></i>
          </div>
          <div className="messages-chat">
            {/* eslint-disable-next-line array-callback-return */}
            {giveChat.map((a, index) => {
              if (a.message) {
                return (
                  <SendMessage
                    values={{
                      message: a.message,
                      index,
                      sender: a.sender,
                      time: a.time,
                      date: a.date,
                    }}
                  />
                );
              }
            })}
          </div>
          <form action="adminChat" onSubmit={HandleSub}>
            <input id="room" autoComplete="off" />
            <div className="footer-chat">
              <button
                className="icon fa fa-smile-o clickable mysub"
                type={"submit"}
              ></button>
              <input
                type="text"
                className="write-message"
                placeholder="Type your message here"
                id="input"
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
              ></input>
              <i
                className="icon send fa fa-paper-plane-o clickable"
                aria-hidden="true"
              ></i>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

import "./userChat.css";
function Test() {
  return (
    <div className="container">
      <div className="row">
        <div className="messages-chat">
          <div className="message">
            <p className="text">Enter Here Message From</p>
          </div>
          <div className="message text-only">
            <p className="text">if same time send here</p>
          </div>
          <p className="time"> Timeeeeee</p>
          <div className="message text-only">
            <div className="response">
              <p className="text">Enter Here Response</p>
            </div>
          </div>
          <div className="message text-only">
            <div className="response">
              <p className="text">if same time send here</p>
            </div>
          </div>
          <p className="response-time time"> Timeeee</p>

          <div className="footer-chat">
            <i
              className="icon fa fa-smile-o clickable"
              style="font-size:25pt;"
              aria-hidden="true"
            ></i>
            <input
              type="text"
              className="write-message"
              placeholder="Type your message here"
            ></input>
            <i
              className="icon send fa fa-paper-plane-o clickable"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;

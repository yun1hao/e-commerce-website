import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { open } from "../redux/closeSlice";
import "./Body.css";
import { closeModal } from "../actions/index";
export default function SigninWindow() {
  const dispatch = useDispatch();
  const [close, setClose] = useState(false);
  const [showwarn, setShowwarn] = useState(false);
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [show, setShow] = useState(false);

  const divStyle = { display: close ? "none" : "block" };
  const warningStyle = { display: showwarn ? "block" : "none" };
  const closeButton = () => {
    setClose(true);
  };
  const format = () => {
    const res = email.includes("@");
    if (res && email && psw) {
      return false;
    } else {
      return true;
    }
  };
  const signin = () => {
    console.log({
      email: { email },
      password: { psw },
    });
    setEmail("");
    setPsw("");
    const res = format();
    setShowwarn(res);
  };
  const showpsw = () => {
    console.log("jj");
    setShow(!show);
  };
  return (
    <div className="container" style={divStyle}>
      <div className="title">
        <h2>Sign in to your account</h2>
        <CloseIcon
          className="close_icon"
          onClick={() => closeModal(dispatch)()}
        />
      </div>
      <div className="input">
        <div className="email-input">
          <span>Email</span>
          <br />
          <div className="email-part">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="password-input">
          <span>Password</span>
          <br />
          <div className="password-part">
            <input
              type={show ? "text" : "password"}
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
            />
            <span onClick={showpsw}>Show</span>
          </div>
          <div className="warning">
            <span style={warningStyle}>Wrong format!</span>
          </div>
        </div>
        <div className="signin-buttom">
          <button onClick={signin}>Sign in</button>
        </div>
      </div>
      <div className="buttom">
        <div className="left">
          <span>Don't have an account?</span>
          <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">
            Sign up
          </a>
        </div>
        <div className="rightpart">
          <a href="">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

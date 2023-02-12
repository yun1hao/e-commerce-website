import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { open } from "../redux/closeSlice";
import { store } from "../store/index";
import "./Body.css";

import {
  closeModal,
  signupModal,
  signindata,
  signupdata,
  checksigninStatus,
  forgetWindow,
  testModel,
} from "../actions/index";

export default function ModelOne({
  Title,
  Signup_close,
  setusrloggedin,
  setTest,
  test,
}) {
  const dispatch = useDispatch();
  const [close, setClose] = useState(false);
  const [showwarn, setShowwarn] = useState(false);
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [signupemail, setSignupEmail] = useState("");
  const [signuppsw, setSignupPsw] = useState("");
  const [show, setShow] = useState(false);
  const [showforget, setShowForget] = useState(false);
  const [showsentemail, setShowsentemail] = useState(false);
  const isSignedstatus = useSelector((state) => state.checkSignedIn);
  console.log(isSignedstatus.user == "");

  const [tt, settt] = useState(0);

  const divStyle = { display: close ? "none" : "block" };
  const warningStyle = { display: showwarn ? "block" : "none" };
  const pswStyle = { display: true ? "block" : "none" };

  useEffect(() => {
    settt((e) => e + 1);

    console.log("in here");
  }, [dispatch]);

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
  const signin = async () => {
    console.log("????");
    checksigninStatus(dispatch)({ email: email, password: psw });
    setTest((e) => e + 1);
    setEmail("");
    setPsw("");
    const res = format();
    // console.log(isSignedstatus);
    setShowwarn(res);
    testModel(dispatch)(1);
    // if (isSignedstatus.statelogin == true) {
    //   console.log("is true");
    //   setusrloggedin(true);
    // }

    // closeModal(dispatch)();
  };

  const signup = () => {
    signupdata(dispatch)({ email: signupemail, password: signuppsw });
    setSignupEmail("");
    setSignupPsw("");
    // const res = format();
    // setShowwarn(res);
  };
  const showpsw = () => {
    console.log("jj");
    setShow(!show);
  };
  return (
    <>
      {isSignedstatus.user != "" ? (
        <>
          <div className="container" style={divStyle}>
            <div className="title">
              <h2 className="welcome-back-title">
                Welcome Back! {isSignedstatus.user}
              </h2>
              <CloseIcon
                className="close_icon"
                onClick={() => closeModal(dispatch)()}
              />
            </div>
            <img
              src="https://coloringonly.com/images/imgcolor/Welcome-Home-with-Balloons-coloring-page.jpg"
              alt=""
              className="welcome-back-img"
            />
          </div>
        </>
      ) : (
        <>
          {showforget ? (
            <>
              {!showsentemail ? (
                <>
                  <div className="container_forget" style={divStyle}>
                    <div className="title">
                      <h2>Update your password</h2>
                      <CloseIcon
                        className="close_icon"
                        onClick={() => closeModal(dispatch)()}
                      />
                    </div>
                    <p className="link_word">
                      Enter your email link, we will senf you the recovery link
                    </p>

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

                      <div className="signin-buttom_forget">
                        <button onClick={() => setShowsentemail(true)}>
                          Update password
                        </button>
                      </div>
                    </div>
                    <div className="buttom"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container_forget" style={divStyle}>
                    <div className="sent_email">
                      {/* <img src="./email.jpg" alt="logo" /> */}
                      <div className="sent_word_part">
                        <h2>
                          We have sent the update password link to your email,
                          please check that!
                        </h2>
                      </div>

                      <CloseIcon
                        className="close_icon_sentemail"
                        onClick={() => closeModal(dispatch)()}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="container" style={divStyle}>
              <div className="title">
                <h2>{Title}</h2>
                <CloseIcon
                  className="close_icon"
                  onClick={() => closeModal(dispatch)()}
                />
              </div>
              {!Signup_close ? (
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
                      {!Signup_close ? (
                        <span onClick={showpsw}>Show</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="warning">
                      <span style={warningStyle}>Wrong format!</span>
                    </div>
                  </div>

                  <>
                    <div className="signin-buttom">
                      <button onClick={signin}>Sign in</button>
                    </div>
                  </>
                </div>
              ) : (
                //Sign up model-----------------------------------------------------
                <>
                  <div className="input">
                    <div className="email-input">
                      <span>Email</span>
                      <br />
                      <div className="email-part">
                        <input
                          type="text"
                          value={signupemail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="password-input">
                      <span>Password</span>
                      <br />
                      <div className="password-part">
                        <input
                          // type={show ? "text" : "password"}
                          value={signuppsw}
                          onChange={(e) => setSignupPsw(e.target.value)}
                        />
                        {!Signup_close ? (
                          <span onClick={showpsw}>Show</span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="warning">
                        <span style={warningStyle}>Wrong format!</span>
                      </div>
                    </div>

                    <div className="signin-buttom">
                      <button onClick={signup}>Create account</button>
                    </div>
                  </div>
                </>
              )}
              <div className="buttom">
                <div className="left">
                  {!Signup_close ? (
                    <>
                      <span>Don't have an account?</span>
                      <a onClick={() => signupModal(dispatch)()}>Sign up</a>
                    </>
                  ) : (
                    <>
                      <span>Already have an account</span>
                      <a onClick={() => signupModal(dispatch)()}>Sign in</a>
                    </>
                  )}
                </div>
                {!Signup_close ? (
                  <div className="rightpart">
                    <a onClick={() => setShowForget(true)}>Forgot password?</a>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

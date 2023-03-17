import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch,useSelector } from "react-redux";
import "./signup.css";
import {
  closeModal,
  signupModal,
  signindata,
  signupdata,
  checksigninStatus,
  forgetWindow,
  testModel,
  UpdatePersonCart,
  ListingCart,
  updateAllCart
} from "../../../actions/index";
import {SIGNIN_STATUS} from "../../../store/storeKey"
export default function Signup({
    title,
    setSingin,
    setForgotPassword,
    setSingUp
}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isSignedstatus = useSelector((state) => state.checkSignedIn);
  const showProduct = useSelector((state) => state.showProduct); //未登录缓存商品

  const signup = async () => {
        if(!email || !psw){
            alert("请输入账号密码！")
            return
        }
        let params = { 
            email: email.trim(), 
            password: psw.trim(),
        }
        signupdata(dispatch)(params).then(()=>{
            setSingin(false)
        })
  };

  const clickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const signin = ()=>{
        setSingin(false)
  }
  
  return (
            <div className="container">
              <div className="title">
                <h2>{title}</h2>
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
                        type={showPassword ? "text" : "password"}
                        value={psw}
                        onChange={(e) => setPsw(e.target.value)}
                      />
                      <span onClick={()=> clickShowPassword()}>{showPassword ? 'hide' : 'show'}</span>
                    </div>
                  </div>
                  <div>
                    <div className="signin-buttom">
                      <button onClick={signup}>Sign up</button>
                    </div>
                  </div>
                </div>
              <div className="buttom">
                <div className="left">
                    <>
                      <span>Don't have an account?</span>
                      <a onClick={signin}>Sign in</a>
                    </>
                </div>
              </div>
            </div>
  )
}

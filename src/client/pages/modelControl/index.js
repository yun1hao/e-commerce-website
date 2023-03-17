import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch,useSelector } from "react-redux";
import Login from "./login/index"
import UpdatePassword from "./updatePassword/index"
import Signup from "./signup/index"

import {
  closeModal,
  signupModal,
  signindata,
  signupdata,
  checksigninStatus,
  forgetWindow,
  testModel,
  UpdatePersonCart,
  ListingCart
} from "../../actions/index";

export default function ModelControl({

}) {

  const [showforget, setShowForget] = useState(false); //忘记密码
  const [showSignup,setSingUp] = useState(false); //注册
 
  const setForgotPassword = (data)=>{ //忘记密码
        setShowForget(data)
  }

  const setShowSignup = (data)=>{  //注册
    setSingUp(data)
  }

  const setSingin = (data)=>{
    setSingUp(data)
  }

  return (
    <div>
      {/* {
        showLogin ? <Login  title="Sign in to your account" setSingUp={setSingUp} setForgotPassword={setForgotPassword} />
        : showSignup ? <Signup setSingin={setSingin} setSingUp={setSingUp} title="Sign up to your account" set setShowSignup={setShowSignup} />
        : <UpdatePassword />
      } */}
      {
        !showSignup && !showforget ? <Login  title="Sign in to your account" setSingUp={setSingUp} setForgotPassword={setForgotPassword} />
        : showSignup ? <Signup setSingin={setSingin} setSingUp={setSingUp} title="Sign up to your account" set setShowSignup={setShowSignup} />
        :  <UpdatePassword /> 
        //  : <Login  title="Sign in to your account" setSingUp={setSingUp} setForgotPassword={setForgotPassword} />
      }
      {/* {
        showforget ? <UpdatePassword /> : <Login  title="Sign in to your account" setSingUp={setSingUp} setForgotPassword={setForgotPassword} />
      } */}
    </div>
  );
}


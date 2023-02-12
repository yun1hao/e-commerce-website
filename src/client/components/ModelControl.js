import React from "react";
import ModelOne from "./ModelOne";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
function ModelControl({ setusrloggedin, setTest, test, isSignedstatus }) {
  const ifsignup_close = useSelector((state) => state.reducer.signup_isclose);
  const dispatch = useDispatch();

  return (
    <>
      {ifsignup_close ? (
        <ModelOne
          Title="Sign up an account!"
          Signup_close={ifsignup_close}
          setTest={setTest}
          test={test}
          isSignedstatus={isSignedstatus}
        />
      ) : (
        <ModelOne
          Title="Sign in to your account"
          Signup_close={ifsignup_close}
          setusrloggedin={setusrloggedin}
          setTest={setTest}
          test={test}
          isSignedstatus={isSignedstatus}
        />
      )}
    </>
  );
}

export default ModelControl;

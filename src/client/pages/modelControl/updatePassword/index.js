import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch,useSelector } from "react-redux";
import "./updatePassword.css";
import {
  closeModal,
} from "../../../actions/index";

export default function UpdatePassword({
}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showsentemail, setShowsentemail] = useState(false);
 
  return (
    <div>
   
              {!showsentemail ? (
                <>
                  <div className="container_forget">
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
                  <div className="container_forget">
                    <div className="sent_email">
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
            </div>
  );
}

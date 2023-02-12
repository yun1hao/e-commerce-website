import React, { useEffect, useState } from "react";
import "./Footer.css";
import { updateCart } from "../actions/index";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Footer() {
  // const dispatch = useDispatch();
  // const isSignedstatus = useSelector((state) => state.checkSignedIn);
  // const name = isSignedstatus.user;

  // const product = isSignedstatus.product;
  // console.log(product);
  // useEffect(() => {
  //   updateCart(dispatch)(product);
  // }, [dispatch]);

  return (
    <>
      <div className="footer">
        <div className="left">
          <p>@2022 All Rights Reserved</p>
        </div>
        <div className="middle">
          <YouTubeIcon className="youtube" />
          <TwitterIcon style={{ color: "white" }} className="twitter" />
          <FacebookIcon style={{ color: "white" }} className="facebook" />
        </div>
        <div className="right">
          <p>Contact us </p>
          <p className="p2">Privacy Policies</p>
          <p className="p3">Help</p>
        </div>
      </div>
    </>
  );
}

export default Footer;

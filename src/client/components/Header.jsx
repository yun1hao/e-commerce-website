import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alldata } from "../redux/closeSlice";
import {
  closeModal,
  initdata,
  signupModal,
  signoutStatus,
  PersonalCart,
  ListingCart,
  checkSignedIn,
  checksigninStatus,
  updateCart,
  userlogout,
  tokenpart,
} from "../actions/index";

function Header({ setopenCart, test, setTest }) {
  const dispatch = useDispatch();
  useEffect(() => {
    ListingCart(dispatch)();
  }, [test]);

  // ListingCart(dispatch)();
  const isSignedstatus = useSelector((state) => state.checkSignedIn);
  //const cartinfo = useSelector((state) => state.addCartReducer);
  const Cartpersonal = useSelector((state) => state.addCartReducer);
  const Tokencuurent = useSelector((state) => state.showCartProduct);

  //const islogout = useSelector((state) => state.islogout);

  // useEffect(() => {
  //   ListingCart(dispatch)();
  // }, [dispatch]);

  const token = Tokencuurent.Cart;
  // console.log(isSignedstatus);
  // console.log(isSignedstatus.token === null);
  const name = isSignedstatus.user;

  let product = isSignedstatus.product;

  const newadd = Cartpersonal[0].total;

  let shownumber;

  let totalNum = 0;
  let totalPrice = 0;
  const islogout = Object.keys(Tokencuurent).length === 0;
  //console.log("token ==0 ?" + islogout);

  const check = token === undefined || token.length == 0;
  // console.log(token === undefined || token.length == 0);
  if (!check) {
    shownumber = token[0].number;
    token.forEach((e) => {
      totalNum = totalNum + e.number;
      totalPrice = totalPrice + e.price * e.number;
    });
  }
  const logout = () => {
    userlogout(dispatch)(Tokencuurent);
    checksigninStatus(dispatch)(null);
    setTest((e) => e + 1);
    console.log("logout");
  };

  return (
    <>
      <div className="headerContainer">
        <div className="logo">
          <div className="logoPart">
            <p>Management</p>
          </div>
          <div className="small">
            <p>Chuwa</p>
          </div>
        </div>

        <div className="searchPart">
          <input placeholder="Search" type="text"></input>

          <SearchIcon className="search_icon" />
        </div>

        <div className="right-header">
          <div className="signIn">
            <PersonIcon fontSize="large" className="signin_icon" />

            {/* {!isSignedstatus.statelogin ? ( */}
            {/* {console.log(islogout)} */}
            {islogout ? (
              // {isSignedstatus.token == null ? (
              <p onClick={() => closeModal(dispatch)()}>Sign In</p>
            ) : (
              <p onClick={() => logout()}>Sign Out</p>
            )}
          </div>
          <div
            className="cart"
            onClick={() => {
              setopenCart(true);
            }}
          >
            <ShoppingCartIcon
              fontSize="medium"
              style={{ color: "white" }}
              className="cart_icon"
            />
            <CircleIcon
              fontSize="small"
              style={{ color: "red" }}
              className="message_icon"
            />
            {/* <span className="message-number">{totalNum + newadd}</span> */}
            <span className="message-number">{totalNum}</span>

            <p>${totalPrice}.00</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

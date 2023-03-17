import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CartProduct from "../CartProduct"
import "./headers.css";
import { useDispatch,useSelector } from "react-redux";
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
  RemoveGuestCart,
  listingProduct
} from "../../actions/index";

export default function Headers({  }) {
  const dispatch = useDispatch();
  const isSignedstatus = useSelector((state) => state.checkSignedIn); //登录
  const showProduct = useSelector((state) => state.showProduct); //未登录
  const [openCart,setopenCart] = useState(false)
  const [code, setCode] = useState("");
  const [discount, setDicount] = useState(0);
  const [estimate, setEstimate] = useState(0);
  let totalNum = 0
  let totalPrice = 0
  let newList = []
  if (isSignedstatus.token) {
    newList = isSignedstatus.product.filter((v)=>{
      return v.number > 0
    })
        newList.forEach((e) => {
            totalNum +=  e.number;
            totalPrice = totalPrice + e.price * e.number;
          });
  } else {
    newList = showProduct.length > 0 ? showProduct.filter((v)=>{
      return v.number > 0
    }) : []
    newList.forEach((e) => {
      totalNum +=  e.number;
      totalPrice = totalPrice + e.price * e.number;
    })
  }
  
  const applyDiscount = () => {
 
  };

  const logout = () => {
    userlogout(dispatch)();
    listingProduct(dispatch)();
    window.localStorage.clear()
    window.location.href = "/"
  };

  const tax = (totalPrice * 0.0968).toFixed(2);

  return (
    <div>
      <div className="headerContainer">
        <div className="logo">
          <div className="logoPart">
            <p>Management</p>
          </div>
          <div className="small">
            <span className="pp">Chuwa</span>
          </div>
        </div>

        <div className="searchPart">
          <input placeholder="Search" type="text"></input>
          <SearchIcon className="search_icon" />
        </div>

        <div className="right-header">
          <div className="signIn" onClick={isSignedstatus.token ? () => logout() : () => closeModal(dispatch)()}>
            <PersonIcon fontSize="large" className="signin_icon" />
            <p>{isSignedstatus.token ? 'Sign Out' : 'Sign In'}</p>
          </div>
          <div
            className="cart"
            onClick={() => {
              console.log(newList,'newList')
              if(!newList || newList.length <= 0){
                alert("请先添加数据")
                return
              }
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
              <>
                <span className="message-number">{totalNum}</span>
                <p>${totalPrice}.00</p>
              </>
          </div>
        </div>
      </div>

           {openCart ? <div className="cart-body">
        <div className="header">
          <span className="title-part">Cart</span>
            <span className="number-part">({totalNum})</span>
          <CloseIcon
            className="close"
            onClick={() => {
              setopenCart(false);
            }}
          />
        </div>
        <div className="cartinside-body">
          <div className="Product-list">
            {
                    (
                      <CartProduct newList={newList} />
                    )
                }
          </div>
          <div className="cuppon">
            <h5>Apply Discount Code</h5>
            <div className="cuppon-input">
              <input
                type="text"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <button onClick={() => applyDiscount()}>Apply</button>
            </div>
          </div>
        </div>
        <div className="checkout-cart">
          <div className="before-checkout">
            <div className="checkout-left">
              <span>Subtotal</span>
              <span>Tax</span>
              <span>Discount</span>
              <span>Estimated total</span>
            </div>
            <div className="checkout-right">
                  <span>${totalPrice}</span>
                  <span>${tax}</span>
                  <span className="special-discount">-${discount}</span>
                  <span>${estimate}</span>
            </div>
          </div>

          <button>Continue to checkout</button>
        </div>
      </div> : <></>} 
    </div>
  );
}
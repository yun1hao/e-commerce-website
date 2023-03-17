import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
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
  updateAllCart,
} from "../../../actions/index";
import { SIGNIN_STATUS } from "../../../store/storeKey";
export default function Login({ title, setForgotPassword, setSingUp }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("ni");
  const [psw, setPsw] = useState("nini");
  const [showPassword, setShowPassword] = useState(false);
  const showProduct = useSelector((state) => state.showProduct); //未登录缓存商品

  const singUp = async () => {
    setSingUp(true);
  };
  const signin = async () => {
    if (!email || !psw) {
      alert("please type account and psw!");
      return;
    }
    let params = {
      email: email,
      password: psw,
    };
    checksigninStatus(dispatch)(params).then((res) => {
      new Promise((resolve) => {
        if (res.signinStatus.product.length > 0) {
          let newList = showProduct.filter((v) => {
            return v.number > 0;
          });
          if (newList.length <= 0) {
            console.log("if");

            console.log(
              initList(res.signinStatus.product),
              "initList(res.signinStatus.product)"
            );
            let params = {
              status: res.signinStatus.status,
              isAdmin: res.signinStatus.isAdmin,
              email: res.signinStatus.iswho,
              product: initList(res.signinStatus.product),
              token: res.accessToken,
            };
            dispatch({
              type: SIGNIN_STATUS,
              payload: params,
            });
            resolve();
            return;
          } else {
            console.log("else");
            let productList = res.signinStatus.product.filter((value) => {
              return value.number > 0;
            });
            let list = newList.map((v) => {
              productList.forEach((item) => {
                if (v.name === item.name && item.number > 0 && v.number > 0) {
                  v.number += item.number;
                  v.openAdd = true;
                }
                v.id = item.id;
              });
              delete v._id;
              delete v.__v;
              delete v.createdAt;
              delete v.description;
              delete v.category;
              delete v.quantity;
              return v;
            });
            let newuUnion = [...res.signinStatus.product, ...list];
            for (let i = 0, len = list.length; i < len; i++) {
              for (
                let j = 0, length = res.signinStatus.product.length;
                j < length;
                j++
              ) {
                if (list[i].name === res.signinStatus.product[j].name) {
                  newuUnion.splice(
                    newuUnion.findIndex(
                      (item) => item.name === res.signinStatus.product[j].name
                    ),
                    1
                  );
                }
              }
            }
            updateAllCart(dispatch)({
              user: res.signinStatus.iswho,
              cart: newuUnion,
            }).then((resolut) => {
              let params = {
                status: res.signinStatus.status,
                isAdmin: res.signinStatus.isAdmin,
                email: res.signinStatus.iswho,
                product: initList(resolut),
                token: res.accessToken,
              };
              dispatch({
                type: SIGNIN_STATUS,
                payload: params,
              });
              resolve();
            });
            return;
            // let pushList = []
            // list.forEach((i)=>{
            //   pushList.push(UpdatePersonCart(dispatch)({
            //     user: res.signinStatus.iswho,
            //     cart: {
            //       name: i.name,
            //       number:i.number,
            //       price: i.price,
            //       openAdd: true,
            //       source: i.source,
            //       id:i.id,
            //     },
            //   }).then((resolut)=>{
            //     return resolut
            //   }))
            // })
            // Promise.all(pushList).then((data)=>{
            //   let params = {
            //       status:res.signinStatus.status,
            //         isAdmin:res.signinStatus.isAdmin,
            //         email:res.signinStatus.iswho,
            //         product:initList(data[data.length - 1]),
            //         token:res.accessToken,
            //     }
            //     dispatch({
            //       type: SIGNIN_STATUS,
            //       payload: params,
            //     });
            //   resolve()
            // })
          }
          return;
        } else {
          let params = {
            status: res.signinStatus.status,
            isAdmin: res.signinStatus.isAdmin,
            email: res.signinStatus.iswho,
            product: showProduct,
            token: res.accessToken,
          };
          dispatch({
            type: SIGNIN_STATUS,
            payload: params,
          });
          resolve();
        }
      }).then(() => {
        setEmail("");
        setPsw("");
        window.location.href = "/";
      });
    });
  };

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const forgotPassword = () => {
    setForgotPassword(true);
  };

  const initList = (product) => {
    let newProduct = showProduct.map((value) => {
      product.forEach((item) => {
        value.number = value.name === item.name ? item.number : value.number;
      });
      return value;
    });
    return newProduct;
  };

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
            <span onClick={() => clickShowPassword()}>
              {showPassword ? "hide" : "show"}
            </span>
          </div>
        </div>
        <div>
          <div className="signin-buttom">
            <button onClick={signin}>Sign in</button>
          </div>
        </div>
      </div>
      <div className="buttom">
        <div className="left">
          <>
            <span>Don't have an account?</span>
            <a onClick={singUp}>Sign up</a>
          </>
        </div>
        <div className="rightpart">
          <a onClick={() => forgotPassword()}>Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch,useSelector } from "react-redux";
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
  addAllproduct
} from "../../../actions/index";
import {SIGNIN_STATUS} from "../../../store/storeKey"
export default function Login({
    title,
    setForgotPassword,
    setSingUp,
    product
}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("ni");
  const [psw, setPsw] = useState("nini");
  const [showPassword, setShowPassword] = useState(false);

  const singUp = async()=>{
    setSingUp(true)
  }
  const signin = async () => {
    if(!email || !psw){
        alert("请输入账号密码！")
        return
    }
    let params = { 
        email: email, 
        password: psw 
    }
    checksigninStatus(dispatch)(params).then((res)=>{
      new Promise((resolve)=>{
        if(res.signinStatus.product.length > 0){
          let newList = product.filter((v)=>{ //获取未登录的时候所有点击添加的商品数量，从而进行商品的合并
            return v.number > 0
          })
          if(newList.length <= 0){   //未有在登录的时候新增商品,
            console.log("if")
              let diffList = getDifference(product,res.signinStatus.product)
              if(diffList.length<=0){
                resolve()
                return
              }
              let newList = delKey(getUnion(res.signinStatus.product,product))
              addAllproduct(dispatch)({
                user: res.signinStatus.iswho,
                cart:newList
              }).then(()=>{
                resolve()
              })
            return
         }else{ //在未登录的时候新增了商品，那么在原有的用户商品里面进行一个商品数量合并
          console.log("else")
            let productList = res.signinStatus.product.filter((value)=> {
              return value.number > 0
            })
            let list = product.map((v,i)=>{
                     productList.forEach((item,key)=>{
                         if(v.id === item.id && item.number > 0 && v.number > 0){
                           product[i]['number'] +=  item.number
                         product[i]['openAdd'] =  true
                        }
                        if(v.id === item.id && item.number > 0 && v.number <= 0){
                           product[i]['number'] =  item.number
                             product[i]['openAdd'] =  true
                        }
                     })
                          delete v._id
                          delete v.__v
                          delete v.createdAt
                          delete v.description
                          delete v.category
                          delete v.quantity
                    return v
            })
              let newuUnion = [...res.signinStatus.product,...list]
              for (let i = 0, len = list.length; i < len; i++ ) {
                for (let j = 0, length = res.signinStatus.product.length; j < length; j++) {
                  if (list[i].id === res.signinStatus.product[j].id) {
                    newuUnion.splice(newuUnion.findIndex(item => item.id === res.signinStatus.product[j].id), 1)
                  }
                }
              }
            updateAllCart(dispatch)({
              user: res.signinStatus.iswho,
              cart:newuUnion
            }).then((resolut)=>{
             let params = {
                status:res.signinStatus.status,
                isAdmin:res.signinStatus.isAdmin,
                email:res.signinStatus.iswho,
                // product:resolut,
                token:res.accessToken,
            }
            dispatch({
              type: SIGNIN_STATUS,
              payload: params,
            });
              resolve()
            })
            return
         }
        }else{   //新用户 为新用户创建商品
          addAllproduct(dispatch)({
            user: res.signinStatus.iswho,
            cart:delKey(product)
          }).then(()=>{
            resolve()
          })
        }
      }).then(()=>{
        setEmail("");
        setPsw("");
        window.localStorage.removeItem("showproduct")
        window.location.href = "/"
      })
    })
  };

  const clickShowPassword = () => {
      setShowPassword(!showPassword)
  };

  const forgotPassword = ()=>{
    setForgotPassword(true)
  }

  /** 差集 */
  const getDifference = (arr1,arr2)=>{
    return arr1.filter(item => arr2.every(subItem => subItem.id !== item.id));
  }

   /** 并集 */
   const getUnion = (arr1,arr2)=>{
    const arr3 = arr1.concat(arr2); 
    console.log(arr3,'aa')
    let map = new Map();
    for (let item of arr3) {
      if (!map.has(item.id)) {
          map.set(item.id, item);
      }
    }
    return [...map.values()];
  }

  /**删除多余字段，统一数据格式 */
  const delKey = (data)=>{
    let list = data.map((v)=>{
      delete v._id
      delete v.__v
      delete v.createdAt
      delete v.description
      delete v.category
      delete v.quantity
      return v
    })
    return list
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
  )
}

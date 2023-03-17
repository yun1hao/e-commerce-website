import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  RemovePersonCart,
  UpdatePersonCart,
  ListingCart,
  UpdateNotLoginCart,
  listingProduct
} from "../actions/index";
import "./CartProduct.css";
import {SHOW_PRODUCT,SIGNIN_STATUS} from "../store/storeKey"
export default function CartProduct({newList}) {
  const dispatch = useDispatch();

  const isSignedstatus = useSelector((state) => state.checkSignedIn);
  const showProduct = useSelector((state) => state.showProduct); //未登录

  const minus = (item,index) => {
    if (isSignedstatus.token) {
      UpdatePersonCart(dispatch)({
        user: isSignedstatus.user,
        cart: {
          name: item.name,
          number: item.number - 1,
          price: item.price,
          openAdd: true,
        },
      }).then((res)=>{
        item.number--
        dispatch({
          type: SIGNIN_STATUS,
          payload: {
            status:isSignedstatus.statelogin,
            isAdmin:isSignedstatus.isAdmin,
            email:isSignedstatus.user,
            product:initList(res),
            token:isSignedstatus.token,
          },
        });
        
      })
      return
    } else {
      console.log("guest minus");
      item.number--
      let newShowProduct = showProduct.map((v)=>{
        v.number = v.name === item.name ? item.number : v.number
        return v
      })
      dispatch({
        type: SHOW_PRODUCT,
        payload: {
          allproduct:newShowProduct
        },
      });
    }
  };

  const add = (item,index) => {
    if (isSignedstatus.token) {
      UpdatePersonCart(dispatch)({
        user: isSignedstatus.user,
        cart: {
          name: item.name,
          number: item.number ? item.number + 1 : 1,
          price: item.price,
          openAdd: true,
          source: item.source,
        },
      }).then((res)=>{
        item.number++
        dispatch({
          type: SIGNIN_STATUS,
          payload: {
            status:isSignedstatus.statelogin,
            isAdmin:isSignedstatus.isAdmin,
            email:isSignedstatus.user,
            product:initList(res),
            token:isSignedstatus.token,
          },
        });
      })
      return
    } else {
      item.number++
      let newShowProduct = showProduct.map((v)=>{
        v.number = v.name === item.name ? item.number : v.number
        return v
      })
      dispatch({
        type: SHOW_PRODUCT,
        payload: {
          allproduct:newShowProduct
        },
      });
    }
  };

  const removefromcart = (item) => {
    if(isSignedstatus.token){
        RemovePersonCart(dispatch)({
          user: isSignedstatus.user,
          removeitem: item.name,
        });
        item.number = 0
        let removeList = isSignedstatus.product.map((v)=>{
          v.number = item.name === v.name ? item.number : v.number
          return v
        })
        dispatch({
          type: SIGNIN_STATUS,
          payload: {
            status:isSignedstatus.statelogin,
            isAdmin:isSignedstatus.isAdmin,
            email:isSignedstatus.user,
            product:removeList,
            token:isSignedstatus.token,
          },
        });
      return
    }else{
      item.number = 0
      let newShowProduct = showProduct.map((v)=>{
        v.number = v.name === item.name ? item.number : v.number
        return v
      })
      dispatch({
        type: SHOW_PRODUCT,
        payload: {
          allproduct:newShowProduct
        },
      });
    }
  };

  const initList = (product)=>{
    let newProduct = showProduct.map((value)=>{
      product.forEach((item)=>{
        value.number = value.name === item.name ? item.number : value.number
      })
      return value
    })
    return newProduct
  }

  return (
    <div>
    {
      newList.map((item,index)=>{
        return (
          <div className="outline-cart" key={index}>
          <img src={item.source} alt="logo" className="picture-cart" />
          <div className="detail-cart">
            <div className="id-header">
              <div className="h4-cart">
                <h4>{item.name}</h4>
              </div>
              <span>${item.price}</span>
            </div>
            <div className="id-bottom">
              <div className="control-number-cart">
                <button className="minus-cart" onClick={() => minus(item,index)}>
                  -
                </button>
                <div className="productnumber-cart">
                  <span>{item.number}</span>
                </div>
                <button className="add-cart" onClick={() => add(item,index)}>
                  +
                </button>
              </div>
              <span className="remove-cart" onClick={() => removefromcart(item)}>
                Remove
              </span>
            </div>
          </div>
        </div>
        )
      })
      }
    </div>
  );
}


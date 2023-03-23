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
export default function CartProduct({product,newList,setProduct,changeProduct}) {
  const dispatch = useDispatch();
  const isSignedstatus = useSelector((state) => state.checkSignedIn);

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
        setProduct(res)
      })
      return
    } else {
      console.log("guest minus");
      item.number--
      changeProduct(item)
    }
  };

  const add = (item,index) => {
    if (isSignedstatus.token) {
      UpdatePersonCart(dispatch)({
        user: isSignedstatus.user,
        cart: {
          name: item.name,
          number: item.number + 1,
          price: item.price,
          openAdd: true,
        },
      }).then((res)=>{
        setProduct(res)
      })
      return
    } else {
      item.number++
      changeProduct(item)
    }
  };

  const removefromcart = (item) => {
    if(isSignedstatus.token){
        RemovePersonCart(dispatch)({
          user: isSignedstatus.user,
          removeitem: item.name,
        }).then(()=>{
          item.number = 0
          let removeList = product.map((v)=>{
            v.number = item.id === v.id ? item.number : v.number
            return v
          })
          setProduct(removeList)
        })
      return
    }else{
      item.number = 0
      changeProduct(item)
    }
  };

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


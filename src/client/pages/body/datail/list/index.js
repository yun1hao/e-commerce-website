import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  addtocart,
  UpdatePersonCart,
  checkSignedIn,
  checksigninStatus,
  recordcardnumber,
  ListingCart,
  UpdateNotLoginCart,
  
} from "../../../../actions/index";
import "./list.css";
import {SHOW_PRODUCT,SIGNIN_STATUS} from "../../../../store/storeKey"
import CloseIcon from "@mui/icons-material/Close";

export default function List({
  productdetail,
  setDetailpage,
  setEdit,
  changeProduct,
  setProduct
}) {
  const dispatch = useDispatch();
  const isSignedstatus = useSelector((state) => state.checkSignedIn);  //已登录

  const add = () => {
    if (isSignedstatus.token) {
      UpdatePersonCart(dispatch)({
        user: isSignedstatus.user,
        cart: {
          name: productdetail.name,
          number: productdetail.number ? productdetail.number + 1 : 1,
          price: productdetail.price,
          openAdd: true,
          source: productdetail.source,
        },
      }).then((res)=>{
        productdetail.number++
        setProduct(res)
      })
      return
    } else {
      console.log("guest add");
      productdetail.number++
      changeProduct(productdetail)
    }
  };
  const minus = () => {
    if(productdetail.number<=0 || productdetail.number === undefined || productdetail.number == ''){
      alert("请先添加商品数量")
      return
    }
    if (isSignedstatus.token) {
      UpdatePersonCart(dispatch)({
        user: isSignedstatus.user,
        cart: {
          name: productdetail.name,
          number: productdetail.number - 1,
          price: productdetail.price,
          openAdd: true,
        },
      }).then((res)=>{
        productdetail.number--
        setProduct(res)
      })
     return
   } else {
     console.log("guest minus");
    productdetail.number--
    changeProduct(productdetail)
   }
  };

  return (
    <div className="listxxfbox">
      <div className="outline">
        <div className="Title-detail">
          <h2>Product Detail</h2>
          <CloseIcon
            className="close-detai"
            onClick={() => {
              setEdit(false)
            }}
          />
        </div>
        <div className="body">
          <img src={productdetail.source} alt="product image" className="image-part" />
          <div className="details">
            <p className="first">{productdetail.category}</p>
            <span className="second">{productdetail.name}</span>
            <br />
            <br />
            <span className="third">${productdetail.price}</span>
            {productdetail.quantity > 0 ? (
              <></>
            ) : (
              <span className="outstock">Out of Stock</span>
            )}

            <p className="fourth">{productdetail.description}</p>
            <div className="detail-change-button">
                <>
                  <div className="adding-extend-detail">
                    <button className="minus-detail" onClick={() => minus()}>
                      -
                    </button>
                    <div className="number-detail">
                      <span>{productdetail.number}</span>
                    </div>

                    <button className="add-detail" onClick={() => add()}>
                      +
                    </button>
                  </div>
                </>

              <button
                className="edit"
                onClick={() => {
                  setDetailpage(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



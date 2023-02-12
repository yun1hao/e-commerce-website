import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addtocart,
  UpdatePersonCart,
  checkSignedIn,
  checksigninStatus,
  recordcardnumber,
  ListingCart,
} from "../actions/index";
import CloseIcon from "@mui/icons-material/Close";
import "./ProductDetail.css";

function ProductDetail({
  detail,
  setMainpage,
  setDetailpage,
  productdetail,
  setTest,
  test,
  setEdit,
  setEditName,
  set,
  setProductDetail,
}) {
  const Tokencuurent = useSelector((state) => state.showCartProduct);
  const dispatch = useDispatch();
  const list = Tokencuurent.Cart;
  const users = Tokencuurent.email;
  let ifopen = false;
  let itemtotalNum = 0;
  useEffect(() => {
    ListingCart(dispatch)();
  }, [test]);
  if (list) {
    list.forEach((e) => {
      if (e.name == productdetail.name) {
        itemtotalNum = e.number;
      }
    });
  }
  const add = () => {
    setTest((e) => e + 1);
    // setNumber(number + 1);

    UpdatePersonCart(dispatch)({
      user: users,
      cart: {
        name: productdetail.name,
        number: itemtotalNum + 1,
        price: productdetail.price,
        openAdd: true,
        source: productdetail.source,
      },
    });
  };
  const minus = () => {
    // setNumber(number - 1);
    UpdatePersonCart(dispatch)({
      user: users,
      cart: {
        name: productdetail.name,
        number: itemtotalNum - 1,
        price: productdetail.price,
        openAdd: true,
      },
    });
    setTest((e) => e + 1);
  };

  const addbutton = () => {
    //addtocart(dispatch)(cart);
    // setNumber(number + 1);
    UpdatePersonCart(dispatch)({
      user: users,
      cart: {
        name: productdetail.name,
        number: itemtotalNum + 1,
        price: productdetail.price,
        openAdd: true,
        source: productdetail.source,
      },
    });
    setTest((e) => e + 1);
  };

  if (itemtotalNum != 0) {
    ifopen = true;
  }
  return (
    <>
      <div className="outline">
        <div className="Title-detail">
          <h2>Product Detail</h2>
          <CloseIcon
            className="close-detai"
            onClick={() => {
              setMainpage(true);
              setDetailpage(false);
            }}
          />
        </div>
        <div className="body">
          <img src={detail.source} alt="product image" className="image-part" />
          <div className="details">
            <p className="first">{detail.category}</p>
            <span className="second">{detail.name}</span>
            <br />
            <br />
            <span className="third">${detail.price}</span>
            {detail.quantity > 0 ? (
              <></>
            ) : (
              <span className="outstock">Out of Stock</span>
            )}

            <p className="fourth">{detail.description}</p>
            <div className="detail-change-button">
              {ifopen ? (
                <>
                  <div className="adding-extend-detail">
                    <button className="minus-detail" onClick={() => minus()}>
                      -
                    </button>
                    <div className="number-detail">
                      <span>{itemtotalNum}</span>
                    </div>

                    <button className="add-detail" onClick={() => add()}>
                      +
                    </button>
                  </div>
                </>
              ) : (
                <button className="add-to-cart" onClick={() => addbutton()}>
                  Add To Cart
                </button>
              )}

              <button
                className="edit"
                onClick={() => {
                  setDetailpage(false);
                  setEdit(true);
                  setEditName(productdetail.name);
                  set.setEitdescription(productdetail.description);
                  set.setEditCategory(productdetail.category);
                  set.setEditPrice(productdetail.price);
                  set.setEditQuantity(productdetail.quantity);
                  set.setEditLink(productdetail.source);
                  set.setId(productdetail.id);
                  setProductDetail({
                    category: productdetail.category,
                    name: productdetail.name,
                    source: productdetail.source,
                    price: productdetail.price,
                    quantity: productdetail.quantity,
                    description: productdetail.description,
                  });
                  console.log("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;

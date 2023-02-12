import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  RemovePersonCart,
  UpdatePersonCart,
  ListingCart,
} from "../actions/index";
import { useDispatch } from "react-redux";
import "./CartProduct.css";
function CartProduct({ name, number, source, price, setTest, test }) {
  const dispatch = useDispatch();
  const Tokencuurent = useSelector((state) => state.showCartProduct);
  const cuurentuser = Tokencuurent.email;
  const list = Tokencuurent.Cart;

  let itemtotalNum = 0;
  useEffect(() => {
    ListingCart(dispatch)();
  }, [test]);
  if (list) {
    list.forEach((e) => {
      if (e.name == name) {
        itemtotalNum = e.number;
      }
    });
  }
  const removefromcart = () => {
    RemovePersonCart(dispatch)({
      user: cuurentuser,
      removeitem: name,
    });
    setTest((e) => e + 1);
  };
  const minus = () => {
    UpdatePersonCart(dispatch)({
      user: cuurentuser,
      cart: {
        name: name,
        number: itemtotalNum - 1,
        price: price,
        openAdd: true,
      },
    });
    setTest((e) => e + 1);
  };
  const add = () => {
    UpdatePersonCart(dispatch)({
      user: cuurentuser,
      cart: {
        name: name,
        number: itemtotalNum + 1,
        price: price,
        openAdd: true,
        source: source,
      },
    });
    setTest((e) => e + 1);
    console.log("add!");
  };
  return (
    <>
      <div className="outline-cart">
        {/* <div className="picture"> */}
        <img src={source} alt="logo" className="picture-cart" />
        {/* </div> */}
        <div className="detail-cart">
          <div className="id-header">
            <div className="h4-cart">
              <h4>{name}</h4>
            </div>
            <span>${price}</span>
          </div>
          <div className="id-bottom">
            <div className="control-number-cart">
              <button className="minus-cart" onClick={() => minus()}>
                -
              </button>
              <div className="productnumber-cart">
                <span>{number}</span>
              </div>
              <button className="add-cart" onClick={() => add()}>
                +
              </button>
            </div>
            <span className="remove-cart" onClick={() => removefromcart()}>
              Remove
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;

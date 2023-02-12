import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./Cart.css";
import CardProduct from "./CartProduct";
import { useSelector } from "react-redux";

function Cart({ setopenCart, setTest, test }) {
  const cartinfo = useSelector((state) => state.addCartReducer);
  const isSignedstatus = useSelector((state) => state.checkSignedIn);
  const Tokencuurent = useSelector((state) => state.showCartProduct);
  const [code, setCode] = useState("");
  const [discount, setDicount] = useState(0);
  const [estimate, setEstimate] = useState(0);
  //let discount = 0;
  let estimated_total = 0;
  const list = Tokencuurent.Cart;

  // console.log(list);

  const product_list = isSignedstatus.product;

  let totalNum = 0;
  let totalPrice = 0;

  // product_list.forEach((e) => {
  //   totalPrice = totalPrice + e.price * e.number;
  //   totalNum = totalNum + e.number;
  // });
  list.forEach((e) => {
    totalPrice = totalPrice + e.price * e.number;
    totalNum = totalNum + e.number;
  });
  const tax = (totalPrice * 0.0968).toFixed(2);
  const applyDiscount = () => {
    if (code == "chuwa") {
      setDicount(20);
      setEstimate(totalPrice + tax * 1 - 20);
    }
    setCode("");
  };
  estimated_total = totalPrice + tax * 1 - discount;
  useEffect(() => {
    const tmp = totalPrice + tax * 1;
    setEstimate(tmp);
  }, [list]);

  return (
    <>
      <div className="cart-body">
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
            {list.map((e, index) => {
              return (
                <CardProduct
                  key={index}
                  name={e.name}
                  number={e.number}
                  source={e.source}
                  price={e.price}
                  setTest={setTest}
                  test={test}
                />
              );
            })}
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
      </div>
    </>
  );
}

export default Cart;

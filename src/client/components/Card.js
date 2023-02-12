import React, { useEffect, useState } from "react";
import "./Card.css";
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

function Card({
  item,
  setDetailpage,
  setProductDetail,
  setEdit,
  setEditName,
  set,
  setTest,
  test,
}) {
  const dispatch = useDispatch();
  let ShowNum = 0;
  let ifopen = false;
  const cartinfo = useSelector((state) => state.addCartReducer);
  const isSignedstatus = useSelector((state) => state.checkSignedIn);
  const Cartpersonal1 = useSelector((state) => state.UpdateCartinfo);
  const Tokencuurent = useSelector((state) => state.showCartProduct);
  const Cardnumberfromredux = useSelector((state) => state.CardnumberReducer);
  const [ifadd, setIfadd] = useState(false);
  const product = isSignedstatus.product;
  const isadmin = Tokencuurent.isAdmin;
  const notlogin = Object.keys(Tokencuurent).length === 0;

  let itemtotalNum = 0;
  const [number, setNumber] = useState(0);
  const addnumbertoredux = () => {
    recordcardnumber(dispatch)({
      item: item.name,
      number: number + 1,
    });
  };
  const list = Tokencuurent.Cart;

  if (list) {
    list.forEach((e) => {
      if (e.name == item.name) {
        itemtotalNum = e.number;
      }
    });
  }

  const user = isSignedstatus.user;
  const users = Tokencuurent.email;

  useEffect(() => {
    addtocart(dispatch)({
      name: item.name,
      number: number,
      price: item.price,
      openAdd: true,
      ifadd: ifadd,
    });
  }, [number]);

  useEffect(() => {
    ListingCart(dispatch)();
  }, [test]);

  const cart = {
    name: item.name,
    number: itemtotalNum,
    price: item.price,
    openAdd: true,
  };

  const add = () => {
    setTest((e) => e + 1);
    setNumber(number + 1);
    setIfadd(true);

    UpdatePersonCart(dispatch)({
      user: users,
      cart: {
        name: item.name,
        number: itemtotalNum + 1,
        price: item.price,
        openAdd: true,
        source: item.source,
      },
    });
  };

  const minus = () => {
    setNumber(number - 1);
    UpdatePersonCart(dispatch)({
      user: users,
      cart: {
        name: item.name,
        number: itemtotalNum - 1,
        price: item.price,
        openAdd: true,
      },
    });
    setTest((e) => e + 1);
  };

  const addbutton = () => {
    //addtocart(dispatch)(cart);
    if (notlogin) {
      alert("Please login to add item!");
    } else {
      setNumber(number + 1);
      UpdatePersonCart(dispatch)({
        user: users,
        cart: {
          name: item.name,
          number: itemtotalNum + 1,
          price: item.price,
          openAdd: true,
          source: item.source,
        },
      });
      setTest((e) => e + 1);
    }
  };

  if (itemtotalNum != 0) {
    ifopen = true;
  }
  return (
    <>
      <div className="box">
        <img
          src={item.source}
          alt="logo"
          className="image"
          onClick={() => {
            setDetailpage(true);
            setProductDetail({
              category: item.category,
              name: item.name,
              source: item.source,
              price: item.price,
              quantity: item.quantity,
              description: item.description,
              id: item.id,
            });
          }}
        />
        <div className="name">
          <span>{item.name}</span>
        </div>
        <div className="price">
          <span>${item.price}</span>
        </div>
        <div className="buttom-part">
          {ifopen ? (
            <>
              <div className="adding-extend">
                <button className="minus" onClick={() => minus()}>
                  -
                </button>
                <div className="number">
                  <span>{itemtotalNum}</span>
                </div>

                <button className="add" onClick={() => add()}>
                  +
                </button>
              </div>
            </>
          ) : (
            <button className="edit-button1" onClick={() => addbutton()}>
              Add
            </button>
          )}
          {isadmin ? (
            <button
              className="edit-button2"
              onClick={() => {
                setEdit(true);
                setEditName(item.name);
                set.setEitdescription(item.description);
                set.setEditCategory(item.category);
                set.setEditPrice(item.price);
                set.setEditQuantity(item.quantity);
                set.setEditLink(item.source);
                set.setId(item.id);
                setProductDetail({
                  category: item.category,
                  name: item.name,
                  source: item.source,
                  price: item.price,
                  quantity: item.quantity,
                  description: item.description,
                });
              }}
            >
              Edit
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;

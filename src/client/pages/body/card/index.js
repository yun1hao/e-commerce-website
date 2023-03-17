import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePersonCart } from "../../../actions/index";
import { SHOW_PRODUCT, SIGNIN_STATUS } from "../../../store/storeKey";
import "./card.css";
export default function Card({
  product,
  changeProduct,
  setProductDetail,
  setEdit,
}) {
  const dispatch = useDispatch();
  const [pagenumber, setPagenumber] = useState(1);
  const currentnumber_before = (pagenumber - 1) * 10;
  const currentnumber_after = pagenumber * 10;
  const isSignedstatus = useSelector((state) => state.checkSignedIn);
  const showProduct = useSelector((state) => state.showProduct); //未登录缓存商品

  const add = (item, index) => {
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
      }).then((res) => {
        item.number++;
        dispatch({
          type: SIGNIN_STATUS,
          payload: {
            status: isSignedstatus.statelogin,
            isAdmin: isSignedstatus.isAdmin,
            email: isSignedstatus.user,
            product: initList(res),
            token: isSignedstatus.token,
          },
        });
      });
      return;
    } else {
      item.number++;
      changeProduct(item);
    }
  };

  const minus = (item) => {
    if (item.number <= 0 || item.number === undefined || item.number == "") {
      alert("please add product first");
      return;
    }
    if (isSignedstatus.token) {
      UpdatePersonCart(dispatch)({
        user: isSignedstatus.user,
        cart: {
          name: item.name,
          number: item.number - 1,
          price: item.price,
          openAdd: true,
        },
      }).then((res) => {
        item.number--;
        dispatch({
          type: SIGNIN_STATUS,
          payload: {
            status: isSignedstatus.statelogin,
            isAdmin: isSignedstatus.isAdmin,
            email: isSignedstatus.user,
            product: initList(res),
            token: isSignedstatus.token,
          },
        });
      });
      return;
    } else {
      item.number--;
      changeProduct(item);
    }
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
    <div>
      <div className="cardClassName">
        {product.map((item, index) => {
          if (currentnumber_before <= index && index < currentnumber_after) {
            return (
              <div className="box" key={index}>
                <img
                  src={item.source}
                  alt="logo"
                  className="image"
                  onClick={() => {
                    setEdit(true);
                    setProductDetail(item);
                  }}
                />
                <div className="name">
                  <span>{item.name}</span>
                </div>
                <div className="price">
                  <span>${item.price}</span>
                </div>
                <div className="buttom-part">
                  <>
                    <div className="adding-extend">
                      <button
                        className="minus"
                        onClick={() => minus(item, index)}
                      >
                        -
                      </button>
                      <div className="number">
                        <span>{item.number}</span>
                      </div>

                      <button className="add" onClick={() => add(item, index)}>
                        +
                      </button>
                    </div>
                  </>

                  {isSignedstatus.isAdmin === true ? (
                    <button
                      className="edit-button2"
                      onClick={() => {
                        setEdit(true);
                        setProductDetail(item);
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="footer-part">
        <button
          className="left-button"
          onClick={() => {
            if (pagenumber > 1) {
              setPagenumber(pagenumber - 1);
            }
          }}
        >
          {"<<"}
        </button>
        <button
          className="middle-button"
          style={{
            backgroundColor: pagenumber == 1 ? "#5048e5" : "white",
          }}
          onClick={() => {
            setPagenumber(1);
          }}
        >
          1
        </button>
        <button
          className="middle-button"
          style={{
            backgroundColor: pagenumber == 2 ? "#5048e5" : "white",
          }}
          onClick={() => {
            setPagenumber(2);
          }}
        >
          2
        </button>
        <button
          className="middle-button"
          style={{
            backgroundColor: pagenumber == 3 ? "#5048e5" : "white",
          }}
          onClick={() => {
            setPagenumber(3);
          }}
        >
          3
        </button>
        <button
          className="middle-button"
          style={{
            backgroundColor: pagenumber == 4 ? "#5048e5" : "white",
          }}
          onClick={() => {
            setPagenumber(4);
          }}
        >
          4
        </button>
        <button
          className="middle-button"
          style={{
            backgroundColor: pagenumber == 5 ? "#5048e5" : "white",
          }}
          onClick={() => {
            setPagenumber(5);
          }}
        >
          5
        </button>
        <button
          className="right-button"
          onClick={() => {
            setPagenumber(pagenumber + 1);
          }}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}

import {
  CLOSE_MOUDULE,
  SHOW_DATA,
  SIGNUP_WINDOW,
  SIGNIN_USER_INFO,
  ADD_SIGNUP,
  SIGNIN_STATUS,
  SIGNOUT_STATUS,
  FORGET_WINDOW,
  SHOW_PRODUCT,
  ADD_PRODUCT,
  MOD_PRODUCT,
  ADD_CART,
  UPDATE_PERSON_CART,
  GET_CARTINFO,
  UPDATE_CART_FIRSTIME,
  TOKEN,
  ISLOGOUT,
  REMOVE_FROM_CART,
  RECORD_CARD_NUMBER,
  TEST,
} from "../actions/index";
import { combineReducers } from "redux";

export const reducer = (
  state = {
    isclose: true,
    signup_isclose: true,
  },
  { type, payload }
) => {
  switch (type) {
    case CLOSE_MOUDULE:
      return { isclose: !state.isclose };
    case SIGNUP_WINDOW:
      return { signup_isclose: !state.signup_isclose };
    default:
      return state;
  }
};

export const refreshpage = (state = 0, { type, payload }) => {
  switch (type) {
    case TEST:
      return payload.content + 1;
    default:
      return state;
  }
};
export const showReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SHOW_DATA:
      return [...payload.result];
    case ADD_SIGNUP:
      console.log(payload);
      return [...state, { ...payload }];
    default:
      return state;
  }
};
export const CardnumberReducer = (state = [], { type, payload }) => {
  switch (type) {
    case RECORD_CARD_NUMBER:
      return [...state, payload.data];
    default:
      return state;
  }
};
export const islogout = (state = true, { type, payload }) => {
  switch (type) {
    case ISLOGOUT:
      console.log(payload.signoutStatus);
      return payload.signoutStatus;
    default:
      return state;
  }
};

export const showToken = (state = [], { type, payload }) => {
  switch (type) {
    case TOKEN:
      return [...payload.userpart];
    default:
      return state;
  }
};
export const UpdateCartinfo = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_CART_FIRSTIME:
      console.log("here");
      console.log(payload.data);
      return [...state, ...payload.data];
    // case ADD_SIGNUP:
    //   console.log(payload);
    //   return [...state, { ...payload }];
    default:
      return state;
  }
};
export const PersonalCart = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_PERSON_CART:
      return [...state, ...payload.PersonalCart];
    default:
      return state;
  }
};

export const checkSignedIn = (
  // state = { statelogin: false, isAdmin: false },
  state = {
    statelogin: false,
    isAdmin: false,
    user: "",
    product: [],
    token: null,
  },

  { type, payload }
) => {
  switch (type) {
    case SIGNIN_STATUS:
      console.log("reducer sign in status check:" + payload.status);
      console.log("reducer isAdmin:" + payload.isAdmin);
      return {
        statelogin: payload.status,
        isAdmin: payload.isAdmin,
        user: payload.email,
        product: payload.product,
        token: payload.token,
      };
    case SIGNOUT_STATUS:
      console.log("reducer siout in status check:" + payload.status);
      // return payload.status;
      return {
        isAdmin: false,
        statelogin: payload.status,
        user: "",
        product: [],
      };
    default:
      return state;
  }
};
export const showProduct = (state = [], { type, payload }) => {
  switch (type) {
    case SHOW_PRODUCT:
      return [...payload.allproduct];
    default:
      return state;
  }
};
export const showCartProduct = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_CARTINFO:
      return { ...payload.curruser };
    default:
      return state;
  }
};

export const addproductReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT:
      console.log(payload);
      return [...state, { ...payload }];
    default:
      return state;
  }
};
export const modproductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case MOD_PRODUCT:
      console.log(payload);
      return {
        ...state,
        name: payload.name,
        description: payload.description,
        price: payload.price,
        category: payload.category,
        quantity: payload.quantity,
        source: payload.source,
      };
    default:
      return state;
  }
};
let arr = [];
export const addCartReducer = (
  state = [{ name: "total", number: 0, total: 0, totalPrice: 0, price: 0 }],
  { type, payload }
) => {
  switch (type) {
    case ADD_CART:
      // console.log(payload);
      arr = [...state];
      // console.log(arr);
      const check = (content) => {
        let addingnew = true;
        arr.forEach((e) => {
          if (e.name == content.name) {
            if (payload.ifadd) {
              e.number = content.number;
            }

            addingnew = false;
          }
        });
        if (addingnew) {
          arr.push(content);
        }
      };
      check(payload);

      //adding number together
      let totalNum = 0;
      let totalPrice = 0;
      arr.forEach((e) => {
        totalNum = totalNum + e.number;
        totalPrice = totalPrice + e.number * e.price;
      });
      arr.forEach((e) => {
        if (e.name == "total") {
          e.total = totalNum;
          e.totalPrice = totalPrice;
        }
      });
      // check({name:'total'})

      return arr;
    default:
      return state;
  }
};

export default combineReducers({
  reducer: reducer,
  show: showReducer,
  checkSignedIn: checkSignedIn,
  showProduct: showProduct,
  addproductReducer: addproductReducer,
  modproductReducer,
  addCartReducer,
  PersonalCart,
  UpdateCartinfo,
  showToken,
  showCartProduct,
  islogout,
  CardnumberReducer,
  refreshpage,
});

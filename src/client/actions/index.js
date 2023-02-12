import { ajaxConfigHelper } from "../helper";
export const CLOSE_MOUDULE = "closemodule";
export const SHOW_DATA = "init";
export const SIGNUP_WINDOW = "signup";
export const SIGNIN_USER_INFO = "signinfo";
export const ADD_SIGNUP = "signup";
export const SIGNIN_STATUS = "siginstatus";
export const SIGNOUT_STATUS = "sigoutstatus";
export const FORGET_WINDOW = "forgetwindow";
export const SHOW_PRODUCT = "showproduct";
export const ADD_PRODUCT = "addproduct";
export const MOD_PRODUCT = "modifyProduct";
export const ADD_CART = "addtoCart";
export const UPDATE_PERSON_CART = "updatePersonCart";
export const GET_CARTINFO = "getallcartproduct";
export const UPDATE_CART_FIRSTIME = "updatecartfirsttime";
export const TOKEN = "token";
export const ISLOGOUT = "islogout";
export const REMOVE_FROM_CART = "removefromcart";
export const RECORD_CARD_NUMBER = "recordcardnumber";
export const TEST = "test";

export const testModel = (dispatch) => (content) => {
  dispatch({
    type: TEST,
    payload: {
      content,
    },
  });
};
export const closeModal = (dispatch) => () => {
  dispatch({
    type: CLOSE_MOUDULE,
    payload: {
      isclose: true,
    },
  });
};
export const UpdatePersonCart = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      "/updateCart",
      ajaxConfigHelper({ content }, "PUT")
    );
    // const result = await response.json();
    const { message, PersonalCart } = await response.json();

    dispatch({
      type: UPDATE_PERSON_CART,
      payload: PersonalCart,
    });
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
};

export const RemovePersonCart = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      "/removeCart",
      ajaxConfigHelper({ content }, "PUT")
    );
    // const result = await response.json();
    const { message, removeCount } = await response.json();

    dispatch({
      type: REMOVE_FROM_CART,
      payload: removeCount,
    });
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = (dispatch) => (data) => {
  dispatch({
    type: UPDATE_CART_FIRSTIME,
    payload: {
      data,
    },
  });
};

export const addtocart = (dispatch) => (content) => {
  dispatch({
    type: ADD_CART,
    payload: {
      ...content,
    },
  });
};

export const initdata = (dispatch) => async () => {
  try {
    const response = await fetch("/alldata");

    const result = await response.json();

    dispatch({
      type: SHOW_DATA,
      payload: {
        result,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const signupModal = (dispatch) => () => {
  dispatch({
    type: SIGNUP_WINDOW,
  });
};

export const recordcardnumber = (dispatch) => (data) => {
  dispatch({
    type: RECORD_CARD_NUMBER,
    payload: {
      data,
    },
  });
};
export const signindata = (dispatch) => (data) => {
  dispatch({
    type: SIGNIN_USER_INFO,
    payload: {
      data,
    },
  });
};
export const signupdata = (dispatch) => async (content) => {
  try {
    console.log(content);
    const response = await fetch("/add", ajaxConfigHelper({ content, id: 2 }));
    const result = await response.json();
    const { message, newadd } = await response.json();

    dispatch({
      type: ADD_SIGNUP,
      payload: {
        ...newadd,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const tokenpart = (dispatch) => async (e) => {
  try {
    const response = await fetch("/token", ajaxConfigHelper({ e }));
    const { userpart } = await response.json();
    console.log(userpart);
    dispatch({
      type: TOKEN,
      payload: {
        userpart,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const checksigninStatus = (dispatch) => async (content) => {
  try {
    const res = await fetch("/ifignin", ajaxConfigHelper({ content }));
    const result = await res.json();

    const status = result.signinStatus.status;
    const email = result.signinStatus.iswho;
    const product = result.signinStatus.product;
    console.log("access");
    console.log(result.accessToken);

    let isAdmin = false;
    if (email == "ni") {
      isAdmin = true;
    }
    console.log("check in admin:" + isAdmin);
    dispatch({
      type: SIGNIN_STATUS,
      payload: {
        status,
        isAdmin,
        email,
        product,
        token: result.accessToken,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const signoutStatus = (dispatch) => async () => {
  try {
    const status = false;
    dispatch({
      type: SIGNOUT_STATUS,
      payload: {
        status,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const userlogout1 = (dispatch) => async () => {
  //const result = await res.json();
  try {
    const response = await fetch("/usersignout");

    console.log("ko");
    // const result = await response.json();
    const { message, signoutStatus } = await response.json();
    console.log(signoutStatus);
    dispatch({
      type: ISLOGOUT,
      payload: {
        signoutStatus: signoutStatus.status,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const userlogout = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      "/userlogout",
      ajaxConfigHelper({ content }, "PUT")
    );
    console.log("ko");
    // const result = await response.json();
    // const { message, signoutStatus } = await response.json();
    dispatch({
      type: ISLOGOUT,
      payload: {
        // signoutStatus: signoutStatus.status,
        signoutStatus: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const listingProduct = (dispatch) => async () => {
  try {
    const response = await fetch("/allproduct");

    // const result = await response.json();
    const { message, allproduct } = await response.json();
    dispatch({
      type: SHOW_PRODUCT,
      payload: {
        allproduct,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const ListingCart = (dispatch) => async () => {
  try {
    console.log("refresh");
    const response = await fetch("/cartproduct");
    // const result = await response.json();

    const { message, curruser } = await response.json();
    dispatch({
      type: GET_CARTINFO,
      payload: {
        curruser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addProductdata = (dispatch) => async (content) => {
  try {
    console.log(content);
    const response = await fetch("/addproduct", ajaxConfigHelper({ content }));
    // const result = await response.json();
    const { message, newadd } = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      payload: {
        ...newadd,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const modProduct = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      "/modProduct",
      ajaxConfigHelper({ content }, "PUT")
    );
    const result = await response.json();
    const { message, modifiedCount } = await response.json();

    dispatch({
      type: MOD_PRODUCT,
      payload: { ...modifiedCount },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

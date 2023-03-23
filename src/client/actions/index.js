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
export const UPDATE_GUEST_CART = "updateGuestCart";

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
  return new Promise(async (resolve)=>{
    const response = await fetch("/updateCart",ajaxConfigHelper({ content }, "PUT"));
    const { message, PersonalCart } = await response.json();
    dispatch({
      type: UPDATE_PERSON_CART,
      payload: PersonalCart,
    });
    return resolve(PersonalCart)
  })
  // try {
  //   const response = await fetch("/updateCart",ajaxConfigHelper({ content }, "PUT"));
  //   const { message, PersonalCart } = await response.json();
  //   dispatch({
  //     type: UPDATE_PERSON_CART,
  //     payload: PersonalCart,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};
export const UpdateNotLoginCart = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      "/updateNonloginCart",
      ajaxConfigHelper({ content }, "PUT")
    );

    // const result = await response.json();
    const { message, NotloginCart } = await response.json();
    console.log(NotloginCart);
    dispatch({
      type: UPDATE_GUEST_CART,
      payload: NotloginCart,
    });
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
};

export const RemovePersonCart = (dispatch) => async (content) => {
  return new Promise(async (resolve)=>{
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
    return resolve()
  })
  // try {
  //   const response = await fetch(
  //     "/removeCart",
  //     ajaxConfigHelper({ content }, "PUT")
  //   );
  //   // const result = await response.json();
  //   const { message, removeCount } = await response.json();
  //   dispatch({
  //     type: REMOVE_FROM_CART,
  //     payload: removeCount,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const RemoveGuestCart = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      "/removeGuestCart",
      ajaxConfigHelper({ content }, "PUT")
    );
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

export const EditProducts = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      "/editProducts",
      ajaxConfigHelper({ content }, "PUT")
    );
    const { message, PersonalCart } = await response.json(); 

    console.log(PersonalCart,'PersonalCart')

    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   payload: removeCount,
    // });
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
  return new Promise(async (resolve)=>{
    const response = await fetch("/add", ajaxConfigHelper({ content, id: 2 }));
    const result = await response.json();
    const { message, newadd } = await response;

    dispatch({
      type: ADD_SIGNUP,
      payload: {
        ...newadd,
      },
    });
    return resolve()
  })
  // try {
  //   console.log(content);
  //   const response = await fetch("/add", ajaxConfigHelper({ content, id: 2 }));
  //   const result = await response.json();
  //   const { message, newadd } = await response.json();

  //   dispatch({
  //     type: ADD_SIGNUP,
  //     payload: {
  //       ...newadd,
  //     },
  //   });
  // } catch (error) {
  //   // console.log(error);
  // }
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
  return new Promise(async (resolve)=>{
    const res = await fetch("/ifignin", ajaxConfigHelper({ content }));
    const result = await res.json();
    const status = result.signinStatus.status;
    const email = result.signinStatus.iswho;
    const product = result.signinStatus.product;
    console.log("access");
    console.log(result.accessToken);
    let isAdmin = email == "ni" ? true : false;
    console.log("check in admin:" + isAdmin);
    dispatch({
      type: SIGNIN_STATUS,
      payload: {
        status,
        isAdmin,
        email,
        // product,
        token: result.accessToken,
      },
    });
    result.signinStatus.isAdmin = isAdmin
    return resolve(result)
  })
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
    const response = await fetch("/userlogout",ajaxConfigHelper({ content }, "PUT"));
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
  return new Promise(async (resolve)=>{
    const response = await fetch("/allproduct");
    const { message, allproduct } = await response.json();
    let newAllproduct = allproduct.map((v)=>{
          v.number = 0
          return v
    })
    dispatch({type: SHOW_PRODUCT,payload: {allproduct:newAllproduct}});
   return resolve(newAllproduct)
  })
  // try {
  //   const response = await fetch("/allproduct");
  //   const { message, allproduct } = await response.json();
  //   allproduct.forEach((v)=>{
  //     v.number = 0
  //   })
  //   dispatch({
  //     type: SHOW_PRODUCT,
  //     payload: {
  //       allproduct,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};



export const ListingCart = (dispatch) => async () => {
  return new Promise(async (resolve)=>{
      const response = await fetch("/cartproduct");
      const { message, curruser } = await response.json();
      dispatch({
        type: GET_CARTINFO,
        payload: {
          curruser,
        },
      });
      return resolve(curruser.Cart)
  })
  // try {
  //   console.log("refresh");
  //   const response = await fetch("/cartproduct");
  //   // const result = await response.json();

  //   const { message, curruser } = await response.json();
  //   dispatch({
  //     type: GET_CARTINFO,
  //     payload: {
  //       curruser,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const addProductdata = (dispatch) => async (content) => {
  return new Promise(async (resolve)=>{
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
    return resolve(newadd)
  })
  // try {
  //   console.log(content);
  //   const response = await fetch("/addproduct", ajaxConfigHelper({ content }));
  //   // const result = await response.json();
  //   const { message, newadd } = await response.json();

  //   dispatch({
  //     type: ADD_PRODUCT,
  //     payload: {
  //       ...newadd,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};


export const addAllproduct = (dispatch) => async (content) => {
  return new Promise(async (resolve)=>{
    console.log(content);
    const response = await fetch("/addAllproduct", ajaxConfigHelper({ content }));
    // const result = await response.json();
    const { message, data } = await response.json();
    console.log(data,'dd')
    // dispatch({
    //   type: ADD_PRODUCT,
    //   payload: {
    //     ...newadd,
    //   },
    // });
    return resolve(data)
  })
  // try {
  //   console.log(content);
  //   const response = await fetch("/addproduct", ajaxConfigHelper({ content }));
  //   // const result = await response.json();
  //   const { message, newadd } = await response.json();

  //   dispatch({
  //     type: ADD_PRODUCT,
  //     payload: {
  //       ...newadd,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const updateAllCart = (dispatch) => async (content) => {
  return new Promise(async (resolve)=>{
    const response = await fetch("/updateAllCart",ajaxConfigHelper({content}));
    console.log(response,'responseresponse')
    const { message, PersonalCart } = await response.json();
    console.log(PersonalCart,'allproduct')
    // let newAllproduct = allproduct.map((v)=>{
    //       v.number = 0
    //       return v
    // })
    // dispatch({type: SHOW_PRODUCT,payload: {allproduct:newAllproduct}});
   return resolve(PersonalCart)
  })
  // try {
  //   const response = await fetch("/allproduct");
  //   const { message, allproduct } = await response.json();
  //   allproduct.forEach((v)=>{
  //     v.number = 0
  //   })
  //   dispatch({
  //     type: SHOW_PRODUCT,
  //     payload: {
  //       allproduct,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const modProduct = (dispatch) => async (content) => {
  return new Promise(async (resolve)=>{
    const response = await fetch("/modProduct",ajaxConfigHelper({ content }, "PUT"));
    const result = await response.json();
    console.log(response,'response')
    const { message, modifiedCount } = await response;
    console.log(modifiedCount,'modifiedCount')
    // dispatch({
    //   type: MOD_PRODUCT,
    //   payload: { ...modifiedCount },
    // });
    return resolve()
  })
  // try {
  //   const response = await fetch("/modProduct",ajaxConfigHelper({ content }, "PUT"));
  //   const result = await response.json();
  //   const { message, modifiedCount } = await response.json();
  //   console.log(modifiedCount,'modifiedCount')
  //   dispatch({
  //     type: MOD_PRODUCT,
  //     payload: { ...modifiedCount },
  //   });
  //   console.log(result);
  // } catch (error) {
  //   console.log(error);
  // }
};

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bp = require("body-parser");

//connect to database
const connectToMongodb = require("./database/connect");
const user = require("./database/model");
const producting = require("./database/product-model");
connectToMongodb();
const maxAge = 3 * 24 * 60 * 60;

const run = async () => {
  const userinfo = await producting.create({
    name: "Apple Watch",
    price: 499.0,
    quantity: 100,
    source:
      "https://s3-alpha-sig.figma.com/img/47f6/da58/232f4414e2420214be9e71f6543bd4f1?Expires=1676246400&Signature=bZEbSGK2JgtyCqbRKC7TEKHzGsGdUmfyXyXts9tUjQoZPjPvSN~qU3d1tk72spXcs2W7ymTGdRTfWrBVXqucYVGUw5Qw8EdZ7mfPkWgqHyJbmgAUoVUaQ~wuGXYYsvwh72kFWT3qjW~tnF7dmMsNbNHjeSmlDMdZhEVr0F-32XRyVxt4hZVjSEVyPpgbu7ZK~C~4rI13fLf5JpHkQcsThjZEQgkrfAfbG7RIxAz~iSbT9JIjRPZdDm3oiq3z2mZFVFaLk5nNXsQijb1X2RVcnaEdnKxIKRF6kVf6Ls6tYHGCsKJMNTxiFSdVJ5-Hp5UMhL8w2OTruerF1DBq4ik1Fg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    id: uuidv4(),
  });
};
// run();
let exits = false;
const check = async () => {
  try {
    const res = await user.where("email").equals("ni");
    const ok = res.id;

    if (res != undefined) {
      exits = true;
    }
  } catch (e) {
    console.log(e.message);
  }
};

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const product = require("./database/product-model");

var app = express();

dotenv.config();

//mock api
const userinfo = [
  { name: "yunhao", password: "123" },
  { name: "yunhao1", password: "12345" },
];
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//get all data
app.get("/alldata", async (req, res) => {
  // res.status(200).json(userinfo);
  res.setHeader("Set-Cookie", "newUser=true");
  res.send("you got it");

  // const userDatabse = await user.find({ email: "test@123" });
  // res.json(userDatabse);
});

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret token", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("./allproduct");
      } else {
        //console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("./allproduct");
  }
}
const createToken = (id) => {
  return jwt.sign({ id }, "secret token", {
    expiresIn: maxAge,
  });
};
let userpart;

//check cuurent user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret token", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        //console.log(decodedToken);
        userpart = await user.findById(decodedToken.id);
        // current=userpart
        // console.log(userpart);
        //res.locals.user = userpart;
        // res.status(201).json({
        //   islogin: true,
        //   loginstatus: "201",
        // });
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

app.get("*", checkUser);

app.post("./token", async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret token", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        // next();
      } else {
        userpart = await user.findById(decodedToken.id);
        res.status(201).json({
          userpart,
        });

        // next();
      }
    });
  } else {
    res.locals.user = null;
    // next();
  }
});

// const auth = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);
//   jwt.verify(token, "secret token", (err, users) => {
//     if (err) return res.sendStatus(403);
//     console.log(users);
//     req.user = users;
//     next();
//   });
// };
// app.get("*", auth);

//add newuser
app.post("/add", async (req, res) => {
  // if (req.body && req.body.name && req.body.password !== undefined) {
  if (req.body !== undefined) {
    const info = new user({
      email: req.body.content.email,
      password: req.body.content.password,
      id: uuidv4(),
    });
    const newadd = await info.save();
    if (info === newadd) {
      res.status(201).json({
        message: "succeed",
        status: "201",
        newadd: {
          email: newadd.email,
          password: newadd.password,
          id: newadd.id,
        },
      });
      return;
    }

    res.status("400").json({
      error: "failed",
      message: "Add data failed",
    });
  }
});

app.put("/userlogout", async (req, res) => {
  //destroy jwt token
  res.cookie("jwt", "", { maxAge: 1 });

  res.status(201).json({
    message: "logout success",
    status: "201",
    signoutStatus: {
      status: true,
    },
  });
});

//check sign in status
app.post("/ifignin", async (req, res) => {
  if (req.body.content != null) {
    const user_email = req.body.content.email;
    const password = req.body.content.password;
    const result = await user
      .where("email")
      .equals(user_email)
      .where("password")
      .equals(password);

    let data = {
      name: result[0].email,
      psw: result[0].password,
    };
    // console.log(result[0]);

    if (result.length != 0) {
      const token = createToken(result[0]._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({
        message: "signed in",
        status: "201",
        accessToken: token,
        signinStatus: {
          status: true,
          iswho: result[0].email,
          product: result[0].Cart,
        },
      });
      return;
    }
    res.status(401).json({
      message: "not signed in",
      status: "401",
      accessToken: null,
      signinStatus: {
        status: false,
      },
    });
  } else {
    res.status(200).json({
      message: "not signed in",
      status: "200",
      accessToken: null,
      signinStatus: {
        status: false,
        iswho: "",
        product: "",
      },
    });
  }
});

// get all product
// app.get("/allproduct", authenticateToken, async (req, res) => {
app.get("/allproduct", async (req, res) => {
  const product_list = await producting.find({});
  res.status(200).json({
    message: "success get all products",
    status: "200",
    allproduct: product_list,
  });
});

//get all personal cart product
app.get("/cartproduct", async (req, res) => {
  const token = req.cookies.jwt;
  // console.log(token);
  if (token) {
    jwt.verify(token, "secret token", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);

        // next();
      } else {
        let userpart = await user.findById(decodedToken.id);
        // console.log(userpart);
        res.status(200).json({
          message: "success get all",
          status: "200",
          curruser: userpart,
        });

        // next();
      }
    });
  } else {
    // console.log("nothing");
    res.status(200).json({
      message: "success log out",
      status: "200",
      curruser: null,
    });
  }
});

//add product
app.post("/addproduct", async (req, res) => {
  if (req.body !== undefined) {
    // console.log(req.body);

    const info = new producting({
      name: req.body.content.name,
      description: req.body.content.description,
      category: req.body.content.category,
      price: req.body.content.price,
      source: req.body.content.source,
      quantity: req.body.content.quantity,
      id: uuidv4(),
    });
    const newadd = await info.save();
    if (info === newadd) {
      res.status(201).json({
        message: "succeed",
        status: "201",
        newadd: {
          name: newadd.name,
          description: newadd.description,
          category: newadd.category,
          price: newadd.price,
          source: newadd.source,
          quantity: newadd.quantity,
          id: newadd.id,
        },
      });
      return;
    }
    res.status("400").json({
      error: "failed",
      message: "Add product failed",
    });
  }
});

//edit
app.put("/modProduct", async (req, res) => {
  if (req.body && req.body.content !== undefined) {
    const id = req.body.content.id;
    const queryResult = await producting.findOne({ id });
    const { modifiedCount } = await queryResult.updateOne({
      name: req.body.content.name,
      price: req.body.content.price,
      description: req.body.content.description,
      category: req.body.content.category,
      quantity: req.body.content.quantity,
      source: req.body.content.source,
    });
    if (modifiedCount) {
      res.status("200").json({
        message: "update succeed",
        modifiedCount: modifiedCount,
      });
      return;
    }
    res.status("404").json({
      message: "update failed",
    });
    return;
  }
  //error handling
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
});

//edit
app.put("/removeCart", async (req, res) => {
  if (req.body && req.body.content !== undefined) {
    const id = req.body.content.user;
    const item = req.body.content.removeitem;

    const queryResult = await user.findOne({ email: id });
    // console.log(queryResult.Cart);
    // queryResult.Cart.splice(0, 1);

    const { modifiedCount } = await queryResult.update({
      $pull: { Cart: { name: item } },
    });
    // console.log(modifiedCount);
    // if (modifiedCount) {
    if (modifiedCount) {
      res.status("200").json({
        message: "update succeed",
        removeCount: queryResult.Cart[0],
      });
      return;
    }
    res.status("404").json({
      message: "update failed",
    });
    return;
  }
  //error handling
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
});

//personal cart update info
app.put("/updateCart", async (req, res) => {
  if (req.body && req.body.content !== undefined) {
    const name = req.body.content.user;

    const cart = req.body.content.cart;

    //const queryResult = await user.findOne({ name });
    const result = await user.where("email").equals(name);
    // console.log(queryResult);

    // console.log(result[0].Cart);
    let exits = false;

    if (result) {
      result[0].Cart.forEach((e) => {
        if (e.name == cart.name) {
          e.number = cart.number;
          exits = true;
          return;
        }
      });
    }

    if (!exits) {
      result[0].Cart.push(cart);
    }

    const { modified } = await result[0].updateOne({
      Cart: result[0].Cart,
    });

    if (modified) {
      res.status("200").json({
        message: "update succeed",
        PersonalCart: result[0].Cart,
      });
      return;
    }

    // res.status("405").json({
    //   message: "update failed",
    // });
    // return;
  }
  //error handling
  // res.status(404).json({
  //   error: "failed",
  //   message: "Input is not valid",
  // });
});
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

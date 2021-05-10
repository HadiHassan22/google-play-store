const express = require("express");
const mongoose = require("mongoose");
const Appuser = require("./models/appuser.js");
const Appitem = require("./models/appitem.js");
const Bookitem = require("./models/bookitem.js");
const Gameitem = require("./models/gameitem.js");
const Movieitem = require("./models/movieitem.js");
const Review = require("./models/review.js");

const app = express();

// connect to mongodb
const dbUri =
  "mongodb+srv://mkhas:y6jselTUg57RbG7K@cmps278finalproj.ttgsu.mongodb.net/cmps278finalproj?retryWrites=true&w=majority";

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
    console.log("listening on port 3000");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//get one user
app.get("/get-user/:id", (req, res) => {
  Appuser.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes

//home page
app.get("/", (req, res) => {
  res.redirect("/all-apps");
});

//about
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/signup", (req, res) => {
  res.render("create", { title: "Sign Up" });
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

const addToWishList = (item) => {
  app.set("wishlist", [...app.get("wishlist"), item]);
  console.log(app.get("wishlist"));
};
// Endpoints

//all users
app.get("/all-users", (req, res) => {
  Appuser.find()
    .sort({ createdAt: -1 }) //sort by descending order (newest to oldest in this case)
    .then((result) => {
      res.render("item", {
        /*title: 'All Users', Appusers: result*/
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Add User
app.post("/signup", (req, res) => {
  const user = new Appuser(req.body); //create user

  user
    .save() //save to db
    .then((result) => {
      app.set("user", result);
      app.set("wishlist", []);
      res.redirect("/all-apps");
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all apps
app.get("/all-apps", (req, res) => {
  Appitem.find()
    .sort({ createdAt: -1 }) //sort by descending order (newest to oldest in this case)
    .then((result) => {
      res.render("index", {
        results: result,
        type: "app",
        user: app.get("user"),
        wishlist: app.get("wishlist"),
        addToWishList: addToWishList,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/wishlist", (req, res) => {
  Appitem.find()
    .sort({ createdAt: -1 }) //sort by descending order (newest to oldest in this case)
    .then((result) => {
      res.render("wishlist", {
        results: result,
        type: "app",
        user: app.get("user"),
        wishlist: app.get("wishlist"),
        addToWishList: addToWishList,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/visited", (req, res) => {
  Appitem.find()
    .sort({ createdAt: -1 }) //sort by descending order (newest to oldest in this case)
    .then((result) => {
      res.render("visited", {
        results: result,
        type: "app",
        user: app.get("user"),
        wishlist: app.get("wishlist"),
        addToWishList: addToWishList,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get one app
app.get("/get-app/:id", (req, res) => {
  const reviews = [];
  Review.findById(req.params.id)
    .then((result) => {
      reviews.push(result);
    })
    .catch((e) => console.log(e));
  Appitem.findById(req.params.id)
    .then((result) => {
      res.render("item", {
        result: result,
        type: "app",
        user: app.get("user"),
        reviews: reviews,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// update app
app.post("/update-app/:id", (req, res) => {
  var newapp = req.body;
  var id = req.params.id;
  Appitem.findByIdAndUpdate(id, newapp).then((result) => {
    res.header("Content-Type", "application/json");
    res.send(result);
  });
});

//get all books
app.get("/all-books", (req, res) => {
  Bookitem.find()
    .sort({ createdAt: -1 }) //sort by descending order (newest to oldest in this case)
    .then((result) => {
      res.render("index", {
        results: result,
        type: "book",
        user: app.get("user"),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get one book
app.get("/get-book/:id", (req, res) => {
  const reviews = [];
  Review.findById(req.params.id)
    .then((result) => {
      reviews.push(result);
    })
    .catch((e) => console.log(e));
  Bookitem.findById(req.params.id)
    .then((result) => {
      res.render("item", {
        result: result,
        type: "book",
        user: app.get("user"),
        reviews: reviews,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all games
app.get("/all-games", (req, res) => {
  Gameitem.find()
    .sort({ createdAt: -1 }) //sort by descending order (newest to oldest in this case)
    .then((result) => {
      res.render("index", {
        results: result,
        type: "game",
        user: app.get("user"),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//get one game
app.get("/get-game/:id", (req, res) => {
  const reviews = [];
  Review.findById(req.params.id)
    .then((result) => {
      reviews.push(result);
    })
    .catch((e) => console.log(e));
  Gameitem.findById(req.params.id)
    .then((result) => {
      res.render("item", {
        result: result,
        type: "game",
        user: app.get("user"),
        reviews: reviews,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all movies
app.get("/all-movies", (req, res) => {
  Movieitem.find()
    .sort({ createdAt: -1 }) //sort by descending order (newest to oldest in this case)
    .then((result) => {
      res.render("index", {
        results: result,
        type: "movie",
        user: app.get("user"),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//get one movie
app.get("/get-movie/:id", (req, res) => {
  const reviews = [];
  Review.findById(req.params.id)
    .then((result) => {
      reviews.push(result);
    })
    .catch((e) => console.log(e));
  Movieitem.findById(req.params.id)
    .then((result) => {
      res.render("item", {
        result: result,
        type: "movie",
        user: app.get("user"),
        reviews: reviews,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//update game
app.get("/update-game/:id", (req, res) => {
  Gameitem.findByIdAndUpdate(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update movie
app.get("/update-movie/:id", (req, res) => {
  Movieitem.findByIdAndUpdate(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update book
app.get("/update-book/:id", (req, res) => {
  Bookitem.findByIdAndUpdate(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

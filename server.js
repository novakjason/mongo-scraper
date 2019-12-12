// required dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// instantiate express app
const app = express();

// set up port to use host's designated port or 3000
const PORT = process.env.PORT || 3000;

// express router
const router = express.Router();

// express middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serving static files
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// routes
require("./routes/routes")(app);

// router middleware
app.use(router);

// deployed database or local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//  connect mongoose to database
mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, error => {
        if (error) {
            console.log(error);
        } else {
            console.log("==> Mongoose connection is successful!");
        }
    }
);

// starting app
app.listen(PORT, () => console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT));
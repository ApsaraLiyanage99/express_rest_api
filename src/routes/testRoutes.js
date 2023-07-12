// initialize express login
const express = require("express");

// import functions that i require to route
const {testFunction} = require("../controllers/testController")

// construct a router by using express
const router = express.Router();

// once router is constructed, we can call specific function, with respect to specific API route
// we can create many routes as wanted according to the functions
// get -> HTTP method that we need to invoke to perform certain functions
// in this case we want to test this API whether working or not, so use get method
router.route("/testFn").get(testFunction);

// export this
module.exports = router;

// now call this function inside our app

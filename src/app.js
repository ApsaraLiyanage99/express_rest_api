const express = require("express"); //initalize express

// import Routes
const testRouter = require("./routes/testRoutes");
const postRouter = require("./routes/postRoutes");

const app = express(); //construct express object

// tell express to consume http request body as a json payload(for post requests)
app.use(express.json()) 

// specify this app to use that route
app.use("/api/v1/test", testRouter);
// complete router/url to call testFunction->  /api/v1/test/testFn

app.use("/api/v1/post", postRouter);

module.exports = app; //export object

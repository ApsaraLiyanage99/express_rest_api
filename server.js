const colors = require("colors");
const dotenv = require("dotenv"); //access environment vaariables using "dotenv" object

//call to the config.env file
// dotenv.config("./config.env") -> this is wrong way
// when you are specifying this configuaration file, it needs to be at json format
dotenv.config({ path: "./config.env" });

//call app.js file
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

//to visualize that server is running or not
const server = app.listen(PORT, () => {
  console.log("Server is running now");
  console.log(`${process.env.NODE_ENV}`); //access environmental variable configuration
  console.log(
    colors.cyan(
      `Server is running now on port ${PORT} as ${process.env.NODE_ENV} mode`
    )
  );
});

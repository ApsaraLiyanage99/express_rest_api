// arrow function method
// when use express, all the functions have these two components which is request and response
// requests -> the requests initialized by the client
// response -> the return results back to the client

const testFunction = (req, res) => {
    res.status(200).json({
        status: "success",
        data: "Its now working"
    })
}
//  data: "" / [] / {}


// function must be exported, therefore other JS files can access the function
module.exports = {testFunction}

// if there one function
// module.exports = func1
// if there are more function
// module.exports = {func1, func2, func3}
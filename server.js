//state that we are using express in this file
//note that we don't have to give it a file path even though it is not a core module because it has been installed into node modules
const express= require("express")
const morgan= require("morgan")


const hostname="localhost"
const port = 3000

//express() returns a express server application that is now accessible under the variable name
const app = express()

//morgan is middleware used to log activity, the dev argument tells morgan function to use the development version
//this will print additional information to the screen.
app.use(morgan("dev"))

//express.static will serve files from the public folder __dirname is a special variable in node
// it will refer to the absolute path in the current directory of the file that it is in.
app.use(express.static(__dirname + "/public"))


//use method can accept a callback function express refers to this as a middleware function.
//middleware functions have access to 3 params, req, res, and next which is a function. 
app.use((req,res)=> 
{
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end("<html><body><h1>This is an Express Server</h1></body></html>")
})

app.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})
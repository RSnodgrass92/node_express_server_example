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

//will parse json data into js properties of the req object so that we may use that data in js
app.use(express.json())

//* ENDPOINTS
//app.all is a catch all for all http verbs use this to set default props for all routing methods
app.all("/campsites",(req,res,next)=> 
{
    res.statusCode= 200
    //indicates we are going to send plain text in the response body
    res.header("Content-Type", "text/plain")
    //sends to the next relevant routing method, if not included would just stop here
    next()
})

app.get("/campsites",(req,res)=>{
    res.end("Will send all the campsites to you")
})

app.post("/campsites", (req,res)=>
{
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`)
})

app.put("/campsites",(req,res)=>{
    res.statusCode = 403; 
    res.end("PUT operation not supported on /campsites")
})

app.delete("/campsites",(req,res)=>{
    res.end("Deleting all campsites")
})

//* ENDPOINTS only within campsites 

app.get("/campsites/:campsiteId", (req,res)=>{
    res.end(`Will send details of the campsite: ${req.params.campsiteId}`)
})

app.post("/campsites/:campsiteId",(req,res)=>{
    res.statusCode= 403
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`)
})

app.put("/campsites/:campsiteId", (req,res)=> {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`)
    res.end(`Will update the campsite: ${req.body.name} 
            with description: ${req.body.description}`)
})

app.delete("/campsites/:campsiteId", (req,res)=>{
    res.end(`Deleting campsite: ${req.params.campsiteId}`)
})

app.delete
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
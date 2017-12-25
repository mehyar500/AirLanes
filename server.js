//Require Deps
const express = require("express")
const next = require("next")
//preparing development environment
const dev = process.env.NODE_ENV !== "production"
//Create new next app
const app = next({dev})
//Assign a variable to the next app request handler method
const handle = app.getRequestHandler()

//preparing the next app with express server
app.prepare()
   .then(() => {
       //New Express Server
       const server = express()

       //Routes
       server.get("/p/:id", (req, res) => {
           const actualPage = "/post"
           const queryParams = { title: req.prams.id }
           app.render(req, res, actualPage, queryParams)
       })

       server.get("*", (req, res) => {
           return handle(req, res)
       })

       //Server is listening on port 3000
       server.listen(3000, (err) => {
           if (err) throw err
           console.log(">Ready on http://localhost:3000");
       })
   })
   .catch((ex) => {
       console.error(ex.stack)
       process.exit(1)
   })




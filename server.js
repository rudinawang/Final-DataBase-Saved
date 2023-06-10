const http = require("http"); // importing http package
const mongoose = require("./app"); // importing Database connecting file

const express = require("express"); // importing express package
const app = express(); // creating reference variable of express frameWork
const server = http.createServer(app); // Creating the Server

// importing the Routing file of the Student and Faculty Schema(Table in the Database)
const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");

// bodyParser is the name of the variable that will be used to reference the body-parser module and its functionalities.
// require("body-parser") is a function in Node.js that is used to import modules. It loads the body-parser module and makes it available for use in your code. The string "body-parser" specifies the name of the module you want to import, in this case, the body-parser middleware.

const bodyParser = require("body-parser");

// Calling Model(Schema) the Entity Student
const student = require("./api/model/student");

// Extract the input data(data are in the raw form and it sets in the data formats, such as JSON, XML, URL-encoded data OR multipart data) fron the incomming http request and analyze that data and processes input data according to a specific set of rules or grammer.

// body-parser is a middleware module commonly used in Express.js applications. It allows you to parse the request body and access the data sent in the request. It can handle various data formats, including JSON, URL-encoded, and multipart data.

// Once imported, you can use the body-parser middleware in your Express.js application to parse incoming request bodies. Here's an example of how you might use it:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//In the first line, app.use("/student", studentRoute);, you are instructing the Express application to use the studentRoute middleware for any requests that match the "/student" route or any subroutes of "/student".

// This means that whenever a request is made to a route that starts with "/student", such as "/student/profile" or "/student/courses", the studentRoute middleware will be invoked to handle that request.

app.use("/student", studentRoute);
app.use("/faculty", facultyRoute);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
  console.log("Render Working");
});

app.use(express.json());

app.post("/", async (req, res) => {
  const formData = req.body;
  const user = await student.create(formData);
  res.render("index");
});

app.use((req, res, next) => {
  res.status(404).json({
    error: "bad request",
  });
});

server.listen(3000, () => {
  console.log("Server is running at port: 3000");
});

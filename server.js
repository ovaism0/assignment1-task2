var express = require('express'),
   path = require('path'),
   app = express();
var mongoose = require("mongoose");
const bodyParser = require('body-parser');
let myProfile;

let accounts = [
   { id: 1, age: 22, name: 'alex', country: 'Australia', gender: 'Male', status: 'Single', occupation: 'Design Intern' },
   { id: 2, age: 26, name: 'sarah', country: 'U.S', gender: 'Female', status: 'Single', occupation: 'Full Stack Developer' },
   { id: 3, age: 19, name: 'jim', country: 'Australia', gender: 'Male', status: 'Single', occupation: 'Student' },
   { id: 4, age: 34, name: 'julie', country: 'U.S', gender: 'Female', status: 'Married', occupation: 'CEO' },
   { id: 5, age: 36, name: 'benji', country: 'U.K', gender: 'Male', status: 'Married', occupation: 'CTO' },
];
app.use("/public", express.static(__dirname + "/public"));

// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GET API to access create profile page
app.get('/', function (request, response) {
   response.sendFile('create-profile.html', { root: __dirname });
});

//POST API for creating profile
app.post('/createProfile', function (req, res) {
   myProfile = req.body;
   res.redirect('/home');
});

//GET API to access create home page. It is called after profile creation
app.get('/home', function (request, response) {
   response.sendFile('home.html', { root: __dirname });
});

//GET API to get all accounts
app.get("/accounts", (req, res) => {
   accounts = [
      { id: 1, age: 22, name: 'alex', country: 'Australia', gender: 'Male', status: 'Single', occupation: 'Design Intern' },
      { id: 2, age: 26, name: 'sarah', country: 'U.S', gender: 'Female', status: 'Single', occupation: 'Full Stack Developer' },
      { id: 3, age: 19, name: 'jim', country: 'Australia', gender: 'Male', status: 'Single', occupation: 'Student' },
      { id: 4, age: 34, name: 'julie', country: 'U.S', gender: 'Female', status: 'Married', occupation: 'CEO' },
      { id: 5, age: 36, name: 'benji', country: 'U.K', gender: 'Male', status: 'Married', occupation: 'CTO' },
   ];
   res.json(accounts);
});

//GET API to get details of the profile created
app.get("/myProfile", (req, res) => {
   res.json(myProfile);
});

//POST API to SUBMIT the disliked profile and remove it from view
app.post("/dislikeProfile", (req, res) => {
   var profileId = req.body.id;
   accounts = accounts.filter(({ id }) => id != profileId);
   res.json(accounts);
});

//POST API to SUBMIT the liked profile and send it back
app.post("/likeProfile", (req, res) => {
   var profileId = req.body.id;
   var matchedProfile = accounts.find(_account => _account.id == profileId);
   res.json(matchedProfile);
});

app.listen(3000, () => {
   console.log("Server running on port 3000");
});

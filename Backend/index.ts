/*
Specification

Routing

This notation -- in front of route means to be implemented

User Related Route
/user/login
Post
/user/logout
Delete
/user/editProfile
Put
/user/register
Post

Timetable Related Route
/timetable/add
Put
/timetable/delete
Put
/timetable
Get

Course Related Route
/course/:classNumber
Get
/course
Get

Reivew Related Route
/review/recent
Get
/review/:professor
Get
/review/:Professor/post
Post
/review/:id
Post - 신고기능
/review/:id
Delete - Admin이 지우기

--Admin Related Route
/admin/addCourse
Post
/admin/course/:classNumber
Put, Delete
/admin/report
Get
admin/review
Delete
*/

import express, { Express, Request, Response } from 'express';
// const session = require('express-session');
import session from 'express-session';
const MongoStore = require('connect-mongo');
import dotenv from 'dotenv';
var cors = require('cors')

// Import basic stuffs
const app: Express = express();
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const port = process.env.PORT || 8080;


// Import User API functions
import UserAPI      from "./API/user/UserAPI";
import TimetableAPI from "./API/timetable/TimetableAPI";
import CourseAPI    from "./API/course/CourseAPI";
import ReviewAPI    from "./API/review/ReviewAPI";

// Import Sessions
app.use(session({
  secret: "hello",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: 'mongodb+srv://ritchiepark6:ROIPYMstXYBvozXd@cse416.xaulrya.mongodb.net/',dbName: "sukoco", expires: 1000 * 60 * 60 * 24}),
  cookie: {maxAge:(3.6e+6)*24}
}))

// Connect DB
const connect = require('./modules/db');
connect()
  .then((db: any) => {
    console.log('Connected to the database');
    
    UserAPI(app, db);

    TimetableAPI(app, db);

    CourseAPI(app, db);

    ReviewAPI(app, db);

    app.get("/professor/:name", async (req, res)=> {
      var prof = await db.collection("professors").findOne({ fullName: req.params.name.replace(/\s/g, '')});
      if (prof) {
        res.status(200).send(prof);
      } else {
        res.status(400).end;
      }
    })

    
    app.listen(port, () => {
      console.log(`HTTP : Express listening on port ${port}`);
    });
  })
  .catch((err: Error) => {
    console.error('Error connecting to the database', err);
  });
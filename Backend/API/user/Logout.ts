import express, { Express, Request, Response } from 'express';
const session = require('express-session');

async function Logout(req: Request, res:Response, db: any) {
  try {
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.send('Logged out successfully');
        }
      })
    } catch (err) {
      console.log("Error on Logout.ts");
      console.log(err)
      res.status(400);
    }
} export default Logout;
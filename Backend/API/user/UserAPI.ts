import { Express, Request, Response } from 'express';

import Logout      from "./Logout";
import Login       from "./Login";
import Register    from "./Register";
import EditProfile from "./EditProfile";

async function UserAPI(app: Express, db: any) {
    app.post(
        '/user/login',
        (req: Request, res: Response) => {Login(req,res,db)}
      );
  
      app.get(
        '/user/logout',
        (req: Request, res: Response) => {Logout(req, res, db)}
      );
  
      app.post(
        '/user/register',
        (req: Request, res: Response) => {Register(req,res,db)}
      );
      
      app.put(
        '/user/editProfile/:email',
        (req: Request,res: Response) => {EditProfile(req,res,db)}
      )

} export default UserAPI;
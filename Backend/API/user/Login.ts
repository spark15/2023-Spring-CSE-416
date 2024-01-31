import { Request, Response } from 'express';


async function Login(req: Request, res: Response, db: any) {
    try {
        const collection = db.collection('users');
        const user = await collection.findOne({email: req.body.email});
        // TODO: implement this for bcrypt
        if (user.pwd == req.body.pwd) {
          req.session.email = req.body.email;
          req.session.firstName = user.firstName;
          req.session.lastName = user.lastName;
          req.session.moderator = user.moderator;
          req.session.save( err => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send(req.session);
            }
          })
        } else {
          res.status(400).send({result: "Not found"})
        }
    } catch (err) {
      console.log("Error on /user/login");
      console.log(err);
        res.send(400);
        
    }
} export default Login;
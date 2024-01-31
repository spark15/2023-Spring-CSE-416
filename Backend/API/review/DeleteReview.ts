import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

async function DeleteReview(req: Request, res: Response, db: any) {

    try {
        var data = req.body._id;
        console.log(data)
        var a = await db.collection('reviews').deleteOne({_id: new ObjectId(data)});
        console.log(a);
        res.status(200).send({result: "Your request has been done"});
    } catch (err) {
        console.log("Error on DeleteReview");
        console.log(err);
    }

} export default DeleteReview;
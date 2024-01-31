import { Request, Response } from 'express';
import { ObjectId } from 'mongodb'

async function PostReview(req: Request, res: Response, db: any) {

    interface Review {
        reviewFor: string,
        relatedCourse: string,
        rating: Array<number>,
        tags: Array<string>,
        sumitter: string,
        dateSumitted: Date,
        comment: string
    }

    try {
        var review = req.body;
        if (!(review.reviewFor && review.relatedCourse && review.rating && review.comment)) {
            res.status(400).send({result: "Not enough Information"})
        }
        var json = {
            reviewFor: new ObjectId(review.reviewFor),
            relatedCourse: review.relatedCourse,
            rating: review.rating,
            tags: review.tags,
            sumitter: "",
            dateSumitted: new Date(),
            comment: review.comment
        }
        var nameReg = new RegExp(".*" +review.reviewFor.replace(/\s/g, "")+ ".*", "i");
        var user = await db.collection("users").findOne({email: review.sumitter})
        json.sumitter = user._id;
        json.rating = [ Number(json.rating)];
        await db.collection("reviews").insertOne(json).catch((err: any) => {console.log(err)});
        var rev = await db.collection("reviews").find({reviewFor: json.reviewFor}).toArray();
        var sum = 0;
        for (var i = 0; i < rev.length; i++) {
            sum += rev[i].rating[0];
        }
        var prof = await db.collection("professors").findOne({_id: json.reviewFor});
        prof.score[0] = (sum/rev.length).toFixed(2);
        await db.collection("professors").updateOne({_id: prof._id}, {$set: {...prof}});
        
        res.status(200).send();
    } catch (err) {
        console.log("Error on /course/:classNumber")
        console.log(err)
        res.status(400).send();
    }

} export default PostReview;
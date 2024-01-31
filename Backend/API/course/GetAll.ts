import { Request, Response } from 'express';

async function GetAll(req: Request, res: Response, db: any) {

    try {
        var classNumber = req.params.classNumber;
        var course = await db.collection("courses").find({});
        res.status(200).send(course);
    } catch (err) {
        console.log("Error on /course/:classNumber")
        console.log(err)
        res.status(400).send();
    }

} export default GetAll;
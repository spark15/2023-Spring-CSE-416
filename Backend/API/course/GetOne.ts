import { Request, Response } from 'express';

async function GetOne(req: Request, res: Response, db: any) {

    try {
        var classNumber = req.params.classNumber;
        var course = await db.collection("courses").findOne({classNumber: Number(classNumber)});
        if (course == null) {
            res.statusMessage = "There is no such course";
            res.status(400).end();
        }
        res.status(200).send(course);
    } catch (err) {
        console.log("Error on /course/:classNumber")
        console.log(err)
        res.status(400).send();
    }

} export default GetOne;
import { Request, Response } from 'express';

async function Get(req: Request, res: Response, db: any) {
    
    try {
        var email = req.params.email;
        var user = await db.collection("users").findOne({email: email});
        var ID = user.timetable;
        var timetable = await db.collection("timetables").findOne({_id: ID});
        var result = []
        for (var i = 0; i < timetable.timetable.length; i++) {
            result.push(await db.collection("courses").findOne({classNumber: timetable.timetable[i]}));
        }
        res.status(200).send(result);
    } catch (err) {
        console.log("Error on /timetable/get")
        console.log(err)
        res.status(400);
    }

} export default Get;
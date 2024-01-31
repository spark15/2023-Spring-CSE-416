import express, { Express, Request, Response } from 'express';

async function Delete(req: Request, res: Response, db: any) {

    try {
        var email = req.params.email;
        var user = await db.collection("users").findOne({email: email});
        var ID = user.timetable;
        var timetable = await db.collection("timetables").findOne({_id: ID});
        if (timetable.timetable.includes(req.body.classNumber)) {
            const index = timetable.timetable.indexOf(req.body.classNumber);
            timetable.timetable.splice(index, 1);
            db.collection("timetables").updateOne({_id: ID}, {$set: {timetable: timetable.timetable}});
            res.status(200).send({result: "Your course is successfully deleted"});
        } else {
            res.status(400).send({result: "The course is already in the timetable"})
        }
    } catch (err) {
        console.log("Error on /timetable/delete");
        console.log(err)
        res.status(400).send();
    }

} export default Delete;
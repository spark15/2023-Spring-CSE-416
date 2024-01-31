import express, { Express, Request, Response } from 'express';

async function Register(req: Request, res: Response, db: any) {
    try {
        const {email, firstName, lastName, pwd} = req.body;
        if (!(email && firstName && lastName && pwd)) {
            res.status(400).send({result: "missing"})
        }
        var same = await db.collection("users").findOne({email: email});
        if (same != null) {
            res.status(400).send({result: "There is an account with same email!"});
        } else {
            var timetable = await db.collection("timetables").insertOne({
                timetable: []
            });
            console.log(timetable)
            var aa = await db.collection("users").insertOne({
                ...req.body,
                timetable: timetable.insertedId,
                moderator: 0,
                chatroom: []
            });

        res.send({result: "good"});
        }
        
    } catch (err) {
        console.log("Error on Register.ts");
        console.log(err);
        res.status(400).send(err);
    }
} export default Register;
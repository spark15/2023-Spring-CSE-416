import express, { Express, Request, Response } from 'express';

async function EditProfile(req: Request, res: Response, db: any) {
    try {
        var data = req.body;
        await db.collection("users").updateOne(
            {email: req.params.email},
            { $set: {
                firstName: data.firstName,
                lastName: data.lastName,
               pwd: data.pwd
                }
            });
        res.status(200).send({result: "Your Request has been done correctly"});
    } catch (err) {
        console.log("Error on EditProfile.ts");
        res.send(400);
    }
} export default EditProfile;
import { Request, Response } from 'express';

async function GetProfessor(req: Request, res: Response, db: any) {

    try {
        var profName = req.params.professor.replace(/\s/g, "");
        
        var nameReg = new RegExp(".*" +profName.replace(/\s/g, "")+ ".*", "i");
        var professor = await db.collection("professors").findOne({fullName: nameReg});
        
        var reviews = await db.collection("reviews").find({reviewFor: professor._id}).sort({dateSumitted: -1}).toArray();
        for (var i = 0; i < reviews.length; i++) {
            var course = await db.collection("courses").findOne({subject: reviews[i].relatedCourse.substring(0,3), CRS: Number(reviews[i].relatedCourse.substring(3,6))});
            var name = course.courseTitle;
            reviews[i] = {
                ...reviews[i],
                name: name
            }
        }

        var obj = {
            professor: professor.firstName + " " + professor.lastName,
            rating: professor.score,
            reviews: reviews
        }

        if (!reviews) {
            res.status(400).send();
        } else {
            console.log(obj);
            res.status(200).send(obj);
        }
    } catch (err) {
        console.log("Error on Get /review/:professor")
        console.log(err)
        res.status(400).send();
    }

} export default GetProfessor;
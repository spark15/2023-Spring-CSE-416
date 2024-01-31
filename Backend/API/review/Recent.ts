import { Request, Response } from 'express';

async function Recent(req: Request, res: Response, db: any) {

    try {
        var course = await db.collection("reviews").find({}).sort({dateSumitted: -1}).toArray();
        var sliced = course.slice(0,5);
        var result = []
        for (var i = 0; i < 5; i++) {
            var professor = await db.collection("professors").findOne({_id: sliced[i].reviewFor});
            var course = await db.collection("courses").findOne({subject: sliced[i].relatedCourse.slice(0, 3), CRS: parseInt(sliced[i].relatedCourse.slice(3,6))});

            result[i] = {
                course: sliced[i].relatedCourse.slice(0,3) + " " + sliced[i].relatedCourse.slice(3,6),
                courseName: course.courseTitle,
                rating: sliced[i].rating[0],
                professor: professor.firstName + " " + professor.lastName,
                comment: sliced[i].comment
            }
        }
        res.status(200).send(result);
    } catch (err) {
        console.log("Error on /review/recent");
        console.log(err)
        res.status(400).send();
    }

} export default Recent;
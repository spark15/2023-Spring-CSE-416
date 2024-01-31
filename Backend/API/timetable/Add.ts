import { Request, Response } from 'express';

function timeRounding(time: string) {
    var arr = time.split(":");
    var arr2 = arr[1].split(" ");
    var hour = parseInt(arr[0]);
    if (arr2[1] === "PM") {
        if (hour !== 12) {
            hour += 12;
        }
    } 
    if (arr2[1] === "AM") {
        if ( hour === 12) {
            hour = 0
        }
    }
    hour *= 3600
    hour += parseInt(arr2[0]) * 60;
    return hour
}

function timeFormat(sch: any) {
    var time = {start: 0, end: 0};
    var day = 0;
    if (sch.days == 'Mon') {
        day += 0;
    } else if (sch.days == 'Tue') {
        day += 1 * 86400;
    } else if (sch.days == 'Wed') {
        day += 2 * 86400;
    } else if (sch.days == 'Thu') {
        day += 3 * 86400;
    } else if (sch.days == 'Fri') {
        day += 4 * 86400;
    } else if (sch.days == 'Sat') {
        day += 5 * 86400;
    } else if (sch.days == 'Sun') {
        day += 6 * 86400;
    } else {
        return {start:0, end:0};
    }

    return {start: day+timeRounding(sch.startTime), end: day+timeRounding(sch.endTime)};
}

function makeList(course: any) {

    var addList = [];
    for (var i = 0; i < course.days.length; i++) {
        addList.push(timeFormat(course.days[i]));
    }

    return addList

}

function compare(one: any, two:any) {

    for (var i = 0; i < one.length; i++) {
        for (var j = 0; j < two.length; j++) {
            if (one[i].end > two[j].start && one[i].end < two[j].end) {
                return false;
            } else if (two[j].end > one[i].start &&  two[j].end < one[i].end)
                return false;
        }
    }
    return true;

}

async function CheckTime(timetable: Array<any>, classNumber: Number, db:any) {

    var add = await db.collection('courses').findOne({classNumber: classNumber});
    var addList = makeList(add);

    for (var i = 0; i < timetable.length; i++) {
        var course = await db.collection('courses').findOne({classNumber: timetable[i]});
        var courList = makeList(course);
        if (!compare(addList, courList)) {
            return false;
        }
    }
    return true;

}

async function Add(req: Request, res: Response, db: any) {

    try {
        var email = req.params.email;
        var user = await db.collection("users").findOne({email: email});
        var ID = user.timetable;
        var timetable = await db.collection("timetables").findOne({_id: ID});
        

        const classNumber = Number(req.body.classNumber);
        var check = await CheckTime(timetable.timetable, classNumber, db);
        var course = await db.collection("courses").findOne({classNumber: classNumber});

        if (!check) {
            res.statusMessage = "There is overlapping course";
            res.status(400).end();
        } else if (course == null) {
            res.statusMessage = "There is no such course";
            res.status(400).end();
        } else if (timetable.timetable.includes(Number(req.body.classNumber))) {
            res.statusMessage = "The course is already in the timetable";
            res.status(400).end();
        } else {
            timetable.timetable.push(Number(req.body.classNumber))
            db.collection("timetables").updateOne({_id: ID}, {$set: {timetable: timetable.timetable}});
            res.status(200).send({result: "Your course is successfully registered"});
        }
    } catch (err) {
        console.log("Error on /timetable/add");
        console.log(err);
        res.status(400).send();
    }

} export default Add;
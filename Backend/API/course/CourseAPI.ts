import express, { Express, Request, Response } from 'express';

import GetOne from './GetOne';
import GetAll from './GetAll';

async function CourseAPI(app: Express, db: any) {

    app.get(
        "/course",
        (req: Request, res: Response) => {GetAll(req, res, db)}
    );

    app.get(
        "/course/:classNumber",
        (req: Request, res: Response) => {GetOne(req, res, db)}
    );

} export default CourseAPI;
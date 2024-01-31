import { Express, Request, Response } from 'express';

import Recent       from './Recent';
// import Report       from './Report';
import PostReview   from './PostReview';
import GetProfessor from "./GetProfessor";
import DeleteReview from './DeleteReview';

async function TimetableAPI(app: Express, db: any) {

    app.get(
        '/review/recent',
        (req: Request, res: Response) => {Recent(req, res, db)}
    );

    app.get(
        '/review/:professor',
        (req: Request, res: Response) => {GetProfessor(req, res, db)}
    );

    app.post(
        '/review/post',
        (req: Request, res: Response) => {PostReview(req, res, db)}
    );

    app.delete(
        '/review',
        (req: Request, res: Response) => {DeleteReview(req,res,db)}
    );

    // app.post(
    //     '/review/:id',
    //     (req,res) => {Report(req,res,db)}
    // );
    
} export default TimetableAPI;
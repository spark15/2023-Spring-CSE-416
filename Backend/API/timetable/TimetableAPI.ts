import { Express, Request, Response } from 'express';

import Add      from './Add';
import Delete   from './Delete';
import Get      from './Get';

async function TimetableAPI(app: Express, db: any) {

    app.get(
        '/timetable/:email',
        (req: Request, res: Response) => {Get(req, res, db)}
    );

    app.put(
        '/timetable/add/:email',
        (req: Request, res: Response) => {Add(req, res, db)}
    );

    app.put(
        '/timetable/delete/:email',
        (req: Request, res: Response) => {Delete(req, res, db)}
    );
    
} export default TimetableAPI;
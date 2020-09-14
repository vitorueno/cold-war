import express from "express";

import ChapterController from './controllers/ChapterController';
import MissionController from './controllers/MissionController';
import ReportController from './controllers/ReportController';
import NewspaperController from './controllers/NewspaperController';

const routes = express.Router();
const chapterController = new ChapterController();
const missionController = new MissionController();
const reportController = new ReportController();
const newspaperController = new NewspaperController();


routes.get('/', (request, response) => {
    return response.json({ message: 'Hello world' })
});

routes.get('/chapters', chapterController.index);
routes.get('/chapters/:id', chapterController.show);
routes.post('/chapters', chapterController.create);

routes.get('/missions', missionController.index)
routes.get('/missions/:id', missionController.show);
routes.post('/missions', missionController.create);

routes.get('/reports', reportController.index);
routes.get('/reports/:id', reportController.show);
routes.post('/reports', reportController.create);

routes.get('/newspapers', newspaperController.index);
routes.get('/newspapers/:id', newspaperController.show);
routes.post('/newspapers', newspaperController.create);

export default routes;
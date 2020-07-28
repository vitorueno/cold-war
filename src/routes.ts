import express from "express";

import ChapterController from './controllers/ChapterController';
import MissionController from './controllers/MissionController';


const routes = express.Router();
const chapterController = new ChapterController();
const missionController = new MissionController();


routes.get('/', (request, response) => {
    return response.json({ message: 'Hello world' })
});

routes.get('/chapters', chapterController.index);
routes.get('/chapters/:id', chapterController.show);
routes.post('/chapters', chapterController.create);

routes.get('/missions', missionController.index)
routes.get('/missions/:id', missionController.show);
routes.post('/missions', missionController.create);

export default routes;
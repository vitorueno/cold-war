import express from "express";

import ChapterController from './controllers/ChapterController';

const routes = express.Router();
const chapterController = new ChapterController();


routes.get('/', (request, response) => {
    return response.json({ message: 'Hello world' })
});

routes.get('/chapters', chapterController.index);
routes.get('/chapters/:id', chapterController.show);
routes.post('/chapters', chapterController.create);

export default routes;
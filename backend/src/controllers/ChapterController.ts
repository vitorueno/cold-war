import { Request, Response } from 'express';
import knex from '../database/connection';

class ChapterController {
    async index(request: Request, response: Response){
        const chapters = await knex('chapter').select('*');
        return response.json(chapters);
    }

    async show(request: Request, response: Response){
        const { id } = request.params;
        const chapter = await knex('chapter').where('id',id).first();

        if (!chapter) {
            return response.status(400).json({ message: "chapter not found" });
        } 

        return response.json(chapter);
    }

    async create(request: Request, response: Response) {
        const { name, country } = request.body;
        const newChapter = {name, country};
        
        const trx = await knex.transaction();
        const chapterId = await trx('chapter').insert(newChapter);
        await trx.commit();

        return response.json({
            id: chapterId[0],
            ...newChapter
        })
    }
}

export default ChapterController;
import { Request, Response } from 'express';
import knex from '../database/connection';

class NewspaperController {
    async index(request: Request, response: Response) {
        const { chapterId } = request.query;
        if (!chapterId) {
            const newspapers = await knex('newspaper').select('*');
            return response.json(newspapers);
        } else {
            const newspapers = await knex('newspaper').where('id_chapter', Number(chapterId)).select('*');
            return response.json(newspapers);
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        
        const newspaper = await knex('newspaper').where('id',id).first();

        if (!newspaper) {
            return response.status(400).json({ message: "newspaper not found" });
        }

        return response.json(newspaper);
    }

    async create(request: Request, response: Response) {
        const { 
            headline, 
            subtitle,
            text,
            image_path,
            id_chapter
        } = request.body;

        const newNewspaper = {
            headline,
            subtitle,
            text,
            image_path,
            id_chapter
        }

        const trx = await knex.transaction();
        const newspaperId = await trx('newspaper').insert(newNewspaper);
        await trx.commit();

        return response.json({
            id: newspaperId[0],
            ...newNewspaper
        });
    }
}

export default NewspaperController;
import { Request, Response } from 'express';
import knex from '../database/connection';

class MissionController {
    async index (request: Request, response: Response) {
        const { chapterId } = request.query;
        if (!chapterId) {
            const missions = await knex('mission').select('*');
            return response.json(missions);
        } else {
            const missions = await knex('mission').where('id_chapter',Number(chapterId)).select('*');
            return response.json(missions);
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const mission = await knex('mission').where('id',id).first();

        if (!mission) {
            return response.status(400).json({ message: "mission not found" });
        } 

        return response.json(mission);
    }

    async create(request: Request, response: Response) {
        const { 
            title,
            description,
            text_button_1,
            text_button_2,
            href_button_1,
            href_button_2,
            id_chapter,
        } = request.body;

        const newMission =  { 
            title,
            description,
            text_button_1,
            text_button_2,
            href_button_1,
            href_button_2,
            id_chapter
        }

        const trx = await knex.transaction();
        const missionId = await trx('mission').insert(newMission);
        await trx.commit();

        return response.json({
            id: missionId[0],
            ...newMission
        })

    }
}

export default MissionController;
import { Request, Response } from 'express';
import knex from '../database/connection';

class ReportController {
    async index(request: Request, response: Response) {
        const { chapterId } = request.query;
        if (!chapterId) {
            const reports = await knex('report').select('*');
            return response.json(reports);
        } else{
            const missions = await knex('mission').where('id_chapter',Number(chapterId)).select('*');
            return response.json(missions);
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const report = await knex('report').where('id', id).first();
        return response.json(report);
    }

    async create(request: Request, response: Response) {
        const {
            title,
            description,
            id_chapter
        } = request.body;

        const newReport = { title, description, id_chapter }

        const trx = await knex.transaction();
        const reportId = await trx('report').insert(newReport);
        await trx.commit();

        return response.json({
            id: reportId[0],
            ...newReport
        })
    }
}

export default ReportController;
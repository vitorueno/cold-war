import { Request, Response } from 'express';
import knex from '../database/connection';

class ReportController {
    async index(request: Request, response: Response) {
        const { chapterId } = request.query;
        if (!chapterId) {
            const reports = await knex('report').select('*');
            return response.json(reports);
        } else {
            const reports = await knex('mission').where('id_chapter',Number(chapterId)).select('*');
            return response.json(reports);
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const report    = await knex('report').where('id', id).first();

        if (!report) {
            return response.status(400).json({ message: "report not found" });
        } 

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
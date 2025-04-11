import { Request, Response } from 'express';
import Tag from '../../models/tag/tag.models';
import { ITagResponse } from '../../interface/tag.interface';

export default class TagController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;

            if (!name) {
                res.status(400).json({ error: 'Name is required' });
                return;
            }

            const existingTag = await Tag.findOne({ where: { name } });
            if (existingTag) {
                res.status(409).json({ error: 'Tag already exists' });
                return;
            }

            const newTag = await Tag.create({ name });

            const tagResponse: ITagResponse = {
                id: newTag.id,
                name: newTag.name,
                createdAt: newTag.createdAt,
                updatedAt: newTag.updatedAt
            };

            res.status(201).json(tagResponse);
        } catch (error) {
            console.error('Error creating tag:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { limit = 10, offset = 0 } = req.query;

            const tags = await Tag.findAll({
                limit: Number(limit),
                offset: Number(offset),
            });

            res.json(tags as ITagResponse[]);
        } catch (error) {
            console.error('Error fetching tags:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const tag = await Tag.findByPk(req.params.id);

            if (!tag) {
                res.status(404).json({ error: 'Tag not found' });
                return;
            }

            res.json(tag as ITagResponse);
        } catch (error) {
            console.error('Error fetching tag:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const tag = await Tag.findByPk(id);
            if (!tag) {
                res.status(404).json({ error: 'Tag not found' });
                return;
            }

            const { name } = req.body;
            if (!name) {
                res.status(400).json({ error: 'Name is required' });
                return;
            }

            const existingTag = await Tag.findOne({ where: { name } });
            if (existingTag && existingTag.id !== tag.id) {
                res.status(409).json({ error: 'Tag name already exists' });
                return;
            }

            await tag.update({ name });

            res.json(tag as ITagResponse);
        } catch (error) {
            console.error('Error updating tag:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const tag = await Tag.findByPk(req.params.id);
            if (!tag) {
                res.status(404).json({ error: 'Tag not found' });
                return;
            }

            await tag.destroy();
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting tag:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
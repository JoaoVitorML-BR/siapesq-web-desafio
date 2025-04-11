import { Request, Response } from 'express';
import Item from '../../models/item/item.models';
import User from '../../models/user/user.models';
import Tag from '../../models/tag/tag.models';
import ItemUser from '../../models/item/item_user.models';
import ItemTag from '../../models/item/item_tag.models';
import { IItemResponse } from '../../interface/item.interface';
import { uploadImage } from '../../utils/image.utils';
import path from 'path';
import fs from 'fs';

export default class ItemController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, description } = req.body;

            const image_url = req.file ? await uploadImage(req.file) : null;

            const newItem = await Item.create({
                name,
                description,
                image_url: image_url || ''
            });

            res.status(201).json(newItem);
        } catch (error) {
            console.error('Error creating item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { limit = 10, offset = 0 } = req.query;

            const items = await Item.findAll({
                limit: Number(limit),
                offset: Number(offset),
                attributes: ['id', 'name', 'description', 'image_url', 'createdAt', 'updatedAt']
            });

            res.json(items);
        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const item = await Item.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        as: 'users',
                        attributes: ['id', 'username'],
                        through: { attributes: ['relation_type'] }
                    },
                    {
                        model: Tag,
                        as: 'tags',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }
                ]
            });

            if (!item) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }

            const response: IItemResponse = {
                id: item.id,
                name: item.name,
                description: item.description,
                image_url: item.image_url,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                users: item.users?.map(user => ({
                    id: user.id,
                    username: user.username,
                    relation_type: (user as any).ItemUser?.relation_type
                })),
                tags: item.tags?.map(tag => ({
                    id: tag.id,
                    name: tag.name
                }))
            };
            res.json(response);
        } catch (error) {
            console.error('Error fetching item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        try {
            const item = await Item.findByPk(req.params.id);
            if (!item) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }

            const { name, description } = req.body;

            let image_url = item.image_url;
            if (req.file) {
                if (item.image_url) {
                    const oldImagePath = path.join(__dirname, '../../../uploads', path.basename(item.image_url));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                image_url = await uploadImage(req.file);
            }

            const updatedItem = await item.update({
                name: name || item.name,
                description: description || item.description,
                image_url
            });

            res.json(updatedItem);

        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const item = await Item.findByPk(req.params.id);
            if (!item) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }

            if (item.image_url) {
                const imagePath = path.join(__dirname, '../../../uploads', path.basename(item.image_url));
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await ItemUser.destroy({ where: { item_id: item.id } });
            await ItemTag.destroy({ where: { item_id: item.id } });

            await item.destroy();

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
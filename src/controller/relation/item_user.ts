import { Request, Response } from 'express';

import Item from "../../models/item/item.models";
import User from "../../models/user/user.models";
import ItemUser from '../../models/item/item_user.models';

export default class RelationItemUserController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { item_id, user_id } = req.params;
            const { relation_type } = req.body;

            if (!['CREATOR', 'RECEIVER'].includes(relation_type)) {
                res.status(400).json({
                    error: "Type relation invalid. try 'CREATOR' or 'RECEIVER'"
                });
                return;
            }

            const [userExists, itemExists] = await Promise.all([
                User.findByPk(user_id),
                Item.findByPk(item_id)
            ]);

            if (!userExists || !itemExists) {
                res.status(404).json({
                    error: !userExists ? 'User not found' : 'Item not found'
                });
                return;
            }

            const existingRelation = await ItemUser.findOne({
                where: {
                    user_id: user_id,
                    item_id: item_id
                }
            });

            if (existingRelation) {
                res.status(409).json({
                    error: 'Relation already exists',
                    existing_relation: existingRelation
                });
                return;
            }

            const newRelation = await ItemUser.create({
                user_id: user_id,
                item_id: item_id,
                relation_type
            });

            res.status(201).json({
                message: 'Relation created successfully',
                data: newRelation
            });

        } catch (error) {
            console.error('Error in create:', error);
            res.status(500).json({
                error: 'Error creating relation',
                details: error instanceof Error ? error.message : 'Error unknown'
            });
        }
    }

    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const relations = await ItemUser.findAll();
            res.json(relations);
        } catch (error) {
            console.error('Error fetching all relations:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getRelationById(req: Request, res: Response): Promise<void> {
        try {
            const { item_id, user_id } = req.params;

            const relation = await ItemUser.findOne({
                where: {
                    item_id,
                    user_id
                }
            });

            if (!relation) {
                res.status(404).json({ error: 'Relation not found' });
                return;
            }

            res.json(relation);
        } catch (error) {
            console.error('Error fetching relation:', error);
            res.status(500).json({
                error: 'Error fetching relation',
                details: error instanceof Error ? error.message : 'Erro unknown'
            });
        }
    }
}
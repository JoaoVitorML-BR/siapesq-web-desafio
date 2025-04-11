import { Request, Response } from 'express';
import ItemTag from "../../models/item/item_tag.models";
import Tag from '../../models/tag/tag.models';
import Item from '../../models/item/item.models';
import { isUUID } from 'validator';

export default class RelationItemTagController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { item_id, tag_id } = req.params;

            if (!isUUID(item_id)) {
                res.status(400).json({ error: 'ID item invalid!' });
                return;
            }
            if (!isUUID(tag_id)) {
                res.status(400).json({ error: 'ID tag invalid!' });
                return;
            }

            const [tagExists, itemExists] = await Promise.all([
                Tag.findByPk(tag_id),
                Item.findByPk(item_id)
            ]);

            if (!tagExists || !itemExists) {
                res.status(404).json({
                    error: !tagExists ? 'Tag not found' : 'Item not found'
                });
                return;
            }

            const existingRelation = await ItemTag.findOne({
                where: { tag_id, item_id }
            });

            if (existingRelation) {
                res.status(409).json({
                    error: 'Relation already exists',
                    existing_relation: existingRelation
                });
                return;
            }

            const newRelation = await ItemTag.create({
                tag_id,
                item_id
            });

            res.status(201).json({
                message: 'Tag linked to item successfully',
                data: newRelation
            });

        } catch (error) {
            console.error('Error creating item-tag relation:', error);
            res.status(500).json({
                error: 'Error creating relation',
                details: error instanceof Error ? error.message : 'Error unknown'
            });
        }
    }

    static async getRelationById(req: Request, res: Response): Promise<void> {
        try {
            const { item_id, tag_id } = req.params;

            const relation = await ItemTag.findOne({
                where: { item_id, tag_id },
                include: [
                    { model: Item, attributes: ['id', 'name'] },
                    { model: Tag, attributes: ['id', 'name'] }
                ]
            });

            if (!relation) {
                res.status(404).json({ error: 'Relation not found' });
                return;
            }

            res.json({
                item: relation.get('Item'),
                tag: relation.get('Tag'),
                created_at: relation.createdAt
            });

        } catch (error) {
            console.error('Error fetching item-tag relation:', error);
            res.status(500).json({ 
                error: 'Error fetching relation',
                details: error instanceof Error ? error.message : 'Erro unknown'
            });
        }
    }

    static async getAll(_: Request, res: Response): Promise<void> {
        try {
            const relations = await ItemTag.findAll({
                include: [
                    { model: Item, attributes: ['id', 'name'] },
                    { model: Tag, attributes: ['id', 'name'] }
                ],
                order: [['createdAt', 'DESC']]
            });

            res.json(relations.map(rel => ({
                item: rel.get('Item'),
                tag: rel.get('Tag'),
                created_at: rel.createdAt
            })));

        } catch (error) {
            console.error('Error fetching all relations:', error);
            res.status(500).json({ 
                error: 'Error fetching relations',
                details: error instanceof Error ? error.message : 'Erro unknown'
            });
        }
    }
}
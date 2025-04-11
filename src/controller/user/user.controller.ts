import { Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../../models/user/user.models';
import { IUserResponse, IUserCreate } from '../../interface/user.interface';

export default class UserController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const dataValues: IUserCreate = req.body;

            if (!dataValues.email || !dataValues.password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }

            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: dataValues.email },
                        { username: dataValues.username }
                    ]
                }
            });

            if (existingUser) {
                res.status(409).json({ error: 'User already exists' });
                return;
            }

            const newUser = await User.create(dataValues);

            const userResponse: IUserResponse = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
            };

            res.status(201).json(userResponse);
            return;
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }

    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { limit = 10, offset = 0 } = req.query;

            const users = await User.findAll({
                limit: Number(limit),
                offset: Number(offset),
                attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'createdAt'],
            });

            res.json(users as IUserResponse[]);
            return;
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'createdAt'],
            });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.json(user as IUserResponse);
            return;
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const dataValues: IUserCreate = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            await user.update(dataValues);

            const updatedUser: IUserResponse = {
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            };

            res.json(updatedUser);
            return;
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            await user.destroy();

            res.status(204).send();
            return;
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }
}

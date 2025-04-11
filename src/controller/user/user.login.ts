import { Request, Response } from 'express';
import User from '../../models/user/user.models';
import jwt from 'jsonwebtoken';
import { IUserResponse } from '../../interface/user.interface';

export default class UserLoginController {
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }

            const user = await User.findOne({
                where: { email },
                attributes: ['id', 'username', 'email', 'password', 'first_name', 'last_name'],
            });

            if (!user) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                { 
                    id: user.id,
                    email: user.email,
                    username: user.username
                }, 
                process.env.JWT_SECRET as string, 
                { expiresIn: '1h' }
            );

            const userResponse: IUserResponse = {
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            };

            res.json({ 
                user: userResponse,
                token 
            });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ 
                error: 'Internal server error',
                details: error instanceof Error ? error.message : undefined
            });
        }
    }
}
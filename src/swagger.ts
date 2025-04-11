import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { LoginRequestSchema, LoginResponseSchema, UserResponseSchema, UserSchema } from './schema/user.schema';
import { TagResponseSchema, TagSchema } from './schema/tag.schema';

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuários',
            version: '1.0.0',
            description: 'API para gerenciamento de usuários',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                LoginRequest: LoginRequestSchema,
                LoginResponse: LoginResponseSchema,
                User: UserSchema,
                UserResponse: UserResponseSchema,
                Tag: TagSchema,
                TagResponse: TagResponseSchema,

            }
        }
    },
    apis: [
        path.join(__dirname, './routers/**/*.ts'),
        path.join(__dirname, './routers/**/*.js')
    ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
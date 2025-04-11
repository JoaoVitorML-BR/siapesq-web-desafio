export const UserSchema = {
    type: 'object',
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        username: { type: 'string' },
        password: { type: 'string', format: 'password' },
    },
};

export const UserResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
    },
};

export const LoginRequestSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email',
            description: 'O email do usuário',
        },
        password: {
            type: 'string',
            description: 'A senha do usuário',
        },
    },
    required: ['email', 'password'],
};

export const LoginResponseSchema = {
    type: 'object',
    properties: {
        user: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
            },
        },
        token: {
            type: 'string',
            description: 'Token JWT gerado para autenticação',
        },
    },
};

export const ItemSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        image_url: { type: 'string', format: 'uri' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
};

export const ItemCreateSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        image_url: { type: 'string', format: 'uri' },
    },
    required: ['name', 'description'],
};


export const ItemResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        image_url: { type: 'string', format: 'uri' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        users: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    username: { type: 'string' },
                    relation_type: { type: 'string', enum: ['CREATOR', 'RECEIVER'] },
                },
            },
        },
        tags: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                },
            },
        },
    },
};

export const ItemUserSchema = {
    type: 'object',
    properties: {
        user_id: { type: 'string', format: 'uuid' },
        item_id: { type: 'string', format: 'uuid' },
        relation_type: { type: 'string', enum: ['CREATOR', 'RECEIVER'] },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
};

export const ItemTagSchema = {
    type: 'object',
    properties: {
        item_id: { type: 'string', format: 'uuid' },
        tag_id: { type: 'string', format: 'uuid' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
};


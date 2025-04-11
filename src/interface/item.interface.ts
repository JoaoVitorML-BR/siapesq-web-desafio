import { Model } from 'sequelize';
import { IUser } from './user.interface';
import { ITag } from './tag.interface';

export interface IItemAttributes {
    id?: string;
    name: string;
    description: string;
    image_url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IItem extends IItemAttributes, Model<IItemAttributes> {
    users?: IUser[];
    tags?: ITag[];
}

export interface IItemCreate {
    name: string;
    description: string;
    image_url?: string;
}

export interface IItemResponse extends IItemAttributes {
    users?: Array<{
        id: string;
        username: string;
        relation_type: 'CREATOR' | 'RECEIVER';
    }>;
    tags?: Array<{
        id: string;
        name: string;
    }>;
}

export interface IItemUserAttributes {
    user_id: string;
    item_id: string;
    relation_type: 'CREATOR' | 'RECEIVER';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IItemUser extends IItemUserAttributes, Model<IItemUserAttributes> { }

export interface ITagCreate {
    name: string;
}

export interface IItemTagAttributes {
    item_id: string;
    tag_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IItemTag extends IItemTagAttributes, Model<IItemTagAttributes> { }
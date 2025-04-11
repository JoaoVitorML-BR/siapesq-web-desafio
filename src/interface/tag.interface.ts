import { Model } from 'sequelize';
import { IItem } from './item.interface';

export interface ITagAttributes {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITag extends ITagAttributes, Model<ITagAttributes> {
    items?: IItem[];
}

export interface ITagResponse extends ITagAttributes {
    items?: Array<{
        id: string;
        name: string;
    }>;
}
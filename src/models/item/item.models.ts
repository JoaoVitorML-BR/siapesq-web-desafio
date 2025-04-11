import { DataTypes, Model } from "sequelize";
import sequelize from '../../config/database.config';
import { IItem, IItemAttributes } from "../../interface/item.interface";
import User from "../user/user.models";

class Item extends Model<IItemAttributes, IItemAttributes> implements IItem {
    declare id: string;
    declare name: string;
    declare description: string;
    declare image_url: string;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare users?: User[];
    declare tags?: any[];
}

Item.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: "Item",
        tableName: "items",
        timestamps: true,
    }
);

export default Item;
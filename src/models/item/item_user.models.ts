import { DataTypes, Model } from "sequelize";
import sequelize from '../../config/database.config';
import User from "../user/user.models";
import Item from "./item.models";

interface ItemUserAttributes {
    user_id: string;
    item_id: string;
    relation_type: 'CREATOR' | 'RECEIVER';
}

class ItemUser extends Model<ItemUserAttributes> implements ItemUserAttributes {
    declare user_id: string;
    declare item_id: string;
    declare relation_type: 'CREATOR' | 'RECEIVER';
}

ItemUser.init(
    {
        user_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        item_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            references: {
                model: Item,
                key: 'id'
            }
        },
        relation_type: {
            type: DataTypes.ENUM('CREATOR', 'RECEIVER'),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "ItemUser",
        tableName: "item_user",
        timestamps: true,
    }
);

User.belongsToMany(Item, {
    through: ItemUser,
    foreignKey: 'user_id',
    otherKey: 'item_id',
    as: 'items'
});

Item.belongsToMany(User, {
    through: ItemUser,
    foreignKey: 'item_id',
    otherKey: 'user_id',
    as: 'users'
});

ItemUser.belongsTo(User, { foreignKey: 'user_id' });
ItemUser.belongsTo(Item, { foreignKey: 'item_id' });

export default ItemUser;
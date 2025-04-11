import { DataTypes, Model } from "sequelize";
import sequelize from '../../config/database.config';
import { IItemTag, IItemTagAttributes } from "../../interface/item.interface";
import Item from "../item/item.models";
import Tag from "../tag/tag.models";

class ItemTag extends Model<IItemTagAttributes, IItemTagAttributes> implements IItemTag {
    declare item_id: string;
    declare tag_id: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

ItemTag.init(
    {
        item_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Item,
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Tag,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: "ItemTag",
        tableName: "item_tag",
        timestamps: true,
    }
);

Item.belongsToMany(Tag, {
    through: ItemTag,
    foreignKey: 'item_id',
    otherKey: 'tag_id',
    as: 'tags'
});

Tag.belongsToMany(Item, {
    through: ItemTag,
    foreignKey: 'tag_id',
    otherKey: 'item_id',
    as: 'items'
});

ItemTag.belongsTo(Item, { foreignKey: 'item_id' });
ItemTag.belongsTo(Tag, { foreignKey: 'tag_id' });

export default ItemTag;
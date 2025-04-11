import { DataTypes, Model } from "sequelize";
import sequelize from '../../config/database.config';
import { ITag, ITagAttributes } from "../../interface/tag.interface";

class Tag extends Model<ITagAttributes, ITagAttributes> implements ITag {
    declare id: string;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Tag.init(
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
            unique: true
        }
    },
    {
        sequelize,
        modelName: "Tag",
        tableName: "tags",
        timestamps: true,
    }
);

export default Tag;

import Server from "../server/server";
import sequelize from "./database.config";

export async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await sequelize.sync({ force: false });
        console.log('Database synchronized');

        Server();
    } catch (error) {
        console.error('Unable to sync database:', error);
        process.exit(1);
    }
}
import "dotenv/config"
import { Sequelize } from "sequelize"


const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, {
        dialect: 'mysql',
        port: parseInt(process.env.MYSQL_PORT)
    }
)

export default sequelize;
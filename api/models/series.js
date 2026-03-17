import { DataTypes , Model } from "sequelize";
import sequelize from "../db.js";

class Series extends Model {}

Series.init(
    {
        id: {
            primaryKey: true, 
            autoIncrement: true, 
            field: "id",
            type: DataTypes.INTEGER
        },
        titulo: {
            field: "titulo", 
            type: DataTypes.TEXT, 
            allowNull: false,
        },
        plataforma: {
            field: "plataforma",
            allowNull: false, 
            type: DataTypes.TEXT
        }
    },
    {
        sequelize, 
        modelName: "Series",
        tableName: "Series",
        timestamps: false,
    }
);
/*
Series.hasMany(Temporadas, {
    as: "temporadas",
    foreignKey: "idSerie"
})*/

export default Series;
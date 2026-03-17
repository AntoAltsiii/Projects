    import { DataTypes , Model } from "sequelize";
    import sequelize from "../db.js";
    import Series from "./series.js"

    class Temporadas extends Model {}

    Temporadas.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true, 
                autoIncrement: true,
                field: "id"
            },
            idSerie: {
                type: DataTypes.INTEGER,
                allowNull: false, 
                field: "idSerie"
            },
            numero: {
                type: DataTypes.INTEGER,
                allowNull: false, 
                field: "numero"
            },
            episodios: {
                type: DataTypes.INTEGER,
                allowNull: false, 
                field: "episodios"
            },
            anioEstreno: {
                type: DataTypes.INTEGER,
                allowNull: false, 
                field: "anioEstreno"
            },
            genero: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: "genero"
            },
            creador: {
                type: DataTypes.TEXT, 
                allowNull: false, 
                field: "creador"
            }
        },
        {
            sequelize,
            modelName: "Temporadas",
            tableName: "Temporadas",
            timestamps: false
        }
    );
    Temporadas.belongsTo(Series, {
        as: "series", //as es el alias que pongo para poder acceder a la tabla de series
        foreignKey: "idSerie"
    });

    export default Temporadas;
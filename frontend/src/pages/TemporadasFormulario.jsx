import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import seriesServices from "../services/series.services";
import temporadasService from "../services/temporadas.services.js"
import temporadasServices from "../services/temporadas.services.js";



const TemporadasFormulario = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [series,setSerie] = useState([]);
    const {id} = useParams()
    const [editando, setEditando] = useState(false);
    const [genero, setGenero] = useState([]);
    const navigate = useNavigate()



    const cargarSeries = async () => {
        const series = await seriesServices.obtenerTodos()
        setSerie(series);
    }

    const cargarGeneros = async () => {
        const generos = await temporadasService.obtenerGeneros();
        setGenero(generos)
    }

    const onSubmit = async (data) => {
        if (id) {
            setEditando(true), 
            await temporadasServices.actualizar(id, data)
        } else {
            setEditando(false),
            await temporadasService.crear(data);
        }
        navigate("/temporadas/mostrar");
    }

    useEffect(()=> {
        if (id) {
            setEditando(true)
            cargarSeries(),
            cargarGeneros(),

             temporadasService.obtenerPorId(id).then((data)=>{
            Object.keys(data).forEach((key)=>{
                setValue(key, data[key]);
            })
        })
        } else {
            setEditando(false);
            cargarSeries();
            cargarGeneros();
        }
    }, [id, setValue]) // q se ejecute o vuelva a cargar o renderizar cuando el id, o el setValue cambien...


    return (
        <div className="temporadas-form-page container my-4">
            <h2 className="mb-4">Formulario de Temporadas</h2>
            <form onSubmit={handleSubmit(onSubmit)}className="row g-3 mb-4">
                <div className="col-md-4">
                    <select {...register("idSerie", {required: true})}
                    >   
                    {series.map((s)=>(
                        <option key={s.id} value={s.id}>{s.titulo}</option> //asi cargo los valores de las platafomas, obtengo las plataformas del back con 
                    ))} {/* ACA EL VALUE Q TOMA ES EL ID POR ESO CUANDO BUCSA ESPERA EL ID, ADEMAS DE Q ESO ECESITA EL BACK APRA BUCCAR O DEFINIR SI EXISTE LA PLAATFORMA*/}
                    </select>
                </div>
                {errors.idSerie && (<span className ="text-danger">Campo obligatorio</span>)}
                <div className="col-md-4">
                    <input {...register("numero", { required: true, min: 1, valueAsNumber: true })} 
                    type="number" 
                    className="form-control" 
                    placeholder="numero de la temporada" 
                /> 
                {errors.numero && (<span className="text-danger">Campo obligatorio y debe ser mayor a cero</span>)}
                </div>
                <div className="col-md-4">
                    <input {...register("episodios", { required: true, min: 1, valueAsNumber: true })} 
                    type="number" 
                    className="form-control" 
                    placeholder="cantidad de episodios" 
                /> 
                {errors.episodios && (<span className="text-danger">Campo obligatorio y debe ser mayor a cero</span>)}
                </div>
                <div className="col-md-4">
                    <input {...register("anioEstreno", { required: true, 
                            min: 1900,
                            max: new Date().getFullYear()
                        }
                    )}
                    type="number" 
                    className="form-control" 
                    placeholder="año de estreno" 
                /> 
                {errors.anioEstreno && (
                    <small className="text-danger">El año debe ser mayor a 1900 y menor al año actual</small>
                    )}
                </div>
                <div className="col-md-4">
                      <select {...register("genero", {required: true})}
                    >   
                    {genero.map((g, index)=>(
                        <option key={index} value={g.genero}>{g.genero}</option> //asi cargo los valores de las platafomas, obtengo las plataformas del back con 
                    ))} {/* ACA EL VALUE Q TOMA ES EL ID POR ESO CUANDO BUCSA ESPERA EL ID, ADEMAS DE Q ESO ECESITA EL BACK APRA BUCCAR O DEFINIR SI EXISTE LA PLAATFORMA*/}
                    </select>
                </div>
                <div className="col-md-4">
                    <input {...register("creador", {required: true})} 
                    type="text" 
                    className="form-control" 
                    placeholder="Ingrese el nombre del creador" 
                /> 
                </div>
                <div className="col-md-4">
                    <button>{editando ? "Actualizar" : "Crear"}</button>
                </div>
            </form>
        </div>
    )
}
export default TemporadasFormulario
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import temporadasService from "../services/temporadas.services.js"
import seriesService from "../services/series.services.js"

const Temporadas = () => {
const { register, handleSubmit } = useForm();
const navigate = useNavigate();
const [plataforma, setPlataforma] = useState([])
const [genero, setGenero] = useState([])
const [temp, setTemp] = useState([])

const onSubmit = async (data) => {
    console.log(data)
    const filtrados = await temporadasService.obtenerFiltrados(data);
    setTemp(filtrados);
}

const cargarTemporadas = async () => {
    const temporadas = await temporadasService.obtenerTodos();
    setTemp(temporadas)
}

const cargarGeneros = async () => {
    const generos = await temporadasService.obtenerGeneros();
    setGenero(generos)
}

const cargarPlataformas = async () => {
    const plataformas = await seriesService.obtenerPlataformas();
    setPlataforma(plataformas)
}

useEffect(()=> {
    cargarTemporadas();
    cargarGeneros();
    cargarPlataformas();
    //funciones
}, [])


    return (
        <div className="temporadas-page container my-4">
            <h2>Series</h2>
            <form onSubmit={handleSubmit(onSubmit)}className="row g-3 mb-4">
                <div className="col-md-4"> {/* texto serie, genero, plataforma*/}
                    <input {...register("tituloSerie")} 
                    type="text" 
                    className="form-control" 
                    placeholder="buscar por titulo de la serie" 
                /> 
                </div>
                <div className="col-md-4">
                     <select {...register("plataforma")}
                    >
                    <option value="">Todas las plataformas</option>   
                    {plataforma.map((p, index)=>(
                        <option key={index} value={p.plataforma}>{p.plataforma}</option> //asi cargo los valores de las platafomas, obtengo las plataformas del back con 
                    ))} {/* ACA EL VALUE Q TOMA ES EL ID POR ESO CUANDO BUCSA ESPERA EL ID, ADEMAS DE Q ESO ECESITA EL BACK APRA BUCCAR O DEFINIR SI EXISTE LA PLAATFORMA*/}
                    </select>
                </div>
                <div className="col-md-4">
                     <select {...register("genero")}
                    >
                    <option value="">Todos los generos</option>   
                    {genero.map((g, index)=>(
                        <option key={index} value={g.genero}>{g.genero}</option> //asi cargo los valores de las platafomas, obtengo las plataformas del back con 
                    ))} {/* ACA EL VALUE Q TOMA ES EL ID POR ESO CUANDO BUCSA ESPERA EL ID, ADEMAS DE Q ESO ECESITA EL BACK APRA BUCCAR O DEFINIR SI EXISTE LA PLAATFORMA*/}
                    </select>
                </div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-primary" >Filtrar</button>
                    <button type="button" className="btn btn-primary" onClick={() => navigate(`/temporadas/nuevo`)}>Crear</button>
                </div>
            </form>
             <table className="table table-striped table-bordered align-middle">
                 <thead className="table-dark">
                    <tr>
                        <th>Titulo de la serie</th>
                        <th>Plataforma</th>
                        <th>Numero</th>
                        <th>Episodios</th>
                        <th>Año de estreno</th>
                        <th>Genero</th>
                        <th>Creador</th>
                        <th>Accion</th>
                    </tr>
                 </thead>
                 <tbody>
                    {/*const t = {
                        id: 1,
                        numero: 2,
                        series: {
                            titulo: "Friends",
                            plataforma: "Netflix"
                        }
                        } */}
                    {temp.map((t)=> {
                        return (
                            <tr key={t.id}>
                                <td>{t.series?.titulo}</td> {/* SERIES es una propiedad de la temporada*/}
                                <td>{t.series?.plataforma}</td>
                                <td>{t.numero}</td>
                                <td>{t.episodios}</td>
                                <td>{t.anioEstreno}</td>
                                <td>{t.genero}</td>
                                <td>{t.creador}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => navigate(`/temporadas/nuevo/${t.id}`)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-sm btn-outline-primary me-2"
                                        onClick={async () => {
                                        const confirmar = window.confirm("¿Estás seguro de eliminar esta temporada?");
                                         if (!confirmar) return;  //si la persona no confirma entonces q se termine la funcion
                                             try {
                                            await temporadasService.eliminar(t.id); //de esa tarifa q tengo en mano e mando el id tarifa al servicio
                                            //aca le mando al back q elimine la tairfa, tenemos en cuenta q solo le pasamos el id
                                            alert("funcion eliminada correctamente");
                                            //cambio el estado tarifa con el useState
                                            setTemp((prevTemp) =>
                                            prevTemp.filter((te) => te.id !== t.id) //recargo las tarifas q no es la q elimine, el ide q elimino no entra en la carga
                                            ); //cambie el esatdo y se renderizo, La comparación !== se usa para excluir del nuevo array el elemento que querés eliminar., prevTarifas es el estado tarifas antes de que lo modifiques.
                                        } catch {
                                            alert("Ocurrió un error al eliminar la temporada");}
                                                    }}>
                                                Eliminar
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                 </tbody>
             </table>
        </div>
    )
}
export default Temporadas
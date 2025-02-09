import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom' // Importa useLocation
import { PartidasContext } from '../vistas/PartidasContext'
import "../App.css"

export default function TablaPartidas() {
    const {
        partidas,
        modalVisible,
        setModalVisible,
        nuevaPartida,
        setNuevaPartida,
        DatosNuevos,
        añadirArray,
        ordenarPorNick,
        ordenarPorPuntos,
        ordenarPorFecha
    } = useContext(PartidasContext)

    const location = useLocation() // Hook para obtener el estado

    useEffect(() => {
        if (location.state && location.state.puntuacion) {
            setNuevaPartida(prevState => ({
                ...prevState,
                puntos: location.state.puntuacion,
                fecha: new Date().toLocaleDateString('es-ES')
            }))
            setModalVisible(true)
        }
    }, [location.state, setNuevaPartida, setModalVisible])

    return (
        <div className='mt-5'>
            <br />
            <div className="container mt-5">
                <div className='mt-5'>
                    <table className="table table-dark text-center">
                        <thead className="w-100">
                            <tr>
                                <th></th>
                                <th>Nick <i className="bi bi-arrow-up-square" onClick={ordenarPorNick}></i></th>
                                <th>Puntuación <i className="bi bi-arrow-up-square" onClick={ordenarPorPuntos}></i></th>
                                <th>Fecha <i className="bi bi-arrow-up-square" onClick={ordenarPorFecha}></i></th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTabla">
                            {partidas.map((partida) => (
                                <tr key={partida.nick}>
                                    <td><img width="50" height="50" src={partida.avatar} alt="avatar" /></td>
                                    <td>{partida.nick}</td>
                                    <td>{partida.puntos}</td>
                                    <td>{partida.fecha}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='text-center'>
                        <button onClick={() => setModalVisible(true)} className="btn btn-primary mb-3">Agregar Partida</button>
                    </div>
                </div>
            </div>
            {modalVisible && (
                <div className="modal-partidas">
                    <div className="modal-content">
                        <h2 className="text-dark">Guardar Partida</h2>
                        <form onSubmit={añadirArray}>
                            <label>
                                <p className="text-dark">Avatar URL:</p>
                                <input type="text" name="avatar" value={nuevaPartida.avatar} onChange={DatosNuevos} placeholder="URL del avatar" />
                            </label>
                            <br />
                            <label>
                                <p className="text-dark mt-4">Nick:</p>
                                <input type="text" name="nick" value={nuevaPartida.nick} onChange={DatosNuevos} placeholder="Nombre del jugador" />
                            </label>
                            <br />
                            <label>
                                <p className="text-dark mt-4">Puntos:</p>
                                <input type="number" name="puntos" value={nuevaPartida.puntos} onChange={DatosNuevos} placeholder="Puntos" />
                            </label>
                            <br />
                            <label>
                                <p className="text-dark mt-4">Fecha (dd-mm-yyyy):</p>
                                <input type="text" name="fecha" value={nuevaPartida.fecha} onChange={DatosNuevos} placeholder="Fecha de la partida" />
                            </label>
                            <br />
                            <button type="submit" className="btn btn-primary mt-4">Guardar</button>
                            <button type="button" className="btn btn-secondary mt-4" onClick={() => setModalVisible(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
import React, { useContext } from 'react'
import { PartidasContext } from '../vistas/PartidasContext'
import "../App.css"

export default function VistaRanking() {
    const { partidas } = useContext(PartidasContext)

    // Ordenar las partidas por puntos en orden descendente
    const partidasOrdenadas = [...partidas].sort((a, b) => b.puntos - a.puntos)

    return (
        <div className='mt-5'>
            <br />
        <div className="container mt-5">
            <h2 className="text-center mb-4">Ranking</h2>
            <table className="table table-dark text-center">
                <thead className="w-100">
                    <tr>
                        <th>Posición</th>
                        <th>Avatar</th>
                        <th>Nick</th>
                        <th>Puntos</th>
                    </tr>
                </thead>
                <tbody>
                    {partidasOrdenadas.map((partida, index) => (
                        <tr key={partida.nick}>
                            <td className="fs-2">{index + 1}</td>
                            <td><img width="50" height="50" src={partida.avatar} alt="avatar" /></td>
                            <td>{partida.nick}</td>
                            <td>{partida.puntos}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
        </div>
    )
}


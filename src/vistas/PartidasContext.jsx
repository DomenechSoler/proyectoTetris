import React, { createContext, useState } from 'react'

export const PartidasContext = createContext()

export const PartidasProvider = ({ children }) => {
    const [partidas, setPartidas] = useState([
        {
            avatar: "https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg",
            nick: "Juanito",
            puntos: 250,
            fecha: "15-01-2024"
        },
        {
            avatar: "https://www.svgrepo.com/show/384672/account-avatar-profile-user-7.svg",
            nick: "Lucia89",
            puntos: 500,
            fecha: "10-11-2024"
        },
        {
            avatar: "https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg",
            nick: "GamerPro",
            puntos: 750,
            fecha: "05-03-2024"
        }
    ])

    const [ordenAscendente, setOrdenAscendente] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [nuevaPartida, setNuevaPartida] = useState({
        avatar: "",
        nick: "",
        puntos: "",
        fecha: ""
    })

    const ordenarPorNick = () => {
        const ordenado = [...partidas].sort((a, b) => {
            return ordenAscendente
                ? a.nick.localeCompare(b.nick)
                : b.nick.localeCompare(a.nick)
        })
        setPartidas(ordenado)
        setOrdenAscendente(!ordenAscendente)
    }

    const ordenarPorPuntos = () => {
        const ordenado = [...partidas].sort((a, b) => {
            return ordenAscendente ? a.puntos - b.puntos : b.puntos - a.puntos
        })
        setPartidas(ordenado)
        setOrdenAscendente(!ordenAscendente)
    }

    const ordenarPorFecha = () => {
        const ordenado = [...partidas].sort((a, b) => {
            const fechaA = new Date(a.fecha.split("-").reverse().join("-"))
            const fechaB = new Date(b.fecha.split("-").reverse().join("-"))
            return ordenAscendente ? fechaA - fechaB : fechaB - fechaA
        })
        setPartidas(ordenado)
        setOrdenAscendente(!ordenAscendente)
    }

    const DatosNuevos = (e) => {
        const { name, value } = e.target
        setNuevaPartida(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const añadirArray = (e) => {
        e.preventDefault()
        setPartidas([...partidas, nuevaPartida])
        setNuevaPartida({
            avatar: "",
            nick: "",
            puntos: "",
            fecha: ""
        })
        setModalVisible(false)
    }

    const registraPartida = (puntuacion) => {
        console.log(`Puntuación enviada al formulario: ${puntuacion}`)
        setNuevaPartida(prevState => ({
            ...prevState,
            puntos: parseInt(puntuacion, 10), // Convertir puntos a número
            fecha: new Date().toLocaleDateString('es-ES')
        }))
        setModalVisible(true)
    }

    return (
        <PartidasContext.Provider value={{
            partidas,
            setPartidas,
            ordenAscendente,
            setOrdenAscendente,
            modalVisible,
            setModalVisible,
            nuevaPartida,
            setNuevaPartida,
            ordenarPorNick,
            ordenarPorPuntos,
            ordenarPorFecha,
            DatosNuevos,
            añadirArray,
            registraPartida
        }}>
            {children}
            {modalVisible && (
                <div className="modal-partidas">
                    <div className="modal-content">
                        <h2 className="text-light">Guardar Partida</h2>
                        <form onSubmit={añadirArray}>
                            <label>
                                <p className="text-light">Avatar URL:</p>
                                <input type="text" name="avatar" value={nuevaPartida.avatar} onChange={DatosNuevos} placeholder="URL del avatar" />
                            </label>
                            <br />
                            <label>
                                <p className="text-light mt-4">Nick:</p>
                                <input type="text" name="nick" value={nuevaPartida.nick} onChange={DatosNuevos} placeholder="Nombre del jugador" />
                            </label>
                            <br />
                            <label>
                                <p className="text-light mt-4">Puntos:</p>
                                <input type="number" name="puntos" value={nuevaPartida.puntos} onChange={DatosNuevos} placeholder="Puntos" readOnly/>
                            </label>
                            <br />
                            <label>
                                <p className="text-light mt-4">Fecha (dd-mm-yyyy):</p>
                                <input type="text" name="fecha" value={nuevaPartida.fecha} onChange={DatosNuevos} placeholder="Fecha de la partida" readOnly />
                            </label>
                            <br />
                            <button type="submit" className="btn btn-success mt-4">Guardar</button>
                            <button type="button" className="btn btn-danger mt-4 ms-3" onClick={() => setModalVisible(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </PartidasContext.Provider>
    )
}
import { useState } from "react";
import "../App.css";

export default function TablaPartidas() {
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
    ]);

    const [ordenAscendente, setOrdenAscendente] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [nuevaPartida, setNuevaPartida] = useState({
        avatar: "",
        nick: "",
        puntos: "",
        fecha: ""
    });

    const ordenarPorNick = () => {
        const ordenado = [...partidas].sort((a, b) => {
            return ordenAscendente
                ? a.nick.localeCompare(b.nick)
                : b.nick.localeCompare(a.nick);
        });
        setPartidas(ordenado);
        setOrdenAscendente(!ordenAscendente);
    };

    const ordenarPorPuntos = () => {
        const ordenado = [...partidas].sort((a, b) => {
            return ordenAscendente ? a.puntos - b.puntos : b.puntos - a.puntos;
        });
        setPartidas(ordenado);
        setOrdenAscendente(!ordenAscendente);
    };

    const ordenarPorFecha = () => {
        const ordenado = [...partidas].sort((a, b) => {
            const fechaA = new Date(a.fecha.split("-").reverse().join("-"));
            const fechaB = new Date(b.fecha.split("-").reverse().join("-"));
            return ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
        });
        setPartidas(ordenado);
        setOrdenAscendente(!ordenAscendente);
    };

    const DatosNuevos = (e) => {
        const { name, value } = e.target;
        setNuevaPartida({ ...nuevaPartida, [name]: value });
    };
    const AñadirArray = () => {
        if (!nuevaPartida.nick || !nuevaPartida.puntos || !nuevaPartida.fecha) {
            alert("Por favor, completa todos los campos");
            return;
        }
        setPartidas([...partidas, { ...nuevaPartida, puntos: parseInt(nuevaPartida.puntos) }]);
        setModalVisible(false);
        setNuevaPartida({ avatar: "", nick: "", puntos: "", fecha: "" });
    };


    return (
        <div className="container text-center d-flex flex-column justify-content-center align-items-center"> 
            <h2 className="text-center text-light">Partidas</h2>
            <button className="btn btn-outline-secondary mb-3 rounded-3" onClick={() => setModalVisible(true)}>
                <h4 className="text-white">Agregar nueva partida</h4>
            </button>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscador"
                    aria-label="Buscador"
                    aria-describedby="button-addon2"
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>

            <div className="container">
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
            </div>



            {/* Modal */}
            {modalVisible && (
                <div className="modal-partidas">
                    <div className="modal-content">
                        <h2 className="text-dark">Agregar nueva partida</h2>
                        <form>
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
                        </form>
                        <button className="btn btn-primary mt-3 me-2" onClick={AñadirArray}>Guardar</button>
                        <button className="btn btn-secondary mt-3" onClick={() => setModalVisible(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

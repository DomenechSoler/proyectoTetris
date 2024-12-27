import React from 'react';
import { Link } from 'react-router-dom';
export default function VistaInicio() {
    return (
        <div className='shadow shadow-dark'>
            <div className="d-flex align-items-center justify-content-center">
                <img src="/img/logo.png" alt="logo" width="200" className="mt-5" />
            </div>
            <div id="intro" className="text-center p-5">
                <p>Tetris es un videojuego de tipo rompecabezas. Fue inventado por el ingeniero informático ruso Alekséi Pázhitnov en el año 1984, mientras trabajaba en la Academia de Ciencias de Moscú.</p>
                <h2>Instrucciones:</h2>
                <p>Puedes mover las piezas utilizando las flechas izquierda y derecha</p>
                <p>Con la flecha hacia abajo puedes girar la pieza</p>
                <p><strong>Ñ</strong> para cambiar la pieza actual por la pieza que está a punto de salir (que puedes ver en la columna de la derecha)</p>
                <p>Al final de la partida podrás guardar tu puntuación y ver el ranking de jugadores</p>
                <button id="btnJuegos" className="btn btn-success fs-1 mt-5 "><Link className='text-decoration-none text-white' to="/juego">JUGAR</Link></button>
                <hr />
            </div>
        </div>
    );
}

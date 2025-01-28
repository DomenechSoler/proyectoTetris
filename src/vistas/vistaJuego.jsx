import Panel from '../componentes/panel'
import React, { useState } from "react"
import { modelos } from '../lib/modelos'
import Pieza, { VariacionesPiezas } from '../componentes/pieza'
import nuevaPieza from '../lib/nuevaPieza'
import pintarPieza from '../lib/pintarPieza'

export default function VistaJuego() {
    const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz)

    const [piezaActual, setPiezaActual] = useState(() => {
        const nueva = nuevaPieza(modelos.piezas)
        if (!nueva || !nueva.pieza || !nueva.pieza[0]) {
            console.error("Error al crear la nueva pieza: nueva.pieza es null o undefined")
            return null
        }
        nueva.fila = 0
        nueva.columna = Math.floor(Math.random() * (modelos.matriz[0].length - nueva.pieza[0].length))
        return nueva
    })

    const insertaNuevaPieza = () => {
        const nueva = nuevaPieza(modelos.piezas)
        if (!nueva) {
            console.error("Error al crear la nueva pieza: nueva.pieza es null o undefined")
            return
        }
        nueva.fila = 0
        nueva.columna = Math.floor(Math.random() * (modelos.matriz[0].length - nueva.matriz[0].length))
        if(nueva.columna == 0){
            nueva.columna += 1
        }else if(nueva.columna == 12){
            nueva.columna -= 1
        }
        setPiezaActual(nueva)
        const nuevoPanel = pintarPieza(arrayCasillas, nueva)
        setArrayCasillas(nuevoPanel)
    }

    const panelConPieza = piezaActual ? pintarPieza(arrayCasillas, piezaActual) : arrayCasillas

    const pieza1 = nuevaPieza(modelos.piezas)
    const pieza2 = nuevaPieza(modelos.piezas)
    const pieza3 = nuevaPieza(modelos.piezas)


    return (
        <div id="juego" className="">
            <div className="row">
                <div className="col-4 d-flex flex-column justify-content-end align-items-center p-5">
                    <h4>Nivel: <span>2</span></h4>
                    <h4>Tiempo: <span>5:22</span></h4>
                    <h4>Lineas: <span>2</span></h4>
                    <h4>Puntos: <span>211122</span></h4>
                </div>
                <div className="col-4 d-flex justify-content-center">
                    <div id="" className="p-5">
                        <Pieza matriz={panelConPieza} pieza={piezaActual}></Pieza>
                    </div>
                </div>
                <div className="col-4 d-flex flex-column container shadow justify-content-end">
                    <div id="piezaSiguiente">
                        <h4>Pieza siguiente:</h4>
                        <div className="piezaSiguiente m-2">
                            <Pieza matriz={pieza1.matriz} /> 
                        </div>
                        <div className="piezaSiguiente m-2">
                            <Pieza matriz={pieza2.matriz} /> 
                        </div>
                        <div className="piezaSiguiente m-2">
                            <Pieza matriz={pieza3.matriz} /> 
                        </div>
                    </div>
                    <hr />
                    <div id="piezaGuardada">
                        <h4>Pieza guardada:</h4>
                        <div className="piezaGuardada">
                            <div className="piezaSiguiente2 m-2">
                                <div className="fila d-flex justify-content-center">
                                    <div className="celda bg-warning bg-gradient border-dark"></div>
                                    <div className="celda bg-warning border-secondary"></div>
                                </div>
                                <div className="fila d-flex justify-content-center">
                                    <div className="celda bg-warning bg-gradient border-dark"></div>
                                    <div className="celda bg-warning border-secondary"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button onClick={insertaNuevaPieza} className="btn btn-primary">Insertar Nueva Pieza</button>
            </div>
            <VariacionesPiezas />
        </div>
    )
}
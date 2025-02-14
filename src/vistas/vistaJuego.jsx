import React, { useState, useEffect, useRef, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import Panel from '../componentes/panel'
import { modelos } from '../lib/modelos'
import Pieza, { VariacionesPiezas } from '../componentes/pieza'
import nuevaPieza from '../lib/nuevaPieza'
import pintarPieza from '../lib/pintarPieza'
import { PartidasContext } from '../vistas/PartidasContext'

export default function VistaJuego() {
    const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz)
    const intervalIdRef = useRef(null)
    const [puntuacion, setPuntuacion] = useState(0)
    const [mostrarBotonGuardar, setMostrarBotonGuardar] = useState(false)
    const [redirigir, setRedirigir] = useState(false) 
    const { registraPartida } = useContext(PartidasContext)
    const navigate = useNavigate() 

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

    const hayColision = (pieza, nuevaFila, nuevaColumna) => {
        const { matriz } = pieza
        for (let i = 0; i < matriz.length; i++) {
            for (let j = 0; j < matriz[i].length; j++) {
                if (matriz[i][j] !== 0) {
                    const fila = nuevaFila + i
                    const columna = nuevaColumna + j
                    if (
                        fila >= arrayCasillas.length ||
                        columna < 0 ||
                        columna >= arrayCasillas[0].length ||
                        arrayCasillas[fila][columna] !== 0
                    ) {
                        return true
                    }
                }
            }
        }
        return false
    }

    const insertaNuevaPieza = () => {
        const nueva = nuevaPieza(modelos.piezas)
        if (!nueva) {
            console.error("Error al crear la nueva pieza: nueva.pieza es null o undefined")
            return
        }
        nueva.fila = 0
        nueva.columna = Math.floor(Math.random() * (modelos.matriz[0].length - nueva.matriz[0].length))
        if (nueva.columna == 0) {
            nueva.columna += 1
        } else if (nueva.columna == 12) {
            nueva.columna -= 1
        }
        setPiezaActual(nueva)
    }

    const moverDra = () => {
        console.log("Mover a la derecha")
        setPuntuacion(puntuacion => puntuacion + 10)
        setPiezaActual(piezaAnterior => {
            const nuevaColumna = piezaAnterior.columna + 1
            if (!hayColision(piezaAnterior, piezaAnterior.fila, nuevaColumna)) {
                return { ...piezaAnterior, columna: nuevaColumna }
            }
            return piezaAnterior
        })
    }
    
    const moverIzq = () => {
        console.log("Mover a la izquierda")
        setPuntuacion(puntuacion => puntuacion + 10)
        setPiezaActual(piezaAnterior => {
            const nuevaColumna = piezaAnterior.columna - 1
            if (!hayColision(piezaAnterior, piezaAnterior.fila, nuevaColumna)) {
                return { ...piezaAnterior, columna: nuevaColumna }
            }
            return piezaAnterior
        })
    }
    
    const bajar = () => {
        console.log("Bajar pieza")
        setPiezaActual(piezaAnterior => {
            const nuevaFila = piezaAnterior.fila + 1
            if (hayColision(piezaAnterior, nuevaFila, piezaAnterior.columna)) {
                setPuntuacion(puntuacion => puntuacion + 50)
                if (intervalIdRef.current) {
                    console.log("Limpiando intervalo")
                    clearInterval(intervalIdRef.current) 
                    intervalIdRef.current = null
                }
                setMostrarBotonGuardar(true) 
                const nuevoPanel = pintarPieza(arrayCasillas, piezaAnterior)
                setArrayCasillas(nuevoPanel)
                return piezaAnterior
            } else {
                setPuntuacion(puntuacion => puntuacion + 10)
                return { ...piezaAnterior, fila: nuevaFila }
            }
        })
    }
    
    const girar = () => {
        console.log("Girar pieza")
        setPuntuacion(puntuacion => puntuacion + 20)
        setPiezaActual(piezaAnterior => {
            const filas = piezaAnterior.matriz.length
            const columnas = piezaAnterior.matriz[0].length
            const nuevaMatriz = Array.from({ length: columnas }, () => Array(filas).fill(0))
    
            piezaAnterior.matriz.forEach((fila, i) => {
                fila.forEach((celda, j) => {
                    nuevaMatriz[j][filas - 1 - i] = celda
                })
            })
    
            const nuevaPieza = { ...piezaAnterior, matriz: nuevaMatriz }
            if (!hayColision(nuevaPieza, piezaAnterior.fila, piezaAnterior.columna)) {
                return nuevaPieza
            }
            return piezaAnterior
        })
    }
    const controlTeclas = (event) => {
        switch (event.key) {
            case "ArrowRight":
                moverDra()
                break
            case "ArrowLeft":
                moverIzq()
                break
            case "ArrowDown":
                bajar()
                break
            case "ArrowUp":
                girar()
                break
            default:
                break
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', controlTeclas)
        return () => {
            window.removeEventListener('keydown', controlTeclas)
        }
    }, [])

    const iniciarMovimiento = () => {
        if (!intervalIdRef.current) {
            const id = setInterval(bajar, 1000)
            intervalIdRef.current = id
        }
    }

    const jugar = () => {
        insertaNuevaPieza()
        iniciarMovimiento()
    }

    useEffect(() => {
        if (redirigir) {
            navigate('/Partidas') 
        }
    }, [redirigir, navigate])

    const guardarPartida = () => {
        console.log(`Puntuación actual al guardar: ${puntuacion}`)
        registraPartida(puntuacion)
        setRedirigir(true)
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
                    <h4>Puntos: <span>{puntuacion}</span></h4>
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
            {mostrarBotonGuardar && <div className="d-flex justify-content-center mt-4">
                <button onClick={guardarPartida} className='btn btn-success'>Guardar</button>
            </div>}
            <div className="d-flex justify-content-center mt-4">
                <button onClick={jugar} className="btn btn-primary">Insertar Nueva Pieza</button>
            </div>
            <VariacionesPiezas />
        </div>
    )
}
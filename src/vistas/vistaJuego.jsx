import React, { useState, useEffect, useRef, useContext } from "react" // Importo los hooks necesarios de React
import { useNavigate } from 'react-router-dom' // Importo useNavigate para la navegación entre rutas
import Panel from '../componentes/panel' // Importo el componente del panel de juego
import { modelos } from '../lib/modelos' // Importo modelos con las piezas y la matriz base
import Pieza, { VariacionesPiezas } from '../componentes/pieza' // Importo el componente de las piezas y sus variaciones
import nuevaPieza from '../lib/nuevaPieza' // Importo la función que genera una nueva pieza
import pintarPieza from '../lib/pintarPieza' // Importo la función que pinta la pieza en el tablero
import { PartidasContext } from '../vistas/PartidasContext' // Importo el contexto de las partidas para guardar información

export default function VistaJuego() {
    const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz) // Estado del tablero con la matriz inicial
    const boardRef = useRef(arrayCasillas) // Referencia para mantener el estado del tablero actualizado
    useEffect(() => {
        boardRef.current = arrayCasillas // Actualizo la referencia cuando cambia el tablero
    }, [arrayCasillas])

    const intervalIdRef = useRef(null) // Referencia para el intervalo del juego
    const [puntuacion, setPuntuacion] = useState(0) // Estado para la puntuación
    const [mostrarBotonGuardar, setMostrarBotonGuardar] = useState(false) // Estado para mostrar el botón de guardar
    const [redirigir, setRedirigir] = useState(false) // Estado para redirigir a otra página
    const [lineasEliminadas, setLineasEliminadas] = useState(0) // Estado para contar líneas eliminadas
    const [nivel, setNivel] = useState(1) // Estado para el nivel
    const [tiempo, setTiempo] = useState(0) // Estado para el tiempo 
    const { registraPartida } = useContext(PartidasContext) // Uso el contexto para registrar partidas
    const navigate = useNavigate() // Función para redirigir a otra página

    // Estado inicial de la pieza actual, generando una nueva pieza aleatoria
    const [piezaActual, setPiezaActual] = useState(() => {
        const nueva = nuevaPieza(modelos.piezas) // Genera una nueva pieza utilizando la función nuevaPieza y el modelo de piezas
    if (!nueva || !nueva.pieza || !nueva.pieza[0]) { // Verifica si la nueva pieza es válida
            console.error("Error al crear la nueva pieza: nueva.pieza es null o undefined") // Si la nueva pieza no es válida, muestra un error en la consola
            return null // Retorna null para indicar que no se pudo crear la pieza
    }
        nueva.fila = 0 // Inicio la pieza en la primera fila
        nueva.columna = Math.floor(Math.random() * (modelos.matriz[0].length - nueva.pieza[0].length)) // Calcula una posición aleatoria para la columna de la nueva pieza
        return nueva // Devuelve la nueva pieza
    })

    const [piezaGuardada, setPiezaGuardada] = useState(null) // Estado para la pieza guardada

    // Efecto para subir de nivel cada 5 líneas eliminadas
    useEffect(() => {
        if (lineasEliminadas >= nivel * 5) { // Verifica si el número de líneas eliminadas es mayor o igual al múltiplo de 5 del nivel actual
            setNivel(prevNivel => prevNivel + 1)// Incrementa el nivel en 1
        }
    }, [lineasEliminadas, nivel]) // Se ejecuta cuando cambian las líneas eliminadas o el nivel

    // Efecto para contar el tiempo mientras el juego está activo
    useEffect(() => {
        let tiempoIntervalId = null
        if (intervalIdRef.current) { // Verifica si el intervalo del juego está activo
            tiempoIntervalId = setInterval(() => { // Inicia un intervalo que incrementa el tiempo en 1 cada segundo
                setTiempo(prevTiempo => prevTiempo + 1)
            }, 1000)
        }
        return () => { // Limpia el intervalo cuando el efecto se desmonta
            if (tiempoIntervalId) {
                clearInterval(tiempoIntervalId)
            }
        }
    }, [intervalIdRef.current]) // El efecto se ejecuta cuando cambia intervalIdRef.current

    // Función para verificar colisiones con los bordes y otras piezas
    const hayColision = (pieza, nuevaFila, nuevaColumna) => {
        const { matriz } = pieza
        const board = boardRef.current
        for (let i = 0; i < matriz.length; i++) { // Recorre la matriz de la pieza
            for (let j = 0; j < matriz[i].length; j++) {
                if (matriz[i][j] !== 0) { // Verifica si la celda de la pieza no está vacía
                    const fila = nuevaFila + i
                    const columna = nuevaColumna + j
                if ( // Verifica si la pieza choca con el suelo, los bordes o con otra pieza
                    fila >= board.length || // Choca con el suelo
                    columna < 0 || // Choca con la izquierda
                    columna >= board[0].length || // Choca con la derecha
                    board[fila][columna] !== 0 // Choca con otra pieza
                ) {
                    return true
                }
                }
            }
        }
        return false
    }

    // Función para determinar si el juego ha terminado
    const FinDePartida = (pieza) => {
        return hayColision(pieza, pieza.fila, pieza.columna) // Verifica si la pieza actual colisiona en su posición actual
    }

    // Función para reinicializar la pieza guardada
    const reinicializarPieza = (pieza) => {
        const nuevaPiezaHold = { ...pieza } // Crea una copia de la pieza actual
        nuevaPiezaHold.fila = 0 // Establece la fila inicial de la nueva pieza en 0 (primera fila)
        nuevaPiezaHold.columna = Math.floor(Math.random() * (modelos.matriz[0].length - nuevaPiezaHold.matriz[0].length)) // Calcula una posición aleatoria para la columna de la nueva pieza
        if (nuevaPiezaHold.columna === 0) { // Ajusta la columna si está en el borde izquierdo
            nuevaPiezaHold.columna = 1 // Establece la columna en 1
        } else if (nuevaPiezaHold.columna === 12) { // Ajusta la columna si está en el borde derecho
            nuevaPiezaHold.columna = 11 // Establece la columna en 11
        }
            return nuevaPiezaHold // Devuelve la nueva pieza
    }

    // Función para insertar una nueva pieza después de colocar una
    const insertaNuevaPieza = () => {
        const nueva = nuevaPieza(modelos.piezas) // Genera una nueva pieza utilizando la función nuevaPieza y el modelo de piezas
        if (!nueva) { // Verifica si la nueva pieza es válida
            console.error("Error al crear la nueva pieza: nueva.pieza es null o undefined")
            return 
        }
        nueva.fila = 0 // Inicio la pieza en la primera fila
        nueva.columna = Math.floor(Math.random() * (modelos.matriz[0].length - nueva.matriz[0].length)) // Calcula una posición aleatoria para la columna de la nueva pieza
        if (nueva.columna == 0) { // Ajusta la columna si está en el borde izquierdo
            nueva.columna += 1 // Incrementa la columna en 1
        } else if (nueva.columna == 12) { // Ajusta la columna si está en el borde derecho
            nueva.columna -= 1 // Decrementa la columna en 1
        }
        if (FinDePartida(nueva)) { // Verifica si el juego ha terminado
            alert("Fin de la partida") // Muestra un mensaje de fin de partida
            setMostrarBotonGuardar(true) // Muestra el botón de guardar
            clearInterval(intervalIdRef.current) // Limpia el intervalo del juego
            intervalIdRef.current = null // Establece el intervalo en null
            return 
        }
        setPiezaActual(nueva) // Establece la nueva pieza como la pieza actual
    }

    // Función para mover derecha la pieza
    const moverDra = () => { 
        console.log("Mover a la derecha")
        setPuntuacion(puntuacion => puntuacion + 10) // Incrementa la puntuación en 10
        setPiezaActual(piezaAnterior => { // Actualiza la pieza actual
            const nuevaColumna = piezaAnterior.columna + 1 // Calcula la nueva columna
            if (!hayColision(piezaAnterior, piezaAnterior.fila, nuevaColumna)) { // Verifica si hay colisión
                return { ...piezaAnterior, columna: nuevaColumna } // Devuelve la pieza actualizada con la nueva columna
            }
            return piezaAnterior // Devuelve la pieza actual si hay colisión
        })
    }

    // Función para mover izquierda la pieza
    const moverIzq = () => {
        console.log("Mover a la izquierda")
        setPuntuacion(puntuacion => puntuacion + 10) // Incrementa la puntuación en 10
        setPiezaActual(piezaAnterior => { // Actualiza la pieza actual
            const nuevaColumna = piezaAnterior.columna - 1 // Calcula la nueva columna
            if (!hayColision(piezaAnterior, piezaAnterior.fila, nuevaColumna)) { // Verifica si hay colisión
                return { ...piezaAnterior, columna: nuevaColumna } // Devuelve la pieza actualizada con la nueva columna
            }
            return piezaAnterior // Devuelve la pieza actual si hay colisión
        })
    }

    // Función para eliminar filas completas
    const eliminarFilasCompletas = (tablero) => { 
        const nuevasFilas = tablero.slice(0, -1).filter(fila => fila.some(celda => celda === 0)) // Filtra las filas completas
        const filasEliminadas = tablero.length - 1 - nuevasFilas.length // Calcula el número de filas eliminadas
        const filasVacias = Array.from({ length: filasEliminadas }, () => Array(tablero[0].length).fill(0)) // Crea las filas vacías

        for (let i = 0; i < filasVacias.length; i++) { // Recorre las filas vacías
            filasVacias[i][0] = 1  // Establece la primera celda en 1
            filasVacias[i][filasVacias[i].length - 1] = 1 // Establece la última celda en 1
        }
    
        const ultimaFilaOriginal = tablero[tablero.length - 1] // Obtiene la última fila original
    
        setLineasEliminadas(prev => prev + filasEliminadas) // Incrementa el número de líneas eliminadas
        return [...filasVacias, ...nuevasFilas, ultimaFilaOriginal] // Devuelve el tablero actualizado
    }

    // Función para bajar la pieza
    const bajar = () => {
        console.log("Bajar pieza")
        setPiezaActual((piezaAnterior) => { // Actualiza la pieza actual
            const nuevaFila = piezaAnterior.fila + 1 // Calcula la nueva fila
            if (hayColision(piezaAnterior, nuevaFila, piezaAnterior.columna)) { // Verifica si hay colisión
                setPuntuacion(puntuacion => puntuacion + 50) // Incrementa la puntuación en 50
                setArrayCasillas((prevArray) => { // Actualiza el tablero
                    const nuevoTablero = pintarPieza(prevArray, piezaAnterior) // Pinta la pieza en el tablero
                    return eliminarFilasCompletas(nuevoTablero) // Elimina las filas completas   
                })
                setTimeout(() => {insertaNuevaPieza()}, 100) // Inserta una nueva pieza después de 100 ms
                return piezaAnterior // Devuelve la pieza actual si hay colisión
            } else {
                setPuntuacion(puntuacion => puntuacion + 10) // Incrementa la puntuación en 10
                return { ...piezaAnterior, fila: nuevaFila } // Devuelve la pieza actualizada con la nueva fila
            }
        })
    }

    // Función para girar la pieza
    const girar = () => {
        console.log("Girar pieza") // Muestra un mensaje en la consola
        setPuntuacion(puntuacion => puntuacion + 20) // Incrementa la puntuación en 20
        setPiezaActual(piezaAnterior => { // Actualiza la pieza actual
            const filas = piezaAnterior.matriz.length // Obtiene el número de filas de la matriz de la pieza
            const columnas = piezaAnterior.matriz[0].length // Obtiene el número de columnas de la matriz de la pieza
            const nuevaMatriz = Array.from({ length: columnas }, () => Array(filas).fill(0)) // Crea una nueva matriz con las dimensiones invertidas
    
            piezaAnterior.matriz.forEach((fila, i) => { // Recorre la matriz de la pieza
                fila.forEach((celda, j) => { // Recorre las celdas de la fila
                    nuevaMatriz[j][filas - 1 - i] = celda // Asigna la celda a la nueva posición en la matriz rotada 
                })
            })
    
            const nuevaPieza = { ...piezaAnterior, matriz: nuevaMatriz } // Crea una nueva pieza con la matriz rotada
            if (!hayColision(nuevaPieza, piezaAnterior.fila, piezaAnterior.columna)) { // Verifica si hay colisión
                return nuevaPieza // Devuelve la nueva pieza si no hay colisión
            }
            return piezaAnterior // Devuelve la pieza actual si hay colisión
        })
    }

    // Función para presionar la tecla G
    const presionarG = () => { 
        if (!piezaActual) return // Verifica si hay una pieza actual
        if (!piezaGuardada) { // Verifica si no hay una pieza guardada
            setPiezaGuardada({ ...piezaActual }) // Guarda la pieza actual
            insertaNuevaPieza() // Inserta una nueva pieza
        } else {
            const piezaParaUsar = reinicializarPieza(piezaGuardada) // Reinicializa la pieza guardada
            setPiezaGuardada({ ...piezaActual }) // Guarda la pieza actual
            setPiezaActual(piezaParaUsar) // Establece la pieza guardada como la pieza actual
        }
    }


    // Función para controlar las teclas de movimiento y girar la pieza
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
            case "g":
            case "G":
                presionarG()
                break
            default:
                break
        }
    }

    // Evento para controlar las teclas de movimiento y girar la pieza
    useEffect(() => {
        window.addEventListener('keydown', controlTeclas) // Agrega un evento para controlar las teclas
        return () => {
            window.removeEventListener('keydown', controlTeclas) // Elimina el evento al desmontar el componente
        }
    }, [piezaActual, piezaGuardada]) // Se ejecuta cuando cambian la pieza actual o la pieza guardada

    // Función para iniciar el movimiento de la pieza
    const iniciarMovimiento = () => { 
        if (!intervalIdRef.current) { // Verifica si el intervalo del juego no está activo
            const id = setInterval(bajar, 1000) // Inicia un intervalo para bajar la pieza cada segundo
            intervalIdRef.current = id // Establece el intervalo en la referencia
        }
    }

    // Función para iniciar el juego
    const jugar = () => {
        insertaNuevaPieza()
        iniciarMovimiento()
    }

    // Efecto para redirigir a la página de partidas al guardar la partida
    useEffect(() => {
        if (redirigir) { // Verifica si se debe redirigir
            navigate('/Partidas') // Redirige a la página de partidas
        }
    }, [redirigir, navigate]) // Se ejecuta cuando cambia el estado de redirigir

    // Función para guardar la partida
    const guardarPartida = () => {
        console.log(`Puntuación actual al guardar: ${puntuacion}`) // Muestra la puntuación actual en la consola
        registraPartida(puntuacion) // Registra la partida con la puntuación actual
        setRedirigir(true) // Establece el estado de redirigir en true
    }

    // Renderiza el componente
    const panelConPieza = piezaActual ? pintarPieza(arrayCasillas, piezaActual) : arrayCasillas

    const pieza1 = nuevaPieza(modelos.piezas)
    const pieza2 = nuevaPieza(modelos.piezas)
    const pieza3 = nuevaPieza(modelos.piezas)

    return (
        <div id="juego" className="">
            <div className="row">
                <div className="col-4 d-flex flex-column justify-content-end align-items-center p-5">
                    <h4>Nivel: <span>{nivel}</span></h4>
                    <h4>Tiempo: <span>{tiempo}</span></h4>
                    <h4>Lineas: <span>{lineasEliminadas}</span></h4>
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
                                {piezaGuardada ? (<Pieza matriz={piezaGuardada.matriz} />) : (<span>No hay pieza</span>)}
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
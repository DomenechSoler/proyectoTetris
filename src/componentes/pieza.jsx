import React from "react"
import colorPieza from '../lib/colorPieza'
import { modelos } from '../lib/modelos'
export default function Pieza({ matriz, pieza }) {
    if (!matriz) {
        return null
    }
    return (
<div className="p-4 me-5">
        {matriz.map((row, rowIndex) => (
        <div className=""
            key={rowIndex}
            style={{
            display: 'flex', 
            }}
        >
            {row.map((cell, colIndex) => (
            <div
                key={`${rowIndex}-${colIndex}`}
                className={`celda ${colorPieza(cell)}`}
                style={{
                    width: '30px',
                    height: '30px',
                    border: '1px solid #ccc',
                }}
            ></div>
            ))}
        </div>
        ))}
    </div>
    )
}




export function VariacionesPiezas() {
    return (
        <div className="variaciones-piezas">
            {modelos.piezas.map((pieza, index) => (
                <div key={index} className="pieza-container">
                    <h4 className="text-center">{pieza.nombre}</h4>
                    {pieza.pieza.map((variante, varianteIndex) => (
                        <div key={varianteIndex} className="variante-pieza">
                            <Pieza matriz={variante} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
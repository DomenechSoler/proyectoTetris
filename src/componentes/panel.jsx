import React from "react"
import colorPieza from '../lib/colorPieza'
export default function Panel({ matriz }) {
    return (
<div className="p-4 me-5">
        {matriz.map((row, rowIndex) => (
        <div className=""
            key={rowIndex}
            style={{
            display: 'flex'
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





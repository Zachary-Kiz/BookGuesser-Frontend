"use client"

import {Chart as Chartjs, BarElement, CategoryScale, Legend, LinearScale, Tooltip } from "chart.js"
import { Bar } from "react-chartjs-2"


interface ChartWrapperType {
    stats : Object
}

Chartjs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

export default function ChartWrapper({stats} : ChartWrapperType) {

    const data = {
        labels: ["1","2","3","4","5","6","failed"],
        datasets : [
            {
                label: '# of Guesses',
                data : Object.values(stats),
                backgroundColor : '#4B2E2B',
            }
        ]
    }

    const options = {

    }

    return (
        <Bar data={data} options={options}>
        </Bar>
    )
}
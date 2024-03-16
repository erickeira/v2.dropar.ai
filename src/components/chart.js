import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false, // Remover a legenda
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
        
    },
    scales: {
        x: {
            display: false, // Remover o eixo x
        },
        y: {
            beginAtZero: true,
            max: 1000, // Definir o máximo conforme necessário
        },
    },
    elements: {
        bar: {
            borderRadius: 5, // Arredondar as barras
        },
    },
};

export const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Remover a legenda
      },
      tooltip: {
        enabled: false, // Desativar tooltips
      },
    },
    scales: {
      x: {
        display: false, // Remover escala x (horizontal)
      },
      y: {
        display: false, // Remover escala y (vertical)
      },
    },
  };
  
const labelsOrder = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const labels = labelsOrder.slice(0, 4);

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: '#256455',
        },
    ],
};



const dataOrders = {
    labels: labelsOrder,
    datasets: [
        {
            label: 'Dataset 1',
            data: labelsOrder.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: '#256455',
        },
    ],
};

const Chart = props => {
    return (
        <>
            {props.type == 'vertical-bar' && (
                <Bar options={options} data={data} />
            )}
            {props.type == 'vertical-bar-order' && (
                <Bar options={options} data={dataOrders} />
            )}
            {props.type == 'line' && (
                <Line options={options} data={data} />
            )}
            {props.type == 'full-line' && (
                <Line options={optionsPie} data={data} />
            )}
            {props.type == 'pie' && (
                <Pie options={optionsPie} data={data} />
            )}
        </>
    );
};

export default Chart;
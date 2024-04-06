import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GraphPlotter = () => {
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const responseX = await axios.get('https://retoolapi.dev/gDa8uC/data');
          const responseY = await axios.get('https://retoolapi.dev/o5zMs5/data');
            setXData(responseX.data);
            setYData(responseY.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const extractXYData = () => {
        const xValues = xData.map(item => item.Label);
        const yValues = yData.map(item => parseFloat(item.RandomNumber));
        return { xValues, yValues };
    };

    const { xValues, yValues } = extractXYData();

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Data',
                data: yValues,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'line',
                labels: xValues
            }
        }
    };

    return (
        <div>
            <h1>Graph Plotter</h1>
            {xValues.length > 0 && yValues.length > 0 && (
                <div style={{ width: '80%', margin: 'auto' }}>
                    <Line data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default GraphPlotter;





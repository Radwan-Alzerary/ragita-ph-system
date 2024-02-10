import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';

function OverViewSell() {
  const [chartData, setChartData] = useState({
    series: [70, 25,3],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'مجموع البيع',
              formatter: function (w) {
                return 249; // Custom formatter function
              },
            },
          },
        },
      },
      labels: ['عدد المبيعات', 'عدد المسترجعات', 'التالف'],
    },
  });

  return (


    
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={350}
      />
    </div>
  );
}

export default OverViewSell;

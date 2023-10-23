import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const sales = [4000, 3000, 2000, 2780, 1890, 2390, 3490 , 1000 , 9000 , 7000 , 3000 , 1500];
const xLabels = [
  "jan",
  "feb",
  "march",
  "april",
  "may",
  "june",
  "july",
  "Aug",
  "sep",
  "oct",
  "nov",
  "dec"
];


export default function SimpleLineChart(props) {
  return (
    <LineChart
      width={450}
      height={400}
      sx={{maxHeight:380,maxWidth:450}}
      series={[
        { data: sales, label: 'sales' },
       
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      
    />
  );
}
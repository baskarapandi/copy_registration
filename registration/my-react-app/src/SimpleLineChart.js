import   { useEffect, useState }  from 'react';
import { LineChart } from '@mui/x-charts/LineChart';






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
const lineChartColors = [
  '#1f77b4', // blue
  '#ff7f0e', // orange
  '#2ca02c', // green
  '#d62728', // red
  '#9467bd', // purple
  '#8c564b', // brown
  '#e377c2', // pink
  '#7f7f7f', // gray
  '#bcbd22', // yellow
  '#17becf', // cyan
];

export default function SimpleLineChart(props) {
  const [salesreport,setSalesreport]=useState(null);
  useEffect(() => {
    if (props.Sales !== salesreport) {
      setSalesreport(props.Sales);
    }
  }, [props.Sales]);

  if (salesreport == null || salesreport.length ==0) {
    return <p>Loading...</p>;
  }
  console.log(props.Sales)
  console.log(salesreport)
  console.log(props.newProductIndex)
  
  //const Salesreport = [4000, 3000, 2000, 2780, 1890, 2390, 3490 , 1000 , 9000 , 7000 , 3000 , 1500];
  
  
  return (
    <LineChart
      width={450}
      height={400}
      sx={{maxHeight:380,maxWidth:450}}
      series={salesreport.map((product,index) => ({
        data: product.sales,
        label: product.productName,
        color: getColorByIndex(props.newProductIndex[index])
      }))}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      
    />
  );
}
function getColorByIndex(index) {
  const colors = ['blue', 'green', 'red', 'purple', 'orange']; // Add more colors as needed
  return colors[index];
}
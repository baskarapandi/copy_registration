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
  
  //const Salesreport = [4000, 3000, 2000, 2780, 1890, 2390, 3490 , 1000 , 9000 , 7000 , 3000 , 1500];
  
  
  return (
    <LineChart
      width={450}
      height={400}
      sx={{maxHeight:380,maxWidth:450}}
      series={salesreport.map((product) => ({
        data: product.sales,
        label: product.productName
      }))}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      
    />
  );
}
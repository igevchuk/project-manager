import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';



export default ({ data, ...props }) => {
  console.log(data)
  // const data = {
  //   datasets: [{
  //     data: [300, 50, 100],
  //     backgroundColor: [
  //     '#FF6384',
  //     '#36A2EB',
  //     '#FFCE56'
  //     ],
  //   }]
  // };
  return <Doughnut data={data} {...props} width={120} height={120} options={{ maintainAspectRatio: false }} />
};
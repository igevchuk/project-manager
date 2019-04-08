import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';



export default ({ data, ...props }) => {
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
  return <Doughnut data={data} {...props} />
};
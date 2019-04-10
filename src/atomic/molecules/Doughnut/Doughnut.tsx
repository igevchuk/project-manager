import * as React from 'react';
import DonutChart from 'react-donut-chart';

export default ({ data, colors, options: propOptions }) => {
  const getDefaultOptions = () => ({
    clickToggle: false,
    innerRadius: 0.5,
    height: 120,
    legend: false,
    onClick: false,
    onMouseEnter: false,
    outerRadius: 1,
    selectedOffset: false,
    startAngle: 0,
    strokeColor: false,
    width: 120
  })

  const options = {...getDefaultOptions(), ...propOptions}

  return (
    <DonutChart {...options} colors={colors} data={data} />
  )
};
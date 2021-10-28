import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
    title: {
        text: 'My chart'
    },
    series: [{
        data: [1, 2, 3]
    }]
}

export default function Statistic(){
    return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
    );
}

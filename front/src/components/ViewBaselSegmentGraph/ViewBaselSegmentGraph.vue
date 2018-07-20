<script>
import { Line } from 'vue-chartjs'

export default {
    name: 'ViewBaselSegmentGraph',

    extends: Line,
    data () {
        return {
            data: {
                    labels: ['December-17', 'February-18', 'March-18', 'April-18', 'May-18', 'June-18', 'July-18', 'August-18'],
                    boxWidth:2,
                    datasets: [
                        {
                            label: 'Corporate',
                            backgroundColor: 'rgba(150,150,0,1)',
                            borderColor:'rgba(150,150,0,1)',
                            data:[40, 20, 3, 2, 3, , 40, 20],
                            spanGaps:true,
                            fill:false
                        }, {
                            label: 'Financial instructions',
                            backgroundColor: 'rgba(0,150,150,1)',
                            borderColor:'rgba(0,150,150,1)',
                            data:[40, 20, 3, 2, 30, 20, 40, 20],
                            spanGaps:true,
                            fill:false
                        }
                ]
            },
            options :{
                title: {
                    display:true,
                    text: 'Distribution of grades',
                    fontSize:'15'
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            offsetGridLines: false
                        },
                        stacked:false
                    }],
                    yAxes: [{
                        categoryPercentage: 0.5,
                        barPercentage: 0.8,
                        gridLines: {
                            offsetGridLines: true,
                            display:false
                        },
                        stacked:false
                    }]
                },
                cornerRadius:20,
                responsive: true,
                maintainAspectRatio: false,
            },
        }
    },
    mounted () {
        this.renderChart(this.data, this.options)
    },
}
</script>
<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
    name: 'ViewEconomicSectorGraph',

    extends: HorizontalBar,
    data () {
        return {
            data: {
                    labels: ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'BBB', 'BB+', 'BB', 'BB-', 'B+', 'B', 'B-', 'CCC', 'CC+', 'CC', 'CC-', 'C+', 'C', 'C-', 'Default'],
                    boxWidth:2,
                    datasets: [
                        {
                            label: 'March-18',
                            backgroundColor: '#f87979',
                            data:[40, 20, 3, 2, 3, 70, 40, 20, 3, 2, 3, 70, 40, 20, 3, 2, 3, 70, 40, 20, 3, 0]
                        },
                        {
                            label: 'February-18',
                            backgroundColor:'orange',
                            data:[40, 20, 3, 2, 3, 70, 40, 20, 3, 2, 3, 70, 40, 20, 3, 2, 3, 70, 40, 20, 3, 0]
                        },
                        {
                            label: 'December-17',
                            backgroundColor:'lightgreen',
                            data:[40, 20, 3, 2, 3, 70, 40, 20, 3, 2, 3, 70, 40, 20, 3, 2, 3, 70, 40, 20, 3, 0]
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
                            offsetGridLines: true
                        },
                        stacked:false
                    }],
                    yAxes: [{
                        categoryPercentage: 0.5,
                        barPercentage: 0.8,
                        gridLines: {
                            offsetGridLines: true
                        },
                        // barThickness:7,
                        stacked:false
                    }]
                },
                cornerRadius:20,
                responsive: true,
                maintainAspectRatio: true,
            },
        }
    },
    mounted () {
        this.renderChart(this.data, this.options)
    },
}
</script>
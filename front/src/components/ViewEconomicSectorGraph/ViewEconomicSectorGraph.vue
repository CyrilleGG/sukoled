<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
    name: 'ViewEconomicSectorGraph',

    extends: HorizontalBar,
    props: ['data', 'options'],
    data () {
        return {
            // c
        }
    },
    mounted () {
        this.renderChart(this.data, this.options)
    },
}
</script>
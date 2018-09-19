<script>
import { Line } from 'vue-chartjs'

export default {
    name: 'ViewBaselSegmentGraph',

    extends: Line,
    props: ['data', 'options'],
    data () {
        return {
            // c
        }
    },
    mounted () {
        setTimeout(() => {
            this.renderChart(this.data, this.options)
        }, 3000);
    },
}
</script>
<script>
import { Bar } from 'vue-chartjs'

export default {
    name: 'ViewInternalRatingGraph',

    extends: Bar,
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
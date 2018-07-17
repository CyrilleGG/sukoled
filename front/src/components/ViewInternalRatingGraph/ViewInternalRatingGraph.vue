<template>
    <div>
        <p> hey </p>
        <canvas id="myChart" width="400" height="400"></canvas>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'

export default {
    name: 'ViewInternalRatingGraph',

    extends: Bar,
    mounted () {
        this.renderChart(data, options)
    },

    data (){
        data: {
        labels:['January', 'February'];
        datasets:[
            {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: [40, 20]
            }
        ]}
    }
}
</script>

<style scoped>
template p {
    background-color:white;
}
</style>
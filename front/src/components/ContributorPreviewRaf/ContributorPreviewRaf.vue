<template>
      <div id="preview-raf" class="col-lg-8  my-auto mx-auto">



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your contribution</h3>

          <div class="col-lg-12 pl-5">
            <div class="row pl-3">

              <table class="col-lg-11 d-block mb-3 rounded">
                <tr class="row">

                  <th class="col-lg-4 py-3 pl-3">Name</th>
                  <th class="col-lg-2 py-3 text-center">{{ lastMonth () }}</th>
                  <th class="col-lg-2 py-3 text-center">{{ month () }}</th>
                  <th class="col-lg-2 py-3 text-center">Limit</th>
                  <th class="col-lg-2 py-3 text-center">Threshold</th>

                </tr>
                <tr class="row">

                  <td class="col-lg-4 py-3 pl-3">{{ inputs.contribution_values.input_name }}</td>
                  <td class="col-lg-2 py-3 text-center">xx-1</td>
                  <td class="col-lg-2 py-3 text-center new">{{ inputs.contribution_values.input_value }}</td>
                  <td class="col-lg-2 py-3 text-center">{{ inputs.contribution_limit }}</td>
                  <td class="col-lg-2 py-3 text-center">{{ inputs.contribution_threshold }}</td>

                </tr>
              </table>

            </div>
          </div>
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your comments</h3>
          <p class="col-lg-12 mb-3 pl-5">{{ inputs.comment_contributor }}</p>
        </div>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './', query: { contribution_id: inputs.contribution_id, version_id: inputs.version_id } }" size="md">Back</b-button>
          <b-button class="ml-auto green"  v-on:click="sendContribution ()" size="md">Confirm</b-button>
        </div>

      </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

export default {
  name: 'ContributorPreviewRaf',

  components: {
    // c
  },

  props: [
    'inputs'
  ],

  methods: {
    month () {
      return moment().subtract(1, 'months').format('MMMM')
    },

    lastMonth () {
      return moment().subtract(2, 'months').format('MMMM')
    },

    sendContribution () {
      const inputs = this.$props.inputs
      axios.post('http://localhost:3000/api/contributionRaf/'+ inputs.version_id, inputs)
        .then((response) => {
          this.$router.replace( {name: 'contributor'} )
        })
        .catch((error) => {
          console.log(error)
        })
      
      this.$root.$data.formInput = null
    }
  }
}
</script>

<style scoped>

#preview-raf .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#preview-raf .step {
  left: -25px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#preview-raf h3 {
  font-size: 1.2rem;
}

#preview-raf table {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

#preview-raf table tr:first-child {
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

#preview-raf table .new {
  background-color: rgba(126,68,170, 0.2);
}

#preview-raf .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#preview-raf .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#preview-raf .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#preview-raf .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#preview-raf .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#preview-raf .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>
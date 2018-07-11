<template>
      <b-form id="form-raf" class="col-lg-6  my-auto mx-auto">



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-5 pl-5">Share your contribution</h3>

          <div class="col-lg-12 pl-5">
            <div class="row pl-3">

              <div v-for="(input, index) in data.inputs" v-bind:key="index" v-if="input.input_type !== 'textarea'" class="col-lg-12 pl-0">
                <label :for="input.input_slug">{{ input.input_name }}</label>
                <b-form-input :id="input.input_slug" class="d-inline-block w-25 ml-2" v-model="inputs.contribution_values[input.input_id]" :type="input.input_type" :name="input.input_slug"></b-form-input>
                <p class="d-inline-block ml-3">in million</p>
              </div>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-2 pl-5">Write your comments</h3>
          <p class="col-lg-12 mb-5 pl-5">Write down your comments and annotations, regarding your contribution</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-textarea id="comments" class="col-lg-12" v-model="inputs.comment_contributor" placeholder="Write your comments..." :rows="4" name="comments"></b-form-textarea>

            </div>
          </div>
        </b-form-group>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="ml-auto green" v-on:click="sendContribution ()" size="md">Submit</b-button>
        </div>

      </b-form>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  name: 'ContributorFormRaf',

  components: {
    // c
  },

  props: [
    'data'
  ],

  data () {
    return {
      inputs: {
        contribution_values: {},
        comment_contributor: '',
        version_id: this.$route.query.version_id,
        user_id: this.$root.$data.userInfo.user_id
      }
    }
  },

  methods: {
    sendContribution () {
      const inputs = this.$data.inputs
      axios.post('http://localhost:3000/api/contributionRaf/'+ inputs.version_id, inputs)
        .then((response) => {
          this.$router.replace( {name: 'contributor'} )
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

#form-raf .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#form-raf .step {
  left: -25px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#form-raf h3 {
  font-size: 1.2rem;
}

#form-raf textarea {
  border: none;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
}

#form-raf #confirm span {
  color: #8e44ad;
}

#form-raf #confirm #display-message {
  color: #999999;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
}

#form-raf .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#form-raf .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#form-raf .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#form-raf .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#form-raf .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#form-raf .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>
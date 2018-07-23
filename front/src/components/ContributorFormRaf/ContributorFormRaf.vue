<template>
      <b-form id="form-raf" class="col-lg-6  my-auto mx-auto">



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-0 pl-5">Enter your RAF contribution</h3>
          <p class="col-lg-12 mb-5 pl-5 font-italic">{{ data.contribution[0].name }}</p>

          <div class="col-lg-12 pl-5">
            <div class="row pl-3">

              <div v-for="(input, index) in data.inputs" v-bind:key="index" v-if="input.input_type !== 'textarea'" class="col-lg-12 pl-0">
                <label :for="input.input_slug">{{ input.input_name }}</label>
                <b-form-input :id="input.input_slug" class="d-inline-block w-25 ml-2" v-model="inputs.contribution_values.input_value" :type="input.input_type" :name="input.input_slug" autocomplete="off"></b-form-input>
                <p class="d-inline-block ml-3">in millions</p>
              </div>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-3 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-2 pl-5">Write your remarks</h3>
          <p class="col-lg-12 mb-5 pl-5">Enter your comments and annotations</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-textarea id="comments" class="col-lg-12" v-model="inputs.comment_contributor" placeholder="Write here..." :rows="8" :no-resize="true" name="comments"></b-form-textarea>

            </div>
          </div>
        </b-form-group>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="ml-auto green" v-on:click="submit ()" size="md">Submit</b-button>
        </div>

      </b-form>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'

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
        contribution_values: {
          input_id: this.$props.data.inputs[0].input_id,
          input_name: this.$props.data.inputs[0].input_name,
          input_value: ''
        },
        comment_contributor: '',
        version_id: this.$route.query.version_id,
        user_id: this.$root.$data.userInfo.user_id,
        contribution_id: this.$route.query.contribution_id,
        contribution_limit: this.$props.data.contribution[0].limit,
        contribution_threshold: this.$props.data.contribution[0].threshold,
        department_slug: this.$props.data.department_slug
      }
    }
  },

  created() {
    const formInput = this.$root.$data.formInput
    if (formInput !== null) {
      this.$data.inputs.contribution_values.input_value = formInput.contribution_values.input_value
      this.$data.inputs.comment_contributor = formInput.comment_contributor
    }
  },

  methods: {
    submit () {
      this.$root.$data.formInput = this.$data.inputs
      this.$router.replace( {name: 'contributor-preview-contribution'} )
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
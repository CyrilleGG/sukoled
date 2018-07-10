<template>
      <div id="preview-lease" class="col-lg-6  my-auto mx-auto">



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your contribution</h3>

          <div class="col-lg-12 pl-5">
            <div v-if="this.$data.input.excel !== null" class="row pl-3">

              <!-- <table class="col-lg-11 d-block mb-3 rounded">
                <tr class="row">

                  <th class="col-lg-6 py-3 pl-5">Name</th>
                  <th class="col-lg-2 py-3 text-center">January</th>
                  <th class="col-lg-2 py-3 text-center">February</th>
                  <th class="col-lg-2 py-3 text-center">March</th>

                </tr>
                <tr class="row">

                  <td class="col-lg-6 py-3 pl-5">Q1Gross EAD*</td>
                  <td class="col-lg-2 py-3 text-center">€ 7,2 m</td>
                  <td class="col-lg-2 py-3 text-center">€ 7,2 m</td>
                  <td class="col-lg-2 py-3 text-center last">€ 7,2 m</td>

                </tr>
                <tr class="row">

                  <td class="col-lg-6 py-3 pl-5">Net EAD*</td>
                  <td class="col-lg-2 py-3 text-center">€ 80 bm</td>
                  <td class="col-lg-2 py-3 text-center">€ 80 bm</td>
                  <td class="col-lg-2 py-3 text-center last">€ 80 bm</td>

                </tr>
              </table> -->
              {{ this.$data.input.excel }}

            </div>
          </div>
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your comments</h3>
          <!-- <p class="col-lg-12 mb-3 pl-5">{{input.comments}}</p> -->
          <!-- <b-form-textarea id="comments" class="col-lg-12" v-model="input.comments" placeholder="Write your comments..." :rows="4" name="comments"></b-form-textarea> -->
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">3</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your highlights</h3>
          <!-- <p class="col-lg-12 mb-3 pl-5">{{input.highlights}}</p> -->
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">4</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your additional elements</h3>
          <!-- <p class="col-lg-12 mb-3 pl-5">{{additionalFiles}}</p> -->
        </div>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="ml-auto green" size="md" v-on:click.prevent='sendContribution()'>Confirm</b-button>
        </div>

      </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  name: 'ContributorPreviewLease',

  components: {
    // c
  },

  data () {
    return {
      input: null
    }
  },

  created(){
    this.$data.input = this.$root.$data.formInput
  },

  methods: {
    sendContribution () {

      // console.log(this.$data)

      const self = this
      console.log(self.$data.input.excel)

      var blob = new Blob([self.$data.input.excel], {
        // type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        type : 'text/plain'
      });

      const reader = new FileReader();

      // This fires after the blob has been read/loaded.
      reader.addEventListener('loadend', (e) => {
        let data = new FormData();
        data.append('file_binary', e.srcElement.result);
        data.append('comment_contributor', '');
        data.append('highlight', '');
        data.append('user_id', self.$root.$data.userInfo.user_id);

        // Envoyer les valeurs des inputs au back
        if (self.$data.input.excel !== null) {

          axios.post('http://localhost:3000/api/contributionFiliale/08afc17f-cdfc-403c-be2f-67146bc1c279', data,
          {
            headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded'
              // 'Content-Type': 'multipart/form-data'
              'Content-Type': 'multipart/form-data'
            }
          }
          )
            .then((response) => {
              console.log('Success!')
            })
            .catch((error) => {
              console.log('NOPE')
            })

        } else {
          console.log('Please, complete every step')
        }
      });

      // Start reading the blob as text.
      reader.readAsText(blob);
    }
  }
}
</script>

<style scoped>

#preview-lease .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#preview-lease .step {
  left: -25px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#preview-lease h3 {
  font-size: 1.2rem;
}

#preview-lease table {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

#preview-lease table tr:first-child {
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

#preview-lease table .last {
  background-color: rgba(126,68,170, 0.2);
}

#preview-lease .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#preview-lease .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#preview-lease .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#preview-lease .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#preview-lease .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#preview-lease .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>

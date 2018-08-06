<template>
      <div id="preview-lease" class="col-lg-6  my-auto mx-auto">



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your contribution</h3>

          <div class="col-lg-12 pl-5">
            <div v-if="inputs.excel !== null" class="row pl-3">

              <table class="col-lg-11 d-block mb-3 rounded">
                <tr class="row">

                  <th class="col-lg-8 py-3 pl-5">Name</th>
                  <th class="col-lg-4 py-3 text-center">{{ quarter () }}</th>

                </tr>
                <tr v-for="(value, key, index) in json" class="row" :key="index">

                  <td class="col-lg-8 py-3 pl-5"> {{ key }} </td>
                  <td class="col-lg-4 py-3 text-center last">{{ value }}</td>

                </tr>
              </table>

            </div>
          </div>
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your comments</h3>
          <p v-if="inputs.comment_contributor !== '' || null" v-html="inputs.comment_contributor" class="col-lg-12 mb-3 pl-5"></p>
          <p v-else class="col-lg-12 mb-3 pl-5 text-danger">You didn't write any comment for this contribution</p>
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">3</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your highlights</h3>
          <p v-if="inputs.highlight !== '' || null" v-html="inputs.highlight" class="col-lg-12 mb-3 pl-5"></p>
          <p v-else class="col-lg-12 mb-3 pl-5 text-danger">You didn't write any highlight for this contribution</p>
        </div>



        <div id="additional-elements" class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">4</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview of other elements</h3>
          <div class="col-lg-12 my-2" v-if="inputs.additionalFiles.length > 0">
            <div v-for="(file, index) in inputs.additionalFiles" class="mb-2" :key="index">
              <img v-if="file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/svg+xml'" :id="index" :alt="file.name">
              <div v-else>
                <img src="@/assets/icons/file.png" class="d-inline-block icon" height="35px" alt="Additional file">
                <p class="d-inline-block ml-3">{{ file.name }}</p>
              </div>
            </div>
          </div>
          <p v-else class="col-lg-12 mb-3 pl-5 text-danger">You didn't upload any additional element for this contribution</p>
        </div>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './', query: { contribution_id: inputs.contribution_id, version_id: inputs.version_id } }" replace size="md">Back</b-button>
          <b-button class="ml-auto green" size="md" v-on:click.prevent='sendContribution()'>Confirm</b-button>
        </div>

      </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { http } from '../../http'
import moment from 'moment'

export default {
  name: 'ContributorPreviewLease',

  components: {
    // c
  },

  props: [
    'inputs'
  ],

  data () {
    return {
      json: null,
      files: null
    }
  },

  created() {
    this.$data.json = JSON.parse(this.$props.inputs.json)
  },

  mounted() {
    this.readFiles ()
  },

  methods: {
    quarter () {
      return 'Q' + moment(this.$props.inputs.date).subtract(1, 'quarters').format('Q YYYY')
    },

    lastMonth () {
      return moment().subtract(2, 'months').format('MMMM')
    },

    readFiles () {
      const files = this.$props.inputs.additionalFiles

      files.forEach((file, i) => {
        if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/svg+xml') {
          var output = document.getElementById(i)
          var reader = new FileReader()

          reader.addEventListener('load', function() {
            output.src = reader.result
          }, false)

          reader.readAsDataURL(file)
        }
      })
    },

    readmultifiles(arrayOfFiles) {
      var files = []
      var reader = new FileReader();  
      function readFile(index) {
        if (index >= arrayOfFiles.length) return;
        var file = arrayOfFiles[index];
        reader.onload = function(e) {
          // get file content
          var bin = e.target.result;
          // do sth with bin
          files.push(bin)
          readFile(index+1)
        }
        reader.readAsBinaryString(file);
      }
      readFile(0);
      this.$data.files = files
    },
    
    sendContribution () {
      const version_id = this.$props.inputs.version_id
      const self = this;
      var files = [];
      
      files.push(self.$props.inputs.excel);
      self.$props.inputs.additionalFiles.forEach(file => {
        files.push(file);
      });

      var blob = new Blob([files], {
        type : 'text/plain'
      });

      this.readmultifiles(files);

      let additionalFilesNames = '';
      let additionalFilesTypes = '';
      self.$props.inputs.additionalFiles.forEach(file => {
        if (additionalFilesNames == '') {
          additionalFilesNames = file.name;
        } else {
          additionalFilesNames = additionalFilesNames + ',' + file.name;
        }
        if (additionalFilesTypes == '') {
          additionalFilesTypes = file.type;
        } else {
          additionalFilesTypes = additionalFilesTypes + ',' + file.type;
        }
      });


      setTimeout(() => {
        // This fires after the blob has been read/loaded.
        let data = new FormData();
        data.append('file_csv', self.$props.inputs.csv);
        data.append('file_json', self.$props.inputs.json);
        data.append('comment_contributor', self.$props.inputs.comment_contributor);
        data.append('highlight', self.$props.inputs.highlight);
        data.append('contribution_id', self.$props.inputs.contribution_id);
        data.append('user_id', self.$root.$data.userInfo.user_id);
        this.$data.files.forEach((file, i) => {
          data.append('file_' + i, file);
        });
        data.append('files_names', additionalFilesNames);
        data.append('files_types', additionalFilesTypes);

        // Envoyer les valeurs des inputs au back
        if (self.$props.inputs.excel !== null) {

          http.post('contributionFiliale/' + version_id, data,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          )
            .then((response) => {
              this.$router.replace( {name: 'contributor'} )
            })
            .catch((error) => {
              console.log(error)
            })

        } else {
          console.log('Please, complete every step')
        }
      }, 100)
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

#preview-lease #additional-elements img {
  height: 200px;
}

#preview-lease #additional-elements .icon {
  width: 35px;
  height: 35px;
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

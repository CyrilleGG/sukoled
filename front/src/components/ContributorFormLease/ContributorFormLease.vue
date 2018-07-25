<template>
      <b-form id="form-lease" class="col-lg-6  my-auto mx-auto">



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-2 pl-5">Share your contribution</h3>
          <p class="col-lg-12 mb-5 pl-5">Upload your Excel file and wait until it is uploaded. The file must be in the required format.</p>

          <div class="col-lg-12 pl-5">
            <div class="row pl-3">

              <div id="excel-input" class="d-flex align-items-center mb-3">
                <label id="excel-label" class="d-flex align-items-center mb-0 rounded" for="excel">
                  <div id="upload-img" class="d-flex justify-content-center align-items-center">
                    <img v-if="inputs.excel == null" src="@/assets/icons/upload.png" width="30px" alt="Upload">
                    <img v-if="inputs.excel !== null" src="@/assets/icons/checked.png" width="30px" alt="Upload">
                  </div>

                  <span v-if="inputs.excel == null" id="upload-text" class="text-center text-uppercase">Upload</span>
                  <span v-if="inputs.excel !== null" id="upload-text" class="text-center text-uppercase text-white">Uploaded</span>
                </label>

                <p v-if="inputs.excel !== null" id="file-name" class="mb-0 ml-3">{{ inputs.excel.name }}</p>

                <input id="excel" ref="excel" class="d-none" v-on:change="uploadExcel ()" type="file" name="excel">

              </div>

              <p id="download" class="col-lg-12">or download <a href="#" download="TEMPLATE.xlsx">the example (200 Mo)</a></p>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-2 pl-5">Write your comments</h3>
          <p class="col-lg-12 mb-5 pl-5">Enter your comments and annotations</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-textarea id="comments" class="col-lg-12" v-model="inputs.comment_contributor" placeholder="Write here..." :rows="8" :no-resize="true" name="comments"></b-form-textarea>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">3</span>

          <h3 class="col-lg-12 mb-2 pl-5">Write your highlights</h3>
          <p class="col-lg-12 mb-5 pl-5">Enter your highlights regarding your contribution</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-textarea id="highlights" class="col-lg-12" v-model="inputs.highlight" placeholder="Write here..." :rows="8" :no-resize="true" name="highlights"></b-form-textarea>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-3 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">4</span>

          <h3 class="col-lg-12 mb-2 pl-5">Add other elements (optional)</h3>
          <p class="col-lg-12 mb-5 pl-5">You can add a text file or an image representing a graphic or other</p>

          <div class="col-lg-12 pl-5">
            <div class="row pl-3">

              <div class="col-lg-12 my-2" v-for="(file, index) in inputs.additionalFiles" v-if="inputs.additionalFiles !== []" :key="index">
                <img src="@/assets/icons/file.png" class="d-inline-block" width="35px" alt="Additional file">
                <p class="d-inline-block ml-3">{{ file.name }}</p>
                <img src="@/assets/icons/close.png" class="d-inline-block ml-3 delete" v-on:click="deleteFile (file.name)" width="10px" alt="Delete file">
              </div>

              <div id="additional-files-input" class="col-lg-12 my-2">
                <label id="additional-files-label" class="text-uppercase" for="additional-files">
                  <span class="d-inline-block mr-3 rounded-circle text-center align-middle font-weight-light">+</span> Add elements
                </label>
                <input id="additional-files" class="d-none" ref="additionalFilesInput" v-on:change="uploadFile ()" type="file" name="additional-files">
                <!-- <p id="highlights" class="col-lg-12" v-model="inputs.additionalFiles" placeholder="Write your highlights..." :rows="4" name="highlights"></p> -->
              </div>

            </div>
          </div>
        </b-form-group>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="ml-auto green" v-on:click="inputs.comment_contributor = inputs.comment_contributor.replace(/\n/g, '<br>'); inputs.highlight = inputs.highlight.replace(/\n/g, '<br>'); submit ()" size="md">Submit</b-button>
        </div>

      </b-form>
</template>

<script>
import xlsx from 'xlsx'

export default {
  name: 'ContributorFormLease',

  components: {
    // c
  },

  props: [
    'data'
  ],

  data () {
    return {
      inputs: {
        excel: null,
        csv: null,
        json: null,
        comment_contributor: '',
        highlight: '',
        additionalFiles: [],
        version_id: this.$route.query.version_id,
        user_id: this.$root.$data.userInfo.user_id,
        contribution_id: this.$route.query.contribution_id,
        department_slug: this.$props.data.department_slug
      }
    }
  },

  created() {
    const formInput = this.$root.$data.formInput
    if (formInput !== null) {
      this.$data.inputs.comment_contributor = formInput.comment_contributor
      this.$data.inputs.highlight = formInput.highlight
    }
  },


  methods: {
    uploadExcel () {
      this.$data.inputs.excel = this.$refs.excel.files[0]
      document.getElementById('upload-img').style.background = 'linear-gradient(#2ecc71, #29b362)'
      document.getElementById('upload-text').style.background = '#2ecc71'
    },

    uploadFile () {
      this.$data.inputs.additionalFiles.push(this.$refs.additionalFilesInput.files[0])
    },

    deleteFile (filename) {
      this.$data.inputs.additionalFiles.forEach((file, index) => {
        if (file.name == filename) {
          this.$data.inputs.additionalFiles.splice(index, 1)
        }
      })
    },

   submit () {
      const self = this;

      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        const wb = xlsx.read(e.srcElement.result, {
            type: 'binary',
            bookType: 'xlsx'
        });

        const ws = wb.Sheets[wb.SheetNames[0]];

        const csv = xlsx.utils.sheet_to_csv(ws, {
            FS: ";"
        });

        const json = xlsx.utils.sheet_to_json(ws, {});

        self.$data.inputs.csv = csv
        self.$data.inputs.json = JSON.stringify(json[0])

        self.$root.$data.formInput = self.$data.inputs
        self.$router.replace( {name: 'contributor-preview-contribution'} )
      });

      reader.readAsBinaryString(self.$data.inputs.excel);
    }
  }
}
</script>

<style scoped>

#form-lease .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#form-lease .step {
  left: -25px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#form-lease h3 {
  font-size: 1.2rem;
}

#form-lease #excel-input #excel-label {
  overflow: hidden;
  transition: 0.3s ease;
}

#form-lease #excel-input #excel-label:hover {
  cursor: pointer;
  box-shadow: 0 5px 3px rgba(0,0,0,0.2);
}

#form-lease #excel-input #excel-label #upload-img {
  height: 60px;
  width: 60px;
  background: linear-gradient(#eeeeee, #dedede);
  transition: 0.3s ease;
}

#form-lease #excel-input #excel-label span {
  line-height: 60px;
  width: 200px;
  font-size: 1.2rem;
  color: #999999;
  background-color: #eeeeee;
  transition: 0.3s ease;
}

#form-lease #download {
  font-size: 0.9rem;
}

#form-lease #download a {
  color: #007bff;
  text-decoration: underline;
}

#form-lease textarea {
  border: none;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
}

#form-lease .delete:hover {
  cursor: pointer;
}

#form-lease #additional-files-input #additional-files-label {
  color: #8e44ad;
}

#form-lease #additional-files-input #additional-files-label:hover {
  cursor: pointer;
}

#form-lease #additional-files-input #additional-files-label span {
  width: 35px;
  line-height: 35px;
  font-size: 1.8rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#form-lease #confirm span {
  color: #8e44ad;
}

#form-lease #confirm #display-message {
  color: #999999;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
}

#form-lease .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#form-lease .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#form-lease .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#form-lease .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#form-lease .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#form-lease .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>

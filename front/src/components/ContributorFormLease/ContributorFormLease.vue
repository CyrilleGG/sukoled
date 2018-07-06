<template>
      <b-form id="form-lease" class="col-lg-6  my-auto mx-auto">



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-2 pl-5">Share your contribution</h3>
          <p class="col-lg-12 mb-5 pl-5">Upload your new Excel file here and wait until it is uploaded. The file must be in the required format.</p>

          <div class="col-lg-12 pl-5">
            <div class="row pl-3">

              <div id="excel-input" class="d-flex align-items-center mb-3">
                <label id="excel-label" class="d-flex align-items-center mb-0 rounded" for="excel">
                  <div id="upload-img" class="d-flex justify-content-center align-items-center">
                    <img v-if="this.input.excel == null" src="@/assets/icons/upload.png" width="30px" alt="Upload">
                    <img v-if="this.input.excel !== null" src="@/assets/icons/checked.png" width="30px" alt="Upload">
                  </div>

                  <span v-if="this.input.excel == null" id="upload-text" class="text-center text-uppercase">Upload</span>
                  <span v-if="this.input.excel !== null" id="upload-text" class="text-center text-uppercase text-white">Uploaded</span>
                </label>

                <p v-if="this.input.excel !== null" id="file-name" class="mb-0 ml-3">{{ this.input.excel.name }}</p>

                <input id="excel" ref="excel" class="d-none" v-on:change="uploadExcel ()" type="file" name="excel">

              </div>

              <p id="download" class="col-lg-12">or download <a href="#">the example (200 Mo)</a></p>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-2 pl-5">Modify your comments</h3>
          <p class="col-lg-12 mb-5 pl-5">Write down your comments and annotations, regarding your contribution</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-textarea id="comments" class="col-lg-12" v-model="input.comments" placeholder="Write your comments..." :rows="4" name="comments"></b-form-textarea>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">3</span>

          <h3 class="col-lg-12 mb-2 pl-5">Modify your highlights</h3>
          <p class="col-lg-12 mb-5 pl-5">Write down your highlights regarding your contribution</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-textarea id="highlights" class="col-lg-12" v-model="input.highlights" placeholder="Write your highlights..." :rows="4" name="highlights"></b-form-textarea>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">4</span>

          <h3 class="col-lg-12 mb-2 pl-5">Add other elements</h3>
          <p class="col-lg-12 mb-5 pl-5">You can upload additional elements (text, image) in order to complete your contribution</p>

          <div class="col-lg-12 pl-5">
            <div class="row pl-3">

              <div id="additional-files-input">
                <label id="additional-files-label" class="text-uppercase" for="excel">
                  <span class="d-inline-block mr-3 rounded-circle text-center align-middle font-weight-light">+</span> Add elements
                </label>
                <input id="additional-files" ref="additionalFiles" class="d-none" v-on:change="uploadFile ()" type="file" name="additional-files">
                <!-- <p id="highlights" class="col-lg-12" v-model="input.additionalFiles" placeholder="Write your highlights..." :rows="4" name="highlights"></p> -->
              </div>

            </div>
          </div>
        </b-form-group>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="ml-auto green" v-on:click="transfer ()" :to="{ path: 'preview'}" append size="md">Submit</b-button>
        </div>

      </b-form>
</template>

<script>
export default {
  name: 'ContributorFormLease',

  components: {
    // c
  },

  data () {
    return {
      input: {
        excel: null,
        comments: '',
        highlights: '',
        additionalFiles: []
      }
    }
  },

  methods: {
    uploadExcel () {
      this.$data.input.excel = this.$refs.excel.files[0]
      console.log(this.$data.input.excel.name)
      document.getElementById('upload-img').style.background = 'linear-gradient(#2ecc71, #29b362)'
      document.getElementById('upload-text').style.background = '#2ecc71'
    },

    uploadFile () {
      this.$data.input.additionalFiles.push(this.$refs.additionalFiles.files[0])
    },

    transfer () {
      this.$root.$data.formInput=this.$data.input
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
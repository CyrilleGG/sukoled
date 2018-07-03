<template>
  <div id="ContributorAddContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <b-form id="new-campaign" class="col-lg-6  my-auto mx-auto">



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-2 pl-5">Share your contribution</h3>
          <p class="col-lg-12 mb-5 pl-5">Upload your Excel file here and wait until it is uploaded. The file must be in the required format.</p>

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

          <h3 class="col-lg-12 mb-2 pl-5">Write your comments</h3>
          <p class="col-lg-12 mb-5 pl-5">Write down your comments and annotations, regarding your contribution</p>

          <div class="col-lg-12 pl-5">
            <div class="row">

              <b-form-textarea id="comments" class="col-lg-12" v-model="input.comments" placeholder="Write your comments..." :rows="4" name="comments"></b-form-textarea>

            </div>
          </div>
        </b-form-group>



        <b-form-group class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">3</span>

          <h3 class="col-lg-12 mb-2 pl-5">Write your highlights</h3>
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
              </div>

            </div>
          </div>
        </b-form-group>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="ml-auto green" size="md" v-b-modal.confirm>Submit</b-button>
        </div>

        <b-modal id="confirm" ref="confirm" hide-footer>
          <p>You are about to add a contribution with the following information:</p>
          <p>Excel file:  {{ this.input.excel.name }}</p>
          <p>Your comments:</p>
          <p class="font-italic">{{ input.comments }}</p>
          <p>Your highlights:</p>
          <p class="font-italic">{{ input.highlights }}</p>
          <p>Additional files:</p>
          <ul>
            <li>file</li>
          </ul>
          <b-button size="md" v-on:click="closeModal ()">Cancel</b-button>
          <b-button class="green" :to="{ path: './'}" replace size="md">Confirm</b-button>
        </b-modal>

      </b-form>
    </div>

    <Footer />
    
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  name: 'ContributorAddContribution',

  components: {
    Header,
    Footer
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

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'user') {
      this.$router.replace({ name: 'viewer' })
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

    closeModal () {
      this.$refs.confirm.hide()
    }
  }
}
</script>

<style scoped>

#ContributorAddContribution .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#ContributorAddContribution .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#ContributorAddContribution .step {
  left: -25px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#ContributorAddContribution h3 {
  font-size: 1.2rem;
}

#ContributorAddContribution .list-group {
  max-height: 160px;
  overflow: scroll;
}

#ContributorAddContribution #excel-input #excel-label {
  overflow: hidden;
  transition: 0.3s ease;
}

#ContributorAddContribution #excel-input #excel-label:hover {
  cursor: pointer;
  box-shadow: 0 5px 3px rgba(0,0,0,0.2);
}

#ContributorAddContribution #excel-input #excel-label #upload-img {
  height: 60px;
  width: 60px;
  background: linear-gradient(#eeeeee, #dedede);
  transition: 0.3s ease;
}

#ContributorAddContribution #excel-input #excel-label span {
  line-height: 60px;
  width: 200px;
  font-size: 1.2rem;
  color: #999999;
  background-color: #eeeeee;
  transition: 0.3s ease;
}

/* #ContributorAddContribution #excel-input #file-name {
  line-height: 60px;
} */

#ContributorAddContribution #download {
  font-size: 0.9rem;
}

#ContributorAddContribution #download a {
  color: #007bff;
  text-decoration: underline;
}

#ContributorAddContribution textarea {
  border: none;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
}

#ContributorAddContribution #additional-files-input #additional-files-label {
  color: #8e44ad;
}

#ContributorAddContribution #additional-files-input #additional-files-label:hover {
  cursor: pointer;
}

#ContributorAddContribution #additional-files-input #additional-files-label span {
  width: 35px;
  line-height: 35px;
  font-size: 1.8rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#ContributorAddContribution #confirm span {
  color: #8e44ad;
}

#ContributorAddContribution #confirm #display-message {
  color: #999999;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
}

#ContributorAddContribution .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#ContributorAddContribution .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#ContributorAddContribution .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#ContributorAddContribution .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#ContributorAddContribution .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#ContributorAddContribution .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>
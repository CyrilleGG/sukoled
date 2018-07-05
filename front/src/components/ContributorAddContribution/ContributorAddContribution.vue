<template>
  <div id="ContributorAddContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <contributor-form-lease v-if="this.department == 'lease'" />
      <contributor-form-raf v-if="this.department == 'raf'" />
    </div>

    <Footer />
    
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ContributorFormLease from '@/components/ContributorFormLease/ContributorFormLease'
import ContributorFormRaf from '@/components/ContributorFormRaf/ContributorFormRaf'

export default {
  name: 'ContributorAddContribution',

  components: {
    Header,
    Footer,
    ContributorFormLease,
    ContributorFormRaf
  },

  data () {
    return {
      department: 'lease'
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
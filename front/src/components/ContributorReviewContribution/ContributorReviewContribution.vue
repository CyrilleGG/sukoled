<template>
  <div id="ContributorReviewContribution" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />

    <div class="row py-5 page-content">
      <div class="col-lg-7  my-auto mx-auto">

        <div class="row mb-3 rounded py-4 px-5 content">

          <h3 class="col-lg-12 pl-0">Review your contribution</h3>
          <p class="col-lg-12 pl-0 font-italic">Watchlist exposures</p>

          <div id="admin-comment" class="col-lg-12 mb-4 rounded p-3">
            <img src="@/assets/icons/warning.png" width="40px" alt="Warning">
            <p class="d-inline-block mb-0 ml-3">Admin's comment</p>
          </div>

          <table class="col-lg-12 d-block mb-4 rounded">
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
          </table>

          <p class="col-lg-12 mb-0 pl-0 font-weight-bold">Your comment</p>
          <p class="col-lg-12 mb-4 pl-0">The comment of the contributor for this contribution</p>

          <p class="col-lg-12 mb-0 pl-0 font-weight-bold">Your highlights</p>
          <p class="col-lg-12 mb-3 pl-0">The highlights for this contribution</p>

          <!-- <b-form id="request-modification" class="col-lg-11 mt-4">

            <b-form-group id="comment-group" class="row">
              <b-form-textarea id="comment" class="col-lg-12" v-model="comment" placeholder="Write your request..." :rows="4"></b-form-textarea>
            </b-form-group>

            <div class="row">
              <div class="col-lg-12 px-0 text-right">
                <b-button class="mx-1 purple" size="md" v-on:click="hideComment ()">Cancel</b-button>
                <b-button class="mx-1 orange" :to="{ path: './'}" replace size="md">Send Request</b-button>
              </div>
            </div>

          </b-form> -->
        </div>

        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="mx-1 ml-auto purple" :to="{ path: './'}" replace size="md">Modify the contribution</b-button>
        </div>

      </div>
    </div>

    <Footer />
    
  </div>
</template>

<script>
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default {
  name: 'ContributorReviewContribution',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      comment: ''
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
    displayComment () {
      const form = document.getElementById('request-modification')
      const actions = document.getElementById('actions')
      form.style.display = 'block'
      actions.style.display = 'none'
    },

    hideComment () {
      const form = document.getElementById('request-modification')
      const actions = document.getElementById('actions')
      form.style.display = 'none'
      actions.style.display = 'flex'
    }
  }
}
</script>

<style scoped>

#ContributorReviewContribution .page-content {
  margin-top: 70px;
  min-height: 85vh;
}

#ContributorReviewContribution .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#ContributorReviewContribution .step {
  left: -25px;
  top: 30px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#ContributorReviewContribution h3 {
  font-size: 1.2rem;
}

#ContributorReviewContribution #admin-comment {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

#ContributorReviewContribution #admin-comment p {
  line-height: 40px;
}

#ContributorReviewContribution table {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

#ContributorReviewContribution table tr:first-child {
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

#ContributorReviewContribution table .last {
  background-color: rgba(126,68,170, 0.2);
}

#ContributorReviewContribution #request-modification {
  display: none;
}

#ContributorReviewContribution #comment {
  border: none;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
}

#ContributorReviewContribution .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#ContributorReviewContribution .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#ContributorReviewContribution .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#ContributorReviewContribution .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#ContributorReviewContribution .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#ContributorReviewContribution .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>
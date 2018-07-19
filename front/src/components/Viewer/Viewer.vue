<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
      <div class="col-lg-10 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0 text-uppercase">Top 20</h2>
          <h4 class="col-lg-7 pl-0">Indicators in €m - (source : GCM/ Credit reporting. Financial Department)</h4>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>
        
        <div class="row">
          <div class="col-lg-9 pl-0">
            <view-top-20-list />
          </div>
          <div class="col-lg-3">
            <view-comment class="border right-column"
              v-for="(comment, index) in comments"
              v-bind:key="index"
              v-bind:title="comment.title"
              v-bind:comment="comment.comment"
            />



            <div id="view-comment" class="row">
              <div class="ml-4 mt-1 mr-4 mb-3 view-result-box">
                <div id="view-comment-header" class="text-center">
                  Result
                </div>

                <table class="table table-striped col-lg-2">
                  <view-result
                    v-for="(result, index) in results"
                    v-bind:key="index"
                    v-bind:date="result.date"
                    v-bind:number="result.number"
                  />
                </table>

              </div>
            </div>



          </div>
        </div>

      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import HeaderView from '@/components/HeaderView/HeaderView'
import Footer from '@/components/Footer/Footer'
import ViewTop20List from '@/components/ViewTop20List/ViewTop20List'
import ViewComment from '@/components/ViewComment/ViewComment'
import ViewResult from '@/components/ViewResult/ViewResult'

export default {
  name: 'Viewer',

  components: {
    Header,
    HeaderView,
    Footer,
    ViewTop20List,
    ViewComment,
    ViewResult
  },

  data () {
    return {
      comments: [
        {
            title:"Comments",
            comment:"The 20 biggest corporates represent 16.5% in the total corporate exposure as of end of Mars 2018 (compared to 16.7% as of end of February 2018)."
        }
      ],
      results: [
        {
          date:"2018-03-01 00:00:00",
          number:"20 931"
        },
        {
          date:"2018-02-01 00:00:00",
          number:"20 934"
        }
        ,{
          date:"2017-12-01 00:00:00",
          number:"20 937"
        }
        ,{
          date:"2016-12-01 00:00:00",
          number:"20 1000"
        }
      ]
    }
  },

  created () {
    if (!this.$parent.$data.auth) {
      this.$router.replace({ name: 'login' })
    } else if (this.$root.$data.userInfo.role == 'contrib') {
      this.$router.replace({ name: 'contributor' })
    }
  }
}
</script>

<style scoped>

#Viewer .page-content {
  margin-top: 98px;
  min-height: 85vh;
}

#Viewer .page-content h2 {
  font-size: 1.6rem;
}

#Viewer .page-content h4 {
  font-size: 1.2rem;
  color: #bbbbbb;
}

#Viewer .page-content .divider {
  background-color: #e7e7e7;
}

#Viewer .right-column {
  margin-bottom:15px;
}






#view-comment {
  border-radius: 5px 5px 0 0;
  background-color: #ffffff;
}

#view-comment #view-comment-header {
  height: 30px;
  font-weight:bold;
  color:purple;
  text-transform: uppercase;
}

.view-result-box {
    width:100%;
    margin-left:0 !important;
    margin-right:0 !important;
    margin-bottom:0 !important;
}

.box-content {
    margin-left: 1.5rem !important;
    margin-right: 1.5rem !important;
}

table {
    margin-bottom:0;
}

tr:first-child{
    font-weight: bold;
}

td {
    text-align:right
}


</style>

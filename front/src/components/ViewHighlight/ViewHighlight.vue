<template>
  <div id="Viewer" class="container-fluid">

    <Header :role="this.$root.$data.userInfo.role" />
    <header-view/>

    <div class="row py-5 page-content">
      <div class="col-lg-10 mx-auto">

        <div class="row mb-5">
          <h2 class="col-lg-12 pl-0">Highlights</h2>
          <h4 class="col-lg-7 pl-0">Grouping of different highlights of paper reporting</h4>

          <div class="w-100"></div>
          <div class="col-lg-12 mt-3 pt-1 divider"></div>
        </div>
        
        <div class="row">
          <div class="col-lg-12 comment">

            <view-highlight-comment class="border right-column"
              v-for="(comment, index) in comments"
              v-bind:key="index"
              v-bind:title="comment.title"
              v-bind:comment="comment.comment"
            />

          </div>
        </div>

      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import Header from '@/components/Header/Header'
import HeaderView from '@/components/HeaderView/HeaderView'
import Footer from '@/components/Footer/Footer'
import ViewHighlightComment from '@/components/ViewHighlightComment/ViewHighlightComment'

export default {
  name: 'ViewBusinessLine',

  components: {
    Header,
    HeaderView,
    Footer,
    ViewHighlightComment
  },

  data () {
    return {
        comments: [
            {
                title:"Comments",
                comment:"Highlight : first comment"
            },
            {
                title:"Comments",
                comment:"Highlight : second comment"
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
  },

  methods: {
    moment (date) {
      return moment(date).format('MMMM-YY')
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


.comment div div {
    color:white;
}


</style>

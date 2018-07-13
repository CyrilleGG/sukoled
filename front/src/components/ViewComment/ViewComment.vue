<template>

    <div id="view-comment" class="row">
        <div class="ml-4 mt-3 mr-4 mb-3">
            <div id="view-comment-header">
                {{ title }}
            </div>
            {{ comment }}
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    name: 'ViewComment',

    components: {
        // c
    },

    props: [
        'title',
        'comment'
    ]
}
</script>

<style scoped>

#view-comment {
  border-radius: 5px 5px 0 0;
  background-color: #ffffff;
}

#view-comment #view-comment-header {
  height: 30px;
  font-weight:bold;
}

</style>
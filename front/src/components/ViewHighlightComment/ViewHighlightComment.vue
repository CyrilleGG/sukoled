<template>

    <div id="view-comment" class="row">
        <div class=" mt-3  mb-3 container-highlight">
            <div id="view-comment-header" class="title-highlight">
                {{ title }}
            </div>
            <div class="comment-highlight">
                {{ comment }}
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    name: 'ViewHighlightComment',

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

.container-highlight {
    width:100%;
}

.comment-highlight {
    padding-right:1.5rem;
    padding-left:1.5rem
}

.title-highlight {
    color:lightblue;
    text-transform:uppercase;
    width:100%;
    padding-left:1.5rem;
    padding-right:1.5rem;
    padding-bottom:2.5rem;
    border-bottom:1px solid #dee2e6;
    margin-bottom:1em;
}

</style>
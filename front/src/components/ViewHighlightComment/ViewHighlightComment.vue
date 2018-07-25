<template>

    <div id="view-comment" class="row">
        <div class="mt-3 mb-3 container-highlight">
            <div id="view-comment-header" class="title-highlight">
                <p class="mb-0 text-uppercase">{{ name }}</p>
                <p class="font-italic">{{ department }}</p>
            </div>
            <div class="comment-highlight">
                {{ highlight }}
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
        'name',
        'department',
        'highlight'
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
    color:#999999;
    width:100%;
    padding-left:1.5rem;
    padding-right:1.5rem;
    padding-bottom:2.5rem;
    border-bottom:1px solid #dee2e6;
    margin-bottom:1em;
}

.title-highlight p {
    font-size: 0.8rem;
}

</style>
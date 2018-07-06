<template>
      <div id="preview-lease" class="col-lg-6  my-auto mx-auto">



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">1</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your contribution</h3>

          <div class="col-lg-12 pl-5">
            <div class="row pl-3">

              <table class="col-lg-11 d-block mb-3 rounded">
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

            </div>
          </div>
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">2</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your comments</h3>
          <p class="col-lg-12 mb-3 pl-5">comment</p>
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">3</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your highlights</h3>
          <p class="col-lg-12 mb-3 pl-5">highlights</p>
        </div>



        <div class="row mb-5 rounded py-4 pl-5 pr-5 content">
          <span class="position-absolute d-inline-block rounded-circle text-center align-middle step">4</span>

          <h3 class="col-lg-12 mb-5 pl-5">Preview your additional elements</h3>
          <p class="col-lg-12 mb-3 pl-5">files</p>
        </div>


        <div id="actions" class="row">
          <b-button class="purple" :to="{ path: './'}" replace size="md">Back</b-button>
          <b-button class="ml-auto green" :to="{ path: '../'}" replace size="md">Confirm</b-button>
        </div>

      </div>
</template>

<script>
export default {
  name: 'ContributorPreviewLease',

  components: {
    // c
  },

  data () {
    return {
      // c
    }
  },

  methods: {
    // c
  }
}
</script>

<style scoped>

#preview-lease .content {
  background-color: #ffffff;
  box-shadow: 5px 5px 30px rgba(0,0,0,0.1)
}

#preview-lease .step {
  left: -25px;
  width: 50px;
  line-height: 50px;
  font-size: 2rem;
  color: #ffffff;
  background-color: #8e44ad;
}

#preview-lease h3 {
  font-size: 1.2rem;
}

#preview-lease table {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

#preview-lease table tr:first-child {
  box-shadow: 0px 7px 7px rgba(0,0,0,0.05);
}

#preview-lease table .last {
  background-color: rgba(126,68,170, 0.2);
}

#preview-lease .purple {
  border-color: #8e44ad;
  color: #ffffff;
  background-color: #8e44ad;
}

#preview-lease .purple:hover {
  border-color: #793a93;
  background-color: #793a93;
}

#preview-lease .orange {
  border-color: #fdad2a;
  background-color: #fdad2a;
}

#preview-lease .orange:hover {
  border-color: #e59d00;
  background-color: #e59d00;
}

#preview-lease .green {
  border-color: #2ecc71;
  color: #ffffff;
  background-color: #2ecc71;
}

#preview-lease .green:hover {
  border-color: #29b362;
  background-color: #29b362;
}

</style>
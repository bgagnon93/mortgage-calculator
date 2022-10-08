<script setup lang="ts">
import Parameters from "@/components/Parameters.vue";
import LineChart from "@/components/LineChart.vue";
import MortgageDetails from "@/components/MortgageDetails.vue";
</script>

<template>
  <div class="header-block"></div>

  <div class="container">
    <div class="row">
      <h1 class="col-12 d-flex justify-content-center" id="mortgage-calculator-header">Mortgage Calculator</h1>
    </div>
    <div class="row">
      <span class="col-12 d-flex justify-content-center">Optimize your financing. Predict the future. Plan for the worst.</span>
    </div>

    <Parameters/>


    <div class="container">
      <div class="row">
        <MortgageDetails/>

        <LineChart/>
      </div>
    </div>

  </div>



<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->
<!--    </div>-->
<!--  </header>-->

<!--  <main>-->
<!--    <TheWelcome />-->
<!--  </main>-->
</template>

<style scoped>
.header-block {
  height: 50px;
  margin-bottom: 20px;
  background-color: #344955;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/*@media (min-width: 1024px) {*/
/*  header {*/
/*    display: flex;*/
/*    place-items: center;*/
/*    padding-right: calc(var(--section-gap) / 2);*/
/*  }*/

/*  .logo {*/
/*    margin: 0 2rem 0 0;*/
/*  }*/

/*  header .wrapper {*/
/*    display: flex;*/
/*    place-items: flex-start;*/
/*    flex-wrap: wrap;*/
/*  }*/
/*}*/
</style>

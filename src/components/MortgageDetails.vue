<template>
  <div id="mortgage-details" class="col-md-6">
    <div class="container">
      <div class="row">
        <div class="poker-card col-md-12">
          <div class="inner-stroke">
            <table class="table">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Current</th>
                <th scope="col">Saved</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">Minimum Payment</th>
                <td>{{mortgageStore.minimum_payment_formatted}}</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">Accumulated</th>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">Repaid</th>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              <tr>
                <th scope="row">Percent Interest</th>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              </tbody>
            </table>
<!--            <div class="number">PLAN 1</div>-->
<!--            <div class="number">Minimum Monthly Payment: {{mortgageStore.minimum_payment_formatted}}</div>-->
          </div>
        </div>
      </div>
    </div>
    <div >

    </div>
    <div class="container">
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script setup>
import {useMortgageStore} from "../stores/mortgageSchedule";

const mortgageStore = useMortgageStore()
</script>

<style scoped>
#mortgage-details {
  /*text-align: center;*/
}

.poker-card {
  padding: 5px;
  height: 800px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px #282c34;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
}

.inner-stroke {
  padding: 5px;
  height: 100%;
  background-color: #ffffff;
  border: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
}

.number {
  font-family: Roboto, serif;
  font-size: 1em;
  font-weight: 400

}
</style>
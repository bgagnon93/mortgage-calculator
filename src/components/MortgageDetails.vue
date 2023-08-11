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
                <th v-for="schedule in mortgageStore.schedules.slice(0,1)" scope="col"><button type="button" class="btn btn-outline-secondary" @click="mortgageStore.saveDataset()">SAVE</button></th>
                <th v-if="mortgageStore.schedules.length > 1" v-for="(schedule, index) in mortgageStore.schedules.slice(1)" scope="col"><button type="button" class="btn btn-outline-secondary" @click="mortgageStore.unsaveDataset(index + 1)">UNSAVE</button></th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">Mortgage Payment</th>
                <td v-for="minimum_payment in mortgageStore.minimum_payments">{{currencyFormatter.format(minimum_payment)}}</td>
              </tr>
              <tr>
                <th scope="row">Property Taxes</th>
                <td v-for="tax in mortgageStore.property_taxes">{{currencyFormatter.format(tax / 12)}}</td>
              </tr>
              <tr>
                <th scope="row">Accumulated</th>
                <td v-for="schedule in mortgageStore.schedules">{{currencyFormatterNoChange.format(schedule[4].slice(-1)[0])}}</td>
              </tr>
<!--              <tr>-->
<!--                <th scope="row">Repaid</th>-->
<!--                <td>todo</td>-->
<!--                <td>todo</td>-->
<!--              </tr>-->
             <!-- <tr>
               <th scope="row">% Interest (5-Yr)</th>
               <td v-for="schedule in mortgageStore.schedules">{{parseFloat(schedule[2].slice(0,60).reduce((sum, n) => sum += n, 0)).toFixed(2)}}%</td>
             </tr> -->
              </tbody>
              <thead>
              <tr>
                <th scope="col">
                  <div class="slidecontainer">
                  <input type="range" min="1" max="360" v-model="mortgageStore.sliderValue" class="slider" id="myRange">
                  {{parseFloat(mortgageStore.sliderValue / 12).toFixed(1)}}
                </div>
                </th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">Principal</th>
                <td v-for="schedule in mortgageStore.schedules">{{currencyFormatterNoChange.format(mortgageStore.sliderValue >= schedule[1].length ? 0 : schedule[1][mortgageStore.sliderValue-1])}}</td>
              </tr>
              <tr>
                <th scope="row">Repaid</th>
                <td v-for="schedule in mortgageStore.schedules">{{currencyFormatterNoChange.format(schedule[2].slice(0,mortgageStore.sliderValue).reduce((sum, n) => sum + n, 0))}}</td>
              </tr>
              <tr>
                <th scope="row">Interest</th>
                <td v-for="schedule in mortgageStore.schedules">{{currencyFormatterNoChange.format(schedule[3].slice(0,mortgageStore.sliderValue).reduce((sum, n) => sum + n, 0))}}</td>
              </tr>
              <!-- <tr>
                <th scope="row">Total</th>
                <td v-for="schedule in mortgageStore.schedules">{{currencyFormatterNoChange.format(schedule[4].slice(-1)[0])}}</td>
              </tr> -->
              </tbody>
            </table>
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
import {currencyFormatter, currencyFormatterNoChange} from '../utils/utils'

const mortgageStore = useMortgageStore()
</script>

<style scoped>
#mortgage-details {
  /*text-align: center;*/
}

.poker-card {
  padding: 5px;
  height: 500px;
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
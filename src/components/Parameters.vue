<template>
  <div id="parameters-container" class="container">
    <div class="row">
      <div class="col-lg-2 col-sm-4 col-6 form-group">
        <label class="form-label">Listing Price:</label>
        <CurrencyInput id="listing-price-input" v-model.lazy="listingPrice" @blur="runTheNumbers();" type="currency" class="form-control"
                       :options="{ currency: 'USD' }"/>
      </div>
      <div class="col-lg-2 col-sm-4 col-6 form-group">
        <label class="form-label">Down Payment:</label>
        <CurrencyInput id="down-payment-input" v-model.lazy="downPayment" @blur="runTheNumbers()" type="currency"
                       class="form-control" :options="{ currency: 'USD' }"/>
      </div>
      <div class="col-lg-2 col-sm-4 col-6 form-group">
        <label class="form-label">Percent Down:</label>
        <div class="input-group">
          <input id="percent-down-input" v-model.lazy="percentDown" @blur="runTheNumbers()" type="number"
                 class="form-control percent-input"/>
          <span class="input-group-text" id="basic-addon1">%</span>
        </div>
      </div>
      <div class="col-lg-2 col-sm-4 col-6 form-group">
        <label class="form-label">Term:</label>
        <div class="input-group">
          <input id="term-input" v-model="term" @blur="runTheNumbers()" type="number" class="form-control percent-input"/>
          <span class="input-group-text" id="basic-addon1">years</span>
        </div>
      </div>
      <div class="col-lg-2 col-sm-4 col-6 form-group">
        <label class="form-label">Rate:</label>
        <div class="input-group">
          <input id="rate-input" v-model="rate" @blur="runTheNumbers()" type="number" class="form-control percent-input"/>
          <span class="input-group-text" id="basic-addon1">%</span>
        </div>
      </div>
      <div class="col-lg-2 col-sm-4 col-6 form-group">
        <label class="form-label">Prepayment:</label>
        <CurrencyInput id="prepayment-input" v-model.lazy="prepayment" @blur="runTheNumbers()" type="currency" class="form-control"
                       :options="{ currency: 'USD' }"/>
      </div>

    </div>
<!--    <div class="row">-->
<!--      <div class="col-lg-5"></div>-->
<!--      <div class="col-lg-2">-->
<!--        <button type="button" class="btn btn-primary" @click="runTheNumbers()">Calculate</button>-->
<!--      </div>-->
<!--      <div class="col-lg-5"></div>-->
<!--    </div>-->
<!--    <div class="row">-->
<!--      <div class="col-lg-5"></div>-->
<!--      <div class="col-lg-2">-->
<!--        {{ minimum_payment_formatted }}-->
<!--      </div>-->
<!--      <div class="col-lg-5"></div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import CurrencyInput from './reusables/CurrencyInput.vue'
import {currencyFormatter} from '../utils/utils'
import {ref} from "vue";
import {useMortgageStore} from '../stores/mortgageSchedule'
const mortgageStore = useMortgageStore()

const listingPrice = ref(330000)
const downPayment = ref(66000)
const percentDown = ref(20)
const term = ref(15)
const rate = ref(6)
const prepayment = ref(0)

calculateMinimumPayment()

function calculatePercentDown() {
  percentDown.value = downPayment.value / listingPrice.value * 100
}

function calculateDownPayment() {
  downPayment.value = listingPrice.value * percentDown.value / 100
}

function runTheNumbers() {
  calculatePercentDown()
  calculateMinimumPayment()
  let plan_1 = {
    0: {
      "rate_yearly": rate.value / 100,
      "payback_years": term.value,
      "prepay": prepayment.value
    }
    // 36: {
    //   "rate_yearly": rate.value / 100,
    //   "payback_years": term.value - 3,
    //   "prepay": 500
    // }
  }

  mortgageStore.calcSchedule(plan_1, listingPrice.value - downPayment.value, downPayment.value, 0)
}

function calculateMinimumPayment() {
  let p = listingPrice.value - downPayment.value
  let r = rate.value / (12 * 100)
  let m = term.value * 12
  mortgageStore.minimum_payment = p * r * (1 + r) ** m / ((1 + r) ** m - 1)
  mortgageStore.minimum_payment_formatted = currencyFormatter.format(mortgageStore.minimum_payment)
}

runTheNumbers()
</script>

<style scoped>
#parameters-container {
  margin: 20px
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
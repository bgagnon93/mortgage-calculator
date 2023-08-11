import {ref, computed} from "vue";
import {defineStore} from "pinia";

interface FinancePlan {
    rate_yearly: number
    payback_years: number
    prepay: number
}

interface DataSet {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    pointRadius: number

}

export const useMortgageStore = defineStore("mortgage", () => {
    // Each schedule in schedules contains 5 rows.
    // Row 1 is the "months" accumulated so far. This may be considered the x-axis of the graph.
    // Row 2 is the principal remaining in the loan.
    // Row 3 is how much of the principal is paid down for the given month.
    // Row 4 is the amount of interest paid for the given month.
    // Row 5 is the accumulated spend on the mortgage.
    const schedules = ref([] as number[][][])
    const datasets = ref([] as DataSet[])
    const savedDataset = ref([] as DataSet[])

    const minimum_payments = ref([0] as number[])
    const property_taxes= ref([0] as number[])

    const sliderValue = ref(60)

    function calcPropertyTaxes(listingPrice: number, millRate: number) {
        return listingPrice * 0.7 /1000 * millRate
    }

    function calcMinimumPayment(principal: number, monthly_rate: number, months: number) {
        const p = principal
        const r = monthly_rate
        const m = months
        return p * r * (1 + r) ** m / ((1 + r) ** m - 1)
    }


    function calcSchedule(
        plan: { [id: number]: FinancePlan },
        principal: number,
        accumulated: number,
        month: number
    ): number[][] {

        let months_array = [] as number[]
        let principal_array = [] as number[]
        let repayment_array = [] as number[]
        let interest_array = [] as number[]
        let accumulation_array = [] as number[]


        let init_month = month
        let p = principal
        let r = plan[month].rate_yearly / 12
        let m = plan[month].payback_years * 12
        let extra = plan[month].prepay

        let minimum_payment = calcMinimumPayment(p, r, m)
        let interest, minimum_repayment, repayment = 0
        // accumulated += interest + repayment
        // p -= repayment
        month += 1

        for (let i = m; i > 0; i--) {
            if (month in plan) {
                delete plan[init_month]
                accumulated += 5000
                calcSchedule(plan, p, accumulated, month)
                break
            }

            if (p < 0) {
                repayment = minimum_payment + p
                interest = 0
                p = 0
                accumulated += repayment
                month += 1

                months_array.push(month)
                principal_array.push(p)
                repayment_array.push(repayment)
                interest_array.push(interest)
                accumulation_array.push(accumulated)
                break
            }

            interest = p * r
            minimum_repayment = minimum_payment - interest
            repayment = minimum_repayment + extra

            accumulated += interest + repayment
            p -= repayment
            // monthly_schedule.value.push(new Month(month, p, repayment, interest, accumulated))

            months_array.push(month)
            principal_array.push(p)
            repayment_array.push(repayment)
            interest_array.push(interest)
            accumulation_array.push(accumulated)
            // console.log(`${month}, ${p}, ${repayment}, ${interest}, ${accumulated}`)
            month += 1
        }

        // return [months_array, principal_array, repayment_array, interest_array, accumulation_array]
        return [months_array, principal_array, repayment_array, interest_array, accumulation_array]
        // minimum_payments.value[0] = minimum_payment
        // schedules.value.unshift([months_array, principal_array, repayment_array, interest_array, accumulation_array])

        // updateDatasets()
    }

    function saveDataset() {
        schedules.value.unshift(schedules.value[0])
        minimum_payments.value.unshift(minimum_payments.value[0])
        property_taxes.value.unshift(property_taxes.value[0])

        savedDataset.value = [
            {
                label: "Principal",
                data: schedules.value[0][1],
                backgroundColor: "#FF0000",
                borderColor: "#FF0000",
                pointRadius: 0
            },
            {
                label: "Accumulated",
                data: schedules.value[0][4],
                backgroundColor: "#FF0000",
                borderColor: "#FF0000",
                pointRadius: 0
            }
        ]
    }

    function unsaveDataset(index: number) {
        console.log(index)
        schedules.value.splice(index, 1)
        minimum_payments.value.splice(index, 1)
        property_taxes.value.splice(index, 1)
        savedDataset.value.splice((index - 1) * 2, 2)
        updateDatasets()
        // datasets.value.splice(index, 1)
    }

    function updateDatasets() {
        datasets.value = [
            {
                label: "Principal",
                data: schedules.value[0][1],
                backgroundColor: "#4A6572",
                borderColor: "#4A6572",
                pointRadius: 0
            },
            {
                label: "Accumulated",
                data: schedules.value[0][4],
                backgroundColor: "#4A6572",
                borderColor: "#4A6572",
                pointRadius: 0
            },
            ...savedDataset.value
        ]
    }

    return {
        schedules,
        datasets,
        savedDataset,
        minimum_payments,
        property_taxes,
        sliderValue,
        calcSchedule,
        calcPropertyTaxes,
        saveDataset,
        unsaveDataset,
        updateDatasets
    };
});
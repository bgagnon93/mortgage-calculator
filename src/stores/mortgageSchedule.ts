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
    const datasets = ref([{
        label: "",
        data: [],
        backgroundColor: "#4A6572",
        borderColor: "#4A6572",
        pointRadius: 0
    }] as DataSet[])

    const minimum_payment = ref(0)
    const minimum_payment_formatted = ref("0")


    function calcSchedule(plan: { [id: number]: FinancePlan },
                          principal: number,
                          accumulated: number,
                          month: number) {

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

        minimum_payment.value = p * r * (1 + r) ** m / ((1 + r) ** m - 1)
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
                repayment = minimum_payment.value + p
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
            minimum_repayment = minimum_payment.value - interest
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

        schedules.value.push([months_array, principal_array, repayment_array, interest_array, accumulation_array])
        datasets.value = [] as DataSet[]
        datasets.value = [
            {
                label: "Principal",
                data: principal_array,
                backgroundColor: "#4A6572",
                borderColor: "#4A6572",
                pointRadius: 0
            },
            {
                label: "Accumulated",
                data: accumulation_array,
                backgroundColor: "#4A6572",
                borderColor: "#4A6572",
                pointRadius: 0
            }
        ]
        // datasets.value.push(
        //     {
        //         label: "Principal",
        //         data: principal_array,
        //         backgroundColor: "rgb(75, 192, 192)",
        //         borderColor: "rgb(75, 192, 192)",
        //         pointRadius: 0
        //     }
        // )
        // datasets.value.push(
        //     {
        //         label: "Accumulated",
        //         data: accumulation_array,
        //         backgroundColor: "rgb(75, 192, 192)",
        //         borderColor: "rgb(75, 192, 192)",
        //         pointRadius: 0
        //     }
        // )
    }

    return {
        schedules,
        datasets,
        minimum_payment,
        minimum_payment_formatted,
        calcSchedule};
});
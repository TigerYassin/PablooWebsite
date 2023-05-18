import { CheckIcon } from '@heroicons/react/20/solid'
import { useRef, useState } from 'react';
import Slider from "@mui/material/Slider";
import './calculatorView.css'
// import SliderSizes from "../../components/slider/slider";

const includedFeatures = [
    '$0 Processing Fees',
    'Loyalty Program Software',
    'Promotional Code Software',
]

export default function CalculatorView() {

    // TODO: Set real default values
    const [monthlyGMV, setMonthlyGMV] = useState(100000)
    const [averageOrderSize, setAverageOrderSize] = useState(50)
    const [returnPercentage, setReturnPercentage] = useState(15)
    const [amountValue, setAmountValue] = useState(0)

    const gmvMarks = [
        {
            value: 100000,
            label: '$100K',
        },
        {
            value: 5000000,
            label: '5M',
        },
    ]

    function valueLabelFormatGMV(value) {
        const valueInThousands = value / 1000
        if (valueInThousands < 1000) {
            return `$${valueInThousands}K`
        }
        const valueInMillions = valueInThousands / 1000
        return `$${valueInMillions}M`
    }

    var updateAmountSaved = function(){
        console.log("this is the shit", amountValue)
        // monthly_gmv * returnRate = valueInReturns

        const returnsGMV = monthlyGMV * (returnPercentage * 0.01)
        const processingFeePercentage = 0.029
        const perTransactionFee = 0.3

        // Refund volume * processing fee + 0.3 for each transaction
        // Refund volume * processing fee + ((Refund volume / average order size) * 0.3)
        const monthlyRefundProcessingCost = returnsGMV * processingFeePercentage + ( (returnsGMV / averageOrderSize) * perTransactionFee)
        // TODO: Round to whole number and add commas (save string formatable to a different variable)
        setAmountValue(parseInt(monthlyRefundProcessingCost))
    }

    return (
        <div className="bg-white py-24 sm:py-32">
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Savings Calculator</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Calculate how much Pabloo can save your business.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">

                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Monthly Gross Merchandise Value (GMV)</h3>
                        <div className="mt-6 text-base leading-7 text-gray-600">
                            Give an explainer about why we're asking for this information
                            <Slider
                                aria-label="Small steps"
                                defaultValue={monthlyGMV}
                                step={100000}
                                marks  // TODO: Need to label this as 100k, consider using marks (look at docs)
                                min={100000}
                                max={5000000}
                                getAriaValueText={valueLabelFormatGMV}
                                valueLabelFormat={valueLabelFormatGMV}
                                valueLabelDisplay="auto"
                                onChange={((e, newValue) => {
                                    setMonthlyGMV(newValue)
                                    updateAmountSaved()
                                })}
                            />
                        </div>


                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Average Order Size</h3>
                        <div className="mt-6 text-base leading-7 text-gray-600">
                            Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
                            repellendus etur quidem assumenda.
                            <Slider
                                aria-label="Small steps"
                                defaultValue={averageOrderSize}
                                step={5}
                                marks
                                min={20}
                                max={150}
                                getAriaValueText={(e) => {
                                    return `$${e}`
                                } }
                                valueLabelFormat={(e) => {
                                    return `$${e}`
                                } }
                                valueLabelDisplay="auto"
                                onChange={((e, newValue) => {
                                    setAverageOrderSize(newValue)
                                    updateAmountSaved()
                                })}
                            />
                        </div>


                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Return Percentage</h3>
                        <div className="mt-6 text-base leading-7 text-gray-600">
                            Include data on different return percentages for different industries, and online retailers
                            having the largest return rate.
                            <Slider
                                aria-label="Small steps"
                                defaultValue={returnPercentage}
                                step={5}
                                marks
                                min={5}
                                max={80}
                                getAriaValueText={(e) => {
                                    return `${e}%`
                                } }
                                valueLabelFormat={(e) => {
                                    return `${e}%`
                                } }
                                valueLabelDisplay="auto"
                                onChange={((e, newValue) => {
                                    setReturnPercentage(newValue)
                                    updateAmountSaved()
                                })}
                            />
                        </div>


                        <div className="mt-10 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                            <div className="h-px flex-auto bg-gray-100" />
                        </div>
                        <ul
                            role="list"
                            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                        >
                            {includedFeatures.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600">Potential Savings With Pabloo (Monthly)</p>
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-gray-900"> ${amountValue} </span>
                                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                                </p>
                                <a
                                    href="calculatorView#"
                                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Contact Pabloo
                                </a>
                                <p className="mt-6 text-xs leading-5 text-gray-600">
                                    Invoices and receipts available for easy company reimbursement
                                    Consider putting the equation here
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

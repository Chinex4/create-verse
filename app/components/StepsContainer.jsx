import React from 'react'
import Step from './Step'
import { STEPS } from '../lib/data'


const StepsContainer = ({ }) => {
    return (
        <div className='mt-10 flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-8'>
            {
                STEPS.map((step, i) => {
                    return <Step key={i} {...step}/>
                })
            }
        </div>
    )
}

export default StepsContainer

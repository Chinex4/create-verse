import React from 'react'
import Step from './Step'
import { STEPS } from '../lib/data'
import { motion } from 'framer-motion'


const StepsContainer = ({ }) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ staggerChildren: 0.5 }} 
            className='flex flex-col mt-10 space-y-5 lg:flex-row lg:space-y-0 lg:space-x-8'>
            {
                STEPS.map((step, i) => {
                    return <Step key={i} {...step} />
                })
            }
        </motion.div>
    )
}

export default StepsContainer

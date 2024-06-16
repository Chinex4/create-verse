import React from 'react'

const Step = ({icon, title, info}) => {
    return (
        <div className="card w-full lg:w-[32rem] pt-5 bg-base-100 shadow-xl">
            <div className="card-body">
                {icon}
                <h2 className="card-title">{title}</h2>
                <p className='text-sm'>{info}</p>
            </div>
        </div>
    )
}

export default Step

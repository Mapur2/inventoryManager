import React from 'react'

function InputBox({ label, data, onDataChange,type="text",placeholder }) {
    return (
        <div>
            <div className='w-full'>
                {label && <label
                    className='inline-block mb-1 pl-1'>
                    {label}
                </label>
                }
                <input
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-black focus:bg-gray-50 duration-200 border border-black w-full`}
                    value={data}
                    onChange={e=>onDataChange(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

export default InputBox

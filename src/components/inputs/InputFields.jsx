import React from 'react'

export default function InputField({ id, label, type, value, onChange, error }) {
  return (
    <div className="mb-0">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-0">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${error ? 'border-red-500' : ''}`}
        />
      </div>
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  )
}

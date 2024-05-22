import React from 'react'

export default function InputField({ id, label, type, value, onChange, placeholder, error }) {
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
          placeholder={placeholder}
          className={`shadow-sm focus:ring-yellow-500 py-3 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md ${error ? 'border-yellow-500' : ''}`}
        />
      </div>
      {error && <div className="text-yellow-500">{error.message}</div>}
    </div>
  )
}

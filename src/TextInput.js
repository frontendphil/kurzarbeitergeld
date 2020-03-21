import React, { forwardRef } from "react";

function TextInput({ value, label, placeholder, onChange, ...rest }, ref) {
  return (
    <div>
      {label && (
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {label}
        </label>
      )}

      <input
        {...rest}
        ref={ref}
        placeholder={placeholder || label}
        type="text"
        className="bg-gray-200 border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 border rounded py-2 px-4 block w-full appearance-none leading-normal"
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
}

export default forwardRef(TextInput);

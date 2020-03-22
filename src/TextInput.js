import React, { forwardRef, useEffect, useState } from "react";

function TextInput(
  {
    value,
    label,
    placeholder,
    hint,
    error,
    onChange,
    onComplete,
    onBlur,
    ...rest
  },
  ref
) {
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

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
        value={internalValue}
        onChange={({ target }) => {
          setInternalValue(target.value);

          if (onChange) {
            onChange(target.value);
          }
        }}
        onBlur={event => {
          if (onComplete) {
            onComplete(internalValue);
          }

          if (onBlur) {
            onBlur(event);
          }
        }}
      />

      {hint && <p className="text-gray-600 text-xs italic mt-2">{hint}</p>}
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
}

export default forwardRef(TextInput);

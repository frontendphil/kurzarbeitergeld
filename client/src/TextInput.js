import React from "react";

function TextInput({ value, onChange }) {
  return (
    <input
      type="text"
      className="bg-white focus:outline-none border border-gray-400 hover:border-gray-500 rounded py-2 px-4 block w-full appearance-none leading-normal"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  );
}

export default TextInput;

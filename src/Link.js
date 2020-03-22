import React from "react";

function Link({ href, children, download, disabled, ...rest }) {
  if (disabled) {
    return (
      <button
        disabled
        className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded flex items-center cursor-not-allowed opacity-50"
      >
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>{children}</span>
      </button>
    );
  }

  return (
    <a
      className="cursor-pointer bg-blue-500 border-blue-700 hover:bg-blue-400 hover:border-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
      href={href}
      download={download}
      {...rest}
    >
      <svg
        class="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>

      {children}
    </a>
  );
}

export default Link;

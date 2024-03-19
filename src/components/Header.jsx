import React from 'react'

const Header = ({ title }) => {
  return (
    <header>
      <h1 className=" text-2xl text-[#333]">{title}</h1>
    </header>
  );
}

export default Header
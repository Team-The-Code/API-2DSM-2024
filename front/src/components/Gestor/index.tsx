import React, { useState } from "react";
import Logo from "../Logo"
import { SidebarData } from "../../Data/Data";
import { motion } from "framer-motion";
import styled from "styled-components";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <Stl>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src = "Logo" alt="logo" />
        <span>
          Sh<span>o</span>ps
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem">
        </div>
      </div>
    </motion.div>
    </Stl>
  );
};
 const Stl = styled.div`
 .sidebar {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 4rem;
    transition: all 300ms ease;
  }
  /* logo */
  .bars{
    display: none;
  }
  
  .logo {
    display: flex;
    height: 5rem;
    font-weight: bold;
    font-size: 22px;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    height: 4%;
  }
  .logo > span > span {
    color: var(--pink);
  }
  
  .logo > img {
    width: 3rem;
    height: 3rem;
  }
  
  
  /* menu */
  .menu {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .menuItem {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 2.5rem;
    margin-left: 2rem;
    position: relative;
    transition: all 300ms ease;
    border-radius: 0.7rem;
    font-size: 14px;
  }
  
  .menuItem:hover {
    cursor: pointer;
  }
  
  .menu .menuItem:last-child {
    position: absolute;
    bottom: 2.3rem;
    width: 100%;
  }
  
  .active {
    background: var(--activeItem);
    margin-left: 0;
  }
  .active::before {
    content: "";
    width: 8px;
    height: 100%;
    background: var(--pink);
    margin-right: calc(1rem - 8px);
  }
  
  
  /* Tablets */
  @media screen and (max-width: 1200px) {
    .menuItem>span{
      display: none;
    }
    .logo{
      display: none;
    }
  }
  
  @media screen and (max-width: 768px) {
    .sidebar{
      position: fixed;
      z-index: 9;
      background: #ffe0e0;
      width: 55%;
      padding-right: 1rem;
      height: 100%;
    }
    .menuItem>span{
      display: block;
    }
    .logo{
      display: flex;
    }
    .menu .menuItem:last-child {
      position: relative;
      margin-top: 6rem;
    }
    .bars{
      display: flex;
      position: fixed;
      top: 2rem;
      left:60%;
      background:#ffe0e0;
      padding:10px;
      border-radius: 10px;
      z-index: 9;
    }
    .close{
      left: -60%;
    }
  }
  
 `

export default Sidebar;

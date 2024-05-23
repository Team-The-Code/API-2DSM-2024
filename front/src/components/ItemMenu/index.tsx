import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ItemMenu({link, children}:any){
    return <Sld><Link to={link}>{children}</Link></Sld>;
}

const Sld = styled.div`
display: flex;
margin: 0px 40px;
font-weight: 600;
font-family: 'Jost', sans-serif; 
color: #fff;
border: none;
cursor: pointer;

a {
    text-decoration: none;
    color: inherit;
    position: relative; 

    
    &:after {
        content: ''; 
        position: absolute; 
        left: 0;
        right: 0;
        bottom: -2px; 
        height: 2px;
        background-color: #ff6900;
        transition: width 0.3s ease; 
        width: 0; 
    }

    &:hover::after {
        width: 100%; 
    }
}
`;


import React, { useState,useRef } from 'react'
import lion from '../../image/lion.jpg'
import mens from '../../image/mens.jpg'

import './asyncPrac1.css';

const AsyncPrac1:React.FC=()=> {

    const[element,setElement]=useState<HTMLDivElement | null>(null);

    

   const handleClone=()=>{
    const parentElement=document.createElement('div');
    const childElement=document.createElement('img');
    childElement.src=lion;
    childElement.height=80;
    childElement.width=70;
    parentElement.appendChild(childElement);
    
    document.body.appendChild(parentElement);
    setElement(parentElement)
    
   }

   const insertBefore=()=>{
    const duplicate=element?.cloneNode(true);
    const childElement1=document.createElement('img');
    childElement1.src=mens;
    childElement1.height=80;
    childElement1.width=70;
    duplicate?.appendChild(childElement1);
    if(duplicate){
    document.body.appendChild(duplicate);
    }
   }

   
  return (
    <div>

        <div style={{height:80,width:70}} >
            <img src={lion} height='80' width='70' />
        </div>

      
      <button onClick={handleClone}>Clone</button>

      <button onClick={insertBefore}>insertBefore</button>

     
    </div>

  )
}
export default AsyncPrac1
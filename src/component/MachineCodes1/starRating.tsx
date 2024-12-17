import React, { useEffect, useState } from 'react'
import { IoStar } from "react-icons/io5";
import "./starRating.css";

function StarRating() {
    const StarCount=10;

    const [starArray,setArray]=useState<JSX.Element[]>([]);
    const [hover,setHover]=useState<number>(-1);

    const[temp,setTemp]=useState<number>(-1);


    const handleRating=(id:number)=>{
        setTemp(id)
    }

    useEffect(()=>{
        setArray(Array.from({length:StarCount},(_,i)=> <IoStar key={i} color={hover===-1 && temp>=i || hover>=i?'yellow':'black'} />));
    },[temp,hover])

   
    console.log(starArray);
  return (
    <div>
      <h1>Star Rating</h1>
      <div className="starContainer">
        {
            starArray.length>0 &&(
                <>
                {
                    starArray.map((star:JSX.Element,index:number)=><span key={index} onClick={()=>handleRating(index)} onMouseEnter={()=>setHover(index)}
                    onMouseLeave={()=>setHover(-1)}>{star}</span>)
                }
                </>
            )
        }
      </div>
    </div>
  )
}

export default  StarRating;
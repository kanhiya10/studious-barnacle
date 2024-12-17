import React, { useEffect, useState } from 'react'
import "./tool.css";

const Tools:React.FC=()=> {

  
  const[data,setData]=useState([1,2,3,34,33,45,54,33,232,21,11,234,98,8,735,7,86,54,67,84,92])
  const [array,setArray]=useState<number[]>([]);
  const [itemsPerPage,setItemsPerPage]=useState<number>(5);
  const[activeIndex,setActiveIndex]=useState(0);
  
    useEffect(()=>{
      setArray(data.slice(0,itemsPerPage));
    },[])
 
      const handleData=(i:number)=>{
        const startIndex=(i*itemsPerPage);
        const endIndex=startIndex+itemsPerPage;
        setArray(data.slice(startIndex,endIndex))
        setActiveIndex(i);
      }
  
  
  return (
    <div>
      <h1>hi</h1>
      <input type="number" placeholder="Items Per Page" value={itemsPerPage} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setItemsPerPage(parseInt(e.currentTarget.value))}/>
      <ul>
      {
      Array.from({length:data.length/itemsPerPage},(_,i)=>(
               <li key={i} ><button onClick={()=>handleData(i)} style={{backgroundColor:activeIndex===i?'orange':'gray'}}>{i+1}</button></li>
               )
              )
      }
      </ul>

      {array.length>0 && (
        array.map((item)=>{
          return `${item},`
        })
      )}
      
    </div>
  )
}

export default Tools
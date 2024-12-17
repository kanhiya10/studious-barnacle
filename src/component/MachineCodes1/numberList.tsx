import React, { useEffect, useState } from 'react';
import VirtualList from './virtualList';

const NumberList:React.FC=()=> {
  // const [count, setCount] = useState(0);
  // const [incrementValue, setIncrementValue] = useState(1);
  const[list,setList]=useState<number[]>([]);
  const numberOfItems:number=20000;

  useEffect(()=>{

    const makeList=(num:number):number[]=>{
  
    const listItems=Array.from({length: num},(_,i)=>
    
       i+1
    )
  
    return listItems;
    
    
  
  }

  setList(makeList(numberOfItems));
  },[])


  

  
  return (
    <div>

      {/* {list ? (
        <>
         {list.map((item)=>(
          <ul>
            <li>{item}</li>
          </ul>

         ))}
        </>
       
      )
    :(
      <p>Array is empty</p>
    )} */}

    {
      list && (
        <VirtualList list={list}/>
      )
    }

    </div>
  );
}

export default NumberList;

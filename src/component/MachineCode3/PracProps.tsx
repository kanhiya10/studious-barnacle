import React,{useState} from 'react'
import PracProps1 from './PracProps1';

function PracProps() {
    const[TwoDArray,setTwoDArray]=useState<number[][]>(Array.from({length:8},()=>Array(4).fill(2)));

    const handleAdd=()=>{
        setTwoDArray([...TwoDArray,[3,3,3,3]])
    }
  return (
    <div>
        <h1>2d Array</h1>
      {
            TwoDArray.length>0 &&(
                <div>
                {TwoDArray.map((r,index)=>
                <div style={{display:'flex'}}>{
                    r.map((col,ind)=>(
                        <h1>{col}</h1>
                    )
                    )
                }
                    </div>
                )}
                </div>
            )
      }
     <PracProps1 handleAdd={handleAdd}/>
    </div>
  )
}
export default PracProps;
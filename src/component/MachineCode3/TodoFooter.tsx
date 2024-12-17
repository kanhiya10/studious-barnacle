import React from 'react'
import './TodoFooter.css';
import { IoMdShare } from "react-icons/io";
import { RWebShare } from 'react-web-share';

type MyProps=({
  CompletedTask:string[];
})
const TodoFooter:React.FC<MyProps>=({CompletedTask}) =>{

  const handleShare=()=>{
    console.log('hello');
  }

  const handleCompleteList=()=>{
    console.log(CompletedTask);
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:'40px'}}>
        <button  className="btn1" onClick={handleCompleteList}>Completed Tasks</button>
        <button className="btn2" onClick={handleShare}><span><IoMdShare color='black' size={20}/></span><span>Share</span></button>
      </div>
    </div>
  )
}
export default TodoFooter;
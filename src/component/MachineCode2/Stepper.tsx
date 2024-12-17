import React, { useEffect, useState } from 'react'
import "./Stepper.css";
// import PersonalInfo from './StepperParts/PersonalInfo';
type MyProp=({
  StepperData: { label: string; action: string; id:number; }[]; 
  currStepperId:number;
  handleAction:(args:number)=>void;
})

const Stepper:React.FC<MyProp>=({StepperData,currStepperId,handleAction})=> {
  const [filledHeight,setFilledHeight]=useState<number>(0);
  useEffect(()=>{
    setFilledHeight(currStepperId*60);
  },[currStepperId])
  return (
    <div>
      <div className='StepperBox'>
        <div className='structure' style={{height:StepperData.length*60}}>
            <div className='structureVertical' style={{position:'relative'}}>
               <div style={{width:'100%',height:filledHeight,position:'absolute',backgroundColor:'blue'}}>

               </div>
            </div>

            <div className='structureHorizontal' style={{marginTop:10*StepperData.length}}>
              {
                StepperData.map((StepperObj)=>(
                  <div className='structureLine'>
                  <div className='structureLineBar'>   
                  </div>
                  <div onClick={()=>handleAction(StepperObj.id)}>
                  <h1 className="lineText">{StepperObj.label}</h1>
                  </div>
                  <div className="structureLineNumber">
                  <h1 style={{color:'white',fontSize:'large',marginTop:5}}>{StepperObj.id +1}</h1>
                  </div>
              </div>
                ))
              }
                    
                </div>
                </div>
      </div>
    </div>
  )
}

export default Stepper;



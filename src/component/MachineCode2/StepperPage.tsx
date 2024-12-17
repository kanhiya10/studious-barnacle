import React, { useEffect, useState } from 'react'
import StepperData from "./StepperData.json";
import Stepper from './Stepper'
import PaymentInfo from './StepperParts/PaymentInfo';
import PersonalInfo from './StepperParts/PersonalInfo';
import AccountInfo from './StepperParts/AccountInfo';
import ConfirmationInfo from './StepperParts/ConfirmationInfo';

export default function StepperPage() {
    const[content,setContent]=useState<String>('');
    const[StepperDataId,setStepperDataId]=useState<number>(0);

    const handleContent=():void=>{
      if(StepperData.length>StepperDataId+1){
        setStepperDataId(StepperDataId+1);
        setContent(StepperData[StepperDataId+1].action);
      }
      // else{
      //   <h1>Thanks for filling details</h1>
      // }
     
    }

    const handleAction=(info:number)=>{
      info<=StepperDataId &&(
        setContent(StepperData[info].action)
      )

    }



    // useEffect(()=>{
    //   setStepperDataId
    // },[])

    let contentComponent;
    switch (content) {
      case 'PersonalInfo':
        contentComponent = <PersonalInfo handleContent={handleContent}/>;
        break;
      case 'AccountInfo':
        contentComponent = <AccountInfo  handleContent={handleContent} />;
        break;
      case 'PaymentInfo':
        contentComponent = <PaymentInfo  handleContent={handleContent} />;
        break;
      case 'ConfirmationInfo':
        contentComponent = <ConfirmationInfo  handleContent={handleContent} />;
        break;
      default:
        contentComponent = <PersonalInfo handleContent={handleContent} />;
    }

  return (
    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',height:'100vh'}}>
      <Stepper handleAction={handleAction} StepperData={StepperData} currStepperId={StepperDataId+1}/>
      <div>
       {contentComponent}
       
      </div>
    </div>
  )
}

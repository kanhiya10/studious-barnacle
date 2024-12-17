import React, { useState } from 'react'
import data from "../../FaqData.json";

type obj={
    question:string
    answer:string
}
type controller={
toggleValue:number
isOpen:boolean
}

function Faq() {
    const[toggle,setToggle]=useState<controller>({
        toggleValue:-1,
        isOpen:false
    });
    console.log(data)
  return (
    <div style={{height:'100%',width:'60%',margin:'0 auto'}}>
      <h1>Faq</h1>
      <div>
       {
        Object.keys(data).length>0 && (
            <>
            {
                data.faq.map((item:obj,index)=>
                    
                        <div key={index} style={{border:'1px solid black' ,backgroundColor:index%2===0?'gray':'lightpink',height:toggle.toggleValue===index && toggle.isOpen ?250:100, }} onClick={() => setToggle(prevToggle => ({
                            toggleValue: index,
                            isOpen: prevToggle.toggleValue === index ? !prevToggle.isOpen : true, // Toggle based on current state
                        }))}>
                            <span>{toggle.toggleValue === index && toggle.isOpen ? '-' : '+'}</span>
                            {toggle.toggleValue===index && toggle.isOpen
                            ?
                            (
                                <>
                                 <h1>{item.question}
                                 
                                 </h1>
                                 <h1>{item.answer}</h1>
                                </>
                            )
                            :(
                                <h1>{item.question}</h1>
                            )
                            }
                           
                        </div>
                    
                )
            }
            </>
        )
       }
      </div>
     

    </div>
  )
}
export default Faq;
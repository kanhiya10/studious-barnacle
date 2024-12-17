import React,{createElement, useRef,useState} from 'react'
import './asyncPrac2.css';


function AsyncPrac2() {
  const refArray=useRef<HTMLDivElement[] | []>([]);
  const[arr,setArr]=useState <number[]>(Array.from({length:3},(_,i)=>i+1))

  const domExperiment=(parent:HTMLDivElement)=>{
    console.log("childNode",parent.childNodes);
    console.log('children',parent.children);
    console.log('parentNextSibling',parent.nextSibling);
  }

  const childManipulate=(parent:HTMLDivElement)=>{
    console.log(parent.firstChild);
    if(parent.firstChild){
    parent.removeChild(parent.firstChild);
    }
  }

  const handleChanges=(index:number)=>{
    refArray.current[index].style.backgroundColor="wheat";
  }

  const handleNewDiv=()=>{
    const parent=document.createElement('div');
    const h1Node=document.createElement('h1');
    const paraNode=document.createElement('p');
    h1Node.style.color="white"
    h1Node.style.fontSize="20px";
    h1Node.innerHTML="new div generated";
    parent.appendChild(h1Node);
    paraNode.style.color="goldenrod";
    paraNode.innerHTML="p1 text";
    parent.prepend(paraNode);
    const TextNode=document.createTextNode("this is a text node");
    parent.prepend(TextNode);
  

    // <button onClick={()=>domExperiment(parent)}></button>


    parent.style.height = '120px';
    parent.style.width = '190px';
    parent.style.backgroundColor = '#36454F';

    // const ButtonNode=createElement('button');
    // ButtonNode.addEventListener('click',()=>domExperiment(parent))

    const Reflength=refArray.current.length-1;
    // if(refArray.current[length])
    if(parent){
    refArray.current[Reflength].parentNode?.insertBefore(parent,refArray.current[Reflength])
    refArray.current[Reflength+1]=parent;
    // parent.onclick={handleChanges}
    parent.addEventListener('click', ()=>handleChanges(Reflength+1));
    parent.addEventListener('mouseenter',()=>domExperiment(parent));
    parent.addEventListener('mouseleave',()=>childManipulate(parent))

    }
    
  
  }

  return (
    <div >
      <h1>AsyncPrac2</h1>
      {
        arr.length>0 &&(
          <div className="outerContainer" tabIndex={0}>
          {
            arr.map((val:number,index:number)=>{
             return <div key={index} ref={(prevRef:HTMLDivElement)=>refArray.current[index]=prevRef} style={{height:120,width:190,backgroundColor:'black',marginBottom:20}} onClick={()=>handleChanges(index)}>
                <h1 style={{color:'white'}}>This div has value:{val}</h1>
              </div>
            })
          }
          <div style={{fontSize:40,cursor:'pointer'}} onClick={()=>handleNewDiv()}>&#43;</div>
          </div>
        )
      }
      

    </div>
  )
}

export default AsyncPrac2
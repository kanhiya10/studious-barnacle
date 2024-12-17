import React, { useRef, useState,useEffect } from 'react'
import data from '../../carData.json'
import './carasoul.css';
import DadCoursal from './DadCoursal';
import { ImCross } from "react-icons/im";


 function Carasoul() {

    // const[captureImg,setCaptureImg]=useState<HTMLImageElement | null>(null);

    // const imgRef=useRef<HTMLDivElement | null>(null);

    const divRef=useRef<HTMLDivElement | null>(null);
    const imgRef=useRef< NodeJS.Timeout |number | null>(null);
   
    interface ImgType{
        carId:number;
        carName:string;
        carModel:string;
        carPrice:number;
        carPic:string;
    }
    const[currIndex,setCurrIndex]=useState<number>(0);
    

    useEffect(() => {
        startInterval();
       return ()=>clearInterval(imgRef.current!);
        
    }, []);

    const startInterval = () => {
        imgRef.current = setInterval(() => {
            setCurrIndex((prevCurrIndex) => (prevCurrIndex + 1) % data.length);
        }, 4000);
    };


    const handleIndex=(indexVal:number)=>{
        setCurrIndex(indexVal<0?data.length-1:indexVal%data.length);   
    }

    const handleDragStart=(e:React.DragEvent<HTMLImageElement>,car:ImgType)=>{
       console.log( e.currentTarget);
    //    setCaptureImg(e.currentTarget);
    e.dataTransfer.setData('text/plain',JSON.stringify(car))
    }

    const handleDragEnd=()=>{
        console.log("drag end")
    }

    const getDetails=(car:ImgType):HTMLDivElement=>{
        const detailsDiv= document.createElement('div');

           const para1=document.createElement('p');
           const para2=document.createElement('p');
           const para3=document.createElement('p');

           para1.textContent=car.carName;
           para1.className="car-name";

           para2.textContent=car.carModel;
           para2.className="car-model";

           para3.textContent = `Price: $${car.carPrice.toString()}`;
           para3.className="car-price";


           detailsDiv.appendChild(para1);
           detailsDiv.appendChild(para2);
           detailsDiv.appendChild(para3);

           
           return detailsDiv
    }

    const handleDrop=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        console.log('drop');
          //  you perform a DOM manipulation that changes the image to a new location in the DOM, effectively removing it from its original position.
        // if(captureImg){
        // e.currentTarget.appendChild(captureImg).className='newimageDim'
        // }
        //else first clone the node
        // if (captureImg && e.currentTarget.children.length<1 ) {
        //     const copyNode = captureImg.cloneNode(true) as HTMLImageElement;
        //     copyNode.className = "newimageDim";
        //     e.currentTarget.appendChild(copyNode);
        // }
        const imgNode=document.createElement("img"); 

        
        const car=JSON.parse(e.dataTransfer.getData('text/plain'));
        imgNode.src=car.carPic;
        imgNode.className="newimageDim";

        if(divRef.current && divRef.current.children.length<1){ 

            const parentDiv=divRef.current.parentElement;
            if(parentDiv){
                if(parentDiv?.children.length>1){
                    parentDiv?.lastElementChild?.remove();
                }
            }
            
        
            divRef.current.appendChild(imgNode);
           const newDiv=getDetails(car);
           console.log(newDiv);
           newDiv.className="newDiv"
           if(parentDiv){
            parentDiv.appendChild(newDiv);
            parentDiv.className="newBox";

           }

        }
        
    }

    const handleDragOver=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        console.log('dragOver');
    }

    const handleRemoveChilds=()=>{
        if(divRef.current?.firstChild){
        divRef.current?.removeChild(divRef.current.firstChild);
        }
    }

   console.log(currIndex);
  return (
    <div className='structure'>
       {
        data.length>0 && (
            <div className="imgBox">
                <div onClick={()=>handleIndex(currIndex-1)} className="leftArrow">&#8592;</div>
               
                    <img src={data[currIndex].carPic}  className="imageDim" draggable={true} onDragStart={(e)=>handleDragStart(e,data[currIndex])} onDragEnd={handleDragEnd} 
                    onMouseEnter={()=>clearInterval(imgRef.current!)} onMouseLeave={startInterval}/>

             <div onClick={()=>handleIndex(currIndex+1)} className="rightArrow">&#8594;</div>
            </div>
        )
       }
       <div className='box' >
       <div className='DaDstructure'  ref={divRef} onDrop={(e)=>handleDrop(e)} onDragOver={(e)=>handleDragOver(e)} >
       </div>
      

       </div>
       <ImCross className='cross' onClick={()=>handleRemoveChilds()}/>{/* it is positioned relative to the structue(nearest parent ancestor) */}
    </div>
  )
}

export default Carasoul;


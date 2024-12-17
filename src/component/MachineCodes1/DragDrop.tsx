import React,{useRef,useState} from 'react'
import "./DragDrop.css";
import lionPic from "../../image/lion.jpg"
import mensPic from "../../image/mens.jpg"
import spacePic from "../../image/space.jpg"


 const DragDrop :React.FC=()=>{
    // const imgRef=useRef<HTMLImageElement>(null);

    const [draggedElement, setDraggedElement] = useState<HTMLImageElement | null>(null);


    const handleDragStart=(e:React.DragEvent<HTMLImageElement>):void=>{
        console.log("DragStart has been triggered");
        const targeted = e.currentTarget as HTMLImageElement;

        (e.target as HTMLImageElement).className+=' intermediate';

        // imgRef.current=target;

        setDraggedElement(targeted);


        console.log(draggedElement);
        // setTimeout(()=>{
        //     (e.target as HTMLImageElement).className='hide';
        // },0)
    
    }

    const handleDragEnd=(e:React.DragEvent<HTMLImageElement>):void=>{
        console.log("Dragend has been trigered");
        (e.target as HTMLImageElement).className='imgBox';

    }

    const dragOptions={
        onDragOver:(e:React.DragEvent<HTMLDivElement>):void=>{
            e.preventDefault();
            console.log("DragOver has been trigered");
            
        },
    
        onDragEnter:():void=>{
            console.log("DragEnter has been trigered");
        },
    
        onDragLeave:():void=>{
            console.log("DragLeave has been trigered");
        },
    
        onDrop:(e:React.DragEvent<HTMLDivElement>):void=>{
            console.log("Drop has been trigered");

        console.log("drop:",e.currentTarget);
            if (draggedElement) {
                console.log(draggedElement);
                (e.target as HTMLDivElement).appendChild(draggedElement); 
                //it will remove the image from its previous position in the DOM. The appendChild method moves the element rather than creating a copy, which means that the image will no longer be in its original location.
              }

        }
    }

   


  return (
    <div>
        <h1>Drag and Drop your favouraite image from 3 given images to the block in next line </h1>
    <div className="container">
      <div>
        <img src={lionPic} className="imgBox" 
        draggable='true' onDragStart={handleDragStart}  onDragEnd={handleDragEnd}
        />
        </div>
        <div >
        <img src={mensPic} className="imgBox"
        draggable='true' onDragStart={handleDragStart}  onDragEnd={handleDragEnd}
        />
        </div>
        <div>
        <img src={spacePic} className="imgBox" 
        draggable='true' onDragStart={handleDragStart}  onDragEnd={handleDragEnd}
        />
        </div>
    </div>

    <div className='container2'>
        <div {...dragOptions}>
        </div>
    </div>
    </div>
  )
}

export default DragDrop;
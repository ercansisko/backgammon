import React from 'react'
function Section({black,white,index,handleClickedCircle,handleClickedSection}) {


    const circleClick=(event)=>{
        event.stopPropagation();
        handleClickedCircle(parseInt(event.target.parentElement.id),event.target.style.backgroundColor);
      
    }
    const sectionClick=(event)=>{
      event.stopPropagation();
        handleClickedSection(parseInt(event.target.id));
    }
   
    const defaultCircles=()=>{
      let circles=[];
      if(black>0)
      for(let i=1;i<=black;i++)
      circles.push( <div className="circle" onClick={circleClick} style={{backgroundColor:`black`}}></div>);
      else if(white>0)
      for(let i=1;i<=white;i++)
      circles.push( <div className="circle" onClick={circleClick} style={{backgroundColor:`white`}}></div>);
     return circles;
    };
    const circles=defaultCircles();
  return (
    
    <div id={index} onClick={sectionClick} style={index<12?{order:`${index}`}:{order:`${35-index}`,flexDirection:'column-reverse'}} 
     className={`grid-item grid-item${index}`}>
       <div  onClick={sectionClick} id={index} style={ index<12?{clipPath:'polygon(0% 0%,100% 0%, 50% 100%)'}:{clipPath:'polygon(50% 0%,0% 100%, 100% 100%)'}  } className="triangle"></div>
       {circles}
      
    </div>
    
  )
}

export default Section

// const [black,setBlack]=useState([
//   0,0,0,0,0,5,
//   0,3,0,0,0,0,
//   5,0,0,0,0,0,
//   0,0,0,0,0,2]);
//   const [white,setWhite]=useState([
//     2,0,0,0,0,0,
//     0,0,0,0,0,5,
//     0,0,0,0,3,0,
//     5,0,0,0,0,0]);
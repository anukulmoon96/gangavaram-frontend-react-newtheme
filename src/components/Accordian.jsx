import React, { useState } from 'react';
import styled from "styled-components";
import {IconContext} from 'react-icons';
import {FiPlus, FiMinus,FiChevronDown,FiChevronRight} from 'react-icons/fi';
import axios from "axios";


const AccordianSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;`;
const Container = styled.div`
position: relative;
top: 30%;
box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);`;
const Wrap = styled.div`
background: #272727;
color: #fff;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 50px;
text-align: center;
cursor: pointer;
h1 {
  padding: 2rem;
}
span {
  margin-right: 1.5rem;
}`;




const Accordian = (props) => {
   
    const data = [ 
        {
            title:"LOW",
            images:props.low
        },
        {
            title:"MEDIUM",
            images:props.medium
        },
        {
            title:"HIGH",
            images:props.high
        }
    ]
    const [clicked, setClicked] = useState(false);

    const toggle = index => {
      if (clicked === index) {
        //if clicked question is already active, then close it
        return setClicked(null);
      }
  
      setClicked(index);
    };


    function postdata(data,imagelink,data2){

       

        axios(`https://gangavaram.app-assertai.com:5000/postdata`,{
            method: 'POST',
            data: {"data":data,"row":props.row._id,"link":imagelink}
        });

        var i = document.getElementById(data+" "+data2+"1");
var d = document.getElementById("discarded");
d.innerHTML += i.innerHTML;

        document.getElementById(data+" "+data2).remove();

       
        if(data == 'LOW'){

            const index = props.row.low_confidance.indexOf(imagelink);
            if (index > -1) {
                props.row.low_confidance.splice(index, 1); // 2nd parameter means remove one item only
              }
           
         //   let low=props.row.low_confidance.length-1;
          //  document.getElementById(props.row._id+"l").innerHTML = '<p style="color: red;">'+low+'L</p>';
           }
         
           if(data == 'MEDIUM'){
            const index = props.row.medium_confidance.indexOf(imagelink);
            if (index > -1) {
                props.row.medium_confidance.splice(index, 1); // 2nd parameter means remove one item only
              }
           // let med = props.row.medium_confidance.length-1;
         //   document.getElementById(props.row._id+"m").innerHTML = '<p style="color: blue;">'+med+'M</p>';
           }
           
           if(data == 'HIGH'){
            const index = props.row.medium_confidance.indexOf(imagelink);
            if (index > -1) {
                props.row.medium_confidance.splice(index, 1); // 2nd parameter means remove one item only
              }
          //  let high = props.row.high_confidance.length-1;
           // document.getElementById(props.row._id+"h").innerHTML = '<p style="color: green;">'+high+'H</p>';
           }
       


    }
  
    return (
        <IconContext.Provider value={{color:'grey',size:'25px'}}>
         <AccordianSection>
             <Container>
                 {data.map((item,index)=>{
                     return(
                         <>
                  <Wrap onClick={() => toggle(index)} key={index}>
                          <h1>{item.title}</h1>
                          <span>{clicked === index ? <FiChevronDown /> : <FiChevronRight />}</span>
                          </Wrap>
                          <div style={{display: "flex",flexWrap: "wrap",textAlign:"center"}}>
                         {clicked === index ? item.images.map(function(item2, i){
                             return(<div id={item.title+" "+i}><div id={item.title+" "+i+"1"}><img width="300" height="150" style={{ padding: "10px" }} src={item2} /></div><br/><button onClick={()=>postdata(item.title,item2,i)} style={{backgroundColor:"red",color:"white",border:"2px solid red",cursor:"pointer"}}>Discard</button><br/><br/></div>)
                             }): null}
                        </div>
                         </>
                     )
                       
                 })

                 }
             </Container>
         </AccordianSection>
         </IconContext.Provider>
    )
}

export default Accordian;
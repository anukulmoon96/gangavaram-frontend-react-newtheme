import React, { useState } from 'react';
import styled from "styled-components";
import {IconContext} from 'react-icons';
import {FiPlus, FiMinus,FiChevronDown,FiChevronRight} from 'react-icons/fi';
import axios from "axios";


const AccordianSection = styled.div`
display: flex;
top:150px;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
background: red;`;
const Container = styled.div`
position: absolute;
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




const Accordian2 = (props) => {
   
     let allimages = [...props.discardlow,...props.discardmedium,...props.discardhigh];



    const data = [ 
        {
            title:"DISCARDED",
            images:allimages
        },
        
       
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
                          <div id="discarded" style={{display: "flex",flexWrap: "wrap",textAlign:"center"}}>
                         {clicked === index ? item.images.map(function(item2, i){
                             return(<div id={item.title+" "+i}><img width="300" height="150" style={{ padding: "10px" }} src={item2} /></div>)
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

export default Accordian2;
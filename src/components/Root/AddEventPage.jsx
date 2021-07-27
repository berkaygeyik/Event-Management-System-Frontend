import React, { useState } from "react";
import AddEvent from "../AddEvent/AddEvent";
import InfoBox from "../AddEvent/InfoBox/InfoBox";

export default function AddEventPage(props) {
  if (!props.user || !props.userRole ) {
    return <div></div>;
  }
  const propsMatch = () =>{
    if(props.match){
      return (
        <>
          <div><InfoBox userRole={props.userRole} update={props.update} eventName={props.match.params.eventName} /></div>
          <div><AddEvent user={props.user} userRole={props.userRole} update={props.update} eventName={props.match.params.eventName} /></div>
        </> 
      )
    }
    else {
      return (
        <>
          <div><InfoBox userRole={props.userRole} update={props.update} /></div>
          <div><AddEvent user={props.user} userRole={props.userRole} update={props.update} /></div>
        </> 
      )
    }
  }
  return (
    <div >
      {propsMatch()}
    </div>
  );
}

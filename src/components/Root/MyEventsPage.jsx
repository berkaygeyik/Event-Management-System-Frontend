import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import EnrollmentChart from "../MyEvents/EnrollmentChart/EnrollmentChart";
import InfoBox from "../MyEvents/InfoBox/InfoBox";
import MyEvents from "../MyEvents/MyEvents";

export default function MyEventsPage(props) {
  const [eventList, setEventList] = useState("");
  
  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    if (props.user && props.userRole) {
      if(props.userRole === "admin")
      axios
        .get(`/admin/${props.user}/events`, config)
        .then((res) => {
          console.log(res.data);
          setEventList(res.data);
        })
        .catch((err) => console.log(err));
    }

    //console.log(user, userRole);
  }, [props.user]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    if (props.user && props.userRole) {
      if(props.userRole === "user")
      axios
        .get(`/user/${props.user}/enrolledEvents`, config)
        .then((res) => {
          console.log(res.data);
          setEventList(res.data);
        })
        .catch((err) => console.log(err));
    }

    //console.log(user, userRole);
  }, [props.user]);

  

  if (!props.user || !props.userRole || !eventList || !props.getDate ) {
    return <div></div>;
  }

  return (
    <div >
      <div><InfoBox userRole={props.userRole} /></div>
      <div><MyEvents user={props.user} userRole={props.userRole} eventList={eventList} getDate={props.getDate} /></div>
      <div>
        {props.userRole === "admin" ? (
          <EnrollmentChart eventList={eventList} />
        ) : null}
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import styles from "./Statistics.module.css";

export default function Statistics(props) {
  const [dayCounts, setDayCounts] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    if (props.event)
      axios
        .get(`/user/getDayCounts/${props.event.name}`, config)
        .then((res) => setDayCounts(res.data))
        .catch((err) => console.log(err));
  }, [props.event]);

  const barChart = () => {
    return (
      <Bar
        className={styles.bar}
        data={{
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          datasets: [
            {
              label: "Participants",
              backgroundColor: [
                "rgba(0, 0, 255, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
              ],
              data: dayCounts,
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ` },
        }}
      />
    );
  };

  // const getDayList = () => {
  //   Array.from(props.event, (event) => console.log(event.name));
  // };
  if (!dayCounts) {
    return <div></div>;
  }
  //getDayList();
  return (
    <div>
      <h3 className={styles.title}>Registration Days Chart</h3>
      <hr className={styles.hr} />
      {barChart()}
    </div>
  );
}

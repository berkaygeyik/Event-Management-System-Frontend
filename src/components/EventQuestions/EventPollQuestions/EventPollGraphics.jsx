import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "../EventPollQuestions.module.css";

export default function EventPollGraphics(props) {
  const barChart = () => {
    return (
      <Bar
        className={styles.bar}
        data={{
          labels: ["OPTION 1", "OPTION 2", "OPTION 3", "OPTION 4"],
          datasets: [
            {
              label: "Participants",
              backgroundColor: ["rgba(255, 0, 0, 0.6)"],
              data: props.answerOptions.answerOptions
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

  if (!props.answerOptions || !props.index) {
    return <div></div>;
  }
  return (
    <div>
      <h4 className={styles.title}>Selected Options Counts of Question {props.index}</h4>
      <hr className={styles.hr} />
      {barChart()}
    </div>
  );
}

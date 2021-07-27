import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Container } from "reactstrap";

import styles from "./EnrollmentChart.module.css";
export default function EnrollmentChart(props) {
  const barChart = () => {
    return (
      <Bar
        className={styles.bar}
        data={{
          labels: Array.from(props.eventList, (event) => event.name),
          datasets: [
            {
              label: "Participants",
              backgroundColor: [
                "rgba(0, 0, 255, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
              ],
              data: Array.from(props.eventList, (event) =>
                parseInt(event.registeredUserCount)
              ),
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

  if (!props.eventList) {
    return <div></div>;
  }

  return (
    <div>
      <Container className={styles.bar}>
        <h2 className={styles.title}>Chart of Events According to Registration Counts</h2>
        <hr className={styles.hr} />
        {barChart()}
      </Container>
    </div>
  );
}

import { Button, Card, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardSubtitle, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import styles from "../EventPollQuestions.module.css";

export default function EventRegistration(props) {
  const [registrationQuestions, setRegistrationQuestions] = useState("");
  

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    if (props.event.name) {
      axios
        .get(`/user/eventRegistrationQuestions/${props.event.name}`, config)
        .then((res) => {
          console.log(res.data);
          setRegistrationQuestions(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [props.userRole, props.event, props.user]);

  const showQuestions = (question, index) => {
    return (
      <div className={styles.questionBox}>
        <div className="col-12 mb-4" key={index}>
          <h4 style={{ margin: "10px 50px" }}>Question {index + 1}:</h4>
          <Card className={styles.cardContent}>
            <div style={{ width: "100" }}>
              <CardTitle className={styles.cardTitle} tag="h6">
                <i class="fa fa-question-circle" aria-hidden="true"></i> {question.questionText}
              </CardTitle>
              <hr style={{ marginTop: "0", opacity: "0.15" }} />

              {/* {writeAnswerButton(question)} */}
              <div className={styles.buttonPosition}></div>
            </div>
          </Card>
          {/* {showAnswer(question, index)}
            {question.uniqueId === selectedQuestion && isOpen ? writeAnswer(question) : null} */}
        </div>
      </div>
    );
  };

  if (!props.user || !props.userRole || !props.event || !props.modalToggle || !registrationQuestions) {
    return <div></div>;
  }

  return (
    <Modal isOpen={props.modal} toggle={props.modalToggle }>
      <ModalHeader style={{ display: "flex", justifyContent: "center" }}>Answer Registration Questions</ModalHeader>
      <ModalBody>
        <Card>
          <div>
            {/* {console.log(winnerUserData.username)} */}
            <Grid container spacing={0} item xs={12}>
              {registrationQuestions.map((question, index) => showQuestions(question, index))}
            </Grid>
          </div>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.modalToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
    // <div className={styles.pollBox}>
    //   <h3 className={styles.title}>You can fill out the Event Poll.</h3>
    //   <hr style={{ marginTop: "0", opacity: "0.15", width: "60%" }} />
    //   <Grid container spacing={0} item xs={12}>
    //     {registrationQuestions.map((question, index) => showQuestions(question, index))}
    //   </Grid>
    //   <div className={styles.sendQuestionButtonPosition}>
    //     <Button color="success" className={styles.sendQuestionButton} >
    //       Send Questions
    //     </Button>
    //   </div>
    // </div>
  );
}

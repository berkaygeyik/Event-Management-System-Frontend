import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, CardSubtitle, CardTitle, Collapse, Form, Input, Label, Table } from "reactstrap";
import { Card, Grid, TableRow } from "@material-ui/core";

import styles from "../EventPollQuestions.module.css";
export default function EventRegisterQuestions(props) {
  const [registrationQuestions, setRegistrationQuestions] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const [questionText, setQuestionText] = useState("");

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
          console.log(res.data)
          setRegistrationQuestions(res.data);
        })
        .catch((err) => console.log(err));

      // axios
      //   .get(`/user/eventPollAnswers/${props.event.name}`, config)
      //   .then((res) => {
      //     createAnswerArray(res.data);
      //     setAnswerOptions(res.data);
      //   })
      //   .catch((err) => console.log(err));
    }
  }, [props.userRole, props.event, props.user, trigger]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const clear = () => {
    setQuestionText("");

    setTrigger(!trigger);
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const data = {
      questionText: questionText,
    };

    if (props.userRole === "admin") {
      axios
        .post(`/admin/eventRegistrationQuestions/${props.event.name}`, data, config)
        .then((res) => {
          clear();
        })
        .catch((err) => console.log(err));
    }
  };

  const writeQuestion = () => {
    return (
      <Form className={styles.myForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <Label htmlFor="questionText" className={styles.label}>
            <Badge className={styles.label}>Add New Registration Question</Badge>
          </Label>
          <Input
            type="textarea"
            name="questionText"
            value={questionText}
            id="questionText"
            className={styles.inputTextArea}
            required
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>

        <div className={styles.buttonPosition}>
          <Button color="success" className={styles.sendButton}>
            Send Question
          </Button>
        </div>

        {/* {showAlert()} */}
      </Form>
    );
  };

  const showQuestions = (question, index) => {
    return (
      <div className={styles.questionBox} key={index}>
        <div className="row ">
          <div className={props.showAnswerDetails ? "col-6 mb-2" : "col-12 mb-2"}>
            <h4 style={{ margin: "10px 50px" }}>Question {index + 1}:</h4>
            <Card className={styles.cardContent}>
              <div style={{ width: "100%" }}>
                <CardTitle className={styles.cardTitle} tag="h6">
                  <i class="fa fa-question-circle" aria-hidden="true"></i> {question.questionText}
                </CardTitle>
              </div>
            </Card>
            {/* {props.showAnswerDetails ? showAnswers(index) : null} */}
          </div>
        </div>
      </div>
    );
  };

  if (!props.user || !props.userRole || !props.event || !registrationQuestions) {
    return <div></div>;
  }

  return (
    <div>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>
          {props.showAnswerDetails ? "Event Poll Questions and Answer Details" : "Event Registration Questions"}
        </h3>
        {props.userRole === "admin" ? (
          <Button color="success" className={styles.askQuestionButton} onClick={toggle}>
            <i class="fa fa-plus" aria-hidden="true"></i> Add Question
          </Button>
        ) : null}
      </div>

      <hr className={styles.hr} />
      <Collapse className={styles.collapse} isOpen={isOpen}>
        {props.userRole === "admin" ? writeQuestion() : null}
      </Collapse>
      <Grid container spacing={0} item xs={12}>
        {registrationQuestions.length !== 0 ? registrationQuestions.map((question, index) => showQuestions(question, index)): null}
      </Grid>
    </div>
  );
}

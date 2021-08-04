import { Card, Grid, TableRow } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, CardSubtitle, CardTitle, Collapse, Form, Input, Label, Table } from "reactstrap";

import styles from "../EventPollQuestions.module.css";
import EventPollGraphics from "./EventPollGraphics";

export default function EventPollQuestions(props) {
  const [pollQuestions, setPollQuestions] = useState("");
  const [pollAnswers, setPollAnswers] = useState("");
  const [answerOptions, setAnswerOptions] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  // const [answer, setAnswer] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    if (props.event.name) {
      axios
        .get(`/admin/eventPollQuestions/${props.event.name}`, config)
        .then((res) => {
          setPollQuestions(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get(`/user/eventPollAnswers/${props.event.name}`, config)
        .then((res) => {
          createAnswerArray(res.data);
          setAnswerOptions(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [props.userRole, props.event, props.user, trigger]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const createAnswerArray = (oldArray) => {
    let answerArray = [];
    for (let i = 0; i < oldArray.length; i++) {
      let answerGroup = [];
      for (let j = 0; j < oldArray[i].answerList.length; j++) {
        answerGroup.push({ answer: oldArray[i].answerList[j], user: oldArray[i].userList[j] });
      }
      answerArray.push(answerGroup);
    }
    setPollAnswers(answerArray);
  };

  const clear = () => {
    setQuestionText("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    // setAnswer("");

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
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
    };

    if (props.userRole === "admin") {
      axios
        .post(`/user/${props.user}/eventPollQuestions/${props.event.name}`, data, config)
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
            <Badge className={styles.label}>Add New Question to the Poll</Badge>
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
        <div className={styles.optionContainer}>
          <Label htmlFor="option1" className={styles.label}>
            <Badge className={styles.label}>Option 1</Badge>
          </Label>
          <Input
            type="text"
            name="option1"
            value={option1}
            id="option1"
            className={styles.optionText}
            required
            onChange={(e) => setOption1(e.target.value)}
          />
        </div>

        <div className={styles.optionContainer}>
          <Label htmlFor="option2" className={styles.label}>
            <Badge className={styles.label}>Option 2</Badge>
          </Label>
          <Input
            type="text"
            name="option2"
            value={option2}
            id="option2"
            className={styles.optionText}
            required
            onChange={(e) => setOption2(e.target.value)}
          />
        </div>
        <div className={styles.optionContainer}>
          <Label htmlFor="option3" className={styles.label}>
            <Badge className={styles.label}>Option 3</Badge>
          </Label>
          <Input
            type="text"
            name="option3"
            value={option3}
            id="option3"
            className={styles.optionText}
            required
            onChange={(e) => setOption3(e.target.value)}
          />
        </div>
        <div className={styles.optionContainer}>
          <Label htmlFor="option4" className={styles.label}>
            <Badge className={styles.label}>Option 4</Badge>
          </Label>
          <Input
            type="text"
            name="option4"
            value={option4}
            id="option4"
            className={styles.optionText}
            required
            onChange={(e) => setOption4(e.target.value)}
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

  const tableRow = (pollAnswer, index) => {
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{pollAnswer.user}</td>
        <td>{pollAnswer.answer}</td>
      </tr>
    );
  };
  const showAnswers = (index) => {
    return (
      <Table striped className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>#</th>
            <th style={{ width: "20%" }}>User Name</th>
            <th style={{ width: "70%" }}>User Answer</th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log(pollAnswers[2], index)} */}
          {/* {pollAnswers.map((pollAnswer) => tableRow(pollAnswer, index))} */}
          {pollAnswers[index].map((pollAnswer, answerIndex) => tableRow(pollAnswer, answerIndex))}
        </tbody>
      </Table>
    );
  };

  const showQuestions = (question, index) => {
    return (
      <div className={styles.questionBox} key={index}>
        <div className="row ">
          <div className={props.showAnswerDetails?"col-6 mb-2":"col-12 mb-2"}>
            <h4 style={{ margin: "10px 50px" }}>Question {index + 1}:</h4>
            <Card className={styles.cardContent}>
              <div style={{ width: "100%" }}>
                <CardTitle className={styles.cardTitle} tag="h6">
                  <i class="fa fa-question-circle" aria-hidden="true"></i> {question.questionText}
                </CardTitle>
                <hr style={{ marginTop: "0", opacity: "0.15" }} />
                <div className={styles.showingOption}>
                  <Input type="radio" name="radio1" disabled /> {question.option1}
                </div>
                <div className={styles.showingOption}>
                  <Input type="radio" name="radio1" disabled /> {question.option2}
                </div>
                <div className={styles.showingOption}>
                  <Input type="radio" name="radio1" disabled /> {question.option3}
                </div>
                <div className={styles.showingOption}>
                  <Input type="radio" name="radio1" disabled /> {question.option4}
                </div>
              </div>
            </Card>
            {props.showAnswerDetails ? showAnswers(index) : null}
          </div>
          <div className="col-6 mb-4">
            {props.showAnswerDetails?<EventPollGraphics index={index+1} answerOptions={answerOptions[index]}></EventPollGraphics>:null}
          </div>
        </div>
      </div>
    );
  };

  if (!props.user || !props.userRole || !props.event || !pollQuestions || !pollAnswers || !answerOptions) {
    return <div></div>;
  }

  return (
    <div>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>
          {props.showAnswerDetails ? "Event Poll Questions  and Answer Details" : "Event Poll Questions"}
        </h3>
        {props.userRole === "admin" ? (
          <Button color="success" className={styles.askQuestionButton} onClick={toggle}>
            <i class="fa fa-plus" aria-hidden="true"></i> Add Poll Question
          </Button>
        ) : null}
      </div>

      <hr className={styles.hr} />
      <Collapse className={styles.collapse} isOpen={isOpen}>
        {props.userRole === "admin" ? writeQuestion() : null}
      </Collapse>
      <Grid container spacing={0} item xs={12}>
        {pollQuestions.map((question, index) => showQuestions(question, index))}
      </Grid>
    </div>
  );
}

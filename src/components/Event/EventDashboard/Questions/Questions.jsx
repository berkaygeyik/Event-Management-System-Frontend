import { Card, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  CardImg,
  CardSubtitle,
  CardTitle,
  Form,
  Input,
  Label,
  Collapse,
} from "reactstrap";

import styles from "./Questions.module.css";

const defaultImage = "/user-icon.png";

export default function Questions(props) {
  const [questionList, setQuestionList] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [trigger, setTrigger] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    if (props.userRole === "admin" && props.event.name) {
      axios
        .get(`/admin/eventQuestions/${props.event.name}`, config)
        .then((res) => setQuestionList(res.data))
        .catch((err) => console.log(err));
    }
    if (props.userRole === "user" && props.event.name && props.user) {
      axios
        .get(
          `/user/eventQuestionsUser/${props.user}/${props.event.name}`,
          config
        )
        .then((res) => setQuestionList(res.data))
        .catch((err) => console.log(err));
    }
  }, [props.userRole, props.event, props.user, trigger]);

  const toggle = () => {
    setIsOpen(!isOpen);
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

    if (props.userRole === "user") {
      axios
        .post(
          `/user/${props.user}/eventQuestions/${props.event.name}`,
          data,
          config
        )
        .then((res) => {
          setTrigger(!trigger);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const data = {
      answer: questionText,
    };

    if (props.userRole === "admin") {
      axios
        .post(`/admin/answerQuestion/${selectedQuestion}`, data, config)
        .then((res) => {
          console.log(res.data)
          setTrigger(!trigger);
          setIsOpen(false)
          setQuestionText("")
        })
        .catch((err) => console.log(err));
    }
  };

  const writeQuestion = () => {
    return (
      <Form className={styles.myForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          {/* <Label htmlFor="questionText" className={styles.icon}>
            Name
          </Label> */}
          <Input
            type="textarea"
            name="questionText"
            value={questionText}
            id="questionText"
            className={styles.inputTextArea}
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

  const writeAnswer = (question) => {
    return (
      <Form className={styles.myFormAnswer} onSubmit={handleAnswerSubmit}>
        <div className={styles.inputContainer}>
          {/* <Label htmlFor="questionText" className={styles.icon}>
            Name
          </Label> */}
          <Input
            type="textarea"
            name="questionText"
            value={questionText}
            id="questionText"
            className={styles.inputTextArea}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <div className={styles.buttonPosition}>
          <Button color="success" className={styles.sendButton}>
            Send Answer
          </Button>
        </div>

        {/* {showAlert()} */}
      </Form>
    );
  };

  const writeAnswerButton = (question) => {
    if (!question.answer && props.userRole === "admin") {
      return (
        <Button
          style={{ marginTop: "20px", outline: "none" }}
          color="success"
          onClick={(e) => {
            setSelectedQuestion(question.uniqueId);
            toggle();
          }}
        >
          Answer the Question
        </Button>
      );
    }
  };

  const updateAnswerButton = (question) => {
    if (question.answer && props.userRole === "admin") {
      return (
        <Button
          style={{ marginTop: "20px", outline: "none" }}
          color="danger"
          onClick={(e) => {
            setSelectedQuestion(question.uniqueId);
            toggle();
          }}
        >
          Update Your Answer
        </Button>
      );
    }
  };

  const showAnswer = (question, index) => {
    if (question.answer) {
      return (
        <>
          <h4 style={{ margin: "10px 50px" }}>Answer:</h4>
          <Card className={styles.cardContentAnswer}>
            <div className="col-2 ">
              <div className={styles.center}>
                <CardImg
                  top
                  src={defaultImage}
                  alt="Card Image"
                  style={{ width: "80%" }}
                ></CardImg>
              </div>
            </div>
            <div className="col-9 ">
              <CardTitle className={styles.cardTitle} tag="h4">
                {props.eventAdmin.username}
              </CardTitle>
              <hr style={{ marginTop: "0", opacity: "0.15" }} />
              <CardSubtitle className={styles.cardSubTitle}>
                {question.answer}
              </CardSubtitle>
              {updateAnswerButton(question)}
              {/* {console.log((question.uniqueId + "    " + selectedQuestion))} */}
            </div>
          </Card>
        </>
      );
    }
  };

  const showQuestionsAnswers = (question, index) => {
    //console.log(question.uniqueId)
    return (
      <div className={styles.questionAnswerBox}>
        <div className="col-12 mb-5" key={index}>
          <h4 style={{ margin: "10px 50px" }}>Question:</h4>
          <Card className={styles.cardContent}>
            <div className="col-3 ">
              <div className={styles.center}>
                <CardImg
                  top
                  src={defaultImage}
                  alt="Card Image"
                  style={{ width: "80%" }}
                ></CardImg>
              </div>
            </div>
            <div className="col-9 ">
              <CardTitle className={styles.cardTitle} tag="h4">
                {question.username}
              </CardTitle>
              <hr style={{ marginTop: "0", opacity: "0.15" }} />
              <CardSubtitle className={styles.cardSubTitle}>
                {question.questionText}
              </CardSubtitle>
              {writeAnswerButton(question)}
            </div>
          </Card>
          {showAnswer(question, index)}
          {question.uniqueId === selectedQuestion && isOpen
            ? writeAnswer(question)
            : null}
        </div>
      </div>
    );
  };

  if (
    !props.user ||
    !props.userRole ||
    !props.event ||
    !questionList ||
    !props.eventAdmin
  ) {
    return null;
  }

  return (
    <div>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>Questions Asked by Users</h3>
        {props.userRole === "user" ? (
          <Button
            color="warning"
            className={styles.askQuestionButton}
            onClick={toggle}
          >
            Ask Question
          </Button>
        ) : null}
      </div>
      <hr className={styles.hr} />
      <Collapse className={styles.collapse} isOpen={isOpen}>
        {props.userRole === "user" ? writeQuestion() : null}
      </Collapse>
      <Grid container spacing={0} item xs={12}>
        {questionList.map((question, index) =>
          showQuestionsAnswers(question, index)
        )}
      </Grid>
    </div>
  );
}

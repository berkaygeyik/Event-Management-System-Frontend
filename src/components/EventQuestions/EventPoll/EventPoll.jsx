import { Card, FormControlLabel, Grid, Radio, RadioGroup } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, CardTitle, Input } from "reactstrap";

import styles from "../EventPollQuestions.module.css";

export default function EventPoll(props) {
  const history = useHistory();

  const [pollQuestions, setPollQuestions] = useState("");
  const [valueList, setValueList] = useState();
  const [config, setConfig] = useState();
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const newConfig = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    setConfig(newConfig);

    if (props.event.name) {
      axios
        .get(`/admin/eventPollQuestions/${props.event.name}`, config)
        .then((res) => {
          setPollQuestions(res.data);
          setValueList(new Array(res.data.length));
        })
        .catch((err) => console.log(err));
    }
  }, [props.userRole, props.event, props.user, trigger]);

  const changeValues = (event, index) => {
    let val = event.target.value;
    if (val !== undefined) {
      let values = valueList;
      values[index] = event.target.value;
      setValueList(values);
    }
    console.log(valueList);
  };

  const handleClick = () => {
    axios
      .post(`/user/${props.user}/answerPollQuestions/${props.event.name}`, { answerList: valueList }, config)
      .then((res) => {
        console.log(res.data);
        props.changeTrigger();
      
      })
      .catch((err) => console.log(err));
  };

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
              <RadioGroup
                aria-label={"question" + (index + 1)}
                name={"question" + (index + 1)}
                className={styles.radioGroup}
              >
                <FormControlLabel
                  value={question.option1}
                  control={<Radio />}
                  label={question.option1}
                  className={styles.showingOption}
                  onClick={(e) => changeValues(e, index)}
                />
                <FormControlLabel
                  value={question.option2}
                  control={<Radio />}
                  label={question.option2}
                  className={styles.showingOption}
                  onClick={(e) => changeValues(e, index)}
                />
                <FormControlLabel
                  value={question.option3}
                  control={<Radio />}
                  label={question.option3}
                  className={styles.showingOption}
                  onClick={(e) => changeValues(e, index)}
                />
                <FormControlLabel
                  value={question.option4}
                  control={<Radio />}
                  label={question.option4}
                  className={styles.showingOption}
                  onClick={(e) => changeValues(e, index)}
                />
              </RadioGroup>
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

  if (!props.user || !props.userRole || !props.event || !pollQuestions || !props.eventPollUsers) {
    return <div></div>;
  }

  return (
    <div>
      {!props.eventPollUsers.includes(props.user) ? (
        <div className={styles.pollBox}>
          <h3 className={styles.title}>You can fill out the Event Poll.</h3>
          <hr style={{ marginTop: "0", opacity: "0.15", width: "60%" }} />
          <Grid container spacing={0} item xs={12}>
            {pollQuestions.map((question, index) => showQuestions(question, index))}
          </Grid>
          <div className={styles.sendQuestionButtonPosition}>
            <Button color="success" className={styles.sendQuestionButton} onClick={handleClick}>
              Send Questions
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.pollBox}>
          <h3 className={styles.title}>You already filled out the Event Poll.</h3>
          <Button color="secondary" className={styles.sendQuestionButton} onClick={() => history.push(`/event/${props.event.name}`)}>
            Go Back 
          </Button>
        </div>
      )}
    </div>
  );
}

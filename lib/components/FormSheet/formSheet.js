import React, {useEffect, useState} from "react";
import classNames from "classnames";
import styles from "./formSheet.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const FormSheet = ({
                      pictureUrl,
                      boxShadow = {
                          color: "rgba(102, 94, 255, 0.9)",
                          offsetX: "0px",
                          offsetY: "0px",
                          blurRadius: "118px",
                          spreadRadius: "45px",
                      },
                      className,
                  }) => {

    const [attemptState, setAttemptState] = useState("neutral")

    function fetchBackgroundColor() {
        console.log("This is going here boss")
        if(attemptState === "neutral") {
            return styles.mainSection
        } else if (attemptState === "loser") {
            return styles.mainSectionLoser
        } else if (attemptState === "champion")  {
            return styles.mainSectionWinner
        }
    }

    function fetchLeftSideText() {
        if(attemptState === "neutral") {
            return "Test your luck!"
        } else if (attemptState === "loser") {
            return "You have failed, try these other actions to another chance to win:"
        } else if (attemptState === "champion")  {
            return "Congrats! You won! You will be emailed your prize within the next 23 hours."
        }
    }

    function handleAttempt() {
        console.log("This is about to run")
        // TODO: Pass the code by the endpoint and see if it's valid
        // useEffect(() => {
            // @ts-ignore
            // setCardElements((previousVale) => hardCodedElements)
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("id_token", "axb");
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({"competition_id":"", "code": "abc"});  // TODO: Change this

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            // @ts-ignore
            fetch("http://127.0.0.1:8080/sweepstakes/attempt_code", requestOptions)
                .then(response => response.json())
                .then(result => {
                    let resultResponse = result.response
                    console.log("This is hte resonse Pabloo", resultResponse)
                    // setCardElements( (previousValue) => resultResponse)
                })
                .catch(error => setAttemptState("loser"));
        // })
    }

    return (
        <div className={styles.baseDiv}>

            <div className={styles.leftSidePanel}> {fetchLeftSideText()} </div>
            <div className={fetchBackgroundColor()}> This is the right side
                <TextField label="Enter your code" size="normal" variant="filled" className={styles.textField} />
                <Button variant="contained" onClick={handleAttempt}>Try</Button>
            </div>
        </div>
    );
};

export default FormSheet;

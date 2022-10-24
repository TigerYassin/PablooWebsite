import React, {useEffect, useState} from "react";
import classNames from "classnames";
import styles from "./formSheet.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CustomCard from "./card"
import CardSelected from "./cardSelected"

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

    // For the cards
    const [cardElements, setCardElements] = useState([])
    const [pageName, setPageName] = useState("Home")  // "cardSelected"
    const [selectedCard, setSelectedCard] = useState(0)

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

    var hardCodedElements = [
        {
            "id": "",
            "title": "Download",
            "prize": {
                "odds_of_winning_string": "1 out of 5 odds",
                "value_string": "$20",
                "value": 20,
                "winning_percentage": 0.2
            },
            "action": {
                "cta_string": "Download the app!",
                "cta_link": "https://apps.apple.com/us/app/mealme-all-of-food-one-app/id1460140965",
                "name": "Download",
                "number_of_entries": 1
            },
            "image_link": "https://pbs.twimg.com/profile_images/1139207903443922947/-0957cnZ_400x400.png",
            "detailed_description": "MealMe is giving out 1 entry for each person that downloads the app. In the  Sweepstakes, you have 1 in 5 odds of winning $20!",
            "instructions": {
                "title": "Steps to participating",
                "instruction_list": ["1.  Visit the AppStore", "2. Search for the MealMe App", "3. Download the MealMe App!", "4. Share your username."]
            },
            "list_af_attributes": ["1 entry", "Prize $20", "4 Days Remaining"]
        },
    ]

    function selectPage(pageIndex) {
        setSelectedCard(pageIndex)
        setPageName("cardSelected")
        console.log("This is being hit")
    }

    // Text for the left hand section
    // TODO: Update the text
    function fetchLeftSideText() {
        if(attemptState === "neutral") {
            return <div>
                <h2>Test your luck!</h2>
                <p>Enter your code &#8594;</p>
            </div>
        } else if (attemptState === "loser") {
            // TODO: Need to subtract the actions that user already completed
            return <div className={styles.card}>
                You have failed, but you can try these other actions to win. Your odds of winning with your next attempt are high
                {pageName === "Home" && hardCodedElements.map( (cardInfo, i) => <CustomCard onClickAction={() => selectPage(i)} cardObject={cardInfo} key={i}/>)}
                {pageName === "cardSelected" && <CardSelected cardObject={hardCodedElements[selectedCard]} />}
            </div>
        } else if (attemptState === "champion")  {
            return <div>Congrats! You won! You will be emailed your prize within the next 23 hours.</div>
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
                .catch(error => setAttemptState("champion"));
        // })
    }

    return (
        <div className={styles.baseDiv}>

            <div className={styles.leftSidePanel}>
                <div className={styles.full_width_div}>
                    <img className={styles.header_image} onClick={() => null} src={"https://firebasestorage.googleapis.com/v0/b/pabloo-inc.appspot.com/o/pabloo_transparent_logo_cropped.png?alt=media&token=7a56a99b-4301-4102-a4a2-58c38a95e66b"}/>
                </div>
                {fetchLeftSideText()}
            </div>

            <div className={fetchBackgroundColor()}>
                <TextField label="Enter your code" size="normal" variant="filled" className={styles.textField} />
                <Button variant="contained" onClick={handleAttempt}>Try</Button>
            </div>
        </div>
    );
};

export default FormSheet;

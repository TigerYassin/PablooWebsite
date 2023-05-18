import React, {useEffect, useState, useRef} from "react";
import classNames from "classnames";
import styles from "../FormSheet/formSheet.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CustomCard from "../FormSheet/card"
import CardSelected from "../FormSheet/cardSelected"

const CalculatorView = ({
                       // pictureUrl,
                       // boxShadow = {
                       //     color: "rgba(102, 94, 255, 0.9)",
                       //     offsetX: "0px",
                       //     offsetY: "0px",
                       //     blurRadius: "118px",
                       //     spreadRadius: "45px",
                       // },
                       // className,
                   }) => {

    // For the cards
    const [cardElements, setCardElements] = useState([])
    const [pageName, setPageName] = useState("Home")  // "cardSelected"
    const [selectedCard, setSelectedCard] = useState(0)

    const [textFieldText, setTextFieldText] = useState("")
    const myRef = useRef(null)
    const [leftSideContent, setLeftSideContent] = useState(
        <div>
            <h2>Try your luck!</h2>
            <p>Enter your code &#8594;</p>
        </div>
    )

    var hardCodedElements = [
        {
            "id": "",
            "title": "Let's talk",
            "prize": {
                "odds_of_winning_string": "Odds of Winning: 2 out of 5",
                "value_string": "$25",
                "value": 25,
                "winning_percentage": 0.4
            },
            "action": {
                "cta_string": "Talk to Pabloo",
                "cta_link": "https://calendly.com/yassinalsahlani1/15min",
                "name": "schedule_call",
                "number_of_entries": 2
            },
            "image_link": "https://firebasestorage.googleapis.com/v0/b/pabloo-inc.appspot.com/o/pabloo_transparent_logo.png?alt=media&token=24d89dd5-883a-4f2d-a9be-220abcb019a8",
            "detailed_description": "Meet with an integrations engineer and see how you can benefit from Pabloo's Sweepstakes and Mini Competitions. In this Sweepstakes, you have 2 in 5 odds of winning!",
            "instructions": {
                "title": "Steps to participating",
                "instruction_list": ["1.  Schedule a call with Pabloo", "2.  Meet with a Pabloo integration engineer", "3.  Get rewarded!"]
            },
            "list_af_attributes": ["40% of winning", "$25 Prize", "2 entries"]
        },
    ]

    function selectPage(pageIndex) {
        setSelectedCard(pageIndex)
        setPageName("cardSelected")
    }

    function fetchLeftFailureScreen() {
        return <div className={styles.card}>
            You have failed, but you can try again. The odds of you winning are super high!
            {pageName === "Home" && hardCodedElements.map( (cardInfo, i) => <CustomCard onClickAction={() => selectPage(i)} cardObject={cardInfo} key={i}/>)}
            {pageName === "cardSelected" && <CardSelected cardObject={hardCodedElements[selectedCard]} />}
        </div>
    }

    function fetchRightSuccessScreen() {
        return <div>Congrats! You won! You will be emailed your prize within the next 22 hours.</div>
    }

    function handleAttempt() {
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("id_token", "axb");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({"competition_id":"pabloo", "code": textFieldText});

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // @ts-ignore
        fetch("https://server.pabloo.com/sweepstakes/attempt_code", requestOptions)
            .then(response => response.json())
            .then(result => {
                let resultResponse = result.success
                console.log("This is if successful", resultResponse)

                if(resultResponse) {
                    setLeftSideContent(fetchRightSuccessScreen())
                } else {
                    myRef.current.className = styles.mainSectionLoser
                    setLeftSideContent(fetchLeftFailureScreen())}
            })
            .catch(error => setLeftSideContent(fetchLeftFailureScreen()));
    }

    return (
        <div className={styles.baseDiv}>

            <div className={styles.leftSidePanel}>
                <div className={styles.full_width_div}>
                    <img className={styles.header_image} onClick={() => setPageName("Home")} src={"https://firebasestorage.googleapis.com/v0/b/pabloo-inc.appspot.com/o/pabloo_transparent_logo_cropped.png?alt=media&token=7a56a99b-4301-4102-a4a2-58c38a95e66b"}/>
                </div>
                {leftSideContent}
            </div>

            <div className={styles.mainSection} ref={myRef}>
                <TextField label="Enter your code" size="normal" variant="filled" className={styles.textField} onChange={e => setTextFieldText(e.target.value)} />
                <Button variant="contained" onClick={handleAttempt}>Try</Button>
            </div>
        </div>
    );
};

export default CalculatorView;

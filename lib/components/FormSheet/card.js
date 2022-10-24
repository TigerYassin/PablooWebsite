import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from "./formSheet.module.css";
import PropTypes from 'prop-types'
// import clockIcon from "../images/clock_icon.png";  // TODO: Fix
// import sendIcon from "../images/send_icon.png";


class CustomCard extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div className={styles.nested_card} onClick={this.props.onClickAction}>
                <h3>{this.props.cardObject.title}</h3>

                <div className={styles.row}>
                    <img src={this.props.cardObject.image_link} />
                    <div className={styles.nested_row_div}>
                        {this.props.cardObject.action.number_of_entries} entry
                        <h3 className={styles.nested_row}><img src={"https://firebasestorage.googleapis.com/v0/b/pabloo-inc.appspot.com/o/clock_icon.png?alt=media&token=36444167-926a-4192-893d-31d0d420028c"}/>{this.props.cardObject.prize.odds_of_winning_string}</h3>
                    </div>
                </div>

                <a href={this.props.cardObject.action.cta_link} target="_blank" rel="noreferrer">
                    <button> <img src={"https://firebasestorage.googleapis.com/v0/b/pabloo-inc.appspot.com/o/send_icon.png?alt=media&token=d2e13857-5c5b-44ae-8552-ba5873ca799c"}/>{this.props.cardObject.action.cta_string}</button>
                </a>

            </div>
        );
    }
};

CustomCard.Proptypes = {
    cardObject: PropTypes.object,
}

export default CustomCard;

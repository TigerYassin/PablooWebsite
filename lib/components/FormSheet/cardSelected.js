import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from "./formSheet.module.css";
import PropTypes from 'prop-types'


class CardSelected extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div>
                <div className={styles.nested_card}>
                    <h3>{this.props.cardObject.title}</h3>
                    <div className={styles.row}>
                        <img src={this.props.cardObject.image_link} />
                        <div className={styles.nested_row_div}>
                            {this.props.cardObject.detailed_description}
                        </div>
                    </div>

                    <div className={styles.instruction_blurb}>
                        <p> <strong> {this.props.cardObject.instructions.title} </strong></p>
                        {this.props.cardObject.instructions.instruction_list.map( (instructionString, i) => <p key={i}> {instructionString} </p>)}
                    </div>
                </div>

                <div className={styles.bottom_flex_row}>
                    {this.props.cardObject.list_af_attributes.map( (attributeString, i) => <p key={i}> {attributeString} </p> )}
                </div>
                <a href={this.props.cardObject.action.cta_link} target="_blank" rel="noreferrer">
                    <button> <img src={"https://firebasestorage.googleapis.com/v0/b/pabloo-inc.appspot.com/o/send_icon.png?alt=media&token=d2e13857-5c5b-44ae-8552-ba5873ca799c"}/>{this.props.cardObject.action.cta_string}</button>
                </a>
            </div>
        );
    }
};

CardSelected.Proptypes = {
    cardObject: PropTypes.object,
}

export default CardSelected;

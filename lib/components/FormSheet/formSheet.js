import React from "react";
import classNames from "classnames";
import styles from "./formSheet.module.css";
import Box from '@mui/material/Box';
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
    return (
        <div className={styles.mainSection}>
            something

                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="standard-basic" label="Standard" variant="standard" />
        </div>
    );
};

export default FormSheet;

import React, { useState } from "react";
import { Box } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const DatePickerLib = props => {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const onChange = (range) => {
        const [startDate, endDate] = range;
        setStartDate(startDate);
        setEndDate(endDate);
    };

    return(
        <>
            <Box
                    sx={{
                    borderRadius: '6px',
                    border: '1px solid #D1D5DB',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '20px'
                }}
            >
                <CalendarMonthIcon />
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    className="custom-datepicker"
                />
            </Box>
        </>
    )
}

export default DatePickerLib;
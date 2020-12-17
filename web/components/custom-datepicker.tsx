import clsx from "clsx";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import isSameDay from "date-fns/isSameDay";
import endOfWeek from "date-fns/endOfWeek";
import React, { useState } from "react";
import startOfWeek from "date-fns/startOfWeek";
import isWithinInterval from "date-fns/isWithinInterval";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createStyles } from "@material-ui/styles";
// this guy required only on the docs site to work with dynamic date library
import { makeJSDateObject } from '../helpers/utils';
import { IconButton, withStyles } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib


// TODO: Datepicker gehört und Weekday GRId gehören getrennt

const CustomElements = ({ classes }) => {

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [start, setStart] = useState(
    startOfWeek(makeJSDateObject(selectedDate))
  )

  const handleWeekChange = selectedDate => {
    setSelectedDate(selectedDate);
    setStart(startOfWeek(selectedDate));
  };

  const formatWeekSelectLabel = (date, invalidLabel) => {
    let dateClone = makeJSDateObject(date);

    return dateClone && isValid(dateClone)
      ? `Week of ${format(startOfWeek(dateClone), "MMM do")}`
      : invalidLabel;
  };

  const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    let dateClone = makeJSDateObject(date);
    let selectedDateClone = makeJSDateObject(selectedDate);

    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(dateClone, "d")} </span>
        </IconButton>
      </div>
    );
  };

  const handleDayClick = (e) => {
    const selectedDate = new Date(e.target.dataset.value)
    setSelectedDate(selectedDate)
    setStart(startOfWeek(selectedDate));
  }

  const WeekDayGrid = () => {
    var weekDay = start || startOfWeek(makeJSDateObject(new Date()));
    let weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        <div className="col card py-2 m-1" key={i} data-value={weekDay.toLocaleDateString()} onClick={handleDayClick}>
          {/* {weekDay.toLocaleDateString()} */}
          {format(weekDay, 'd')}
          {format(weekDay, 'iii')}
        </div>
      )
      weekDay.setDate(weekDay.getDate() + 1);
    }
    return <div className="row">{weekDays}</div>;
  }


  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="Week picker"
          value={selectedDate}
          onChange={handleWeekChange}
          renderDay={renderWrappedWeekDay}
        // labelFunc={formatWeekSelectLabel}
        />
      </MuiPickersUtilsProvider>
      <WeekDayGrid />
    </>
  );

}

const styles = createStyles(theme => ({
  dayWrapper: {
    position: "relative",
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit",
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: "#676767",
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
}));

export default withStyles(styles)(CustomElements);
import React, { useEffect, useState } from 'react'

import addHours from 'date-fns/addHours'
import subHours from 'date-fns/subHours'
import isWithinInterval from 'date-fns/isWithinInterval'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'
import addMinutes from 'date-fns/addMinutes'
import subMinutes from 'date-fns/subMinutes'

import isBefore from 'date-fns/isBefore'
import format from "date-fns/format";

import TimeRange from 'react-timeline-range-slider'
import Draggable from 'react-draggable';
import { endOfDay, startOfDay } from 'date-fns'
import { Button } from 'reactstrap'

import { useFormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const now = new Date()
const nearestHour = roundToNearestMinutes(now, { nearestTo: 30 })
const startTimeLinePosition = -500
const stepInterval = 250;


const getInitInterval = () => {
    // Get nearest minutes - nearest to 30 min
    // But if takes lower halfhour than add 60 minutes to be before now
    let selectedStart = roundToNearestMinutes(now, { nearestTo: 30 })
    if (isBefore(selectedStart, now)) { selectedStart = addMinutes(selectedStart, 60) }
    const selectedEnd = addMinutes(selectedStart, 120)
    return [selectedStart, selectedEnd]
}

const TimeRangeSlider = ({
    selectedDate,
    disabledIntervals,
    errorHandler,
    error
}) => {

    const { setFieldValue, values } = useFormikContext()

    const [firstRender, setFirestRender] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [timelineInterval, setTimelineInterval] = useState([subHours(nearestHour, 12), addHours(nearestHour, 12)])
    const [timelinePosition, setTimelinePosition] = useState(startTimeLinePosition)

    useEffect(() => {
        if (firstRender) {
            setFieldValue('timeInterval', getInitInterval())
        }
        if (!firstRender) {
            setTimelineInterval([startOfDay(selectedDate), endOfDay(selectedDate)])
        }
        setFirestRender(false)
    }, [selectedDate])


    const getDisabledIntervals = () => {
        const intervals: Array<any> = disabledIntervals.map(iv => {
            return {
                start: new Date(iv.start),
                end: new Date(iv.end)
            }
        })
        intervals.unshift({
            start: new Date(1700, 1, 1),
            end: now
        })
        return intervals;
    }

    const increaseTimeRangeIndex = () => {
        setIsLoading(true)

        // Set new time Interval
        setTimelineInterval([addHours(timelineInterval[0], 5), addHours(timelineInterval[1], 5)])
        // Get back to position
        setTimelinePosition(timelinePosition + stepInterval)

        var position = startTimeLinePosition + stepInterval;
        var id = setInterval(frame, 0.1);

        function frame() {
            if (position == startTimeLinePosition) {
                setIsLoading(false)
                clearInterval(id);
            } else {
                position = position - 5;
                setTimelinePosition(position);
            }
        }
    }

    const decreaseTimeRangeIndex = () => {
        setIsLoading(true)
        // Set new time Interval
        setTimelineInterval([subHours(timelineInterval[0], 5), subHours(timelineInterval[1], 5)])
        // Get back to position
        setTimelinePosition(timelinePosition - stepInterval)

        var position = startTimeLinePosition - stepInterval;
        var id = setInterval(frame, 0.1);

        function frame() {
            if (position == startTimeLinePosition) {
                setIsLoading(false)
                clearInterval(id);
            } else {
                position = position + 5;
                setTimelinePosition(position);
            }
        }
    }

    const clearSelectedTimeInterval = () => {
        const ti = [addHours(timelineInterval[0], 13), addHours(timelineInterval[0], 15)]
        // Set formik values
        setFieldValue("timeInterval", ti);
    }

    const onChangeTimeInterval = (ti) => {
        console.log("onChangeTimeInterval", ti)
        // const isStartVisible = isWithinInterval(ti[0], { start: addHours(timelineInterval[0], 12), end: addHours(timelineInterval[0], 17.5) })
        // const isEndVisible = isWithinInterval(ti[1], { start: addHours(timelineInterval[0], 12), end: addHours(timelineInterval[0], 17.5) })
        const isStartWithinTimelineInterval = isWithinInterval(ti[0], { start: addMinutes(timelineInterval[0], 1), end: subMinutes(timelineInterval[1], 1) })
        const isEndWithinTimelineInterval = isWithinInterval(ti[1], { start: addHours(timelineInterval[0], 1), end: subHours(timelineInterval[1], 1) })
        if (!isStartWithinTimelineInterval || !isEndWithinTimelineInterval) {
            return clearSelectedTimeInterval()
        }
        // Set formik values
        setFieldValue("timeInterval", ti);
    }

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center">

                <span className="text-muted">
                    <i className="far fa-calendar fa-fw text-muted mr-2" />
                    {values['timeInterval'][0] && format(values['timeInterval'][0], 'MMM dd, HH:mm')}
                    <i className="fas fa-arrow-right fa-fw text-muted mx-1" />
                    {values['timeInterval'][1] && format(values['timeInterval'][1], 'dd, HH:mm')}
                </span>

                <Button
                    disabled={isLoading}
                    color="items"
                    className="btn-items-increase m-1"
                    onClick={() => clearSelectedTimeInterval()}
                ><FontAwesomeIcon width={10} className={'d-flex mx-auto'} icon={'times'} /></Button>
            </div>

            <Draggable
                axis="x"
                defaultPosition={{ x: 0, y: 0 }}
                position={{ x: timelinePosition, y: 0 }}
                onStart={() => false}
                // grid={[25, 25]}
                scale={1}
            >
                <div>
                    {/* <div className="handle">Drag from here</div> */}
                    <TimeRange
                        error={error}
                        ticksNumber={36}
                        selectedInterval={values['timeInterval']}
                        timelineInterval={timelineInterval}
                        onUpdateCallback={errorHandler}
                        onChangeCallback={onChangeTimeInterval}
                        disabledIntervals={getDisabledIntervals()}
                    />
                </div>
            </Draggable>

            <div>
                <Button
                    disabled={isLoading}
                    color="items"
                    className="btn-items-increase m-1"
                    onClick={() => decreaseTimeRangeIndex()}
                ><FontAwesomeIcon width={10} className={'d-flex mx-auto'} icon={'chevron-left'} /></Button>


                <Button
                    disabled={isLoading}
                    color="items"
                    className="btn-items-increase m-1"
                    onClick={() => increaseTimeRangeIndex()}
                ><FontAwesomeIcon width={10} className={'d-flex mx-auto'} icon={'chevron-right'} /></Button>
            </div>

        </React.Fragment>
    )
}

export default TimeRangeSlider
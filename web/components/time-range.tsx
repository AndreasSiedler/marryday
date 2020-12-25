import React, { useEffect, useState } from 'react'

import addHours from 'date-fns/addHours'
import isWithinInterval from 'date-fns/isWithinInterval'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'
import addMinutes from 'date-fns/addMinutes'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'

import TimeRange from 'react-timeline-range-slider'
import Draggable from 'react-draggable';
import { endOfDay, startOfDay } from 'date-fns'


const now = new Date()
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
    changeTimeInterval,
    disabledIntervals,
    selectedInterval = getInitInterval(),
    increaseSelectedDay,
    decreaseSelectedDay,
    errorHandler,
    error
}) => {

    const [timeRangeIndex, setTimeRangeIndex] = useState(0)
    const [deltaPosition, setDeltaPosition] = useState({
        x: 0, y: 0
    })

    useEffect(() => {
        setDeltaPosition({
            x: (timeRangeIndex * 250) * -1,
            y: 0,
        });
    }, [timeRangeIndex])

    useEffect(() => {
        // Check if current time is wihtin timerangeindex interval 
        // if wihtin interval(true) set Time range index to the value
        for (let i = 0; i <= 5; i++) {
            const timeRangeIndex = i
            const isWithin: boolean = isWithinInterval(now, {
                start: addHours(selectedDate, timeRangeIndex * 4),
                end: addHours(selectedDate, (timeRangeIndex * 4) + 8)
            })
            if (isWithin) {
                setTimeRangeIndex(timeRangeIndex)
            }
        }
    }, [])

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
        let index = timeRangeIndex;
        if (timeRangeIndex < 5) {
            index++
            setTimeRangeIndex(index)
        } else if (index >= 5) {
            setTimeRangeIndex(0)
            increaseSelectedDay()
        }
    }

    const decreaseTimeRangeIndex = () => {
        // First check if TimeRange is selectable
        // If NOT stop this function
        let index = timeRangeIndex;
        if (!checkTimeRangeSelectable(index - 1)) {
            return
        }
        if (timeRangeIndex > 0) {
            index--
            setTimeRangeIndex(index)
        } else if (timeRangeIndex <= 0) {
            setTimeRangeIndex(5)
            decreaseSelectedDay()
        }
    }

    const checkTimeRangeSelectable = (timeRangeIndex) => {
        // Check if now is wihtin timeRange Interval
        const isWithin: boolean = isWithinInterval(now, {
            start: addHours(selectedDate, timeRangeIndex * 4),
            end: addHours(selectedDate, (timeRangeIndex * 4) + 8)
        })
        // Return true if now is within interval
        if (isWithin) { return true }
        // Else check if timerange start is after now
        const after: boolean = isAfter(addHours(selectedDate, timeRangeIndex * 4), now);
        if (after) { return true }
        return false
    }

    const onChangeTimeInterval = (ti) => {
        // Check interval 
        // changeTimeInterval(ti)
        // setLastAction(undefined)
    }

    const handleDrag = (e, ui) => {
        const { x, y } = deltaPosition;
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY,
        });
    };

    return (
        <>
            <span onClick={decreaseTimeRangeIndex}>{"<"}</span>
            <span onClick={() => setTimeRangeIndex(0)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 0 && 'border-primary'} ${!checkTimeRangeSelectable(0) && 'disabled'}`}>00:00</span>
            <span onClick={() => setTimeRangeIndex(1)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 1 && 'border-primary'} ${!checkTimeRangeSelectable(1) && 'disabled'}`}>04:00</span>
            <span onClick={() => setTimeRangeIndex(2)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 2 && 'border-primary'} ${!checkTimeRangeSelectable(2) && 'disabled'}`}>08:00</span>
            <span onClick={() => setTimeRangeIndex(3)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 3 && 'border-primary'} ${!checkTimeRangeSelectable(3) && 'disabled'}`}>12:00</span>
            <span onClick={() => setTimeRangeIndex(4)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 4 && 'border-primary'} ${!checkTimeRangeSelectable(4) && 'disabled'}`}>16:00</span>
            <span onClick={() => setTimeRangeIndex(5)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 5 && 'border-primary'} ${!checkTimeRangeSelectable(5) && 'disabled'}`}>20:00</span>
            <span onClick={increaseTimeRangeIndex}>{">"}</span>

            <div className="d-flex align-items-center">

                <Draggable
                    axis="x"
                    handle=".handle"
                    defaultPosition={{ x: 0, y: 0 }}
                    // bounds={{ top: -100, left: -1000, right: 0, bottom: 100 }}
                    position={deltaPosition}
                    grid={[25, 25]}
                    scale={1}
                    // onStart={this.handleStart}
                    onDrag={handleDrag}
                // onStop={this.handleStop}
                >
                    <div>
                        {/* <div className="handle">Drag from here</div> */}
                        <TimeRange
                            error={error}
                            ticksNumber={36}
                            selectedInterval={selectedInterval}
                            // timelineInterval={[addHours(selectedDate, timeRangeIndex * 4), addHours(selectedDate, (timeRangeIndex * 4) + 8)]}
                            timelineInterval={[startOfDay(selectedDate), endOfDay(selectedDate)]}
                            onUpdateCallback={errorHandler}
                            onChangeCallback={onChangeTimeInterval}
                            disabledIntervals={getDisabledIntervals()}
                        />
                    </div>
                </Draggable>


            </div>
            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>

            <style jsx>{`
                .disabled {
                    pointer-events:none;
                    opacity: 0.5;
                };
            `}</style>
        </>
    )
}

export default TimeRangeSlider
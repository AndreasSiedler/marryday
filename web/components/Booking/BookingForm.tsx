import React from 'react';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { RentObject } from '../../lib/interfaces';

import isEmpty from 'lodash/isEmpty'
import Draggable from 'react-draggable';
import { useFormikContext } from 'formik';
import { FormGroup } from "reactstrap";

import TimeRangeSlider from '../TimeRangeSlider';
import SelectField from '../FormFields/SelectField';
import CustomDatepicker from '../CustomDatepicker';

import { eachDayOfInterval } from "date-fns/esm";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfDay from "date-fns/startOfDay";
import format from "date-fns/format";
import isBefore from "date-fns/isBefore"





export default function BookingForm(props) {

    const {
        locationSlug,
        formField: {
            rentObjects,
            rentObject
        }
    } = props;
    const { setFieldValue, values } = useFormikContext()

    const [week, setWeek] = useState<Array<Date>>(undefined)
    const [timeRangeError, setTimeRangeError] = useState(false)

    useEffect(() => {
        values && values['selectedDate'] && setWeekDays(values['selectedDate']);
    }, [values['selectedDate']])


    useEffect(() => {
        const fetchRentObjects = async () => {
            if (locationSlug) {
                try {
                    const response = await api.get(`/cowork/rentobjects?location=${locationSlug}&type=${values['objectType']}&date=${values['selectedDate'].toISOString()}`)
                    const rentObjects = response.data as Array<RentObject>;
                    setFieldValue('rentObjects', rentObjects)
                    setFieldValue('rentObject', rentObjects[0])
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchRentObjects()
    }, [values['objectType'], values['selectedDate']])


    const handleValueChange = async (value, name) => {
        // Check target value wheter to conditionally make new request
        name == 'selectedDate' && setFieldValue('selectedDate', value);
        name == 'objectType' && setFieldValue('objectType', value);
    }

    const setWeekDays = date => {
        const weekStart = startOfWeek(date);
        const weekEnd = endOfWeek(date);
        var result = eachDayOfInterval({ start: weekStart, end: weekEnd });
        setWeek(result)
    }

    const timeRangeErrorHandler = ({ error }) => {
        setTimeRangeError(error)
    }

    return (

        <section id="intro_section">
            <p className="text-muted">
                <span className="text-primary h2">
                    € {' '}
                    {values && values['objectType'] == "desktop" && 8.99}
                    {values && values['objectType'] == "phone" && 6.99}
                    {values && values['objectType'] == "meeting" && 7.99}
                </span>{" "}
                    / Stunde
                </p>

            <hr className="my-4" />
            <div className="">
                {/* Rent Objects */}
                <FormGroup tag="fieldset">
                    <div className="pb-2 d-flex">
                        <div className={`flex-fill py-3 text-center card ${values && values['objectType'] == 'desktop' && 'border-primary'}`} onClick={() => handleValueChange('desktop', 'objectType')} >
                            <span>Desktop</span>
                        </div>
                        <div className={`flex-fill py-3 text-center card ${values && values['objectType'] == 'phone' && 'border-primary'}`} onClick={() => handleValueChange('phone', 'objectType')}>
                            <span>Phone</span>
                        </div>
                        <div className={`flex-fill py-3 text-center card ${values && values['objectType'] == 'meeting' && 'border-primary'}`} onClick={() => handleValueChange('meeting', 'objectType')}>
                            <span>Meeting</span>
                        </div>
                    </div>

                    <div className="p-2 d-flex justify-content-between">
                        <span>{values && startOfWeek(values['selectedDate']).toLocaleDateString}</span>
                        <CustomDatepicker
                            selectedDate={values['selectedDate']}
                            handleWeekChange={(date) => handleValueChange(startOfDay(date), 'selectedDate')}
                        />
                    </div>

                    <Draggable
                        axis="x"
                        defaultPosition={{ x: 0, y: 0 }}
                        bounds={{ left: -200, right: 0 }}
                    >
                        <div className="week-slider row">
                            {week && week.map((el, i) => {
                                return (
                                    <div
                                        className={`text-center col card py-2 m-1 ${isBefore(el, startOfDay(new Date())) && 'disabled'} ${values && values['selectedDate'].toDateString() === el.toDateString() && 'border-primary'}`}
                                        key={i}
                                        onClick={() => handleValueChange(startOfDay(el), 'selectedDate')}>
                                        {/* {weekDay.toLocaleDateString()} */}
                                        <div>{format(el, 'd')}</div>
                                        <div>{format(el, 'iii')}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </Draggable>
                </FormGroup>

                {/* Rent Objects */}


                {!isEmpty(values['rentObjects']) ? (
                    <React.Fragment>
                        <FormGroup className="mt-5" tag="fieldset">
                            <SelectField
                                name={rentObject.name}
                                label={rentObject.label}
                                data={values['rentObjects']}
                                fullWidth
                            />
                        </FormGroup>
                        {values['rentObject'] && <TimeRangeSlider
                            selectedDate={values['selectedDate']}
                            disabledIntervals={values['rentObject'].bookings}
                            errorHandler={timeRangeErrorHandler}
                            error={timeRangeError}
                        />}

                    </React.Fragment>
                ) : <div className="text-block">
                        <p className="text-muted text-center">Sorry, leider noch keine Objekte vorhanden.</p>
                        <p className="mb-5 text-center">
                            <img
                                src="/assets/img/illustration/undraw_through_the_desert_fcin.svg"
                                width={400}
                                height={279}
                                // layout="intrinsic"
                                alt=""
                                className="img-fluid"
                                sizes="(max-width: 576px) 100vw, 530px"
                            />
                        </p>
                    </div>}
            </div>
            <style jsx>{`
                .disabled {
                    pointer-events:none;
                    opacity: 0.5;
                };
            `}</style>
        </section >
    )
}
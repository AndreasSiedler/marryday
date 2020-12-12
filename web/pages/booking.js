import { useEffect, useState } from 'react'
import { api, fetchAPIwithSSR } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

import dynamic from "next/dynamic";

import { Form, FormGroup, Label, Input, Spinner, Button } from "reactstrap";

import Layout from '../components/layout'
import Head from 'next/head'
import Private from '../components/auth/Private';

export default function Booking({ mainMenus, flatMenus, themeSettings }) {

    const [locations, setLocations] = useState(false)
    const [location, setLocation] = useState(false)
    const [objectType, setObjectType] = useState('desktop')
    const [startTime, setStartTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
    const [date, setDate] = useState('2020-12-09')
    const [duration, setDuration] = useState(60)
    const [rentObjects, setRentObjects] = useState(false)
    const [rentObject, setRentObject] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!locations) {
            api.get('/cowork/locations/').then((response) => {
                if (response.status == 200) {
                    setLocations(response.data);
                } else {
                    console.log(response)
                }
            })
        }
    }, [])

    useEffect(async () => {
        if (location) {
            try {
                const response = await api.get(`/cowork/rentobjects?location=${location.id}&type=${objectType}&start=${date}T${startTime}Z&duration=${duration}`)
                setRentObjects(response.data);
            } catch (error) {
                console.log(error)
            }
        }
    }, [location, objectType, date, startTime, duration])

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            "rent_object": rentObject,
            "start": `${date}T${startTime}Z`,
            "duration": duration
        }
        try {
            await api.post('/cowork/bookings/', data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleValueChange = async (value, name) => {
        // Check target value wheter to conditionally make new request
        name == 'objectType' && setObjectType(value)
        name == 'startTime' && setStartTime(value)
        name == 'date' && setDate(value)
        name == 'duration' && setDuration(value)
    }

    const MapWithNoSSR = dynamic(() => import("../components/map"), {
        ssr: false
    });

    return (
        <Private>
            <Layout mainMenus={mainMenus} flatMenus={flatMenus} themeSettings={themeSettings}>
                <Head>
                    <title>Buchung {CMS_NAME}</title>
                    {/* <!-- Seo Meta --> */}
                    <meta name="description" content="Listigo | Directory Bootstrap 4 Template" />
                    <meta name="keywords" content="listing dashboard, directory panel, listing, responsive directory, directory template, themeforest, listing template, css3, html5" />
                </Head>
                <section id="intro_section">
                    <div className="row no-gutters coming-soon">
                        <div className="col-lg-6 p-5">
                            <div className="row">
                                <div className="col-md-10">
                                    <h1 className="intro-section-title">{location && location.title}</h1>
                                    <Form onSubmit={handleSubmit} className="pt-3">

                                        <FormGroup tag="fieldset">
                                            <legend>Object Type</legend>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input onChange={() => handleValueChange('desktop', 'objectType')} checked={objectType === 'desktop'} type="radio" />{' '}
                                            Desktop
                                        </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input onChange={() => handleValueChange('phone', 'objectType')} checked={objectType === 'phone'} type="radio" />{' '}
                                            Phone
                                        </Label>
                                            </FormGroup>
                                            <FormGroup check disabled>
                                                <Label check>
                                                    <Input onChange={() => handleValueChange('meeting', 'objectType')} checked={objectType === 'meeting'} type="radio" />{' '}
                                            Meeting
                                        </Label>
                                            </FormGroup>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Date</Label>
                                            <Input value={date} onChange={(e) => handleValueChange(e.target.value, 'date')} type="date" />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Time</Label>
                                            <Input value={startTime} onChange={(e) => handleValueChange(e.target.value, 'time')} type="time" />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Dauer</Label>
                                            <Input value={duration} onChange={(e) => handleValueChange(e.target.value, 'duration')} min={15} max={300} step={15} type="range" />
                                        </FormGroup>

                                        {/* Rent Objects */}
                                        <FormGroup tag="fieldset">
                                            <legend>Rent Objects</legend>
                                            {rentObjects && rentObjects.map((el, i) => (
                                                <FormGroup key={i} check>
                                                    <Label check>
                                                        <Input onChange={() => setRentObject(String(el.id))} checked={rentObject === `${el.id}`} type="radio" />{' '}
                                                        {el.title} ({el.bookings.map(booking => (`${booking.start} - ${booking.end}`))})
                                            </Label>
                                                </FormGroup>
                                            ))}
                                        </FormGroup>

                                        {/* BOOKING BUTTON */}
                                        <Button disabled={isLoading && true} type="submit" className="btn btn-danger btn-block">Buchen {isLoading && (<Spinner />)}</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-5">
                            <div id="map">
                                <MapWithNoSSR locations={locations} />
                            </div>
                            <ul className="mt-5">
                                {locations && locations.map((location, i) =>
                                    <li key={i} onClick={() => setLocation(location)}>
                                        {location.title} ({location.address}, {location.postcode}, {location.city})
                            </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </section >
                <script src="assets/js/vendors.bundle.js"></script>
                <script src="assets/js/scripts.bundle.js"></script>
            </Layout>
        </Private>)
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps() {
    const mainMenus = (await fetchAPIwithSSR('/api/main-menus', { method: 'GET' })) ?? []
    const flatMenus = (await fetchAPIwithSSR('/api/flat-menus', { method: 'GET' })) ?? []
    const themeSettings = (await fetchAPIwithSSR('/api/theme-settings', { method: 'GET' })) ?? []
    return {
        props: { mainMenus, flatMenus, themeSettings },
    }
}

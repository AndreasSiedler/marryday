import React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

import {
    Container,
    Row,
    Col,
    Media,
    CardFooter,
} from "reactstrap"
import UseWindowSize from "../../hooks/UseWindowSize"

import data from "../../data/detail-rooms.json"

import SwiperGallery from "../../components/SwiperGallery"
import Gallery from "../../components/Gallery"
import Map from "../../components/Map"
import Icon from '../../components/Icon';

import { GetServerSideProps } from "next";
import { fetchAPIwithSSR } from "../../lib/api";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js/pure";

const LocationDetail = (props) => {
    const { location } = props
    const size = UseWindowSize()
    const stripePromise = loadStripe('pk_test_51I47k4IpxsSLqlNa6T7HoFrFVoxyEalH5VROqKLV1DvZTBMV2WWWS4anN5fdWwqtdPIXaJU3VKR3bwmYhQliv3Or00c3rJIp2Q');

    // const BookingFormWithNoSSR = dynamic(() => import("../../components/BookingForm"), {
    //     ssr: false
    // });
    const BookingWithNoSSR = dynamic(() => import("../../components/Booking"), {
        ssr: false
    });
    const groupByN = (n, data) => {
        let result = []
        for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
        return result
    }

    const groupedAmenities = data.amenities && groupByN(4, data.amenities)

    return (
        <React.Fragment>
            <section>
                <SwiperGallery data={location.images} />
                <Container className="py-5">
                    <Row>
                        <Col lg="6">

                            <div className="text-block">
                                <p className="text-primary">
                                    <i className="fa-map-marker-alt fa mr-1" />
                                    &nbsp;{location.address && location.address}, {location.city.postcode && location.city.postcode} {location.city.title && location.city.title}
                                </p>
                                {location.title && <h1> MoWo {location.title}</h1>}
                                <div className="text-muted text-uppercase mb-4">
                                    MoWo Original
                                </div>
                                {data.tags && (
                                    <ul className="list-inline text-sm mb-4">
                                        {data.tags.map((tag) => (
                                            <li key={tag.value} className="list-inline-item mr-3">
                                                <i
                                                    className={`fa fa-${tag.icon} mr-1 text-secondary`}
                                                />{" "}
                                                {tag.value}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="text-muted-html" dangerouslySetInnerHTML={{ __html: location.description }}></div>
                            </div>

                            {data.amenities && (
                                <React.Fragment>
                                    <div className="text-block">
                                        <h4 className="mb-4">Amenities</h4>
                                        <Row>
                                            {groupedAmenities &&
                                                groupedAmenities.map((amenityBlock) => (
                                                    <Col key={amenityBlock[0].value} md="6">
                                                        <ul className="list-unstyled text-muted">
                                                            {amenityBlock.map((amenity) => (
                                                                <li key={amenity.value} className="mb-2">
                                                                    <i
                                                                        className={`fa fa-${amenity.icon} text-secondary w-1rem mr-3 text-center`}
                                                                    />
                                                                    <span className="text-sm">
                                                                        {amenity.value}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </Col>
                                                ))}
                                        </Row>
                                    </div>

                                </React.Fragment>
                            )}

                            {location.lat && location.lng && (
                                <div className="text-block">
                                    <h3 className="mb-4">Location</h3>
                                    <div className="map-wrapper-300 mb-3">
                                        <Map
                                            className="h-100"
                                            // center={[40.732346, -74.0014247]}
                                            center={[location.lat, location.lng]}
                                            circlePosition={[location.lat, location.lng]}
                                            circleRadius={500}
                                            zoom={14}
                                        />
                                    </div>
                                </div>
                            )}

                            {location.images && (
                                <div className="text-block">
                                    <h3 className="mb-4">Gallery</h3>
                                    <Gallery
                                        rowClasses="ml-n1 mr-n1"
                                        lg="4"
                                        xs="6"
                                        colClasses="px-1 mb-2"
                                        data={location.images}
                                    />
                                </div>
                            )}
                        </Col>
                        <Col lg="6">

                            <div
                                style={{ top: "100px" }}
                                className="shadow ml-lg-4 rounded sticky-top"
                            >
                                {/* <ProgressBar progress={50} /> */}


                                {/* <BookingFormWithNoSSR locationSlug={location.slug} /> */}
                                <Elements stripe={stripePromise}>
                                    <BookingWithNoSSR locationSlug={location.slug} />
                                </Elements>


                                <CardFooter className="bg-primary-light py-4 border-0">
                                    <Media className="align-items-center">
                                        <Media body>
                                            <h6 className="text-primary">Flexible – free cancellation</h6>
                                            <p className="text-sm text-primary opacity-8 mb-0">
                                                Cancel within 48 hours of booking to get a full refund.{" "}
                                                <a href="#" className="text-reset ml-3">
                                                    More details
              </a>
                                            </p>
                                        </Media>
                                        <Icon
                                            icon="diploma-1"
                                            className="svg-icon-light w-3rem h-3rem ml-2 text-primary"
                                        />
                                    </Media>
                                </CardFooter>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </React.Fragment>
    )
}

export default LocationDetail



export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const location = (await fetchAPIwithSSR(`/api/v1/cowork/location/${params.slug}`, { method: 'GET', req: req })) ?? []
    const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
    return {
        props: {
            location,
            themeSettings: settings.theme_settings,
            mainMenus: settings.main_menus,
            flatMenus: settings.flat_menus,
            // user,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: "Rooms | Category - Map on the top",
        },
    }
}

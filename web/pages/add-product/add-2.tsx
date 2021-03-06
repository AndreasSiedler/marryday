import React from "react"

import {Container} from "reactstrap"

import ProgressBar from "../../components/ProgressBar"

import data from "../../api/mock/user-add.json"
import ListingForm from "../..//components/ListingForm"

export async function getStaticProps() {
    return {
        props: {
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            loggedUser: true,
            title: "Add your listing",
            listingForm: true,
        },
    }
}

const UserAdd2 = () => {
    return (
        <React.Fragment>
            <ProgressBar progress={40}/>
            <section className="py-5">
                <Container>
                    <p className="subtitle text-primary">{data[2].subtitle}</p>
                    <h1 className="h2 mb-5">
                        {data[2].title}
                        <span className="text-muted float-right">Step 2</span>
                    </h1>
                    <ListingForm
                        data={data[2]}
                        prevStep="/products/add-1"
                        nextStep="/products/add-3"
                    />
                </Container>
            </section>
        </React.Fragment>
    )
}

export default UserAdd2

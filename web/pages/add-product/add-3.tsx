import React from "react"

import { Container } from "reactstrap"

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

const UserAdd3 = () => {
  return (
    <React.Fragment>
      <ProgressBar progress={60} />
      <section className="py-5">
        <Container>
          <p className="subtitle text-primary">{data[3].subtitle}</p>
          <h1 className="h2 mb-5">
            {data[3].title}
            <span className="text-muted float-right">Step 3</span>
          </h1>
          <ListingForm
            data={data[3]}
            prevStep="/products/add-2"
            nextStep="/products/add-4"
          />
        </Container>
      </section>
    </React.Fragment>
  )
}

export default UserAdd3

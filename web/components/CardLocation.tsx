import React from "react"
import Link from "next/link"

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from "reactstrap"

import Image from "./CustomImage"
import Icon from "./Icon"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardLocation = (props) => {
  const data = props.data
  return (
    <Card className="h-100 border-0 shadow">
      <div className="card-img-top overflow-hidden gradient-overlay">
        <Image
          src={data.preview_image.image}
          alt={data.title}
          className="img-fluid"
          layout="responsive"
          width={250}
          height={170}
        />
        <Link href={`/coworking/${data.slug}`}>
          <a className="tile-link" />
        </Link>
        <div className="card-img-overlay-top text-right">
          <a className="card-fav-icon position-relative z-index-40" href="#">
            <Icon icon="heart-1" className="text-white" />
          </a>
        </div>
      </div>
      <CardBody className="d-flex align-items-center">
        <div className="w-100">
          <CardTitle tag="h6">
            <Link href={`/coworking/${data.slug}`}>
              <a className="text-decoration-none text-dark">{data.title}</a>
            </Link>
          </CardTitle>
          {/* <CardSubtitle>
            {data.address}
          </CardSubtitle> */}
          <CardSubtitle className="d-flex mb-3">
            <p className="flex-grow-1 mb-0 text-muted text-sm">
              {data.vicinity}
            </p>
            {/* <p className="flex-shrink-1 mb-0 card-stars text-xs text-right">
              <Stars stars={data.stars} />
            </p> */}
          </CardSubtitle>
          {/* {data.booking_type == "booking" && <CardText className="text-muted">
            <span className="h4 text-primary">€ {data.prices.desktop_hour && data.prices.desktop_hour.toFixed(2)}</span>
            &nbsp;/ Stunde
          </CardText>} */}
          {data.booking_type == "linking" && <CardText className="text-muted">
            <ul className="list-unstyled text-muted mb-0">
              {data.amenities.filter(el => el.value).map((amenity) => (
                <li key={amenity.type} className="d-inline">
                  <FontAwesomeIcon width={18} className={'text-secondary w-1rem mr-3 text-center d-inline'} icon={amenity.icon} />
                </li>
              ))}
            </ul>
          </CardText>}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardLocation

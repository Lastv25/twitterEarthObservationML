import React from "react"

import {
  EuiBadge,
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiIcon,
  EuiLoadingChart
} from "@elastic/eui"
import styled from "styled-components"
import Wildfires from "../../assets/img/climate-change.svg"
import Earthquakes from "../../assets/img/earthquake.svg"
import Tsunami from "../../assets/img/tsunami.svg"
import Twister from "../../assets/img/twister.svg"

import { useNavigate } from "react-router-dom"


export default function CollectionCard({collection_id, name, disaster, notification}) {

  const icon = (() => {
    switch(disaster){
    case "Wildfires":
        return <EuiIcon size="xxl" type={Wildfires} />
    case "Earthquakes":
        return <EuiIcon size="xxl" type={Earthquakes} />
    case "Hurricanes":
        return <EuiIcon size="xxl" type={Twister} />
    case "Floods":
        return <EuiIcon size="xxl" type={Tsunami} />
    case "Tornado":
        return <EuiIcon size="xxl" type={Twister} />
  }
  })();
  const title = (() => {
    if (name) {
        return name;
    } else {
      return "No Name Defined";
    }
    })();

  const description = (() => {
    if (disaster) {
        return "Disaster: " + disaster + " Area Of Interest: "+ " Notification: "+ notification;
    } else {
      return "No Disaster Defined";
    }
    })();

  const navigate = useNavigate()
  const onClick = (collection_id) => {
        navigate(`/collection/${collection_id}`)
    }
  return (
    <EuiCard
      display="panel"
      textAlign="left"
      icon={icon}
      title={title}
      description={description}
      onClick={onClick}
      layout='horizontal'
    />
  )
}
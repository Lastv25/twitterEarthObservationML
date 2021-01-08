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

import { useNavigate } from "react-router-dom"


export default function CollectionCard({product_uuid, link}) {

  const title = (() => {
    if (product_uuid) {
        return product_uuid;
    } else {
      return "No UUID Defined";
    }
    })();


  const navigate = useNavigate()
  const onClick = () => {
    }
  return (
    <EuiCard
      display="panel"
      textAlign="left"
      title={title}
      description='{description}'
      onClick={onClick}
      layout='horizontal'
    />
  )
}
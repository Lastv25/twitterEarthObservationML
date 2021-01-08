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


export default function CollectionCard({info}) {

  function fromTuple(str) {
      return str
        .replace(/\s/g, "")
        .split("),(")
        .map(el => [...el.replace(/[\[()\]]/g, '').split(',')]);
  }

  const openInNewTab = (url) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }

  const [title, link] =  fromTuple(info)[0];

  const navigate = useNavigate()
  const onClick = () => {openInNewTab(link)}
  return (
    <EuiCard
      display="panel"
      textAlign="left"
      title={title}
      onClick={onClick}
      layout='horizontal'
    />
  )
}
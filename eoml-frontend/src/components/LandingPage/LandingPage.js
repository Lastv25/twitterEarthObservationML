import React from 'react';
import styled from "styled-components"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from '@elastic/eui';

import { DisasterForm, MapComponent } from "../../components"


const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`
const StyledEuiPageContent = styled(EuiPageContent)`
  border-radius: 50%;
`
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  max-width: 400px;
  max-height: 400px;
  & > img {
    width: 100%;
    border-radius: 50%;
  }
`


export default function LandingPage(props) {
    return (
      <StyledEuiPage>
        <EuiPageSideBar>
            <EuiPageContent>
                <h2>Filters for the map</h2>
                <DisasterForm />
            </EuiPageContent>
        </EuiPageSideBar>
        {/* The EUI docs site  already has a wrapping <main> tag, so we've changed this example to a <div> for accessibility. You likely don't need to copy the `component` prop for your own usage. */}
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Earth Monitoring App</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>Login button placement</EuiPageHeaderSection>
          </EuiPageHeader>

           <StyledEuiPageContentBody>Hello and welcome to our app. Here is a map of Natural disaters based on the filters form</StyledEuiPageContentBody>

          <EuiPageContent>
            <MapComponent />
          </EuiPageContent>
        </EuiPageBody>
      </StyledEuiPage>
    )
  }
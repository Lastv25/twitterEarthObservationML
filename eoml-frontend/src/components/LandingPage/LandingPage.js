import React from 'react';
import styled from "styled-components"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiAvatar,
  EuiHeaderSectionItemButton,
} from '@elastic/eui';
import { Link } from "react-router-dom"
import loginIcon from "../../assets/img/loginIcon.svg"
import { DisasterForm, MapComponent } from "../../components"


const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`


export default function LandingPage({ user, ...props }) {
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
            <EuiPageHeaderSection>
                <EuiHeaderSectionItemButton aria-label="User avatar">
                    {user?.profile ? (
                        <EuiAvatar size="l" name={user.profile.full_name} imageUrl={user.profile.image} />
                    ) : (
                        <Link to="/login">
                            <EuiAvatar size="l" color="#1E90FF" name="user" imageUrl={loginIcon} />
                        </Link>
                    )}
                </EuiHeaderSectionItemButton>
            </EuiPageHeaderSection>
          </EuiPageHeader>

           <h2>Hello and welcome to our app. Here is a map of Natural disaters based on the filters form</h2>

          <EuiPageContent>
            <MapComponent />
          </EuiPageContent>
        </EuiPageBody>
      </StyledEuiPage>
    )
  }
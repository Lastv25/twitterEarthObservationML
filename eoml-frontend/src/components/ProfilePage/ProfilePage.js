import React from "react"
import { connect } from "react-redux"
import {
  EuiAvatar,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiText,
  EuiPageSideBar,
  EuiButton,
  EuiFlexItem,
} from "@elastic/eui"
import moment from "moment"
import styled from "styled-components"

const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  & h2 {
    margin-bottom: 1rem;
  }
`
function ProfilePage({ user }) {
return (
        <EuiPage>
        <EuiPageSideBar>
        <StyledEuiPageContentBody>
            <EuiAvatar
              size="xl"
              name={user.profile.full_name || user.username || "Anonymous"}
              initialsLength={2}
              imageUrl={user.profile.image}
            />
            <EuiTitle size="l">
              <h2>{user.username}</h2>
            </EuiTitle>
            <EuiText>
              <p>
                <EuiIcon type="email" /> {user.email}
              </p>
              <p>
                <EuiIcon type="clock" /> member since {moment(user.created_at).format("MM-DD-YYYY")}
              </p>
              <p>
                <EuiIcon type="node" /> notifications {moment(user.created_at).format("MM-DD-YYYY")}
              </p>
            </EuiText>
          </StyledEuiPageContentBody>
        </EuiPageSideBar>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Please find in this page all your informations and collections</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
               <EuiFlexItem grow={false}>
                  <EuiButton fill onClick={() => {}}>
                      Modify Profile
                  </EuiButton>
               </EuiFlexItem>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Collections</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
              <EuiPageContentHeaderSection>
                <EuiFlexItem grow={false}>
                  <EuiButton color="secondary" fill onClick={() => {}}>
                      New Collection
                  </EuiButton>
               </EuiFlexItem>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>Content body</EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    )
}
export default connect((state) => ({ user: state.auth.user }))(ProfilePage)

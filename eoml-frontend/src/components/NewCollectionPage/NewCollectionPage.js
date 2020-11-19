import React from 'react';
import styled from "styled-components"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiAvatar,
  EuiHeaderSectionItemButton,
} from '@elastic/eui';
import { Link } from "react-router-dom"
import loginIcon from "../../assets/img/loginIcon.svg"
import { CollectionForm } from "../../components"


const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`


export default function NewCollectionPage({ user, ...props }) {
    return (
      <StyledEuiPage>

        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle>
                <h1>New Collection Choice</h1>
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

          <EuiPageContent>
            <CollectionForm />
          </EuiPageContent>
        </EuiPageBody>
      </StyledEuiPage>
    )
  }
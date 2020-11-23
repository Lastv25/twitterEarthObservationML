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
import { UpdateCollectionForm } from "../../components"


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
                <h1>Update Collection Filters</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>

          <EuiPageContent>
            <UpdateCollectionForm />
          </EuiPageContent>
        </EuiPageBody>
      </StyledEuiPage>
    )
  }
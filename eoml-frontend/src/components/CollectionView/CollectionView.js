import React from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel
} from '@elastic/eui';

export default () => (
  <EuiPage>
    <EuiPageBody component="div">
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Collection Modif and Delete</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Content title</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
            <EuiFlexGroup>
                <EuiFlexItem>
                    <EuiPanel>
                    Collection Main Settings
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                    Collection Buttons for update and Deletion
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiFlexGroup>
                <EuiFlexItem>
                    <EuiPanel>
                    Product List
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                    Download Buttons
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
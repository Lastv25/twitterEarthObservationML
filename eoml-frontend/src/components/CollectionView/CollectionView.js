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

import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Actions as collectionActions } from "../../redux/collections"

function CollectionView ({
      isLoading,
      cleaningError,
      currentCleaningJob,
      fetchCollectionById,
      clearCurrentCollection
    }) {

    const { collection_id } = useParams()

    React.useEffect(() => {
        if (collection_id) {
          fetchCollectionById({ collection_id })
        }
            return () => clearCurrentCollection()
          }, [collection_id, fetchCollectionById, clearCurrentCollection])

    return (
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
}
export default connect(
  (state) => ({
    isLoading: state.coll.isLoading,
    cleaningError: state.coll.cleaningsError,
    currentCleaningJob: state.coll.currentCleaningJob
  }),
  {
    fetchCollectionById: collectionActions.fetchCollectionbyId,
    clearCurrentCollection: collectionActions.clearCurrentCollection
  }
)(CollectionView)
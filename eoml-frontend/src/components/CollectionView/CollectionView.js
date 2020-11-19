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
  EuiButton,
  EuiLoadingSpinner,
  EuiText,
  EuiPanel
} from '@elastic/eui';

import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Actions as collectionActions } from "../../redux/collections"
import { NotFoundPage } from "../../components"

function CollectionView ({
      isLoading,
      collectionError,
      currentCollection,
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


    if (isLoading) return <EuiLoadingSpinner size="xl" />
    if (!currentCollection) return <EuiLoadingSpinner size="xl" />

    const title = (() => {
            if (currentCollection.full_name) {
                return currentCollection.full_name+" (collection id:"+collection_id+")";
            } else {
              return "No Name Defined"+" (collection id:"+collection_id+")";
            }
    })();

    const notification = (() => {
            if (currentCollection.notification) {
                return "Activated";
            } else {
              return "Deactivated";
            }
    })();

    return (
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Collection Update and Delete Page</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>{title}</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiPanel>
                            <EuiText>
                                <h3>Global collection parameters</h3>
                                <ul>
                                    <li><u>Monitored Disaster:</u> {currentCollection.disaster}</li>
                                    <li><u>Area of Interest:</u> {currentCollection.aoi}</li>
                                    <li><u>Notifications:</u> {notification}</li>
                                    <li><u>Number of Products:</u></li>
                                </ul>
                            </EuiText>
                        </EuiPanel>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiPanel>
                            <EuiFlexGroup>
                                <EuiFlexItem>
                                    <EuiButton size="s" fill onClick={() => {}}> Modify</EuiButton>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiFlexGroup>
                                <EuiFlexItem>
                                    <EuiButton color="danger" size="s" fill onClick={() => {}}> Delete</EuiButton>
                                </EuiFlexItem>
                            </EuiFlexGroup>
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
    collectionError: state.coll.collectionError,
    currentCollection: state.coll.current_collection
  }),
  {
    fetchCollectionById: collectionActions.fetchCollectionById,
    clearCurrentCollection: collectionActions.clearCurrentCollection
  }
)(CollectionView)
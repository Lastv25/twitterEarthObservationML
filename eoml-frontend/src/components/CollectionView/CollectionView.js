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
import { useParams, useNavigate } from "react-router-dom"
import { Actions as collectionActions } from "../../redux/collections"
import { Actions as productActions } from "../../redux/products"
import { ProductCard, NotFoundPage } from "../../components"


function CollectionView ({
      isLoading,
      collectionError,
      currentCollection,
      prodList,
      fetchCollectionById,
      clearCurrentCollection,
      deleteCurrentCollection,
      fetchProducts
    }) {

    const { collection_id } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (collection_id) {
          fetchCollectionById({ collection_id })
          fetchProducts({ collection_id })
        }
      }, [collection_id, fetchCollectionById, fetchProducts, clearCurrentCollection])

    if (isLoading) return <EuiLoadingSpinner size="xl" />
    if (!currentCollection) return <EuiLoadingSpinner size="xl" />

    if (!prodList) return <EuiLoadingSpinner size="xl" />


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

    const prod_data = Array.from(prodList)
    const products_array=prod_data.slice(1).map((data,id)=>{
    return <div key={id}>
      <ProductCard info={data} />
    </div>
    })

    const onClickBack = () => {
        clearCurrentCollection()
        navigate(-1)
    }

    const buttonBack = (
        <EuiButton
            size="s"
            fill
            onClick={onClickBack}>
            Back
        </EuiButton>
      );

    const onClickUpdate = () => {
        navigate(`/collection/${collection_id}/update`)
    }
    const onClickDownloadAll = () => {
    }
    const onClickDelete = async (e) => {
        console.log("collection_id value when calling Delete button:"+ collection_id)
        const res = await deleteCurrentCollection({ collection_id })
        console.log("Response when calling Delete button:")
        console.log(res)

        if (res?.success) {
              navigate(`/profile`)
              // redirect user to his profile page
            }
    }
    const buttonUpdate = (
        <EuiButton
            size="s"
            fill
            onClick={onClickUpdate}>
            Update
        </EuiButton>
      );

    const buttonDownloadAll = (
        <EuiButton
            size="s"
            fill
            onClick={onClickDownloadAll}>
            Download All
        </EuiButton>
      );

    const buttonDelete = (
        <EuiButton
            size="s"
            fill
            color="danger"
            onClick={onClickDelete}>
            Delete
        </EuiButton>
      );

    return (
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
                    <EuiFlexItem>
                      <EuiTitle size="l">
                        <h1>Collection Update and Delete Page</h1>
                      </EuiTitle>
                    </EuiFlexItem>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
                    <EuiFlexItem grow={false}>
                        {buttonBack}
                    </EuiFlexItem>
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
                                    <li><u>Number of Products:</u> {prodList[0]}</li>
                                </ul>
                            </EuiText>
                        </EuiPanel>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiPanel>
                            <EuiFlexGroup>
                                <EuiFlexItem>
                                    {buttonUpdate}
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiFlexGroup>
                                <EuiFlexItem>
                                    {buttonDownloadAll}
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiFlexGroup>
                                <EuiFlexItem>
                                    {buttonDelete}
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiPanel>
                        Product List
                            {products_array}
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
    currentCollection: state.coll.current_collection,
    prodList: state.prods.data,
  }),
  {
    fetchCollectionById: collectionActions.fetchCollectionById,
    clearCurrentCollection: collectionActions.clearCurrentCollection,
    deleteCurrentCollection: collectionActions.deleteCollectionById,
    fetchProducts: productActions.fetchProducts
  }
)(CollectionView)
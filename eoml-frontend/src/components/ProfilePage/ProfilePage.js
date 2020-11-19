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
  EuiSpacer,
  EuiFlexItem,
} from "@elastic/eui"
import { Link } from "react-router-dom"
import moment from "moment"
import styled from "styled-components"
import { CollectionCard } from "../../components"
import { Actions as collectionsActions } from "../../redux/collections"

const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  & h2 {
    margin-bottom: 1rem;
  }
`
function ProfilePage({user, coll, collectionError, isLoading,fetchCollections }) {

    React.useEffect(() => {
          fetchCollections()
      }, [fetchCollections])

    const coll_data = Array.from(coll)
    const collections_data=coll_data.map((data,id)=>{
    return <div key={id}>
      <CollectionCard collection_id={data.id} name={data.full_name} disaster={data.disaster} notification={data.notification} aoi={data.aoi}/>
      <EuiSpacer />
    </div>
  })

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
            </EuiText>
          </StyledEuiPageContentBody>
        </EuiPageSideBar>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Personal Space</h1>
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
                    <Link to="/newcollection">
                        <EuiButton color="secondary" fill>
                            New Collection
                       </EuiButton>
                    </Link>
               </EuiFlexItem>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiText grow={false}>
                <p>To modify or delete a collection please click on the collection card.</p>
            </EuiText>
            <EuiSpacer />
            {collections_data}
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    )
}
export default connect((state) => ({
  user: state.auth.user,
  coll: state.coll.data,
  collectionError: state.coll.error,
  isLoading: state.coll.isLoading,
}), {
  fetchCollections: collectionsActions.fetchCollections
})(ProfilePage)
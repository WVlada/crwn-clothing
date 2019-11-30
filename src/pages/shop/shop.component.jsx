import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { createStructuredSelector } from "reselect";
//import {
//  firestore,
//  convertCollectionsSnapshotToMap
//} from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded
} from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
//import CollectionPreview from "../../components/collection-preview/collection-preview.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  //state = {
  //  loading: true
  //};
  //unsubscribeFromSnapshot = null; //prvo ide unsubscribe
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
    //const { updateCollections } = this.props;
    //const collectionRef = firestore.collection("collections");
    // #3
    //fetch(
    //  "https://firestore.googleapis.com/v1/projects/crwn-db-4dc61/databases/(default)/documents/collections"
    //).then(response =>
    //  response.json().then(collections => console.log(collections))
    //);
    // #2
    //collectionRef.get().then(snapshot => {
    //  const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //  updateCollections(collectionsMap);
    //  this.setState({ loading: false });
    //});
    // #1
    //this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //  const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //  updateCollections(collectionsMap);
    //  setTimeout(() => {
    //    //radi fore
    //    this.setState({ loading: false });
    //  }, 1000);
    //}); //kad god se collection.ref updtuje, firebase nam posalje snapshot
  }
  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
    //const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
  //updateCollections: collectionsMap =>
  //  dispatch(updateCollections(collectionsMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

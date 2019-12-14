import React, { useEffect } from "react";
import "./collection.styles.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { firestore } from "../../firebase/firebase.utils";
const CollectionPage = ({ collection }) => {
  useEffect(() => {
    console.log("I am subscribing");
    const unSubscribeFromCollections = firestore
      .collection("collections")
      .onSnapshot(async snapshot => console.log(snapshot));
    return () => {
      console.log("I am UNsubscribing");
      unSubscribeFromCollections();
    }; //ovo je cleanUp function - componenet unMount
  }, []); //empty array means that it will only fire on mounting
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title"> {title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);

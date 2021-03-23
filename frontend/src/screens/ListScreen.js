import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListInfo } from "../actions/listActions";
import { getListItems } from "../actions/listItemActions";
import Loader from "../components/Loader";
import NewItemEditor from "../components/NewItemEditor";
import ListItem from "../components/ListItem";

const ListScreen = ({ match, history }) => {
  const listId = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listInfo = useSelector((state) => state.listInfo);
  const { list } = listInfo;

  const listItems = useSelector((state) => state.listItems);
  const { loading, items } = listItems;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getListInfo(listId));
      dispatch(getListItems(listId));
    }
  }, [dispatch, history, userInfo, listId]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              {list && <NewItemEditor listId={listId} />}
              <>
                {items &&
                  list &&
                  items.map((listItem) => {
                    if (
                      listItem.completed === false &&
                      listItem.itemDeleted !== true
                    ) {
                      return (
                        <ListItem key={listItem._id} listItem={listItem} />
                      );
                    } else {
                      return <div key={listItem._id} />;
                    }
                  })}
              </>

              <div className="text-center">Completed Items</div>

              <>
                {items &&
                  list &&
                  items.map((listItem) => {
                    if (
                      listItem.completed === true &&
                      listItem.itemDeleted !== true
                    ) {
                      return (
                        <ListItem key={listItem._id} listItem={listItem} />
                      );
                    } else {
                      return <div key={listItem._id} />;
                    }
                  })}
              </>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListScreen;

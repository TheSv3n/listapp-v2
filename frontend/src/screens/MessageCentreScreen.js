import React, { useEffect } from "react";
import ShareRequest from "../components/ShareRequest";
import Loader from "../components/Loader";
import ConversationListElement from "../components/ConversationListElement";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedShareRequests } from "../actions/shareRequestActions";
import { getReceivedFriendRequests } from "../actions/friendRequestActions";
import { updatePageHeading } from "../actions/navBarActions";

const MessageCentreScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const receivedShareRequests = useSelector(
    (state) => state.receivedShareRequests
  );
  const { loading, error, requests } = receivedShareRequests;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getReceivedShareRequests());
      dispatch(getReceivedFriendRequests());
      dispatch(updatePageHeading(`${userInfo.userName}'s Messages`));
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto col-md-12 col-lg-12">
          <ul className="list-group">
            <div className="text-center">Share Requests</div>
            <>
              {loading ? (
                <Loader />
              ) : error ? (
                <div>{error}</div>
              ) : (
                requests &&
                requests.map((shareRequest) => {
                  return (
                    <ShareRequest
                      key={shareRequest._id}
                      shareRequest={shareRequest}
                    />
                  );
                })
              )}
            </>

            <div className="text-center">Messages</div>
            <>
              {/*(value) => {
                  return value.conversations.map((conversation) => {
                    if (conversation.messages.length > 0) {
                      return (
                        <ConversationListElement
                          key={conversation.friendId}
                          conversation={conversation}
                        />
                      );
                    } else {
                      return "";
                    }
                  });
                }*/}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessageCentreScreen;

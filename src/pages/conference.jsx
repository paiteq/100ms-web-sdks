import React, { useEffect, useContext, useState, useCallback } from "react";
import { AppContext } from "../store/AppContext";
import { useHistory, useParams } from "react-router-dom";
import { ConferenceHeader } from "../views/headerView";
import { ConferenceFooter } from "../views/footerView";
import { ConferenceMainView } from "../views/mainView";
import { Notifications } from "../views/components/notifications";
import {
  Button,
  MessageModal,
  useHMSActions,
  useHMSNotifications,
} from "@100mslive/hms-video-react";
import { HMSNotificationTypes } from "../../../hms-video-react/node_modules/@100mslive/hms-video-store/dist";

export const Conference = () => {
  const history = useHistory();
  const { roomId, role } = useParams();
  const context = useContext(AppContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantListOpen, setIsParticipantListOpen] = useState(false);
  const toggleChat = useCallback(() => {
    setIsChatOpen(open => !open);
  }, []);
  const [roleChangeRequest, setRequest] = useState(null);
  const hmsActions = useHMSActions();
  const notification = useHMSNotifications();

  const onParticipantListOpen = useCallback(value => {
    setIsParticipantListOpen(value);
  }, []);

  const { loginInfo, leave } = context;

  useEffect(() => {
    if (!roomId || !role) {
      history.push(`/`);
    }

    if (!loginInfo.token) {
      // redirect to join if token not present
      history.push(`/preview/${loginInfo.roomId || roomId || ""}/${role}`);
    }

    return () => {
      leave();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!notification) {
      return;
    }

    switch (notification.type) {
      case HMSNotificationTypes.ROLE_CHANGE_REQUEST:
        setRequest(notification.data);
        break;
      default:
        break;
    }
  }, [notification]);

  const acceptRoleChange = () => {
    hmsActions.acceptChangeRole(roleChangeRequest);
    setRequest(null);
  };

  return (
    <div className="w-full h-full flex flex-col dark:bg-black">
      <div className="h-14 md:h-16">
        <ConferenceHeader onParticipantListOpen={onParticipantListOpen} />
      </div>
      <div className="w-full flex flex-1 flex-col md:flex-row">
        <ConferenceMainView
          isChatOpen={isChatOpen}
          isParticipantListOpen={isParticipantListOpen}
          toggleChat={toggleChat}
        />
        <Notifications />
      </div>
      <div className="dark:bg-black" style={{ height: "10%" }}>
        <ConferenceFooter isChatOpen={isChatOpen} toggleChat={toggleChat} />
      </div>
      <MessageModal
        show={!!roleChangeRequest}
        title="Role Change Request"
        body={`Role change requested by ${roleChangeRequest?.requestedBy?.name}.
              Changing role to ${roleChangeRequest?.role?.name}.`}
        footer={
          <div className="flex space-x-1">
            <Button onClick={acceptRoleChange}>Accept</Button>
            <Button onClick={() => setRequest(null)}>Reject</Button>
          </div>
        }
      />
    </div>
  );
};

import React, { useCallback } from 'react';
import { selectLocalPeer, selectSessionStore, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { Button } from '../../../Button';
import { Box, Flex } from '../../../Layout';
import { Text } from '../../../Text';
import { useRoomLayoutConferencingScreen } from '../../provider/roomLayoutProvider/hooks/useRoomLayoutScreen';
import { useIsPeerBlacklisted } from '../hooks/useChatBlacklist';
import { SESSION_STORE_KEY } from '../../common/constants';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

export const ChatPaused = () => {
  const hmsActions = useHMSActions();
  const { elements } = useRoomLayoutConferencingScreen();
  const can_disable_chat = !!elements?.chat?.real_time_controls?.can_disable_chat;
  const { enabled: isChatEnabled = true, updatedBy: chatStateUpdatedBy = '' } =
    useHMSStore(selectSessionStore(SESSION_STORE_KEY.CHAT_STATE)) || {};

  const localPeer = useHMSStore(selectLocalPeer);

  const unPauseChat = useCallback(
    async () =>
      await hmsActions.sessionStore.set(SESSION_STORE_KEY.CHAT_STATE, {
        enabled: true,
        updatedBy: { userName: localPeer?.name, userId: localPeer?.customerUserId, peerId: localPeer?.id },
        updatedAt: Date.now(),
      }),
    [hmsActions, localPeer],
  );

  return isChatEnabled ? null : (
    <Flex
      align="center"
      justify="between"
      css={{ borderRadius: '$1', bg: '$surface_default', p: '$2 $4 $2 $8', w: '100%' }}
    >
      <Box>
        <Text variant="sm" css={{ fontWeight: '$semiBold', color: '$on_surface_high' }}>
          {DUTCH_JSON.CHAT_PAUSED}
        </Text>
        <Text
          variant="xs"
          css={{ color: '$on_surface_medium', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {DUTCH_JSON.CHAT_PAUSED_BY} {chatStateUpdatedBy?.peerId === localPeer?.id ? DUTCH_JSON.YOU : chatStateUpdatedBy?.userName}
        </Text>
      </Box>
      {can_disable_chat ? (
        <Button css={{ fontWeight: '$semiBold', fontSize: '$sm', borderRadius: '$2' }} onClick={unPauseChat}>
          {DUTCH_JSON.RESUME}
        </Button>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export const ChatBlocked = () => {
  const isLocalPeerBlacklisted = useIsPeerBlacklisted({ local: true });
  if (!isLocalPeerBlacklisted) {
    return null;
  }
  return (
    <Flex
      align="center"
      justify="between"
      css={{ borderRadius: '$1', bg: '$surface_default', p: '$4 $4 $4 $8', w: '100%' }}
    >
      <Text variant="sm" css={{ color: '$on_surface_medium', textAlign: 'center', w: '100%' }}>
        {DUTCH_JSON.BLOCKED_MESSAGE}
      </Text>
    </Flex>
  );
};

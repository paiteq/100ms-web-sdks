import React from 'react';
import { useMedia } from 'react-use';
import { Box, Flex } from '../../../Layout';
import { Text } from '../../../Text';
import { config as cssConfig } from '../../../Theme';
// @ts-ignore
import emptyChat from '../../images/empty-chat.svg';
import { useRoomLayoutConferencingScreen } from '../../provider/roomLayoutProvider/hooks/useRoomLayoutScreen';
import { useIsPeerBlacklisted } from '../hooks/useChatBlacklist';
import { useLandscapeHLSStream, useMobileHLSStream } from '../../common/hooks';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

export const EmptyChat = () => {
  const { elements } = useRoomLayoutConferencingScreen();
  const isLocalPeerBlacklisted = useIsPeerBlacklisted({ local: true });
  const isMobile = useMedia(cssConfig.media.md);
  const canSendMessages =
    elements.chat &&
    (elements.chat.public_chat_enabled ||
      elements.chat.private_chat_enabled ||
      (elements.chat.roles_whitelist && elements.chat.roles_whitelist.length)) &&
    !isLocalPeerBlacklisted;
  const isMobileHLSStream = useMobileHLSStream();
  const isLandscapeStream = useLandscapeHLSStream();
  const streaming = isMobileHLSStream || isLandscapeStream;

  if (isMobile && elements?.chat?.is_overlay && !streaming) return <></>;

  return (
    <Flex
      css={{
        width: '100%',
        flex: '1 1 0',
        textAlign: 'center',
        px: '$4',
      }}
      align="center"
      justify="center"
    >
      <Box>
        <Box css={{ m: '0 auto', mt: '$4', '@media (max-height: 575px)': { display: 'none' } }}>
          <img src={emptyChat} style={{ display: 'inline' }} alt="Empty Chat" height={132} width={185} />
        </Box>

        <Text variant="h5" css={{ mt: '$8', c: '$on_surface_high' }}>
          {canSendMessages ? DUTCH_JSON.START_A_CONVERSATION : DUTCH_JSON.NO_MESSAGES_YET}
        </Text>
        {canSendMessages ? (
          <Text
            variant="sm"
            css={{ mt: '$4', maxWidth: '80%', textAlign: 'center', mx: 'auto', c: '$on_surface_medium' }}
          >
            {DUTCH_JSON.NO_MESSAGES_YET_SUBTITLE}
          </Text>
        ) : null}
      </Box>
    </Flex>
  );
};

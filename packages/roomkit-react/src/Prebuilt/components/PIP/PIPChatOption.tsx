import React from 'react';
import { ExternalLinkIcon } from '@100mslive/react-icons';
import { Dropdown } from '../../../Dropdown';
import { Text } from '../../../Text';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

export const PIPChatOption = ({ openChat, showPIPChat }: { openChat: () => void; showPIPChat: boolean }) => {
  if (!showPIPChat) {
    return <></>;
  }
  return (
    <Dropdown.Item onClick={openChat} data-testid="pip_chat_btn">
      <ExternalLinkIcon height={18} width={18} style={{ padding: '0 $2' }} />
      <Text variant="sm" css={{ ml: '$4', color: '$on_surface_high' }}>
        {DUTCH_JSON.POP_OUT_CHAT}
      </Text>
    </Dropdown.Item>
  );
};

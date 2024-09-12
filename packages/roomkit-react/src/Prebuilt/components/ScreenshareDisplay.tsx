import React from 'react';
import { useHMSActions } from '@100mslive/react-sdk';
import { CrossIcon, ShareScreenIcon } from '@100mslive/react-icons';
import { Button } from '../../Button';
import { Flex } from '../../Layout';
import { Text } from '../../Text';
import { DUTCH_JSON } from '../provider/roomLayoutProvider/constants/du';

export const ScreenshareDisplay = () => {
  const hmsActions = useHMSActions();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      css={{
        size: '100%',
        bg: '$background_default',
        color: '$on_surface_high',
      }}
    >
      <ShareScreenIcon width={48} height={48} />
      <Text variant="h5" css={{ m: '$8 0' }}>
        {DUTCH_JSON.YOU_ARE_SHARING_YOUR_SCREEN}
      </Text>
      <Button
        variant="danger"
        css={{ fontWeight: '$semiBold' }}
        onClick={async () => {
          await hmsActions.setScreenShareEnabled(false);
        }}
        data-testid="stop_screen_share_btn"
      >
        <CrossIcon width={18} height={18} />
        &nbsp; {DUTCH_JSON.STOP_SCREEN_SHARE}
      </Button>
    </Flex>
  );
};

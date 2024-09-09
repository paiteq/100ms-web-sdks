import React from 'react';
import { AlertTriangleIcon, CrossIcon } from '@100mslive/react-icons';
import { Button } from '../../../Button';
import { Box, Flex } from '../../../Layout';
import { Text } from '../../../Text';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

export const LeaveSessionContent = ({
  setShowLeaveRoomAlert,
  leaveRoom,
  isModal = false,
}: {
  setShowLeaveRoomAlert: (value: boolean) => void;
  leaveRoom: (options?: { endStream?: boolean }) => Promise<void>;
  isModal?: boolean;
}) => {
  return (
    <Box>
      <Flex
        css={{
          color: '$alert_error_default',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AlertTriangleIcon style={{ marginRight: '0.5rem' }} />
        <Text variant="lg" css={{ color: 'inherit', fontWeight: '$semiBold' }}>
          {DUTCH_JSON.LEAVE}
        </Text>
        {isModal ? null : (
          <Box css={{ color: '$on_surface_high', ml: 'auto' }} onClick={() => setShowLeaveRoomAlert(false)}>
            <CrossIcon />
          </Box>
        )}
      </Flex>
      <Text variant="sm" css={{ color: '$on_surface_low', mb: '$8', mt: '$4' }}>
        {DUTCH_JSON.OTEHRS_WILL_CONTINUE}
      </Text>
      <Flex align="center" justify="between" css={{ w: '100%', gap: '$8' }}>
        <Button
          outlined
          variant="standard"
          css={{ w: '100%', '@md': { display: 'none' } }}
          onClick={() => setShowLeaveRoomAlert(false)}
        >
          {DUTCH_JSON.CANCEL}
        </Button>
        <Button
          variant="danger"
          css={{ w: '100%' }}
          onClick={async () => await leaveRoom()}
          id="leaveRoom"
          data-testid="leave_room"
        >
          {DUTCH_JSON.LEAVE_SESSION}
        </Button>
      </Flex>
    </Box>
  );
};

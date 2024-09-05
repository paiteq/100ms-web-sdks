import React from 'react';
import { ExitIcon } from '@100mslive/react-icons';
// @ts-ignore: No implicit Any
import { ToastManager } from './Toast/ToastManager';
import { Button } from '../../Button';
import { Box, Flex } from '../../Layout';
import { Text } from '../../Text';
import { useHMSAppStateContext } from '../AppStateContext';
import { Header } from './Header';
// @ts-ignore: No implicit Any
import { defaultPreviewPreference, UserPreferencesKeys, useUserPreferences } from './hooks/useUserPreferences';
import { textEllipsis } from '../../utils';
import { DUTCH_JSON } from '../provider/roomLayoutProvider/constants/du';

export const LeaveScreen = () => {
  const { rejoin } = useHMSAppStateContext();
  const [previewPreference] = useUserPreferences(UserPreferencesKeys.PREVIEW, defaultPreviewPreference);
  return (
    <Flex direction="column" css={{ size: '100%' }}>
      <Box css={{ h: '$18', '@md': { h: '$17' } }} data-testid="header">
        <Header />
      </Box>
      <Flex
        justify="center"
        direction="column"
        align="center"
        css={{ bg: '$background_dim', flex: '1 1 0', position: 'relative' }}
      >
        <Text variant="h2" css={{ fontWeight: '$semiBold' }}>
          👋
        </Text>
        <Text variant="h4" css={{ color: '$on_surface_high', fontWeight: '$semiBold', mt: '$12' }}>
          {DUTCH_JSON.YOU_LEFT_THE_ROOM}
        </Text>
        <Text
          variant="body1"
          css={{
            color: '$on_surface_medium',
            mt: '$8',
            fontWeight: '$regular',
            textAlign: 'center',
          }}
        >
          {DUTCH_JSON.HAVE_A_NICE_DAY}
          {previewPreference.name && (
            <Box as="span" css={{ ...textEllipsis(100) }}>
              , {previewPreference.name}
            </Box>
          )}
          !
        </Text>
        <Flex css={{ mt: '$14', gap: '$10', alignItems: 'center' }}>
          <Text variant="body1" css={{ color: '$on_surface_medium', fontWeight: '$regular' }}>
            {DUTCH_JSON.LEFT_BY_MISTAKE}
          </Text>
          <Button
            onClick={() => {
              rejoin();
              ToastManager.clearAllToast();
            }}
            data-testid="join_again_btn"
          >
            <ExitIcon />
            <Text css={{ ml: '$3', fontWeight: '$semiBold', color: 'inherit' }}>{DUTCH_JSON.REJOIN}</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

import React, { useCallback } from 'react';
import { selectIsLocalScreenShared, selectIsLocalVideoEnabled, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { GalleryIcon, PersonRectangleIcon, SidebarIcon } from '@100mslive/react-icons';
import { Box, Flex, Slider, Text } from '../../..';
import SwitchWithLabel from './SwitchWithLabel';
// @ts-ignore: No implicit Any
import { useSetUiSettings } from '../AppData/useUISettings';
import { settingOverflow } from './common';
import { UI_SETTINGS } from '../../common/constants';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

export const LayoutMode = {
  SIDEBAR: 'Sidebar',
  GALLERY: 'Gallery',
  SPOTLIGHT: 'Spotlight',
};

export type LayoutModeKeys = keyof typeof LayoutMode;

export const LayoutModeIconMapping = {
  [LayoutMode.GALLERY]: <GalleryIcon />,
  [LayoutMode.SIDEBAR]: <SidebarIcon />,
  [LayoutMode.SPOTLIGHT]: <PersonRectangleIcon />,
};

export const LayoutSettings = () => {
  const hmsActions = useHMSActions();
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);
  const [{ isAudioOnly, maxTileCount, mirrorLocalVideo }, setUISettings] = useSetUiSettings();
  const toggleIsAudioOnly = useCallback(
    async (isAudioOnlyModeOn?: boolean) => {
      if (isAudioOnlyModeOn) {
        // turn off video and screen share if user switches to audio only mode
        isLocalVideoEnabled && (await hmsActions.setLocalVideoEnabled(false));
        isLocalScreenShared && (await hmsActions.setScreenShareEnabled(false));
      }
      setUISettings({ [UI_SETTINGS.isAudioOnly]: isAudioOnlyModeOn });
    },
    [hmsActions, isLocalVideoEnabled, isLocalScreenShared, setUISettings],
  );

  return (
    <Box className={settingOverflow()}>
      <Flex align="center" css={{ w: '100%', my: '$2', py: '$8', '@md': { display: 'none' } }}>
        <Text variant="md" css={{ fontWeight: '$semiBold' }}>
          {DUTCH_JSON.TILES_IN_VIEW}({maxTileCount})
        </Text>
        <Flex justify="end" css={{ flex: '1 1 0' }}>
          <Slider
            step={1}
            value={[maxTileCount]}
            min={1}
            max={49}
            onValueChange={e => {
              setUISettings({ [UI_SETTINGS.maxTileCount]: e[0] });
            }}
            css={{ w: '70%' }}
          />
        </Flex>
      </Flex>
      <SwitchWithLabel label={DUTCH_JSON.AUDIO_ONLY_MODE} id="audioOnlyMode" checked={isAudioOnly} onChange={toggleIsAudioOnly} />
      <SwitchWithLabel
        label={DUTCH_JSON.MIRROR_LOCAL_VIDEO}
        id="mirrorMode"
        checked={mirrorLocalVideo}
        onChange={value => {
          setUISettings({
            [UI_SETTINGS.mirrorLocalVideo]: value,
          });
        }}
      />
    </Box>
  );
};

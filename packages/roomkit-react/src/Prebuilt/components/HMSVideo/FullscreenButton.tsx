import React from 'react';
import { ExpandIcon, ShrinkIcon } from '@100mslive/react-icons';
import { Flex, IconButton, Tooltip } from '../../..';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

export const FullScreenButton = ({ isFullScreen, onToggle }: { isFullScreen: boolean; onToggle: () => void }) => {
  return (
    <Tooltip title={`${isFullScreen ? DUTCH_JSON.EXIT : DUTCH_JSON.GO} ${DUTCH_JSON.FULL_SCREEN}`} side="top">
      <IconButton css={{ margin: '0px' }} onClick={onToggle} key="fullscreen_btn" data-testid="fullscreen_btn">
        <Flex>{isFullScreen ? <ShrinkIcon /> : <ExpandIcon />}</Flex>
      </IconButton>
    </Tooltip>
  );
};

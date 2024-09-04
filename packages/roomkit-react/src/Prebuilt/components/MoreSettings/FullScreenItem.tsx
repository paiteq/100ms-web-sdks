import React from 'react';
import { ExpandIcon } from '@100mslive/react-icons';
import { Dropdown, Text } from '../../..';
import { useFullscreen } from '../hooks/useFullscreen';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

export const FullScreenItem = () => {
  const { allowed, isFullscreen, toggleFullscreen } = useFullscreen();

  if (!allowed) {
    return null;
  }

  return (
    <Dropdown.Item
      onClick={() => {
        toggleFullscreen();
      }}
      data-testid="full_screen_btn"
    >
      <ExpandIcon />
      <Text variant="sm" css={{ ml: '$4' }}>
        {isFullscreen ? `${DUTCH_JSON.EXIT} ` : `${DUTCH_JSON.GO} `}{DUTCH_JSON.FULL_SCREEN}
      </Text>
    </Dropdown.Item>
  );
};

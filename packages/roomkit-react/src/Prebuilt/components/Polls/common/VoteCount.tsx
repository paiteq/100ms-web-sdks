import React from 'react';
import { Flex, Text } from '../../../../';
import { DUTCH_JSON } from '../../../provider/roomLayoutProvider/constants/du';

export const VoteCount = ({ voteCount }: { voteCount: number }) => {
  return (
    <Flex css={{ alignItems: 'center' }}>
      {voteCount ? (
        <Text variant="sm" css={{ color: '$on_surface_medium' }}>
          {voteCount}&nbsp;
          {voteCount === 1 ? DUTCH_JSON.VOTE : DUTCH_JSON.VOTES}
        </Text>
      ) : null}
    </Flex>
  );
};

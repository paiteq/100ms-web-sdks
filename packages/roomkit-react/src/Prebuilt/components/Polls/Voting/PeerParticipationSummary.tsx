import React from 'react';
import { HMSPoll, selectLocalPeerID, useHMSStore } from '@100mslive/react-sdk';
import { Box } from '../../../../Layout';
import { Text } from '../../../../Text';
import { StatisticBox } from './StatisticBox';
import { useQuizSummary } from './useQuizSummary';
import { getFormattedTime } from '../common/utils';
import { DUTCH_JSON } from '../../../provider/roomLayoutProvider/constants/du';

export const PeerParticipationSummary = ({ quiz }: { quiz: HMSPoll }) => {
  const localPeerId = useHMSStore(selectLocalPeerID);
  const { quizLeaderboard, summary } = useQuizSummary(quiz.id);
  if (quiz.state !== 'stopped') {
    return <></>;
  }
  const isLocalPeerQuizCreator = localPeerId === quiz.startedBy;
  const peerEntry = quizLeaderboard?.entries.find(entry => entry.peer?.peerid === localPeerId);

  const boxes = isLocalPeerQuizCreator
    ? [
      {
        title: DUTCH_JSON.VOTED,
        value: `${summary.totalUsers ? ((100 * summary.votedUsers) / summary.totalUsers).toFixed(0) : 0}% (${summary.votedUsers
          }/${summary.totalUsers})`,
      },
      {
        title: DUTCH_JSON.CORRECT_ANSWERS,
        value: `${summary.totalUsers ? ((100 * summary.correctUsers) / summary.totalUsers).toFixed(0) : 0}% (${summary.correctUsers
          }/${summary.totalUsers})`,
      },
      // Time in ms
      { title: DUTCH_JSON.AVG_TIME_TAKEN, value: getFormattedTime(summary.avgTime) },
      {
        title: DUTCH_JSON.AVG_SCORE,
        value: Number.isInteger(summary.avgScore) ? summary.avgScore : summary.avgScore.toFixed(2),
      },
    ]
    : [
      { title: DUTCH_JSON.YOUR_RANK, value: peerEntry?.position || '-' },
      { title: DUTCH_JSON.POINTS, value: peerEntry?.score || 0 },
      // Time in ms
      { title: DUTCH_JSON.TIME_TAKEN, value: getFormattedTime(peerEntry?.duration) },
      {
        title: DUTCH_JSON.CORRECT_ANSWERS,
        value: peerEntry?.totalResponses ? `${peerEntry?.correctResponses}/${peerEntry.totalResponses}` : '-',
      },
    ];

  return (
    <Box>
      <Text css={{ fontWeight: '$semiBold', my: '$8' }}>{DUTCH_JSON.PARTICIPATION_SUMMARY}</Text>
      <Box css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '$4' }}>
        {boxes.map(box => (
          <StatisticBox key={box.title} title={box.title} value={box.value} />
        ))}
      </Box>
    </Box>
  );
};

import React, { useMemo } from 'react';
import { HMSPollQuestion } from '@100mslive/react-sdk';
import { CheckCircleIcon } from '@100mslive/react-icons';
import { Button, Flex, Text } from '../../../../';
import { QUESTION_TYPE_TITLE } from '../../../common/constants';
import { DUTCH_JSON } from '../../../provider/roomLayoutProvider/constants/du';

export const SavedQuestion = ({
  question,
  index,
  length,
  convertToDraft,
}: {
  question: HMSPollQuestion & { draftID: number };
  index: number;
  length: number;
  convertToDraft: (draftID: number) => void;
}) => {
  const answerArray = useMemo(() => {
    const updatedAnswerArray = [];
    const { option, options } = question?.answer ?? {};
    if (option) {
      updatedAnswerArray.push(option);
    }
    if (options) {
      updatedAnswerArray.push(...options);
    }
    return updatedAnswerArray;
  }, [question?.answer]);

  return (
    <>
      <Text variant="overline" css={{ c: '$on_surface_low', textTransform: 'uppercase' }}>
        {/* @ts-ignore */}
        {DUTCH_JSON.QUESTION} {index + 1} {DUTCH_JSON.OF} {length}: {DUTCH_JSON[question.type.toUpperCase().split("-").join("_")] ? DUTCH_JSON[question.type.toUpperCase().split("-").join("_")] : QUESTION_TYPE_TITLE[question.type]}
      </Text>
      <Text variant="body2" css={{ mt: '$4', mb: '$md' }}>
        {question.text}
      </Text>
      {question.options?.map((option, index) => (
        <Flex key={`${option.text}-${index}`} css={{ alignItems: 'center', my: '$xs' }}>
          <Text variant="body2" css={{ c: '$on_surface_medium' }}>
            {option.text}
          </Text>
          {/* @ts-ignore */}
          {(answerArray.includes(index + 1) || option.isCorrectAnswer) && (
            <Flex css={{ color: '$alert_success', mx: '$xs' }}>
              <CheckCircleIcon height={24} width={24} />
            </Flex>
          )}
        </Flex>
      ))}
      {question.skippable ? (
        <Text variant="sm" css={{ color: '$on_surface_low', my: '$md' }}>
          {DUTCH_JSON.NOT_REQUIRED_TO_ANSWER}
        </Text>
      ) : null}
      <Flex justify="end" css={{ w: '100%', alignItems: 'center' }}>
        <Button variant="standard" css={{ fontWeight: '$semiBold' }} onClick={() => convertToDraft(question.draftID)}>
          {DUTCH_JSON.EDIT}
        </Button>
      </Flex>
    </>
  );
};

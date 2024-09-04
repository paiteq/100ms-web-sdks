import React from 'react';
import { AlertTriangleIcon, CrossIcon } from '@100mslive/react-icons';
import { Button } from '../../../../Button';
import { Box, Flex } from '../../../../Layout';
import { Dialog } from '../../../../Modal';
import { Text } from '../../../../Text';
import { DUTCH_JSON } from '../../../provider/roomLayoutProvider/constants/du';

export const DeleteQuestionModal = ({
  open,
  setOpen,
  removeQuestion,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  removeQuestion: () => void;
}) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay />
      <Dialog.Portal>
        <Dialog.Content css={{ p: '$10' }}>
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
                {DUTCH_JSON.DELETE_QUESTION}?
              </Text>

              <Box
                css={{
                  ml: 'auto',
                  color: '$on_surface_medium',
                  '&:hover': { color: '$on_surface_high', cursor: 'pointer' },
                }}
                onClick={() => setOpen(false)}
              >
                <CrossIcon />
              </Box>
            </Flex>
            <Text variant="sm" css={{ color: '$on_surface_medium', mb: '$8', mt: '$4' }}>
              {DUTCH_JSON.QUESTION_WILL_BE_DELETED}
            </Text>
            <Flex css={{ w: '100%', mt: '$12', gap: '$md' }}>
              <Button
                variant="standard"
                outlined
                onClick={() => setOpen(false)}
                css={{ w: '100%', fontSize: '$md', fontWeight: '$semiBold' }}
              >
                {DUTCH_JSON.CANCEL}
              </Button>
              <Button
                css={{ w: '100%', fontSize: '$md', fontWeight: '$semiBold' }}
                variant="danger"
                onClick={() => {
                  removeQuestion();
                  setOpen(false);
                }}
              >
                {DUTCH_JSON.DELETE}
              </Button>
            </Flex>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

import React, { useState } from 'react';
import { selectPermissions, useHMSActions, useHMSStore, useRecordingStreaming } from '@100mslive/react-sdk';
import { AlertTriangleIcon } from '@100mslive/react-icons';
import { Button, Dialog, Flex, Text } from '../../../';
import { ResolutionInput } from '../Streaming/ResolutionInput';
import { ToastManager } from '../Toast/ToastManager';
import { useRecordingHandler } from '../../common/hooks';
import { RTMP_RECORD_DEFAULT_RESOLUTION } from '../../common/constants';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

const StartRecording = ({ open, onOpenChange }) => {
  const permissions = useHMSStore(selectPermissions);
  const [resolution, setResolution] = useState(RTMP_RECORD_DEFAULT_RESOLUTION);
  const { startRecording, recordingStarted } = useRecordingHandler();
  const { isBrowserRecordingOn, isStreamingOn, isHLSRunning } = useRecordingStreaming();
  const hmsActions = useHMSActions();
  if (!permissions?.browserRecording || isHLSRunning) {
    return null;
  }
  if (isBrowserRecordingOn) {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Content
            css={{
              width: 'min(400px,80%)',
              p: '$10',
              bg: '#201617',
            }}
          >
            <Dialog.Title>
              <Flex gap={2} css={{ c: '$alert_error_default' }}>
                <AlertTriangleIcon />
                <Text css={{ c: 'inherit' }} variant="h6">
                  {DUTCH_JSON.END_RECORDING}
                </Text>
              </Flex>
            </Dialog.Title>
            <Text variant="sm" css={{ c: '$on_surface_medium', my: '$8' }}>
              {DUTCH_JSON.END_RECORDING_SUB_TITLE}
            </Text>
            <Flex justify="end" css={{ mt: '$12' }}>
              <Dialog.Close asChild>
                <Button outlined css={{ borderColor: '$secondary_bright', mr: '$4' }}>
                  {DUTCH_JSON.DONT_END}
                </Button>
              </Dialog.Close>
              <Button
                data-testid="stop_recording_confirm_mobile"
                variant="danger"
                icon
                onClick={async () => {
                  try {
                    await hmsActions.stopRTMPAndRecording();
                  } catch (error) {
                    ToastManager.addToast({
                      title: error.message,
                      variant: 'error',
                    });
                  }
                  onOpenChange(false);
                }}
              >
                {DUTCH_JSON.END_RECORDING}
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content css={{ width: 'min(400px,80%)', p: '$10' }}>
        <Dialog.Title>
          <Text variant="h6">{DUTCH_JSON.START_RECORDING}</Text>
        </Dialog.Title>
        <ResolutionInput
          testId="recording_resolution_mobile"
          css={{ flexDirection: 'column', alignItems: 'start' }}
          onResolutionChange={setResolution}
        />
        <Button
          data-testid="start_recording_confirm_mobile"
          variant="primary"
          icon
          css={{ ml: 'auto' }}
          type="submit"
          disabled={recordingStarted || isStreamingOn}
          onClick={async () => {
            await startRecording(resolution);
            onOpenChange(false);
          }}
        >
          {DUTCH_JSON.START}
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default StartRecording;

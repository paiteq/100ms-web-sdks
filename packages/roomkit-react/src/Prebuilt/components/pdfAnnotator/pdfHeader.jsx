import React from 'react';
import { Dialog, Text } from '../../../';
import { DialogCol } from '../../primitives/DialogContent';
import { DUTCH_JSON } from '../../provider/roomLayoutProvider/constants/du';

export const PDFHeader = () => {
  return (
    <DialogCol
      align="start"
      css={{
        mt: 0,
        mb: '$6',
      }}
    >
      <Dialog.Title asChild>
        <Text as="h6" variant="h6">
          {DUTCH_JSON.SHARE_PDF}
        </Text>
      </Dialog.Title>
      <Dialog.Description asChild>
        <Text
          variant="sm"
          css={{
            c: '$on_surface_medium',
          }}
        >
          {DUTCH_JSON.CHOOSE_PDF_YOU_WANT_ANNOTATE}
        </Text>
      </Dialog.Description>
    </DialogCol>
  );
};

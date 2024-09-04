import type { Layout } from '@100mslive/types-prebuilt';
import { JoinForm_JoinBtnType } from '@100mslive/types-prebuilt/elements/join_form';
import { DUTCH_JSON } from './du';

export const defaultLayout: Layout = {
  id: '',
  role_id: '',
  template_id: '',
  app_id: '',
  typography: {
    font_family: 'Inter',
  },
  themes: [],
  options: {},
  screens: {
    preview: {
      default: {
        elements: {
          preview_header: {
            title: DUTCH_JSON.GET_STARTED,
            sub_title: DUTCH_JSON.GET_STARTED_SUB_TITLE,
          },
          join_form: {
            join_btn_type: JoinForm_JoinBtnType.JOIN_BTN_TYPE_JOIN_ONLY,
            join_btn_label: DUTCH_JSON.JOIN_NOW,
            go_live_btn_label: DUTCH_JSON.GO_LIVE,
          },
        },
      },
    },
    conferencing: {
      default: {
        elements: {
          chat: {
            public_chat_enabled: true,
            private_chat_enabled: true,
            chat_title: 'Chat',
            allow_pinning_messages: true,
            message_placeholder: 'Send a message...',
            roles_whitelist: [],
            real_time_controls: {
              can_disable_chat: true,
              can_block_user: true,
              can_hide_message: true,
            },
          },
          participant_list: {},
          video_tile_layout: {
            grid: {
              enable_local_tile_inset: true,
              prominent_roles: [],
              enable_spotlighting_peer: true,
            },
          },
          emoji_reactions: {},
        },
      },
    },
    leave: {},
  },
};

/* eslint-disable no-param-reassign */
import * as types from './mutation-types';
import Vue from 'vue';

export default {
  [types.FETCH_USER_CHATS_START](state) {
    state.isLoading = true;
  },

  [types.FETCH_USER_CHATS_SUCCESS](state, chats) {
    state.chats = chats;
    state.isLoading = false;
    state.status = 'success';
  },

  [types.FETCH_USER_CHATS_ERROR](state, error) {
    state.isLoading = false;
    state.errors = error.response.data.errors;
    state.status = 'failed';
  },
  [types.SEND_MESSAGE_START](state) {
    state.sendMessageLoading = true;
  },
  [types.SEND_MESSAGE_SUCCESS](state, message) {
    state.status = 'success';
    state.chats.find((chat) => {
      if (chat.id === message.chat_id) {
        chat.messages.push(message);
      }
    });
  },
  [types.SEND_MESSAGE_ERROR](state, error) {
    state.sendMessageError = error.response.data.message;
    state.status = 'failed';
  },
  [types.PAGINATE_MESSAGE_START](state) {
    state.paginatedMessageLoading = true;
  },
  [types.PAGINATE_MESSAGE_SUCCESS](state, { messages, chatId }) {
    const chatIndex = state.chats.findIndex(chat => Number(chat.id) === Number(chatId));
    const updatedChat = state.chats[chatIndex];
    updatedChat.messages = [...messages, ...updatedChat.messages];
    state.chats.splice(chatIndex, 1, updatedChat);

    state.paginatedMessageLoading = false;
    state.status = 'success';
  },
  [types.PAGINATE_MESSAGE_ERROR](state, error) {
    state.paginatedMessageLoading = false;
    state.paginatedMessageError = error.response.data.message;
    state.status = 'failed';
  },
};

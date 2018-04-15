import * as types from './mutation-types';
import apiRequest from '../../utils/apiRequest';


export const fetchChats = async ({ commit }) => {
  commit(types.FETCH_USER_CHATS_START);
  try {
    const { data: chats } = await apiRequest.get('chat');
    commit(types.FETCH_USER_CHATS_SUCCESS, chats);
  } catch (error) {
    commit(types.FETCH_USER_CHATS_ERROR, error);
  }
};


export const sendMessage = async ({ commit }, { newMessage, chatId }) => {
  commit(types.SEND_MESSAGE_START);
  try {
    const { data: message } = await apiRequest.post('message', {
      message: newMessage,
      chat_id: chatId,
    });
    commit(types.SEND_MESSAGE_SUCCESS, message);
  } catch (error) {
    commit(types.SEND_MESSAGE_ERROR);
  }
};

export const paginateMessage = async ({ commit }, { chatId, next_page_url }) => {
  commit(types.PAGINATE_MESSAGE_START);
  try {
    const { data: messages } = await apiRequest.get(next_page_url);
    commit(types.PAGINATE_MESSAGE_SUCCESS, {
      messages: messages.data,
      chatId,
    });
    return messages.next_page_url;
  } catch (error) {
    console.log(error);
    commit(types.PAGINATE_MESSAGE_ERROR);
  }
};

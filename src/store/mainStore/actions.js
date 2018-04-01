import * as types from './mutation-types';
import apiRequest from '../../utils/apiRequest';


export const fetchChats = async ({ commit }, { userId }) => {
  commit(types.FETCH_USER_CHATS_START);
  try {
    const { data: chats } = await apiRequest.get(`chat/${userId}`);
    commit(types.FETCH_USER_CHATS_SUCCESS, chats);
  } catch (error) {
    commit(types.FETCH_USER_CHATS_ERROR, error);
  }
};

<template>
  <v-layout row>
    <v-flex
      xs12
      sm12
      order-xs2
      style="position: relative;">
      <chat
        v-for="chat in chats"
        v-show="Number(chat.id) === Number(chat_id)"
        :chat="chat"
        :key="chat.id"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import Message from '../components/Message.vue';
import Chat from '../components/Chat.vue';
import EmojiPicker from '../components/EmojiPicker.vue';

export default {
  components: {
    message: Message,
    'emoji-picker': EmojiPicker,
    Chat,
  },
  props: [
    'chat_id',
  ],

  watch: {
    chats() {
      alert("CHAT CHANGED");
    },
  },

  data() {
    return {
      content: '',
      chatMessages: [],
      emojiPanel: false,
      currentRef: {},
    };
  },
  computed: {
    ...mapState({
      chats: state => state.mainStore.chats,
    }),
  },
};
</script>

<style>
  .scrollable {
    overflow-y: auto;
    height: 90vh;
  }
  .typer{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    height: 4.9rem;
    width: 100%;
    background-color: #444;
    box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
  }
  .typer .emoji-panel{
    /*margin-right: 15px;*/
  }
  .typer input[type=text]{
    position: absolute;
    left: 2.5rem;
    padding: 1rem;
    width: 80%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1.25rem;
  }
  .chat-container{
    box-sizing: border-box;
    height: calc(100vh - 15rem);
    overflow-y: auto;
    padding: 10px;
  }
  .message{
    margin-bottom: 3px;
  }
  .message.own{
    text-align: right;
  }
  .message.own .content{
    background-color: lightskyblue;
  }
  .chat-container .username{
    font-size: 18px;
    font-weight: bold;
  }
  .chat-container .content{
    padding: 8px;
    margin: 2px 0;
    border-radius: 10px;
    display:inline-block;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
    max-width: 50%;
    word-wrap: break-word;
    background-color: rebeccapurple;
  }
  @media (max-width: 480px) {
    .chat-container .content{
      max-width: 60%;
    }
  }

</style>

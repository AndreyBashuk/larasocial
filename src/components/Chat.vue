<template>
  <div>
    <message
      :messages="messages"
      @scroll="handleScroll"
      class="chat-container"/>
    <div class="typer">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type here..."
        @keyup.enter="sendMessage">
      <v-btn
        icon
        class="blue--text emoji-panel"
        @click="">
        <v-icon>mood</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash';
import Message from './Message.vue';
import EmojiPicker from './EmojiPicker.vue';

export default {
  components: {
    message: Message,
    'emoji-picker': EmojiPicker,
  },

  props: {
    chat: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      messages: this.chat.messages,
      newMessage: '',
      next_page_url: `message/${this.chat.id}?page=2`,
      throttle,
    };
  },

  watch: {
    '$route.params.chat_id': function () {
      if (this.chat.id == this.$route.params.chat_id) {
        this.$nextTick(() => {
          this.scrollToEnd();
        });
      }
    },
    messages() {
      this.$nextTick(() => {
        this.scrollToEnd();
      });
    },
  },

  methods: {
    scrollToEnd() {
      const chatContainer = this.$el.querySelector('.chat-container');
      const typer = this.$el.querySelector('.typer');
      chatContainer.scrollTop = chatContainer.scrollHeight + typer.scrollHeight;
    },

    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.$store.dispatch('sendMessage', {
          newMessage: this.newMessage,
          chatId: this.chat.id,
        });
      }
    },
    handleScroll:
      throttle(function () {
        if (this.next_page_url !== null) {
          const chatContainer = this.$el.querySelector('.chat-container');
          if (chatContainer.scrollTop < 300) {
            this.$store.dispatch('paginateMessage', {
              chatId: this.chat.id,
              next_page_url: this.next_page_url,
            }).then((nextPageUrl) => {
              this.next_page_url = nextPageUrl;
            });
          }
        }
      }, 1000),
  },
};
</script>

<style>

</style>

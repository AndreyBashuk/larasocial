<template>
  <div @scroll="onScroll">
    <div
      v-for="(message,index) in messages"
      :key="index"
      class="message-container"
    >
      <v-avatar
        size="32"
        class="grey lighten-4"
      >
        <img
          :src="SITE_URI+ message.creator.avatar"
          alt="avatar">
      </v-avatar>
      <div class="content">
        <span class="text--primary">
          {{ message.creator.name }}
        </span>
        <br>
        <small>
          {{ moment(message.updated_at).format("dddd, MMMM Do YYYY, h:mm:ss a") }}
        </small>
        <div
          class="message"
          v-html="message.message"/>
      </div>
    </div>
  </div>
</template>

<script>
import { SITE_URI } from '../env';
import moment from 'moment';

export default {
  props: [
    'messages',
  ],
  data() {
    return {
      moment,
      SITE_URI,
    };
  },
  computed: {

  },

  methods: {
    onScroll() {
      this.$emit('scroll');
    },
  },
};
</script>

<style scoped>
  .message {
  }
  span.emoji {
    font-size: 20px;
    vertical-align: middle;
    line-height: 2;
  }
</style>

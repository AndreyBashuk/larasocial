<template>
  <v-content v-animate-css="'fadeIn'">
    <left-panel/>
    <header-nav/>
    <v-container
      fluid
      fill-height>
      <chats :chat_id="chat_id"/>
    </v-container>
    <footer-nav/>
  </v-content>
</template>
<script>

import { mapState } from 'vuex';
import { LeftPanel, HeaderNav, FooterNav, Chats } from '../common/';


export default {

  components: {
    LeftPanel,
    HeaderNav,
    FooterNav,
    Chats,
  },
  props: {
    source: String,
    chat_id: {
      type: String,
      required: false,
      default: null,
    },
  },

  data: () => ({
    drawer: true,
  }),

  computed: {
    ...mapState({
      authStore: state => state.authStore,
    }),
  },

  async created() {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'));
    if (authUser && authUser.access_token) {
      await this.$store.dispatch('userData');
      await this.$store.dispatch('fetchChats');
    }
  },
};
</script>

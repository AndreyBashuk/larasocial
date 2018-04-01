<template>
  <v-content v-animate-css="'fadeIn'">
    <left-panel/>
    <header-nav/>
    <v-container
      fluid
      fill-height>
      <v-layout
        justify-center
        align-center>
        <v-flex shrink>
          <v-tooltip right>
            <v-btn
              icon
              large
              :href="source"
              target="_blank"
              slot="activator"
            >
              <v-icon large>code</v-icon>
            </v-btn>
            <span>Source</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-container>
    <footer-nav/>
  </v-content>
</template>
<script>

import { mapState } from 'vuex';
import { LeftPanel, HeaderNav, FooterNav } from '../common/';


export default {

  components: {
    LeftPanel,
    HeaderNav,
    FooterNav,
  },
  props: {
    source: String,
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
      await this.$store.dispatch('fetchChats', {
        userId: this.authStore.authUser.id,
      });
    }
  },
};
</script>

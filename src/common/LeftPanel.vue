<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    fixed
    app
  >
    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
    <v-list>
      <v-list-tile
        v-for="chat in chats"
        :key="chat.id"
        :to="/chat/+chat.id"
        avatar>
        <template v-if="chat.is_conversation">
          <v-list-tile-avatar v-if="chat.is_conversation">
            <img
              :src="SITE_URI+chat.users[0].avatar"
              alt="">
          </v-list-tile-avatar>
          <v-list-tile-title
            v-if="chat.is_conversation"
            v-text="chat.users[0].name"/>
        </template>
        <template v-else>
          <v-list-tile-avatar >
            <img
              :src="SITE_URI+chat.avatar"
              alt="">
          </v-list-tile-avatar>
          <v-list-tile-title
            v-text="chat.name"/>
        </template>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>

import { mapState } from 'vuex';
import { SITE_URI } from '../env';

export default {
  data: () => ({
    drawer: true,
    SITE_URI,
  }),
  computed: {
    ...mapState({
      authStore: state => state.authStore,
      chats: state => state.mainStore.chats,
    }),
  },
};
</script>

<template>
  <v-navigation-drawer
    clipped
    fixed
    v-model="drawer"
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
        v-for="item in items2"
        :key="item.text"
        avatar
        @click="">
        <v-list-tile-avatar>
          <img
            :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
            alt="">
        </v-list-tile-avatar>
        <v-list-tile-title v-text="item.text"/>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>

import { mapState } from 'vuex';

export default {
  data: () => ({
    drawer: true,
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' },
    ],
  }),
  computed: {
    ...mapState({
      authStore: state => state.authStore,
    }),
  },
};
</script>

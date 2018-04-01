<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    dark
    app
    fixed
  >
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <span class="hidden-sm-and-down">My Contacts</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    />
    <v-spacer/>
    <v-btn icon>
      <v-icon>fas fa-lock</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>

    <v-btn
      icon
      large
      @click="logoutUser">
      <v-avatar
        size="32px"
        tile>
        <img
          src="https://vuetifyjs.com/static/doc-images/logo.svg"
          alt="Vuetify"
        >
      </v-avatar>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
  }),
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser').then(() => {
        this.$router.push('/auth/login');
      });
    },
  },
};
</script>

<template>
  <v-container
    fluid
    fill-height
    v-animate-css="'rotateInDownRight'">
    <v-layout
      align-center
      justify-center>
      <v-flex
        xs12
        sm8
        md4>
        <v-card class="elevation-12">
          <v-toolbar
            dark
            color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer/>
            <v-tooltip bottom>
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
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                :disabled="authStore.isLoading"
                v-model="login.email"/>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                :disabled="authStore.isLoading"
                v-model="login.password"/>
            </v-form>
            <v-alert
              type="error"
              :value="authStore.errors && authStore.errors.email != null"
              transition="scale-transition">
              {{ authStore.errors && authStore.errors.email ? authStore.errors.email[0] : '' }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer>
              Already haven't account?
              <v-btn
                color="warning"
                to="/auth/register"
                dark>Register
              </v-btn>
            </v-spacer>
            <v-btn
              color="primary"
              v-animate-css.click="'bounceIn'"
              @click="handleLogin">Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapState } from 'vuex';

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    login: {
      email: '96andlgrac@gmail.com',
      password: '123456',
    },
  }),

  computed: {
    ...mapState({
      authStore: state => state.authStore,
    }),
  },

  methods: {
    handleLogin() {
      this.$store.dispatch('loginUser', this.login).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

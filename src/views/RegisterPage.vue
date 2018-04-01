<template>
  <v-container
    fluid
    fill-height
    v-animate-css="'rotateInUpRight'">
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
            <v-toolbar-title>Register form</v-toolbar-title>
            <v-spacer/>
            <v-tooltip bottom>
              <v-btn
                slot="activator"
                :href="source"
                icon
                large
                target="_blank"
              >
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form
              v-model="valid"
              ref="register_form"
              lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="name"
                label="Name"
                type="text"
                :disabled="authStore.isLoading"
                v-model="login.name"
                :rules="nameRules"
                :error-messages="authStore.errors && authStore.errors.name && authStore.errors.name.length !== 0 ? authStore.errors.name[0]: []"/>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                :disabled="authStore.isLoading"
                v-model="login.email"
                :rules="emailRules"
                :error-messages="authStore.errors && authStore.errors.email && authStore.errors.email.length !== 0 ? authStore.errors.email[0]: []"/>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                :disabled="authStore.isLoading"
                v-model="login.password"
                :rules="passwordRules"
                :error-messages="authStore.errors && authStore.errors.password && authStore.errors.password.length !== 0 ? authStore.errors.password[0]: []"/>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password Confirmation"
                id="password_confirmation"
                type="password"
                :disabled="authStore.isLoading"
                v-model="login.password_confirmation"
                :rules="passwordConfirmationRules"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer>
              <v-btn
                color="warning"
                to="/auth/login"
                dark>Back to Login</v-btn>
            </v-spacer>
            <v-btn
              color="primary"
              @click="handleRegister"
              v-animate-css.click="'bounceIn'"
              :disabled="!valid">Register</v-btn>
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
    source: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    drawer: null,
    valid: true,
    login: {
      email: '',
      password: '',
      password_confirmation: '',
      name: '',
    },
    serverErrors: {
      name: [],
      email: [],
      password: [],
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password length must be not less then 6 sybmols',
    ],
    passwordConfirmationRules: [
      v => !!v || 'Password confirmation is required',
      v => v.length >= 6 || 'Password length must be not less then 6 sybmols',
    ],
  }),

  computed: {
    ...mapState({
      authStore: state => state.authStore,
    }),
  },

  methods: {
    handleRegister() {
      if (this.$refs.register_form.validate()) {
        this.$store.dispatch('authUser', this.login).then(() => {
          this.$router.push('/');
        });
      }
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

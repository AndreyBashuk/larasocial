<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
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
              <v-text-field prepend-icon="person" name="login" label="Login" type="text"/>
              <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              @click="handleLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import { loginUrl, apiDomain, apiClientSecret, apiClientId } from '../env';

export default {
  data: () => ({
    drawer: null,
    login: {
      username: '96andlgrac@gmail.com',
      password: '123456',
    },
  }),
  props: {
    source: String,
  },
  methods: {
    handleLogin() {
      const postData = {
        grant_type: 'password',
        client_id: apiClientId,
        client_secret: apiClientSecret,
        username: this.login.username,
        password: this.login.password,
        scope: '',
      };
      axios.post(loginUrl, postData).then((response) => {
        const headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${response.data.access_token}`,
        };
        axios.get(`${apiDomain}/api/user`, { headers }).then(response =>
          console.log(response));
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

<template>
  <v-app>
    <!--This is just part of the Vue Cli-->
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->
    <!-- <v-content>
      <HomePage/>
    </v-content> -->
  <router-view></router-view>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
// import HomePage from './components/HomePage';
export default {
  name: 'App',
  components: {
    //HelloWorld,
    // HomePage,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.theme--light.v-btn.v-btn--disabled {
  color:#4F4F4F !important;
}

.v-input__slot {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25) !important;;
}

.v-application--is-ltr .v-text-field .v-input__prepend-inner {
    padding-right: 8px !important;
}
</style>

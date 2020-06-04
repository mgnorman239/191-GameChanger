<template>
  <v-app>
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
  }
};
</script>

<style>
.theme--light.v-btn.v-btn--disabled {
  color:#4F4F4F !important;
}

.v-application--is-ltr .v-text-field .v-input__prepend-inner {
    padding-right: 8px !important;
}

.a {
  text-decoration: none;
}
</style>

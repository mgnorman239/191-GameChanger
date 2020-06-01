<template>
  <v-app class="grey lighten-4">
      <Navbar />
      <v-container>
          <v-card outlined class="spacer">
              <v-card-title class="thank-you justify-center">Thanks for your submission! {{this.project_title}}</v-card-title>
              <v-card-text class="text-center">View your project <router-link :to="{name: 'Project', params: {title: this.project_title}}"><u>here</u></router-link>.</v-card-text>
              <v-img contain height="400" width="auto" class="image" src="../assets/success.svg"></v-img>
          </v-card>
      </v-container>
      <Footer />
  </v-app>
</template>

<script>
import Navbar from './Navbar';
import Footer from "./Footer";

export default {
    components: {
        Navbar,
        Footer
    },
    
    data() {
        return {
            project_title: this.$route.query.project
        }
    },

    created() {
        //scroll to the top 
        window.scrollTo(0, 0)
    }

}
</script>

<style scoped>

.spacer {
    margin-top: 8em;
}

.thank-you {
    font-size: 2em;
    padding: .5em;
    margin-top: 30px;
}

.image {
    margin: 3em;
}

</style>
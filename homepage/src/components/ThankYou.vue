<template>
  <v-app class="grey lighten-4">
      <Navbar />
      <v-container>
          <v-card outlined class="spacer">
              <v-card-title class="thank-you justify-center">Thanks for your submission!</v-card-title>
              <v-card-text class="text-center">View your project <u>here</u>.</v-card-text>
              <v-img contain height="400" width="auto" class="image" src="../assets/success.svg"></v-img>
          </v-card>
      </v-container>
  </v-app>
</template>

<script>
import Navbar from './Navbar';

export default {
    components: {
        Navbar
    }

}
</script>

<style scoped>

.spacer {
    margin-top: 8em;
    margin-bottom: 3em;
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
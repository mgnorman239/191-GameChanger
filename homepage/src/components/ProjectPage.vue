<template>
  <v-app>
      <Navbar />
      <!-- Project gallery, title, and description -->
      <v-container class="mt-3">
          <v-row>
              <v-col class="px-4" cols="12" sm="6">
                  <carousel :perPage="1" :navigationEnabled="true" :paginationPosition="'bottom-overlay'" :loop="true" :navigationNextLabel='`<i class="fas fa-chevron-right"></i>`' :navigationPrevLabel='`<i class="fas fa-chevron-left"></i>`'>
                      <slide>
                          <img width="100%" src="../assets/placeholder3.png" />
                      </slide>
                      <slide>
                          <img width="100%" src="../assets/placeholder3.png" />
                      </slide>
                  </carousel>
              </v-col>
              <v-col class="px-4" cols="12" sm="6">
                  <v-container class="pt-0">
                      <v-row class="pa-1 pt-0">
                          <h1>Project Name</h1>
                      </v-row>
                      <v-row class="pa-1">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.</p>
                      </v-row>
                      <v-row class="mt-3">
                          <v-btn dark large class="body-1 text--white" color="#4DB848">PLAY NOW</v-btn>
                      </v-row>
                  </v-container>
              </v-col>
          </v-row>
      </v-container>
      <!-- Project group members -->
      <v-container>
          <v-row class="px-4">
              <h2>Meet the Team</h2>
          </v-row>
          <v-row>
              <v-col class="ma-3" md="1" v-for="i in 4" :key="i.index">
                  <v-row justify="center">
                    <v-avatar size="60">
                        <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                    </v-avatar>
                  </v-row>
                  <v-row justify="center">
                    <p>Name</p>
                  </v-row>
              </v-col>
          </v-row>
      </v-container>
      <!-- Project logs -->
      <v-container>
          <v-row>
              <h2 class="pa-3 pt-0">Project Log</h2>
          </v-row>
          <v-row>
              <v-col cols="12" xs="12" sm="4" v-for="i in 6" :key="i.index">
                  <v-card>
                    <v-img height="200px" src="../assets/gc_photo.jpg"></v-img>
                    <v-card-title class="pb-0 px-6">Entry Title</v-card-title>
                    <v-card-text class="pb-2 px-6">Lorem ipsum dolor sit amet, consecteturadip iscing elit.</v-card-text>
                    <v-card-actions class="px-6 pb-6">
                        <i class="far fa-calendar"></i>
                        <span class="ml-2">February 28, 2020</span>
                        <v-spacer></v-spacer>
                        <router-link to="/projectlog"><v-btn class="body-2" color="#4DB848" outlined>Read More</v-btn></router-link>
                    </v-card-actions>
                </v-card>
              </v-col>
          </v-row>
      </v-container>
  </v-app>
</template>

<script>
import Navbar from './Navbar';
import { Carousel, Slide } from 'vue-carousel';

export default {
    components: {
        Navbar,
        Carousel,
        Slide
    }

}
</script>

<style>

</style>
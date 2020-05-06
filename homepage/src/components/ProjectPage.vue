<template>
<v-app class="grey lighten-4 spacer">
    <Navbar />
    <!-- Project gallery, title, and description -->
    <v-container class="mt-3 px-12">
        <v-row align="center">
            <v-col class="px-4" cols="12" sm="6">
                <carousel :perPage="1" :navigationEnabled="true" :paginationPosition="'bottom-overlay'" :loop="true" :navigationNextLabel='`<i class="fas fa-chevron-right"></i>`' :navigationPrevLabel='`<i class="fas fa-chevron-left"></i>`' :paginationSize="8">
                    <slide>
                        <v-img height="100%" width="100%" src="../assets/placeholder3.png" />
                    </slide>
                    <slide>
                        <v-img height="100%" width="100%" src="../assets/placeholder3.png" />
                    </slide>
                </carousel>
            </v-col>
            <v-col class="px-4" cols="12" sm="6">
                <v-card class="pa-3" outlined height="100%">
                        <v-card-title class="subtitle-1">
                            <h2 class="mr-5">Project Name</h2>
                            <v-chip-group>
                            <v-chip outlined small disabled>Action</v-chip>
                            <v-chip outlined small disabled>Adventure</v-chip>
                        </v-chip-group>
                        </v-card-title>
                        <v-card-text class="subtitle-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.</v-card-text>
                        <v-spacer></v-spacer>
                        <v-card-actions>
                            <v-btn dark depressed x-large block class="subtitle-1 font-weight-medium" color="#4DB848">PLAY NOW</v-btn>
                        </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <!-- Project group members -->
    <v-container class="px-12">
        <v-row class="px-4 mt-5">
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
                    <p class="pa-2">Name</p>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <!-- Project logs -->
    <v-container class="px-12">
        <v-row>
            <h2 class="pa-3 ml-2 pt-0">Project Log</h2>
            <v-spacer></v-spacer>
            <router-link to="/logsubmission">
                <v-btn outlined dark color="#4DB848" class="body-1 font-weight-medium mr-5">
                    Add Log
                </v-btn>
            </router-link>
        </v-row>
        <v-row>
            <v-col class="pa-5" cols="12" sm="6" md="6" lg="4" v-for="i in 6" :key="i.index">
                <v-card outlined>
                    <v-img height="180px" src="../assets/gc_photo.jpg"></v-img>
                    <v-card-title class="pb-0 px-6">Entry Title</v-card-title>
                    <v-card-text class="px-6 pb-0">Lorem ipsum dolor sit amet, consecte turadip iscing elit.</v-card-text>
                    <v-card-actions class="pb-1">
                        <v-card-subtitle><v-icon small left>far fa-calendar</v-icon>February 28, 2020</v-card-subtitle>
                        <v-spacer></v-spacer>
                        <router-link to="/projectlog">
                            <v-btn class="body-2 font-weight-medium" color="#4DB848" text small>Read More</v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <Footer/>
</v-app>
</template>

<script>
import Navbar from './Navbar';
import Footer from './Footer'; 

import {
    Carousel,
    Slide
} from 'vue-carousel';

export default {
    components: {
        Navbar,
        Carousel,
        Slide,
        Footer
    }

}
</script>

<style scoped>
.spacer {
    margin-top: 4em;
}
</style>

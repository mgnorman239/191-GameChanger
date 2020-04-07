<template>
<v-app class="grey lighten-4">
    <Navbar />
        <carousel :navigationEnabled="true" :perPage="1" :loop="true" :paginationPosition="'bottom-overlay'" :navigationNextLabel='`<i class="fas fa-chevron-right fa-2x"></i>`' :navigationPrevLabel='`<i class="fas fa-chevron-left fa-2x"></i>`'>
            <slide><img width="100%" src="../assets/placeholder2.png" /></slide>
            <slide><img width="100%" src="../assets/placeholder2.png" /></slide>
            <slide><img width="100%" src="../assets/placeholder2.png" /></slide>
            <slide><img width="100%" src="../assets/placeholder2.png" /></slide>
        </carousel>
    <v-container>
        <v-row>
            <h1 class="pa-3 pt-0">Browse Projects</h1>
            <v-spacer></v-spacer>
            <v-col cols="12" md="2">
                <v-select :items="genres" dense rounded solo flat label="Filter..." color="#4DB848">
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pa-3" cols="12" xs="12" sm="6" md="4" v-for="i in 6" :key="i.index">
                <v-card>
                    <v-img height="200px" src="../assets/placeholder.gif"></v-img>
                    <v-card-title class="pb-0 px-6">Project Name</v-card-title>
                    <v-card-text class="pb-2 px-6">Lorem ipsum dolor sit amet, consecteturadip iscing elit.</v-card-text>
                    <v-card-actions class="px-6 pb-6">
                        <v-chip-group class="hidden-xs-only">
                            <v-chip small outlined disabled>Action</v-chip>
                            <v-chip small outlined disabled>Adventure</v-chip>
                        </v-chip-group>
                        <v-spacer></v-spacer>
                        <router-link to="/project"><v-btn class="body-2" color="#4DB848" outlined>View More</v-btn></router-link>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script>
import {
    Carousel,
    Slide
} from 'vue-carousel';
import Navbar from './Navbar';

export default {
    components: {
        Navbar,
        Carousel,
        Slide
    },
    data() {
        return {
            genres: ['Adventure', 'Action', 'Simulation', 'Mystery', 'Casual', 'Puzzle', 'Sports']
        }
    }
}
</script>

<style>
.VueCarousel-navigation-next[data-v-453ad8cd] {
    right: 60px;
}

.VueCarousel-navigation-prev[data-v-453ad8cd] {
    left: 60px;
}

.VueCarousel-dot-container[data-v-438fd353] {
    margin: 20px;
}

.v-input__control {
    max-height: 40px;
}
</style>

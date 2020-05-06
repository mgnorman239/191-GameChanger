<template>
<v-app class="grey lighten-4">
    <Navbar />
        <carousel :navigationEnabled="true" :perPage="1" :loop="true" :paginationPosition="'bottom-overlay'" :navigationNextLabel='`<i class="fas fa-chevron-right fa-2x"></i>`' :navigationPrevLabel='`<i class="fas fa-chevron-left fa-2x"></i>`'>
            <slide><img width="100%" src="../assets/placeholder2.png" /></slide>
            <slide><img width="100%" src="../assets/placeholder2.png" /></slide>
            <slide><img width="100%" src="../assets/placeholder2.png" /></slide>
            <slide><img width="100%" src="../assets/placeholder2.png" /></slide>
        </carousel>
    <v-container class="px-12">
        <v-row class="mt-3" align="center">
            <h2 class="ml-5 pt-0">Browse Projects</h2>
            <v-spacer></v-spacer>
            <v-col cols="12" md="3">
                <v-select :items="genreList" append-icon="" clearable clear-icon="fas fa-times fa-xs" dense rounded solo flat label="Filter..." color="#4DB848" v-model="filterItem">
                    <v-icon slot="prepend-inner" left small>fas fa-filter</v-icon>
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <div v-if="filterProjects.length == 0">
                <v-col>
                    <h3 class="ml-1 mt-5 grey--text font-weight-regular">Sorry, there are no projects with this genre.</h3>
                </v-col>
            </div>
            <v-col class="pa-5" cols="12" xs="12" sm="6" md="4" v-for="project in filterProjects" :key="project.index">
                <v-card outlined>
                    <v-img height="130px" src="../assets/placeholder.gif"></v-img>
                    <v-card-title class="pb-0 px-6">{{project.title}}</v-card-title>
                    <v-card-text class="pb-2 px-6">{{project.description}}</v-card-text>
                    <v-card-actions class="px-6 pb-6">
                        <v-chip-group class="hidden-xs-only" v-for="genre in project.genres" :key="genre.index">
                            <v-chip small outlined disabled>{{genre}}</v-chip>
                        </v-chip-group>
                        <v-spacer></v-spacer>
                        <router-link to="/project"><v-btn class="body-2 font-weight-medium" color="#4DB848" text small>View More</v-btn></router-link>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <Footer />
</v-app>
</template>

<script>
import {
    Carousel,
    Slide
} from 'vue-carousel';
import Navbar from './Navbar';
import Footer from './Footer';

export default {
    components: {
        Navbar,
        Carousel,
        Slide,
        Footer
    },
    data() {
        return {
            genreList: ['Adventure', 'Action', 'Simulation', 'Mystery', 'Casual', 'Puzzle', 'Sports'],
            filterItem: '',
            projects: [
                {
                    title: 'FarmVille',
                    description: 'Lorem ipsum dolor sit amet, consect eturadip iscing elit.',
                    genres: ['Simulation']
                },
                {
                    title: 'Pokemon',
                    description: 'Lorem ipsum dolor sit amet, consect eturadip iscing elit.',
                    genres: ['Adventure', 'Action']
                },
                {
                    title: 'Tetris',
                    description: 'Lorem ipsum dolor sit amet, consect eturadip iscing elit.',
                    genres: ['Casual', 'Puzzle']
                },
                {
                    title: 'Flappy Bird',
                    description: 'Lorem ipsum dolor sit amet, consect eturadip iscing elit.',
                    genres: ['Casual']
                },
                {
                    title: 'Halo',
                    description: 'Lorem ipsum dolor sit amet, consect eturadip iscing elit.',
                    genres: ['Action']
                },
                {
                    title: 'The Sims',
                    description: 'Lorem ipsum dolor sit amet, consect eturadip iscing elit.',
                    genres: ['Casual', 'Simulation']
                }
            ]
        }
    },
    computed: {
        filterProjects() {
            if(this.filterItem) {
                return this.projects.filter((item)=> {
                    return item.genres.includes(this.filterItem);
                })
            }else {
                return this.projects;
            }
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

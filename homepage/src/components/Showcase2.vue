<template>
<v-app class="grey lighten-4">
    <Navbar />
        <!-- Winning Project Carosuel -->
        <carousel :navigationEnabled="true" :perPage="1" :loop="true" :paginationPosition="'bottom-overlay'" class="carousel-background" :navigationNextLabel='`<i class="fas fa-chevron-right fa-2x"></i>`' :navigationPrevLabel='`<i class="fas fa-chevron-left fa-2x"></i>`'>
            <slide><img width="100%" src="../assets/showcase_1.jpg" class="showcase-picture"/></slide>
            <slide><img width="100%" src="../assets/showcase_2.jpg" class="showcase-picture" /></slide>
            <slide><img width="100%" src="../assets/showcase_3.jpg" class="showcase-picture" /></slide>
            <slide><img width="100%" src="../assets/placeholder2.png" class="showcase-picture" /></slide>
        </carousel>
    <v-container class="px-12">
        <br>
        <v-row class="mt-3" align="center">
            <h2 class="ml-5 pt-0">Browse Projects</h2>
            <v-spacer></v-spacer>
            <v-col cols="12" md="3">
                <v-select :items="genreList" append-icon="" clearable clear-icon="fas fa-times fa-xs" dense rounded solo flat label="Filter..." color="#4DB848" v-model="filterItem">
                    <v-icon slot="prepend-inner" left small>fas fa-filter</v-icon>
                </v-select>
            </v-col>
        </v-row>

        <!-- Project/Game cards --> 
        <v-row>
            <div v-if="filterProjects.length == 0">
                <v-col>
                    <h3 class="ml-1 mt-5 grey--text font-weight-regular">Sorry, there are no projects with this genre.</h3>
                </v-col>
            </div>
            <v-col class="pa-5" cols="12" xs="12" sm="6" md="4" v-for="project in filterProjects" :key="project.index">
                <v-card outlined>
                    <v-img height="130px" src="../assets/placeholder.gif"></v-img>
                    <v-card-title class="pb-0 px-6">{{ game.title.S }}</v-card-title>
                    <v-card-text class="pb-2 px-6">{{ condensedDescription(game.description.S) }}</v-card-text>
                    <v-card-actions class="px-6 pb-6">
                        <v-chip-group class="hidden-xs-only" v-for="(tag, index) in game.tags.L" :key="index">
                            <v-chip small outlined disabled>{{ tag.S }}</v-chip>
                        </v-chip-group>
                        <v-spacer></v-spacer>
                        <router-link to="/project"><v-btn class="body-2 font-weight-medium" color="#4DB848" text small v-on:click="getGameTitle(game.title.S)">View More</v-btn></router-link>
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
import ProjectPage from './ProjectPage.vue'
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
            genres: ['Adventure', 'Action', 'Simulation', 'Mystery', 'Casual', 'Puzzle', 'Sports', 'RPG'],
            // list of games from database
            games: {},
            s3_url: "https://gamechangerhackathonprojects.s3-us-west-2.amazonaws.com/",
            selected_title: "",
            filterItem: '',
        }
    }, 

    // runs when the page is created
    created() {
        // setting up AWS environment
        var AWS = require("aws-sdk");
        AWS.config.update({
            region: "us-west-2",
            accessKeyId: "",
            secretAccessKey: ""
        });
        
        // create the dynambodb object to call dynamodb functions
        var dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"}); 

        // pick which database table to draw data from
        var params = {
            TableName: "Projects"
        }

        // get games from the projects database
        dynamodb.scan(params).promise().then(game_database => {
            //store games into games list
            this.games = game_database.Items;
        })
    }, 

    computed: {
        filterProjects() {
            if(this.filterItem) {
                return this.games.filter((item)=> {
                    return item.tags.S.includes(this.filterItem);
                })
            }else {
                return this.games;
            }
        }
    },
    
    methods: {
        condensedDescription(description) {
            // check length of text, if over 250 characters
            if (description.length > 200) {
                // shorten description
                return description.substring(0, 148) + "...";
            }
            // do nothing
            return description;
        }, 

        getGameTitle(title) {
            this.selected_title = title;
            console.log(this.selected_title)
        }
    }
}







</script>

<style>
.VueCarousel-navigation-next[data-v-453ad8cd] {
    right: 60px;
    color: white;
}

.VueCarousel-navigation-prev[data-v-453ad8cd] {
    left: 60px;
    color: white
}

.VueCarousel-dot-container[data-v-438fd353] {
    margin: 20px;
}

.v-input__control {
    max-height: 40px;
}

.showcase-picture {
    max-height: 600px;
    max-width: 1200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.carousel-background {
    background: black
}

</style>

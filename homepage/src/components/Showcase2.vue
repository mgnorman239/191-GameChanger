<template>
<v-app class="grey lighten-4">
    <Navbar />
        <!-- Winning Project Carosuel -->
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

        <!-- Project/Game cards --> 
        <v-row>
            <v-col class="pa-3" cols="12" xs="12" sm="6" md="4" v-for="(game, index) in games" :key="index">
                <v-card>
                    <v-img height="200px" :src=game.thumbnailURL.S></v-img>
                    <v-card-title class="pb-0 px-6">{{ game.title.S }}</v-card-title>
                    <v-card-text class="pb-2 px-6">{{ condensedDescription(game.description.S) }}</v-card-text>
                    <v-card-actions class="px-6 pb-6">
                        <v-chip-group class="xs-only" v-for="(tag, index) in game.tags.L" :key="index">
                            <v-chip small outlined >{{ tag.S }}</v-chip>
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
var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-west-2",

    });



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
            genres: ['Adventure', 'Action', 'Simulation', 'Mystery', 'Casual', 'Puzzle', 'Sports', 'RPG'],
            // list of games from database
            games: {},
            s3_url: "https://gamechangerhackathonprojects.s3-us-west-2.amazonaws.com/"
        }
    }, 

    // runs when the page is created
    created() {
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

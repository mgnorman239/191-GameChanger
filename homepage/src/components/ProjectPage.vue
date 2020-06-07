<template>
<v-app class="grey lighten-4 spacer">
    <Navbar />
    <!-- Project gallery, title, and description -->
    <v-container class="mt-3 px-12">
        <v-row align="center">
            <v-col class="px-4" cols="12" md="6">
                <carousel :centerMode="true" :perPage="1" :navigationEnabled="true" :paginationPosition="'bottom-overlay'" :loop="true" :navigationNextLabel='`<i class="fas fa-chevron-right"></i>`' :navigationPrevLabel='`<i class="fas fa-chevron-left"></i>`' :paginationSize="8">
                    <slide>
                        <img width="100%" :src=game.thumbnailURL.S />
                    </slide>
                    <slide>
                        <img width="100%" src="../assets/placeholder3.png" />
                    </slide>
                </carousel>
            </v-col>
            <v-col class="px-4" cols="12" md="6">
                <v-card class="pa-3" outlined height="100%">
                        <v-card-title class="subtitle-1">
                            <h2 class="mr-5">{{ game.title.S }}</h2>
                        </v-card-title>
                        <v-card-subtitle>
                            <v-chip-group>
                                <v-chip outlined small disabled v-for="(tag, index) in game.tags.L" :key="index">{{ tag.S }}</v-chip>
                            </v-chip-group>
                        </v-card-subtitle>
                        <v-card-text class="subtitle-1">{{ game.description.S }}</v-card-text>
                        <v-card-actions>
                            <v-btn dark depressed x-large block class="subtitle-1 font-weight-medium" color="#4DB848" v-on:click=goToGameWebsite()>PLAY NOW</v-btn>
                        </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!-- Project group members -->
    <v-container class="px-12">
        <v-row class="px-4 mt-5" align="center">
            <h2>Meet the Team</h2>
        </v-row>
        <v-row class="ml-1" align="center">
            <v-col class="ma-4 mr-8" md="1" v-for="(member, index) in teamMembers" :key="index">
                <v-row justify="center">
                    <router-link :to="{name: 'Profile', params: {username: member.displayName.S}, query: {email: member.email.S} }">
                    <v-avatar size="60">
                        <v-img :src=member.profilePicture.S></v-img>
                    </v-avatar>
                    </router-link>
                </v-row>
                <v-row justify="center">
                    <p class="pa-3">{{ member.displayName.S }}</p>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    
    <!-- Project logs -->
    <v-container class="px-12">
        <v-row class="mt-5" align="center">
            <h2 class="ml-5">Project Log</h2>
            <v-spacer></v-spacer>
            <v-btn outlined dark color="#4DB848" to="/logsubmission" class="body-1 font-weight-medium mr-5">
                Add Log
            </v-btn>
        </v-row>
        <v-row class="mt-1">
            <v-col class="pa-5" cols="12" sm="6" lg="4" v-for="(log, index) in game.logs.L" :key="index">
                <v-card outlined height="100%">
                    <v-card-title class="pb-0 px-6">{{ log.M.title.S }}</v-card-title>
                    <v-card-text class="px-6 pb-0">{{ log.M.description.S }}</v-card-text>
                    <v-card-text class="px-6 pb-0">
                        <v-row class="px-4 pb-0" style="font-weight: bold; text-decoration: underline">Contributors: </v-row>
                        <v-row class="px-4 pb-0" v-for="(member, index) in log.M.teamMembers.L" :key="index">
                            {{member.S}}
                        </v-row>
                    </v-card-text>
                    <v-card-actions></v-card-actions>
                </v-card>
            </v-col>
        </v-row>

                    
                    <!-- <v-card-actions class="pb-1">
                        <v-card-subtitle><v-icon small left>far fa-calendar</v-icon>February 28, 2020</v-card-subtitle> 
                        <v-spacer></v-spacer>
                        <router-link to="/projectlog">
                            <v-btn class="body-2 font-weight-medium" color="#4DB848" text small>Read More</v-btn>
                        </router-link>
                    </v-card-actions> -->
            <!-- </v-col> -->
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
    },
    data() {
        return {
            selected_title: '',
            game: {},
            teamMembers: [],
        }
    },
    created() {
        //scroll to the top 
        window.scrollTo(0, 0)
        
        // get selected title from route
        //console.log(this.$route.params.title)
        this.selected_title = this.$route.params.title
        // setting up AWS environment
        var AWS = require("aws-sdk");
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-west-2'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
        });
        // create the dynambodb object to call dynamodb functions
        this.dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"}); 
        // pick which game to get from database
        var projects_params = {
            TableName: "Projects",
            Key: {
                "title": {"S": this.selected_title}
            }
        }
        // get selected game from database and store in data
        this.dynamodb.getItem(projects_params).promise().then(game => {
            // console.log(selected_game.Item)
            this.game = game.Item
            var teamMemberNames = this.game.teamMembers.L
            for (var index in teamMemberNames) {
                //console.log(this.teamMembers[index].S)
                var user_email = teamMemberNames[index].S
                 
                // adjust params based on user being searched for
                var user_params = {
                    TableName: "user-info",
                    Key: {
                        "email": {"S": user_email}
                    }
                }
                // search for user in database and add to this.team
                var list_of_users = []
                this.dynamodb.getItem(user_params).promise().then(user => {
                    //console.log(user.Item)
                    this.teamMembers.push(user.Item)
                })
            }
        })
    }, 
    methods: {
        goToGameWebsite() {
            window.open(this.game.gameURL.S);
        },
        getProfilePicture(user_email) {
            console.log(user_email)
            var params = {
                TableName: "user-info",
                Key: {
                    "email": {"S": user_email}
                }
            }
            /*
            this.dynamodb.getItem(params).promise().then(user => {
                console.log(user.Item.profilePicture.S)
            })
            */
            
        },
        getProfileName(dynamodb, profile_email) {
            console.log(profile_email)
        }
    }
}
</script>

<style scoped>

.spacer {
    margin-top: 4em;
}

</style>

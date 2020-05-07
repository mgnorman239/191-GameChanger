<template>
  <v-app>
      <Navbar />

      <!-- Project gallery, title, and description -->
      <v-container class="mt-3">
          <br>
          <br>
          <br>
          <v-row>
              <v-col class="px-4" cols="12" sm="6">
                  <carousel :perPage="1" :navigationEnabled="true" :paginationPosition="'bottom-overlay'" :loop="true" :navigationNextLabel='`<i class="fas fa-chevron-right"></i>`' :navigationPrevLabel='`<i class="fas fa-chevron-left"></i>`'>
                      <slide>
                          <img width="100%" :src=game.thumbnailURL.S />
                      </slide>
                      <slide>
                          <img width="100%" src="../assets/placeholder3.png" />
                      </slide>
                  </carousel>
              </v-col>
              <v-col class="px-4" cols="12" sm="6">
                  <v-container class="pt-0">
                      <v-row class="pa-1 pt-0">
                          <h1>{{ game.title.S }}</h1>
                      </v-row>
                      <v-row class="pa-1">
                          <p>{{ game.description.S }}</p>
                      </v-row>
                      <v-row class="mt-3">
                          <v-btn dark large class="body-1 text--white" color="#4DB848" v-on:click=goToGameWebsite()>PLAY NOW</v-btn>
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
              <v-col class="ma-3" md="1" v-for="(member, index) in teamMembers" :key="index">
                  <v-row justify="center">
                    <v-avatar size="60">
                        <v-img :src=member.profilePicture.S></v-img>
                    </v-avatar>
                  </v-row>
                  <v-row justify="center">
                    <p>{{ member.displayName.S }}</p>
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
import { Carousel, Slide} from 'vue-carousel';


export default {
    components: {
        Navbar,
        Carousel,
        Slide
    },

    props: {
        title: {
            type: String
        }
    },

    data() {
        return {
            game: {},
            teamMembers: [],
        }
    },

    created() {
        console.log(this.title)
        // setting up AWS environment
        var AWS = require("aws-sdk");
        AWS.config.update({
            region: "us-west-2",
            accessKeyId: "",
            secretAccessKey: ""
        });

        // create the dynambodb object to call dynamodb functions
        this.dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"}); 

        // pick which game to get from database
        var projects_params = {
            TableName: "Projects",
            Key: {
                "title": {"S": 'Roblox'}
            }
        }

        // get selected game from database and store in data
        this.dynamodb.getItem(projects_params).promise().then(game => {
            // console.log(selected_game.Item)
            this.game = game.Item
            var teamMemberNames = this.game.teamMembers.L

            for (var index in teamMemberNames) {
                //console.log(this.teamMembers[index].S)
                var displayName = teamMemberNames[index].S
                 
                // adjust params based on user being searched for
                var user_params = {
                    TableName: "Users",
                    Key: {
                        "displayName": {"S": displayName}
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

        getProfilePicture(displayName) {
            console.log(displayName)
            var params = {
                TableName: "Users",
                Key: {
                    "displayName": {"S": displayName}
                }
            }

            /*
            this.dynamodb.getItem(params).promise().then(user => {
                console.log(user.Item.profilePicture.S)
            })
            */
            
        }
    }

}
</script>

<style>

</style>
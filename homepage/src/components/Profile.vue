<template>
<v-app class="grey lighten-4">
    <Navbar />
    <v-container class="mt-12">
        <v-row class="mt-8">
            <v-col class="px-5" cols="4">
                <v-card outlined>
                    <v-container>
                        <v-row>
                            <v-col align="center">
                                <v-avatar size="130">
                                    <v-img :src="this.user.profilePicture"></v-img>
                                </v-avatar>
                            </v-col>
                        </v-row>
                        <v-card-title class="justify-center">{{ this.user.displayName }}</v-card-title>
                        <v-card-text class="text-center">{{ this.user.bio }}</v-card-text>
                        <!-- Social Media -->
                        <v-card-actions class="justify-center">
                            <!-- LinkedIn -->
                            <v-btn v-if="this.user.linkedin !== 'none'" icon class="ma-4">
                                <a :href="this.user.linkedin" target="_blank">
                                    <i class="fab fa-linkedin-in fa-2x"></i>
                                </a>
                            </v-btn>
                            <div v-else class="ma-4">
                                <i class="fab fa-linkedin-in fa-2x icon-blank"></i>
                            </div>
                            <!-- Github -->
                            <v-btn v-if="this.user.github !== 'none'" icon class="ma-4">
                                <a :href="this.user.github" target="_blank">
                                    <i class="fab fa-github fa-2x"></i>
                                </a>
                            </v-btn>
                            <div v-else class="ma-4">
                                <i class="fab fa-github fa-2x icon-blank"></i>
                            </div>
                            <!-- Twitter -->
                            <v-btn v-if="this.user.twitter !== 'none'" icon class="ma-4">
                                <a :href="this.user.twitter" target="_blank">
                                    <i class="fab fa-twitter fa-2x"></i>
                                </a>
                            </v-btn>
                            <div v-else class="ma-4">
                                <i class="fab fa-twitter fa-2x icon-blank"></i>
                            </div>
                        </v-card-actions>
                    </v-container>
                </v-card>
            </v-col>

            <v-col cols="8" class="px-5">
                <h1>{{ this.user.displayName }}'s Projects</h1>
                <v-container fluid>
                    <v-row>
                        <v-col cols="6" v-for="(project, index) in this.user.projects" :key="index">
                            <router-link :to="{name: 'Project', params: {title: project.S}}">
                            <v-card outlined>
                                <!-- <v-img class="small-card-img" :src="getProjectThumbnail(project.S)"></v-img> -->                                                           
                                <v-img class="small-card-img"></v-img>
                                <v-card-title class="pb-0 px-6 small-card">{{ project.S }}</v-card-title>
                            </v-card>
                            </router-link>
                        </v-col>
                    </v-row>

                </v-container>
            </v-col>
        </v-row>
    </v-container>
    <Footer />
</v-app>
</template>

<script>
import Navbar from './Navbar';
import Footer from './Footer';
import { DynamoDB } from 'aws-sdk';

export default {
    components: {
        Navbar,
        Footer
    },

    data() {
        return {
            user: {
                displayName: '',
                email: '',
                profilePicture: '',
                projects: [],
                github: '',
                twitter: '',
                linkedin: '',
                bio: ''
            },
        }
    },

    props: {
        email: String
    },

    created() {
        console.log(this.email)
        // setting up AWS environment
        var AWS = require("aws-sdk");
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-west-2'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
        });

         // create the dynambodb object to call dynamodb functions
        var dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"}); 

        var params = {
            TableName: 'user-info',
            Key: {
                "email": {
                    //"S": this.$route.params.email
                    "S": this.$route.query.email
                }
            }
        }

        dynamodb.getItem(params, function(err, data) {
            if (err) {
                console.log(err)
            }
        }).promise().then(user => {
                //console.log(user)
                this.user.displayName = user.Item.displayName.S
                this.user.email = user.Item.email.S
                this.user.profilePicture = user.Item.profilePicture.S
                this.user.projects = user.Item.projects.L
                this.user.bio = user.Item.bio.S
                this.user.github = user.Item.socialMedia.M.Github.S
                this.user.linkedin = user.Item.socialMedia.M.LinkedIn.S
                this.user.twitter = user.Item.socialMedia.M.Twitter.S
        })

        for (var i in this.user.projects) {
            console.log(this.user.projects[i].S)
        }

        

    },

    methods: {
        /*
        Return the url of the project thumbnail url
        */
        getProjectThumbnail(projectTitle) {
            // setting up AWS environment
            var AWS = require("aws-sdk");
            // Initialize the Amazon Cognito credentials provider
            AWS.config.region = 'us-west-2'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
            });
            // create the dynambodb object to call dynamodb functions
            var dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"}); 

            var params = {
                TableName: "Projects",
                Key: {
                    "title": {"S": projectTitle}
                },
                ProjectionExpression: "thumbnailURL"
            }

            /*
            return Promise.resolve(dynamodb.getItem(params).promise().then(project => {
                //console.log(project.Item.thumbnailURL.S)
                return project.Item.thumbnailURL.S
            }))
            */

           dynamodb.getItem(params).promise().then(project => {
               console.log(project.Item.thumbnailURL.S)
               return project.Item.thumbnailURL.S
           })
            
        }
    }
}
</script>

<style>
.small-card {
    display: block;
    text-align: center;
    margin: auto;
    height: 60px;
    
}

.small-card-img {
    width: 450px;
    height: 180px;
}

.icon-blank {
    pointer-events: none;
    color: #e6e6e6
}
</style>

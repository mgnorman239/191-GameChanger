<template>
<v-app class="grey lighten-4">
    <Navbar />
    <v-container class="mt-12">
        <v-row class="mt-8 justify-center">
            <v-col class="px-5" cols="9" md="4">
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

            <v-col cols="8" class="px-0 px-sm-5">
                <h1 class="ml-0 ml-sm-3">{{ this.user.displayName }}'s Projects</h1>
                <v-container fluid>
                    <v-row class="justify-center justify-md-start">
                        <v-col class="px-0 pa-sm-3" cols="12" sm="8" md="6" v-for="(project, index) in this.user.projects" :key="index">
                            <router-link :to="{name: 'Project', params: {title: project.title.S}}">
                            <v-card outlined>
                                <!-- <v-img class="small-card-img" :src="getProjectThumbnail(project.S)"></v-img> -->                                                           
                                <v-img width="450" height="180" :src=project.thumbnailURL.S></v-img>
                                <v-card-title class="justify-center">{{ project.title.S }}</v-card-title>
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
                email: this.$route.query.email,
                profilePicture: '',
                projects: [],
                github: '',
                twitter: '',
                linkedin: '',
                bio: ''
            },

            // will contain Project objects
            projects: []
        }
    },

    props: {
        email: String
    },

    async created() {
        //scroll to the top 
        window.scrollTo(0, 0)
        
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
                    "S": this.user.email
                }
            }
        }

        var fetched_user = await dynamodb.getItem(params).promise().then(user => {
            return user
        })

        // set blank data variables as fetched_user values
        this.user.displayName = fetched_user.Item.displayName.S
        this.user.profilePicture = fetched_user.Item.profilePicture.S
        //this.user.projects = fetched_user.Item.projects.L
        this.user.projects = []
        this.user.bio = fetched_user.Item.bio.S
        this.user.github = fetched_user.Item.socialMedia.M.Github.S
        this.user.linkedin = fetched_user.Item.socialMedia.M.LinkedIn.S
        this.user.twitter = fetched_user.Item.socialMedia.M.Twitter.S
        
        // get project information for each project
        this.getProjectThumbnails(dynamodb, fetched_user.Item.projects.L)

        

    },

    methods: {
        /*
        Return the url of the project thumbnail url
        */
        async getProjectThumbnails(dynamodb, projects) {
            // list that will be returned at end of method
            var result = []

            for (var i in projects) {
                var project_title = projects[i].S

                

                // set project params of project being searched
                var project_params = {
                    TableName: "Projects",
                    Key: {
                        "title": {"S": project_title}
                    },
                    //ProjectionExpression: "thumbnailURL"
                }

                var project = await dynamodb.getItem(project_params).promise().then(project => {
                    return project.Item
                    //return project.Item.thumbnailURL.S
                })

                // check if project does not exist, delete it from list
                if (project == undefined) {
                    var user_params = {
                        TableName: 'user-info',
                        Key: {
                            email: {'S': this.user.email}
                        },
                        UpdateExpression: "REMOVE projects[" + i + "]",
                    }

                    dynamodb.updateItem(user_params, function(err) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('success')
                        }
                    })
                }
                // otherwise add project to list
                else {
                    result.push(project)
                }
               

            }

            //console.log(result)
            this.user.projects = result
            //console.log(this.user.projects)

            
        }
    }
}
</script>

<style>
.icon-blank {
    pointer-events: none;
    color: #e6e6e6
}
</style>

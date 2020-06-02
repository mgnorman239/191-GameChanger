<template>
<v-app class="grey lighten-4">
    <Navbar />
    <!-- Form page -->
    <v-container class="header-spacing">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card outlined class="pa-5 pl-8">
                    <!-- Inputs -->
                    <v-card-title class="headline font-weight-bold">Add New Project</v-card-title>
                    <!-- Project title name -->
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-text-field dense label="Project Name" required outlined v-model="project_submission.title">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <!-- Project Description -->
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-textarea outlined rows="5" row-height="15" label="Project Description" v-model="project_submission.description" :rules="description_rules" :value="description_placeholder" counter class="project-description-spacing">
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <!-- Project URL -->
                        <v-row>
                            <v-col cols="12" md="5">
                                <v-text-field outlined label="Project URL" dense required v-model="project_submission.projectURL">
                                </v-text-field>
                            </v-col>
                            <!-- Project Tags -->
                            <v-col cols="12" md="5">
                                <v-select :items="tags" label="Tags" dense outlined multiple v-model="project_submission.tags">
                                </v-select>
                            </v-col>
                        </v-row>
                        <!-- Add team members -->
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-text-field outlined dense label="Member Names (separate names with ;)" required v-model="project_submission.teamMembers">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <!-- Add picture for project -->
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-file-input outlined dense accept="image/*" label="Project Picture" v-model="project_submission.thumbnailURL"></v-file-input>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- Add the submit buttons -->
                    <v-card-actions>
                        <v-btn to="/success" class="subtitle-1 font-weight-medium space-2 mr-5" large depressed color="#4DB848" dark v-on:click="postSubmissionToDatabase()">
                            <v-icon small left>far fa-paper-plane</v-icon>SUBMIT
                        </v-btn>
                        <v-btn class="subtitle-1 font-weight-medium space-2" large outlined color="#4DB848">
                            <v-icon small left>far fa-trash-alt</v-icon>CANCEL
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <Footer />
</v-app>
</template>

<script>

//This script needs the access key and the secret ID to work. 
//import Navbar2 from "./Navbar-2";
import { APIGateway } from 'aws-sdk';

import Navbar from "./Navbar";
import Footer from "./Footer";

export default {
    components: {
        Navbar,
        Footer
    },
    // This is for the project description counter
    data() {
      return {
        description_rules: [v => v.length <= 500 || 'Max 500 characters'],
        description_placeholder: 'Give a quick description about your game!',
        tags: ['Action', 'Adventure', 'RPG', 'Romance'],

        //Object that will be sent into the database for AWS
        project_submission: 
          {
            title: '', 
            description: '',
            projectURL: '',
            tags: '',
            teamMembers: '',
            thumbnailURL: ''
            //projectPicture: null},
          }
          
      }
    },

    methods: {
      postSubmissionToDatabase()
      {
        // make sure this value is set to True before starting
        this.teamMemberInputOK = true;
        /*
        Set up the AWS environment 
        */
        var AWS = require('aws-sdk');
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-west-2'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
        });
        var dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"}); 
        /*
        Check fields for empty values
        */
        this.displayMissingFields()
        /*
        Convert Member Names input string into a list of users
        */
        var team_list = this.formatTeamMembers(this.project_submission.teamMembers)
        /*
        Check if all team members listed exist BEFORE attemping to add project to User.project
        */
        this.displayInvalidUsers(dynamodb, team_list)
        this.putResponseInDatabase(dynamodb)
        /*
        Add project title to the each team member's user profile (projects attribute in the Users database)
        */
          /*
          var user_params = {
            TableName: 'Users',
            Key: {
                "displayName": teamMember
            }, 
            UpdateExpression: "SET #projects = list_append(#projects, :newProject)",
            ExpressionAttributeNames: {
              "#projects": "projects"
            },
            ExpressionAttributeValues: {
              ":newProject": [this.project_submission.title]
            }
          }
          */
        // redirect to success page
        //Vue.use(VueRouter)
        //this.$router.push({path: '/success'})
      },

      /* Format team members into an item that DynamboDB accepts*/
      formatTeamMembers(members) {
        //console.log(members)
        var member_list = members.split(';')
        var results = []

        for (var i in member_list) {
          results.push(member_list[i].trim())
        }
        return results
      }
}
}

</script>

<style scoped>
.background-color {
    background: #E5E5E5;
}

.form-color {
    background: #FFFFFF;
    padding-top: 2em;
    padding-bottom: 4em;
    padding-left: 6em;
    padding-right: 6em;
}

.header-spacing {
    margin-top: 5em;
}

.input-width {
    width: 45%;
}

.project-description-spacing {
    margin-bottom: 9em;
}

.spacing-left {
    margin-left: 0px;
}

.spacing-right {
    margin-right: 0px;
}
</style>>

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
//import { APIGateway } from 'aws-sdk';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Vue from 'vue'
import VueRouter from 'vue-router';
import $ from 'jquery';
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
          },
        title_error: false,
        description_error: false,
        url_error: false,
        members_error: false,
        message: '* required fields',
        missing_fields_list: [],
        
        
        // handles hidden attribute for the messages displayed at the top
        hide_message: false,
        hide_field_error_message: true,
        hide_invalid_user_message: true,
        // change to 'warning-box' if an invalid user is typed
        invalid_user_warning: '',
        // list of invalid users inputted
        invalid_users: [],
          
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
      },
      /*
      Checks if required fields are empty. Changes text area to error if it is empty. 
      Returns boolean stating whether any of the required fields are empty
      */
      isRequiredFieldsEmpty() {
        //set returned value to false initially, any time there is an input error, change value to true
        var emptyField = false;
        // reset hidden message values before checking
        this.hide_message = false;
        this.hide_field_error_message = true;
        // reset error values before checking
        this.title_error = false
        this.description_error = false
        this.url_error = false
        this.members_error = false;
        // clear missing field list before checking
        this.missing_fields_list = []
        // shorter references to form input values
        var title = (this.project_submission.title).trim()
        var description = (this.project_submission.description).trim()
        var url = (this.project_submission.projectURL).trim()
        var members = (this.project_submission.teamMembers).trim()
        // if any of the fields are empty: make error message visible, make message invisible, return true
        if (title.length == 0 || description.length == 0 || url.length == 0 || members.length == 0) {
          this.hide_message = true;
          this.hide_field_error_message = false;
          // title field
          if (title.length == 0) {
            this.title_error = true
            this.missing_fields_list.push('Project Name')
          }
          
          /* no longer required
          //description field
          if (description.length == 0) {
            this.description_error = true
            this.missing_fields_list.push('Project Description')
          }
          */
          //url field
          if (url.length == 0) {
            this.url_error = true
            this.missing_fields_list.push('Project URL')
          }
          //team member field
          if (members.length == 0) {
            this.members_error = true
            this.missing_fields_list.push('Member Names')
          }
          return true
        }
        
        return false
      },
      /* 
      Display which fields are missing and scroll page back to top of the page
      */
      displayMissingFields() {
        //if any of the required fields are empty, display message and scroll page back to top
        if (this.isRequiredFieldsEmpty()) {
          window.scrollTo(0, 0);
        }
      },
      /*
      Get the user from the Users database. If user does not exist, returns undefined object
      */
      getUser(dynamodb, user_email) {
        // create params to search the Users database for user
        var user_exist_params = {
          TableName: 'user-info',
          Key: {
            "email": {"S": user_email}
          }
        }
          //return dynamodb.getItem(user_exist_params).promise().then(user => {
          //return user.Item
          return dynamodb.getItem(user_exist_params).promise().then(user => {
            return user.Item
          })
      },   
      /*
      Display invalid users inputed
      */
      async displayInvalidUsers(dynamodb, team_members) {
        // reset invalid user warning and invalid users list before checking
        this.invalid_user_warning = ""
        this.hide_invalid_user_message = true;
        this.invalid_users = []
        for (var i in team_members) {
          //console.log(team_members[i] + ": " + await this.getUser(dynamodb, team_members[i]))
          var user = await this.getUser(dynamodb, team_members[i])
          
          // check if user is undefined, if so add the invalid user email to this.invalid_users and show warning box and message
          if (user == undefined) {
            this.invalid_users.push(team_members[i])
            this.invalid_user_warning = 'warning-box'
            this.hide_invalid_user_message = false
          }
        }
        /*
        for (var i in team_members) {
          var username = team_members[i]
          this.getUser(dynamodb, username).then(user => {
            if (user == undefined) {
              //this.invalid_users.push(team_members[i])
              console.log(username + ": does not exist")
            }
          })
        }
        */
     },
      putResponseInDatabase(dynamodb) {
          var params = {
          TableName: 'Projects',
          Item: {
            title: this.project_submission.title,
            description: this.project_submission.description,
            gameURL: this.project_submission.projectURL,
            thumbnailURL: this.project_submission.thumbnailURL,
            //teamMembers: this.formatTeamMembers(this.project_submission.teamMembers),
            teamMembers: [],
            tags: this.project_submission.tags,
            logs: []
          }
        }
        /* uncomment this when finished with adding project to user profile
        dynamodb.put(params, function(err) {
          if (err) {
            console.log(err)
          }
          else {
            console.log('success')
          }
        })
        */
        
      }
      
} // methods end
} // export end


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

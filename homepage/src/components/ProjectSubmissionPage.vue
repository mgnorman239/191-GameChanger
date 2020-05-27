<template>
<v-app class="grey lighten-4">
    <Navbar />
    <!-- Form page -->
    <v-container fluid class="header-spacing">
      <v-layout>
        <v-flex md2></v-flex>
        <!-- Inputs -->
        <v-flex md8 class="form-color">
          <h1>Add New Project</h1>
          <div :hidden="this.hide_message">{{ message }}</div>
          <div style="color: red" :hidden="hide_field_error_message">
            Missing fields: 
            <ul v-for="(field, index) in missing_fields_list" :key="index">
              <li>{{ field }}</li>
            </ul>
          </div>
          <br>

          <!-- Project title name (required) -->
          <v-text-field 
            label="Project Name *"
            v-model="project_submission.title"
            hint="Required" 
            :error="this.title_error"
            required>
          </v-text-field>
          <br>

          <!-- Project Description (required) -->
          <v-textarea
            rows="5"
            row-height="15"
            label="Project Description *" 
            hint="Required" 
            :error="this.description_error"
            :rules="description_rules"
            :value="description_placeholder"
            v-model="project_submission.description"
            counter
            class="project-description-spacing"
            required
          >
          </v-textarea>
          <v-row class="spacing-left spacing-right">

            <!-- Project URL (required) -->
            <v-text-field 
            label="Project URL *"
            :error="this.url_error"
            hint="Required" 
            required
            v-model="project_submission.projectURL"
            class="input-width mr-5">
            </v-text-field>

            <!-- Project Tags (optional) -->
            <v-select
              :items="tags"
              label="Tags"
              v-model="project_submission.tags"
              outlined
              multiple
              class="input-width"
            >
            </v-select>
          </v-row>

          <!-- Add team members (required) -->
          <br>
          <v-text-field 
            label="Member Names * (separate names with ;)" 
            :error="this.members_error"
            v-model="project_submission.teamMembers"
            hint="Required" 
            required>
          </v-text-field>
          <br>

          <!-- Add picture for project (optional) -->
          <v-file-input accept="image/*" label="Project Picture" v-model="project_submission.thumbnailURL"></v-file-input>
          <br>
          <br>

          <!-- Add the submit buttons -->
          <!-- <router-link to='/success'><v-btn height="4em" width="13em" color="#4DB848" class="white--text body-1" v-on:click="postSubmissionToDatabase()">Submit</v-btn></router-link> -->
          <v-btn height="4em" width="13em" color="#4DB848" class="white--text body-1" v-on:click="postSubmissionToDatabase()">Submit</v-btn>
        </v-flex>
        <v-flex md2></v-flex>
      </v-layout>
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
        
        
        // handles hidden attribute for the message displayed at the top
        hide_message: false,
        hide_field_error_message: true,

        teamMemberInputOK: true
          
      }
    },

    methods: {
      async postSubmissionToDatabase()
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
        Add project title to the each team member's user profile (projects attribute in the Users database)
        */

        // get list of team members
        var team_list = this.formatTeamMembers(this.project_submission.teamMembers)

        /*
        // Check is all team members exists in Users database BEFORE attempting to add this project to their projects list
        var memberInputOK = true;
        for (var i in team_list) {
          var username = team_list[i]
          await this.getUser(dynamodb, username).then(user => {
            if (user == undefined) {
              this.teamMemberInputOK = false;
              //console.log(username + ": does not exist")
            }
          })
        
        }
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
      Get the user from the Users database. If user does not exist, returns undefined object
      */
      getUser(dynamodb, username) {
        // create params to search the Users database for user
        var user_exist_params = {
          TableName: 'Users',
          Key: {
            "displayName": {"S": username}
          }
        }

          return dynamodb.getItem(user_exist_params).promise().then(user => {
          return user.Item
        })
        
      },   

      /*
      Checks if required fields are empty. Changes text area to error if it is empty. 
      Returns boolean stating whether any of the required fields are empty
      */
      isRequiredFieldsEmpty() {
        //set returned value to false initially, any time there is an input error, change value to true
        var emptyField = false;

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
          
          //description field
          if (description.length == 0) {
            this.description_error = true
            this.missing_fields_list.push('Project Description')
          }

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
        

        //return value containing boolean indicating if there is an empty field
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

      putResponseInDatabase(dynamodb) {
          var params = {
          TableName: 'Projects',
          Item: {
            title: this.project_submission.title,
            description: this.project_submission.description,
            gameURL: this.project_submission.projectURL,
            thumbnailURL: this.project_submission.thumbnailURL,
            teamMembers: this.formatTeamMembers(this.project_submission.teamMembers),
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

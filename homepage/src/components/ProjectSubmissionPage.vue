<template>
<v-app class="grey lighten-4">
    <Navbar />
    <!-- Form page -->
    <v-container fluid class="header-spacing">
      <v-layout row>
        <v-flex md2 sm1></v-flex>
        <!-- Inputs -->
        <v-flex xs12 md8 class="form-color">
          <h1>Add New Project</h1>
          <div>{{ message }}</div>
          <br>
          <div class="missing-fields-box" :hidden="hide_field_error_message">
            Missing fields: 
            <ul v-for="(field, index) in missing_fields_list" :key="index">
              <li>{{ field }}</li>
            </ul>
          </div>
          <br>

          <!-- Project title name (required) -->
          <div :class="invalid_title_warning">
          <div :hidden="hide_invalid_title_message">
            Project Title already in use.
          </div>
          <v-text-field 
            label="Project Name *"
            v-model="project_submission.title"
            hint="Required" 
            :error="this.title_error"
            required>
          </v-text-field>
          </div>
          <br>

          <!-- Project Description (required) -->
          <v-textarea
            rows="5"
            row-height="15"
            label="Project Description" 
            :error="this.description_error"
            :rules="description_rules"
            :value="description_placeholder"
            v-model="project_submission.description"
            counter
            class="project-description-spacing"
          >
          </v-textarea>
          <!--Show on bigger screens as row-->
          <v-container d-none d-md-block>
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
          </v-container>
          <!--Show on bigger screens as single-->
          <v-layout d-flex d-md-none column>

            <!-- Project URL (required) -->
            <v-text-field 
            label="Project URL *"
            :error="this.url_error"
            hint="Required" 
            required
            v-model="project_submission.projectURL"
            >
            </v-text-field>
            <br>
            <br>
            <!-- Project Tags (optional) -->
            <v-select
              :items="tags"
              label="Tags"
              v-model="project_submission.tags"
              outlined
              multiple
            >
            </v-select>

          </v-layout>
          <!-- Add team members (required) -->
          <br>
          <div :class="invalid_user_warning">
          <div :hidden='hide_invalid_user_message'>
            The following users do not exist: 
            <ul v-for="(user, index) in invalid_users" :key="index">
              <li>{{ user }}</li>
            </ul>
          </div>
          <br>
          <v-text-field 
          label="Team member's emails *" 
          :error="this.members_error"
          v-model="project_submission.teamMembers"
          hint="Required, seperate names with ;" 
          persistent_hint="true"
          required>
          </v-text-field>
          <br>
          </div>
          <br>
          

          <!-- Add picture for project (optional) -->
          <v-file-input accept="image/*" label="Project Picture" v-model="project_submission.thumbnailURL"></v-file-input>
          <br>
          <br>

          <!-- Add the submit buttons -->
          <!-- <router-link to='/success'><v-btn height="4em" width="13em" color="#4DB848" class="white--text body-1" v-on:click="postSubmissionToDatabase()">Submit</v-btn></router-link> -->
          <v-flex  d-none d-sm-block>
            <v-btn height="4em" width="13em" color="#4DB848" class="white--text body-1" v-on:click="postSubmissionToDatabase()">Submit</v-btn>
          </v-flex>
          <!--Center Button for smaller screens-->
          <v-flex d-flex d-sm-none>
            <v-btn height="3em" width="7em" color="#4DB848" class="white--text body-1 center-block" v-on:click="postSubmissionToDatabase()">Submit</v-btn>
          </v-flex>
        </v-flex>
        <v-flex md2 sm1></v-flex>
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
        team_member_field_ok: true,
        duplicate_title: false,

        
        
        // handles hidden attribute for the messages displayed at the top
        hide_message: true,
        hide_field_error_message: true,
        hide_invalid_user_message: true,
        hide_invalid_title_message: true,

        // change to 'warning-box' if an invalid entry is typed
        invalid_user_warning: '',
        invalid_title_warning: '',

        // list of invalid users inputted
        invalid_users: [],
          
      }
    },

    created() {
        //scroll to the top 
        window.scrollTo(0, 0)
    },

    methods: {
      async postSubmissionToDatabase()
      {
        // make sure this value is set to True before starting
        this.teamMemberInputOK = true;

        // resest hidden values

        /*
        Set up the AWS environment 
        */
        var AWS = require('aws-sdk');
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-west-2'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
        });

        //var dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"}) 
        var dynamodb = new AWS.DynamoDB.DocumentClient();

        /*
        Check fields for empty values, if any fields are missing, stop process
        */
        this.displayMissingFields()

        /*
        Check if title is duplicate
        */
        this.duplicate_title = await this.titleIsDuplicate(dynamodb)

        /*
        Convert Member Names input string into a list of users
        */
        var team_list = this.formatTeamMembers(this.project_submission.teamMembers)
        // if team list is empty, skip rest of the function
        if (team_list.length == 0) {
          return
        }

        /*
        Check if all team members listed exist BEFORE attemping to add project to User.project
        */
        await this.displayInvalidUsers(dynamodb, team_list)

        /*
        If any of the fields are empty, stop the function
        */
        if ((this.missing_fields_list).length > 0) {
          return;
        }

        /*
        If team member field is valid, title is not a duplicate, and missing field list is empty, begin adding project to team memebers
        */
        if(this.team_member_field_ok && (this.missing_fields_list) == 0 && this.duplicate_title == false) {

          // add project to each user
          for (var i in team_list) {
            this.addProjectTitleToTeamMembers(dynamodb, team_list[i])
          }
          
          // put project into database
          this.putResponseInDatabase(dynamodb);

          // redirect to success page
          Vue.use(VueRouter)
          this.$router.push({
            name: 'Success', 
            query: { project: this.project_submission.title }
            })

       }



        

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
        this.hide_field_error_message = false;

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
          this.hide_field_error_message = true;

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
            "email": user_email
          }
        }

          //return dynamodb.getItem(user_exist_params).promise().then(user => {
          //return user.Item
          return dynamodb.get(user_exist_params).promise().then(user => {
            return user.Item
          })

      },   

      /*
      Display invalid users inputed
      */
      async displayInvalidUsers(dynamodb, team_members) {
        // reset team member field ok
        this.team_member_field_ok = true;

        // reset invalid user warning and invalid users list before checking
        this.invalid_user_warning = "";
        this.hide_invalid_user_message = true;
        this.invalid_users = []

        for (var i in team_members) {
          //console.log(team_members[i] + ": " + await this.getUser(dynamodb, team_members[i]))
          var user = await this.getUser(dynamodb, team_members[i])
          
          // check if user is undefined, if so add the invalid user email to this.invalid_users and show warning box and message
          // change team member field ok to false
          if (user == undefined) {
            this.team_member_field_ok = false;
            this.invalid_users.push(team_members[i])
            this.invalid_user_warning = 'warning-box'
            this.hide_invalid_user_message = false
          }
        }

     },

     /*
     Check for duplicate title
     */
     async titleIsDuplicate(dynamodb) {
        var params = {
          TableName: 'Projects',
          Key: {
            "title": this.project_submission.title
          }
        }

        // will return undefined if it does not exist
        var project = await dynamodb.get(params).promise().then(project => {
          //console.log(project.Item)
          return project.Item
        })

        //console.log(project)

        if (project == undefined) {
          // make sure error message is/stays hidden
          this.hide_invalid_title_message = true;
          this.invalid_title_warning = '';

          return false;
        }

        // display error/warning message
        else {
          this.displayInvalidTitle();
          return true;
        }
        

    },

      /*
      Display error message to let user know the title is already being used
      */
      displayInvalidTitle() {
        this.invalid_title_warning = "warning-box"
        this.hide_invalid_title_message = false
      },

      /*
      Add the project title to given team member's project list
      */
      addProjectTitleToTeamMembers(dynamodb, user_email) {
        var params = {
            TableName: 'user-info',
            Key: {
              "email": user_email
            },
            UpdateExpression: "SET #projects = list_append(#projects, :newProject)",
            ExpressionAttributeNames: {
              "#projects": "projects"
            },
            ExpressionAttributeValues: {
              ":newProject": [this.project_submission.title]
            }
        }

        dynamodb.update(params, function(err) {
          if(err) {
            console.log(err)
          }
        })

      },

      putResponseInDatabase(dynamodb) {
          // if tags is empty, convert empty string to empty list
          if (this.project_submission.tags == '') {
            this.project_submission.tags = []
          }

          // if project thumbnail is empty, set as default thumbnail picture (located in S3)
          if (this.project_submission.thumbnailURL == '') {
            this.project_submission.thumbnailURL = 'https://gamechangerhackathonprojects.s3-us-west-2.amazonaws.com/placeholder.gif';
          }

          var params = {
          TableName: 'Projects',
          Item: {
            title: this.project_submission.title,
            description: this.project_submission.description,
            gameURL: this.project_submission.projectURL,
            thumbnailURL: this.project_submission.thumbnailURL,
            teamMembers: this.formatTeamMembers(this.project_submission.teamMembers),
            //teamMembers: [],
            tags: this.project_submission.tags,
            logs: []
          }
        }

        dynamodb.put(params, function(err) {
          if (err) {
            console.log(err)
          }
          else {
            console.log('success')
          }
        })
        
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

.warning-box {
  border-style: solid;
  border-color: #cccc00;
  background-color: #ffffe6;
  padding: 5px;
  font-size: 14px;
}

.missing-fields-box {
  border-style: solid;
  border-color: #e60000;
  background-color: #ffcccc;
  padding: 5px;
  font-size: 14px;
}

.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

</style>>

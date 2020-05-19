<template>
  <v-app class="background-color">
    <Navbar />
    <!-- Form page -->
    <v-container fluid class="header-spacing">
      <v-layout>
        <v-flex md2></v-flex>
        <!-- Inputs -->
        <v-flex md8 class="form-color">
          <h1>Add New Project</h1>
          <br>
          <!-- Project title name -->
          <v-text-field 
            label="Project Name"
            v-model="project_submission.title"
            required>
          </v-text-field>
          <br>
          <!-- Project Description -->
          <v-textarea
            rows="5"
            row-height="15"
            label="Project Description"
            :rules="description_rules"
            :value="description_placeholder"
            v-model="project_submission.description"
            counter
            class="project-description-spacing"
            >
          </v-textarea>
          <v-row class="spacing-left spacing-right">
            <!-- Project URL -->
            <v-text-field 
            label="Project URL"
            required
            v-model="project_submission.projectURL"
            class="input-width mr-5">
            </v-text-field>
            <!-- Project Tags -->
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
          <!-- Add team members -->
          <br>
          <v-text-field 
            label="Member Names (separate names with ;)"
            v-model="project_submission.teamMembers"
            required>
          </v-text-field>
          <br>
          <!-- Add picture for project -->
          <v-file-input accept="image/*" label="Project Picture" v-model="project_submission.thumbnailURL"></v-file-input>
          <br>
          <br>
          <!-- Add the submit buttons -->
          <router-link to='/success'><v-btn height="4em" width="13em" color="#4DB848" class="white--text body-1" v-on:click="postSubmissionToDatabase()">Submit</v-btn></router-link>
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
        var AWS = require('aws-sdk');
        AWS.config.update({
          region: 'us-west-2'
        });

        
        var dynamodb = new AWS.DynamoDB.DocumentClient()

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

        dynamodb.put(params, function(err) {
          if (err) {
            console.log(err)
          }
          else {
            console.log('success')
          }
        })


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
    margin-top: 9em;
  }

  .input-width {
    width: 45%;
  }

  .project-description-spacing
  {
    margin-bottom: 9em;
  }

  .spacing-left {
    margin-left: 0px;
  }

  .spacing-right {
    margin-right: 0px;
  }

</style>>

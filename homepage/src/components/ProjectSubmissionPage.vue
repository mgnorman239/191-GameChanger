<template>
  <v-app class="background-color">
    <Navbar2 />
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
            v-model="project_submission.projectName"
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
            v-model="project_submission.projectDescription"
            counter
            class="project-description-spacing"
            >
          </v-textarea>
          <v-row class="spacing-left spacing-right">
            <!-- Project URL -->
            <v-text-field 
            label="Project URL"
            v-model="project_submission.projectURL"
            required
            class="input-width mr-5">
            </v-text-field>
            <!-- Project Tags -->
            <v-select
              :items="tags"
              label="Tags"
              v-model="project_submission.projectTags"
              outlined
              multiple
              class="input-width"
            >
            </v-select>
          </v-row>
          <!-- Add team members -->
          <br>
          <v-text-field 
            label="Member Names"
            v-model="project_submission.memberNames"
            required>
          </v-text-field>
          <br>
          <!-- Add picture for project -->
          <v-file-input accept="image/*" label="Project Picture" v-model="project_submission.projectPicture"></v-file-input>
          <br>
          <br>
          <!-- Add the submit buttons -->
          <router-link to='/success'><v-btn height="4em" width="13em" color="#4DB848" @click="postSubmissionToDatabase()" class="white--text body-1">Submit</v-btn></router-link>
        </v-flex>
        <v-flex md2></v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Navbar2 from "./Navbar-2";

export default {
    components: {
        Navbar2
    },
    // This is for the project description counter
    data: () => ({
      description_rules: [v => v.length <= 500 || 'Max 500 characters'],
      description_placeholder: 'Give a quick description about your game!',
      tags: ['Action', 'Adventure', 'RPG', 'Romance'],
      project_submission: 
        {
          projectName: '', 
          projectDescription:'',
          projectURL: '',
          projectTags: '',
          memberNames: '',
          //projectPicture: null},
        },
    }),
    methods: {
      postSubmissionToDatabase()
      {
        var AWS = require('aws-sdk');
        AWS.config.update({accessKeyId:'', secretAccessKey: '', region: 'us-west-2', endpoint: 'http://dynamodb.us-west-2.amazonaws.com'});
        //Accessing to the project dynamodb
        let docClient = new AWS.DynamoDB.DocumentClient();
  
        var params = {
            TableName: "Testing1",
            Item: this.project_submission,
        }
        docClient.put(params, function(err)
        {
          console.log(err);
        })
      }
    },
}
</script>

<style scoped>
  .background-color {
    background: #E5E5E5;
    padding-bottom: 4em;
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

<template>
    <v-app class="background-color">
        <Navbar2 />
        <!-- Form page -->
        <v-container fluid class="header-spacing">
            <v-layout>
                <v-flex md2></v-flex>
                <v-flex md8 class="form-color bigger-font">
                    <h1 class="header-padding">User Settings</h1>
                    <br>
                    <p :class="[success ? 'show' : 'hidden']">Changes saved!</p>
                    <div :class="[changingNames ? 'show' : 'hidden']">
                        <p class="left-tab"><b class="right-tab">Display name:</b> {{ userSubmission.userName }}</p>
                        <br>
                        <p class="left-tab"><b class="right-tab">Password:</b> {{ userSubmission.userPassword }} </p>
                        <br>
                        <p class="left-tab"><b class="right-tab">Email:</b> {{ userSubmission.userEmail }} </p>
                        <br>
                        <v-btn @click="updateInformation" color="#4DB848" class="button-placement white--text body-1"><i class="fas fa-edit right-tab white-icon"></i> Edit Information</v-btn>
                    </div>

                    <div :class="[changingNames ? 'hidden' : 'show']">
                        <v-text-field
                            label="Display Name"
                            placeholder="Enter New Name"
                            class="left-tab"
                            v-model="userSubmission.userName"
                        ></v-text-field>
                        <br>
                        <v-text-field
                            label="Password"
                            placeholder="Enter New Password"
                            class="left-tab"
                            v-model="userSubmission.userPassword"
                        ></v-text-field>
                        <br>
                        <v-text-field
                            label="Email"
                            placeholder="Enter New Email"
                            class="left-tab"
                            v-model="userSubmission.userEmail"
                        ></v-text-field>
                        <br>
                        <v-file-input class="left-tab" accept="image/*" label="User Picture" v-model="userSubmission.userPicture"></v-file-input>
                        <v-btn @click="cancelChanges" color="#e04141" class="button-spacing button-placement white--text body-1">Cancel</v-btn><v-btn @click="saveChanges" color="#4DB848" class="button-placement white--text body-1">Save Changes</v-btn>
                    </div>
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
    // This is for the user information. Data right now is hard coded.
    data: () => ({
        userSubmission:
        { 
            userName: 'Sam',
            userPassword: '********',
            userEmail: 'testing@gmail.com',
            userPicture: null,
        },
        changingNames: true,
        success: false,
        userPicture: null,
    }),
    methods: {
        updateInformation() {
            this.changingNames = false;
        },
        cancelChanges() {
            this.changingNames = true;
        },
        saveChanges() {
            var AWS = require('aws-sdk');
            var docClient = new AWS.DynamoDB.DocumentClient();
            var params = {
                TableName: "user-info",
                Item: {
                    "email": this.userSubmission.userEmail,
                    "password": this.userSubmission.userPassword,
                    "displayName": this.userSubmission.userName,
                }
            }

            docClient.put(params, function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                    location.reload();
                }
            });
        }
    },
    beforeCreate() {
        var AWS = require('aws-sdk');
        AWS.config.update({accessKeyId:'', secretAccessKey: '', region: 'us-west-2', endpoint: 'http://dynamodb.us-west-2.amazonaws.com'});
        
        //How to tell which user has logged in? Right now, hard coded
        var params = {
                TableName: "user-info",
                Key: {
                    "email": "anneflynn@example.com",
                },
            }
        
        var thisObject = this;
        var docClient = new AWS.DynamoDB.DocumentClient();
        var promise = docClient.get(params).promise();
        promise.then(function(data) 
        {
           thisObject.userSubmission.userName = data.Item.displayName;
           thisObject.userSubmission.userPassword = data.Item.password;
           thisObject.userSubmission.userEmail = data.Item.email;
        }).catch(function(err)
        {
            console.log(err);
        });
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
    padding-bottom: 6em;
    padding-left: 6em;
    padding-right: 6em;
  }

  .left-tab {
      padding-left: 3em;
  }

  .right-tab {
      padding-right: 1em;
  }

  .white-icon {
      color:white;
  }

  .header-spacing {
    margin-top: 9em;
  }

  .header-padding {
      margin-bottom: 1.5em;
  }

  .bigger-font {
      font-size: 18px;
  }

  .hidden {
      display: none;
  }

  .show {
      display: block;
  }

  .button-placement {
      margin-top: 5em;
      float: right;
  }

  .button-spacing {
      margin-left: 2em;
  }
</style>
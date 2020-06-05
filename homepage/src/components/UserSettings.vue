<template>
    <v-app class="background-color">
        <Navbar />
        <!-- Form page -->
        <v-container fluid class="header-spacing">
            <v-layout>
                <v-flex md2></v-flex>
                <v-flex md8 class="form-color bigger-font">
                    <h1 class="header-padding">User Settings</h1>
                    <br>
                    <p :class="[success ? 'show' : 'hidden']">Changes saved!</p>
                    <div>
                        <img width="400px" height="400px" v-bind:src="'https://gamechangerhackathonusers.s3-us-west-2.amazonaws.com/' + userPicture" /> 
                        
                    </div>
                    <br>
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
import Navbar from "./Navbar";
import {CurrentUsername} from "./Variables.js";
import S3 from 'aws-s3';
export default {
    computed: {
        s3Keys(){
            return this.$auth.user.s3_keys;
            },
            config(){
                return {
                    bucketName: 'vue-screencasts-uploads',
                    dirName: this.directory,
                    region: 'us-west-2',
                    accessKeyId: this.s3Keys.id,
                    secretAccessKey: this.s3Keys.secret,
                    s3Url: this.baseURL
                }
            },
            baseURL(){
                return 'https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com'
            },
            S3Client(){
                return new S3(this.config);
            },
            newFileName(){
                return Math.random().toString().slice(2)
            },
            url(){
                return `${this.baseURL}/${this.directory}/${this.newFileName}`;
            }
    },
    components: {
        Navbar
    },
    // This is for the user information. Data right now is hard coded.
    data: () => ({
        userSubmission:
        { 
            userName: 'GregoryBains',
            userPassword: '$stUf3eAmT',
            userEmail: 'gregorybains@example.com',
            userPicture: null,
        },
        changingNames: true,
        success: false,
        userPicture: "GregoryBains.jpeg"
    }),
    methods: {
        uploadFile(fieldName, files) {
        let file = files[0]

        this.isLoading = true
        this.S3Client
            .uploadFile(file, this.newFileName).finally(()=>{
                this.isLoading = false
                let fileExtension = file.type.split('/')[1]
                this.obj[this.fieldName] = `${this.url}.${fileExtension}`
            })
        },
        
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
            //this.CurrentUsername = this.userSubmission.userName;

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
    props: ['fieldName', 'obj', 'directory'],
    beforeCreate() {
        var AWS = require('aws-sdk');
        AWS.config.update({accessKeyId:'AKIATK7ZRBAF2PYBHD7L', secretAccessKey: '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', region: 'us-west-2', endpoint: 'http://dynamodb.us-west-2.amazonaws.com'});
        
        //How to tell which user has logged in? Right now, hard coded
        var params = {
                TableName: "user-info",
                Key: {
                    "email": "demingz1@example.com",
                },
            }

        var thisObject = this;
        var docClient = new AWS.DynamoDB.DocumentClient();
        var promise = docClient.get(params).promise();
        promise.then(function(data) 
        {
            if(data.Item != null)
            {
                thisObject.userSubmission.userName = data.Item.displayName;
                thisObject.userSubmission.userPassword = data.Item.password;
                thisObject.userSubmission.userEmail = data.Item.email;
                thisObject.userPicture = "1.jpg"
            }
            else
            {
                //thisObject.userSubmission.userName = "meowmeow"
                //thisObject.userSubmission.userPassword = "456456"
                //hisObject.userSubmission.userEmail = "meowmeow@example.com"

                thisObject.userSubmission.userName = "GregoryBains"
                thisObject.userSubmission.userPassword = "$stUf3eAmT"
                thisObject.userSubmission.userEmail = "gregorybains@example.com"
                //thisObject.userPicture = "2.jpg"
            }
           
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
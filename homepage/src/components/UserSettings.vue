<template>
<v-app class="grey lighten-4">
    <Navbar />
    <!-- Form page -->
    <v-container class="header-spacing">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card outlined class="pa-3 pl-6">
                    <v-card-title class="font-weight-bold headline">Settings</v-card-title>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Email</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="5">
                            <v-label color="#4DB848">{{ userSubmission.userEmail }}</v-label>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Password</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="5">
                            <!-- add input field for password here when implemented -->
                            <v-label color="#4DB848" type="password">{{hidePassword(userSubmission.userPassword)}}</v-label>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Username</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="5">
                            <v-text-field v-if="changingNames" v-model="userSubmission.userName" color="#4DB848" dense outlined :value="userSubmission.userEmail"></v-text-field>
                            <v-label v-else color="#4DB848">{{ userSubmission.userName }}</v-label>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Profile Bio</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="7">
                            <v-textarea v-if="changingNames" v-model="userSubmission.userBio" :rows="4" :row-height="32" color="#4DB848" dense outlined :value="userSubmission.userBio"></v-textarea>
                            <v-label v-else :rows="4" :row-height="32" color="#4DB848">{{ userSubmission.userBio }}</v-label>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">LinkedIn</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="7">
                            <v-text-field v-if="changingNames" v-model="userSubmission.linkedIn" autofocus color="#4DB848" dense outlined :value="userSubmission.linkedIn"></v-text-field>
                            <v-label v-else color="#4DB848">{{ userSubmission.linkedIn}}</v-label>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Github</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="7">
                            <v-text-field v-if="changingNames" v-model="userSubmission.github" color="#4DB848" dense outlined :value="userSubmission.github"></v-text-field>
                            <v-label v-else color="#4DB848">{{ userSubmission.github }}</v-label>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Twitter</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="7">
                            <v-text-field v-if="changingNames" v-model="userSubmission.twitter" autofocus color="#4DB848" dense outlined :value="userSubmission.twitter"></v-text-field>
                            <v-label v-else color="#4DB848">{{ userSubmission.twitter }}</v-label>
                        </v-col>
                    </v-row>
                    <v-card-actions v-if="changingNames"> 
                        <v-btn v-on:click="saveChanges()" @click="success = true" dark depressed large color="#4DB848" class="ma-2 body-1 font-weight-medium">
                            <v-icon left>far fa-save</v-icon>Save
                        </v-btn>
                        <v-snackbar top color="success" v-model="success" timeout="2000">
                            Changes saved!
                            <v-btn text @click="success = false">Close</v-btn>
                        </v-snackbar>
                        <v-btn @click="cancelChanges" dark outlined large color="#4DB848" class="ma-2 body-1 font-weight-medium">
                            <v-icon left color="#4DB848">fas fa-times</v-icon>Cancel 
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions v-else>
                        <v-btn v-on:click="updateInformation()" dark depressed large color="#4DB848" class="ma-2 body-1 font-weight-medium">
                            <v-icon left>far fa-edit</v-icon>Edit
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
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Auth } from "aws-amplify";

export default {
    components: {
        Navbar,
        Footer
    },
    // This is for the user information. Data right now is hard coded.
    data: () => ({
        userSubmission: {
            // userName: 'Sam',
            // userPassword: '********',
            // userEmail: 'testing@gmail.com',
            // userPicture: null,
            // userBio: 'Some random bio.',
            // linkedIn: 'https://www.linkedin.com/in/someexample/',
            // github: 'https://github.com/test_example',
            // facebook: 'link'
            userName: '',
            userPassword: '',
            userHiddenPassword: '',
            userEmail: '',
            userPicture: '',
            userBio: '',
            linkedIn: '',
            github: '', 
            twitter: ''
        },
        changingNames: false,
        success: false,
        userPicture: null,
    }),

    methods: {
        updateInformation() {
            this.changingNames = true;
            window.scrollTo(0,0)
        },

        cancelChanges() {
            this.changingNames = false;
            window.scrollTo(0,0);
        },

        saveChanges() {
            var AWS = require('aws-sdk');
            // Initialize the Amazon Cognito credentials provider
            AWS.config.region = 'us-west-2'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
            });
            var dynamodb = new AWS.DynamoDB.DocumentClient();

            var params = {
                TableName: "user-info",
                Key: {
                    email: this.userSubmission.userEmail
                },
                UpdateExpression: "SET displayName=:name, bio=:bio, socialMedia.Github=:github, socialMedia.Twitter=:twitter, socialMedia.LinkedIn=:linkedin",
                ExpressionAttributeValues: {
                    ":name": this.userSubmission.userName,
                    ":bio": this.userSubmission.userBio,
                    ":twitter": this.userSubmission.twitter,
                    ":github": this.userSubmission.github,
                    ":linkedin": this.userSubmission.linkedIn
                }
            }

            dynamodb.update(params).promise().then().catch(err => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('success')
                }
            })

            this.changingNames = false;
            window.scrollTo(0,0)
        },

        hidePassword(password) {
            return ('*'.repeat(password.length))
        }

    },
    async created() {
        //scroll to the top 
        window.scrollTo(0, 0)

        this.changingNames = false

        var AWS = require('aws-sdk');
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-west-2'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
        });

        var dynamodb = new AWS.DynamoDB.DocumentClient();

        var userEmail = await Auth.currentUserInfo().then(user => {
            return user.attributes
        })

        var user_params = {
          TableName: 'user-info',
          Key: {
            "email": userEmail.email
          }
        }
        
        dynamodb.get(user_params).promise().then(user => {
            this.userSubmission.userName = user.Item.displayName
            this.userSubmission.userBio = user.Item.bio
            this.userSubmission.userEmail = user.Item.email
            this.userSubmission.userPassword = user.Item.password
            this.userSubmission.github = user.Item.socialMedia.Github
            this.userSubmission.twitter = user.Item.socialMedia.Twitter
            this.userSubmission.linkedIn = user.Item.socialMedia.LinkedIn

        }).catch(err => {
            console.log(err)
        })
    },
}
</script>

<style scoped>
.gamechanger-green {
    color: #4DB848;
}

.header-spacing {
    margin-top: 5em;
}
</style>
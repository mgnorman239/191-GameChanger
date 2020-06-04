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
                            <v-card-text class="font-weight-medium">Display Name</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="5">
                            <v-text-field color="#4DB848" readonly dense outlined :prefix="userSubmission.userName"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Password</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="5">
                            <!-- <v-text-field v-if="changingNames" color="#4DB848" dense outlined :value="userSubmission.userPassword" :type="show1 ? 'text' : 'password'"></v-text-field>
                            <v-text-field v-else color="#4DB848" readonly dense outlined :prefix="userSubmission.userPassword" :type="show1 ? 'text' : 'password'"></v-text-field> -->
                            <v-text-field v-if="changingNames" color="#4DB848" dense outlined :value="userSubmission.userPassword"></v-text-field>
                            <v-text-field v-else color="#4DB848" readonly dense outlined :prefix="userSubmission.userPassword"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Email</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="5">
                            <v-text-field v-if="changingNames" color="#4DB848" dense outlined :value="userSubmission.userEmail"></v-text-field>
                            <v-text-field v-else color="#4DB848" readonly dense outlined :prefix="userSubmission.userEmail"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Profile Bio</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="7">
                            <v-textarea v-if="changingNames" :rows="4" :row-height="32" color="#4DB848" dense outlined :value="userSubmission.userBio"></v-textarea>
                            <v-textarea v-else :rows="4" :row-height="32" color="#4DB848" readonly dense outlined :prefix="userSubmission.userBio"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">linkedIn</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="7">
                            <v-text-field v-if="changingNames" autofocus color="#4DB848" dense outlined :value="userSubmission.linkedIn"></v-text-field>
                            <v-text-field v-else color="#4DB848" autofocus readonly dense outlined :value="userSubmission.linkedIn"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col class="pr-0" cols="12" md="3">
                            <v-card-text class="font-weight-medium">Github</v-card-text>
                        </v-col>
                        <v-col class="pl-0 ml-n6" cols="12" md="7">
                            <v-text-field v-if="changingNames" color="#4DB848" dense outlined :value="userSubmission.github"></v-text-field>
                            <v-text-field v-else color="#4DB848" readonly dense outlined :prefix="userSubmission.github"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions v-if="changingNames"> 
                        <v-btn @click="success = true" dark depressed large color="#4DB848" class="ma-2 body-1 font-weight-medium">
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
                        <v-btn @click="updateInformation" dark depressed large color="#4DB848" class="ma-2 body-1 font-weight-medium">
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
            userEmail: '',
            userPicture: '',
            userBio: '',
            linkedIn: '',
            github: '', 
            facebook: ''
        },
        changingNames: false,
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
        saveChanges(dynamodb) {
            var params = {
                TableName: "user-info",
                Item: {
                    "email": this.userSubmission.userEmail,
                    "password": this.userSubmission.userPassword,
                    "displayName": this.userSubmission.userName,
                }
            }

            dynamodb.put(params, function(err, data) {
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
    async created() {
        //scroll to the top 
        window.scrollTo(0, 0)

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
        
        //How to tell which user has logged in? Right now, hard coded
        var params = {
            TableName: "user-info",
            Key: {
                "email": userEmail,
            },
        }
            
        dynamodb.get(params).promise().then(function(data) 
        {
        //    this.userSubmission.userName = data.Item.displayName;
        //    this.userSubmission.userPassword = data.Item.password;
        //    this.userSubmission.userEmail = data.Item.email;
        console.log(data.Item)
        }).catch(function(err)
        {
            console.log(err);
        });
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
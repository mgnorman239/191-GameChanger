<template>
<nav>
    <v-app-bar v-if="loggedIn" flat app class="grey darken-4">
        <img :src="require('../assets/logo.png')" class="ml-9" height="100%" />
        <v-toolbar-title class="ml-12 white--text subtitle-1">
            <router-link to="/homepage"><span class="ml-1 mr-7 white--text">Home</span></router-link>
            <router-link to="/showcase"><span class="ml-7 mr-7 white--text">Showcase</span></router-link>
            <router-link to="/events"><span class="ml-7 mr-7 white--text">Events</span></router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/projectsubmissionpage">
            <v-btn outlined color="#F6F6F6" class="ma-2 mr-7 body-2 font-weight-medium">
                <v-icon x-small left>fas fa-upload</v-icon>Upload
            </v-btn>
        </router-link>
        <v-menu bottom offset-y left>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" class="mr-9">
                    <!-- <v-avatar color="indigo" size="40">
                        <span class="white--text headline">P</span>
                    </v-avatar> -->
                    <v-avatar size="40">
                        <img :src=loggedInUser.profilePicture>
                    </v-avatar>
                </v-btn>
            </template>
            <v-list>
                <!-- add @click="" to add a function for each button -->
                <v-list-item v-for="(item, index) in dropdown_items" :key="index">
                    <router-link :to="item.link" v-if="item.text==='Logout'" >
                        <v-list-item-title class="black--text" @click="logout">
                            <v-icon small left class="mr-4" >{{item.icon}}</v-icon>{{ item.text }}
                        </v-list-item-title>
                    </router-link>

                    <router-link :to="item.link" v-else>
                        <v-list-item-title class="black--text">
                            <v-icon small left class="mr-4">{{item.icon}}</v-icon>{{ item.text }}
                        </v-list-item-title>
                    </router-link>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    
    <v-app-bar v-else flat app class="grey darken-4">
        <img :src="require('../assets/logo.png')" height="100%" />
        <v-toolbar-title class="ml-12 white--text subtitle-1">
            <router-link to="/homepage"><span class="ml-1 mr-7 white--text">Home</span></router-link>
            <router-link to="/showcase"><span class="ml-7 mr-7 white--text">Showcase</span></router-link>
            <router-link to="/events"><span class="ml-7 mr-7 white--text">Events</span></router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/login">
            <v-btn outlined color="#F6F6F6" width="90" class="mr-7 body-2">Login</v-btn>
        </router-link>
        <router-link to="/signup">
            <v-btn color="#F6F6F6" width="90" class="mr-7 body-2">Sign Up</v-btn>
        </router-link>
    </v-app-bar>
</nav>
</template>

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
import { DynamoDB } from 'aws-sdk';

export default {
    data() {
        return {
            loggedInUser: '',
            loggedInUserEmail: '',
            loggedIn: false,
            dropdown_items: [{
                text: 'Profile',
                link: '/profile',
                icon: 'far fa-user'
            }, {
                text: 'Settings', 
                link: '/usersettings',
                icon: 'fas fa-cog'
            }, {
                text: 'Logout',
                link: '/login',
                icon: 'fas fa-sign-in-alt'
            }]
        }
    },
    async created() {
        //scroll to the top 
        window.scrollTo(0, 0)

        await this.isUserSignedIn();

        AmplifyEventBus.$on('authState', info =>{
            if(info === 'signedIn'){
                this.isUserSignedIn();
            } else {
                this.loggedIn = false;
            }
        })

        // if a user is logged in, get their user information from the user-info database
        if (this.loggedIn) {
            // get users email
            this.loggedInUserEmail = await Auth.currentUserInfo().then(user => {
                return user.attributes.email;
            })

            // get user Object
            this.loggedInUser = await this.getUserInfoFromDatabase(this.loggedInUserEmail);
            console.log(this.loggedInUser.profilePicture)
        }
        
    },

    methods: {
        async isUserSignedIn(){
            try{
                const userObj = await Auth.currentAuthenticatedUser();
                this.loggedIn = true;
                //console.log(userObj);
            }catch(err){
                this.loggedIn = false;
                console.log(err);
            }
        },

        logout(){
            alert('You have successfully signed out')
            Auth.signOut()
                .then(data => console.log(data))
                .catch(err => console.log(err));
        },

        async getUserInfoFromDatabase(userEmail) {
            // setting up AWS environment
            var AWS = require("aws-sdk");
            // Initialize the Amazon Cognito credentials provider
            AWS.config.region = 'us-west-2'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
            });

            var params = {
                TableName: 'user-info',
                Key: {
                    "email": userEmail
                }
            }

            var dynamodb = new AWS.DynamoDB.DocumentClient();
            return await dynamodb.get(params).promise().then(user => {
                return user.Item
            })


        
        },

    }

}
</script>

<style>
a {
    text-decoration: none;
}
</style>

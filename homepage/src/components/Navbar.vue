<template>
<div>
    <!-- Navigation drawer for collpased navbar -->
    <v-navigation-drawer floating app clipped right disable-resize-watcher dark v-model="sideNav">
        <v-list nav class="mx-2">
            <!-- Links to profile (with avatar and display name) -->
            <v-list-item class="px-2" to="/profile" v-if="loggedIn">

                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-title>Display Name</v-list-item-title>

            </v-list-item>

            <!-- Login and Signup buttons when NOT logged in -->
            <div v-if="!loggedIn">

                <v-list-item to="/login">
                    <v-btn block outlined color="#F6F6F6"> Login</v-btn>
                </v-list-item>

                <v-list-item to="/signup">
                    <v-btn block depressed dark color="#4DB848"> Sign up</v-btn>
                </v-list-item>

            </div>

            <v-divider class="my-3"></v-divider>

            <!-- Main navigation links -->
            <v-list-item class="my-2" v-for="item in main_nav" :key="item.index" :to="item.link">

                <v-list-item-icon>
                    <v-icon left dark dense> {{ item.icon }} </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- User settings for when user IS logged in -->
            <v-list-item class="my-2" to="usersettings" v-if="loggedIn">
                <v-list-item-icon>
                    <v-icon left dark dense>fas fa-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <!-- Logout button for when user IS logged in -->
        <template v-slot:append v-if="loggedIn">
            <div class="pa-2 mx-2">
                <v-btn block depressed large color="#4DB848" @click="logout()">
                    <v-icon left dark dense>fas fa-sign-in-alt</v-icon>Logout
                </v-btn>
            </div>
        </template>

    </v-navigation-drawer>

    <!-- Regular navbar when user is in md/lg screens -->
    <v-app-bar app dark>
        <img :src="require('../assets/logo.png')" class="mx-md-9 mx-0 pa-0" height="55px">
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn class="mx-2" text v-for="item in main_nav" :key="item.index" :to="item.link">
                <v-icon left dark> {{ item.icon }} </v-icon>
                {{ item.text }}
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <div v-if="!loggedIn" class="mr-9 hidden-sm-and-down">
            <v-btn outlined color="#F6F6F6" class="mx-3" to="/login"> Login</v-btn>
            <v-btn depressed dark color="#4DB848" class="ml-3" to="/signup"> Sign up</v-btn>
        </div>

        <v-btn v-if="loggedIn" to="/projectsubmissionpage" outlined color="#F6F6F6" class="ma-2 mr-3 mr-md-7 body-2 font-weight-medium hidden-xs-only">
            <v-icon x-small left>fas fa-upload</v-icon>Upload
        </v-btn>
        <v-btn icon v-if="loggedIn" to="/projectsubmissionpage" class="hidden-sm-and-up mr-3">
            <v-icon size="20">fas fa-upload</v-icon>
        </v-btn>

        <!-- Hamburger menu icon for collpased navbar -->
        <v-app-bar-nav-icon @click.stop="sideNav = !sideNav" class="hidden-md-and-up "></v-app-bar-nav-icon>

        <!-- Dropdown menu for md/lg screens -->
        <div v-if="loggedIn" class="hidden-sm-and-down">
            <v-menu bottom offset-y left>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" class="mr-9">
                        <v-avatar color="indigo" size="40">
                            <span class="white--text headline">P</span>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-list nav>
                    <!-- add @click="" to add a function for each button -->
                    <v-list-item v-for="(item, index) in dropdown_items" :key="index" :to="item.link">
                        <v-list-item-title class="black--text">
                            <v-icon small left class="mr-4">{{item.icon}}</v-icon>{{ item.text }}
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout()">
                        <v-list-item-title class="black--text">
                            <v-icon small left class="mr-4">fas fa-sign-in-alt</v-icon>Logout
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</div>
</template>

<script>
/* import {
    Auth
} from "aws-amplify";
import {
    AmplifyEventBus
} from "aws-amplify-vue"; */

export default {
    data() {
        return {
            loggedIn: true,
            sideNav: false,
            dropdown_items: [{
                text: 'Profile',
                link: '/profile',
                icon: 'far fa-user'
            }, {
                text: 'Settings',
                link: '/usersettings',
                icon: 'fas fa-cog'
            }],
            main_nav: [{
                text: 'Home',
                link: '/homepage',
                icon: 'fas fa-home'
            }, {
                text: 'Showcase',
                link: '/showcase',
                icon: 'fas fa-th-large'
            }, {
                text: 'Events',
                link: '/events',
                icon: 'far fa-calendar'
            }],
        }
    },
/*     created() {
        this.isUserSignedIn();
        AmplifyEventBus.$on('authState', info => {
            if (info === 'signedIn') {
                this.isUserSignedIn();
            } else {
                this.loggedIn = false;
            }
        })
    },
    methods: {
        async isUserSignedIn() {
            try {
                const userObj = await Auth.currentAuthenticatedUser();
                this.loggedIn = true;
                console.log(userObj);
            } catch (err) {
                this.loggedIn = false;
                console.log(err);
            }
        },
        logout() {
            alert('You have successfully signed out')
            Auth.signOut()
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
    } */

}
</script>

<style>
a {
    text-decoration: none;
}
</style>

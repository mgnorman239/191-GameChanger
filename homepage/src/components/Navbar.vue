<template>
<nav>
    <v-app-bar v-if="loggedIn" flat app class="grey darken-4">
        <img :src="require('../assets/logo.png')" class="ml-7" height="100%" />
        <v-toolbar-title class="ml-12 white--text subtitle-1">
            <router-link to="/homepage"><span class="ml-1 mr-7 white--text">Home</span></router-link>
            <router-link to="/showcase"><span class="ml-7 mr-7 white--text">Showcase</span></router-link>
            <router-link to="/events"><span class="ml-7 mr-7 white--text">Events</span></router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/projectsubmissionpage">
            <v-btn outlined color="#F6F6F6" class="ma-2 mr-7 body-2">
                <v-icon left>fas fa-upload</v-icon>Upload
            </v-btn>
        </router-link>
        <v-menu open-on-hover bottom offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" class="mr-7">
                    <v-avatar color="indigo" size="40">
                        <span class="white--text headline">PC</span>
                    </v-avatar>
                </v-btn>
            </template>

            <v-list>
                <!-- add @click="" to add a function for each button -->
                <v-list-item v-for="(item, index) in dropdown_items" :key="index">
                    <router-link :to="item.link">
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
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
export default {
    data() {
        return {
            loggedIn: true,
            dropdown_items: [{
                text: 'Profile',
                link: '/profile'
            }, {
                text: 'Logout',
                link: '/homepage'
            }]
        }
    }

}
</script>

<style>
a {
    text-decoration: none;
}
</style>

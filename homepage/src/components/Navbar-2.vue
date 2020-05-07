<template>
    <nav id="navbar">
        <v-app-bar flat app class="grey darken-4">
          <img :src="require('../assets/logo.png')" height="100%"/>
            <v-toolbar-title class="ml-12 white--text subtitle-1">
                <router-link to="/homepage"><span class="ml-1 mr-7 white--text">Home</span></router-link>
                <router-link to="/showcase"><span class="ml-7 mr-7 white--text">Showcase</span></router-link>
                <router-link to="/events"><span class="ml-7 mr-7 white--text">Events</span></router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/projectsubmissionpage"><v-btn outlined color="#F6F6F6" class="ma-2 mr-7 body-2"><v-icon left>fas fa-upload</v-icon>Upload</v-btn></router-link>
            <router-link to="/profile">
                <v-menu open-on-hover top offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                        color="#F6F6F6"
                        v-on="on"
                        >
                        <v-icon>fas fa-user</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <!-- add @click="" to add a function for each button -->
                        <v-list-item
                        v-for="(item, index) in dropdown_items"
                        :key="index"
                        >
                        <router-link :to="item.route"><v-list-item-title class="text-color">{{ item.title }}</v-list-item-title></router-link>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </router-link>
        </v-app-bar>
    </nav>  
</template>

<script>
export default {
    data: () => ({
        dropdown_items: [
            { title: 'Profile', route: '/profile'},
            { title: 'Setting', route: '/usersettings'},
            { title: 'Logout', route: '/#'}
            ]
    })
}
</script>

<style>
a {  
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.text-color {
    color: black;
}
</style>
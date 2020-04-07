<template>
    <nav>
        <v-app-bar flat app class="grey darken-4">
            <v-toolbar-title class="ml-12 mr-12 white--text subtitle-1">
                Logo
            </v-toolbar-title>
            <v-toolbar-title class="ml-12 white--text subtitle-1">
                <router-link to="/homepage"><span class="ml-12 mr-7 white--text">Home</span></router-link>
                <router-link to="/showcase"><span class="ml-7 mr-7 white--text">Showcase</span></router-link>
                <router-link to="/events"><span class="ml-7 mr-7 white--text">Events</span></router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/login"><v-btn small rounded outlined color="#F6F6F6" width="90" class="mr-7">Login</v-btn></router-link>
            <router-link to="/signup"><v-btn small rounded color="#F6F6F6" width="90" class="mr-7">Sign Up</v-btn></router-link>
        </v-app-bar>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style>
a {  
    text-decoration: none;
}

</style>
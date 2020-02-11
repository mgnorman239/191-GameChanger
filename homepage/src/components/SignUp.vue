<template>
    <v-app class="grey lighten-4">
        <Navbar />
        <v-layout row>
                <v-flex md6>
                    <v-img height="vh" src="../assets/keyboard.png" alt="Picture of hand typing on keyboard">
                        <h1 class="tagline">Share the story of<br> your creation</h1>
                    </v-img>
                </v-flex>
            <v-layout column md7 text-center>
                <v-flex xs2></v-flex>
                <v-flex xs1 class="mb-10">
                    <h1>Create an Account</h1>
                </v-flex>
                <!--This is the input box for the user email-->
                <v-flex xs1>
                    <v-text-field text-center class="center-block input-width"
                        prepend-inner-icon="far fa-envelope fa-xs"
                        label="email"
                        placeholder="E-mail"
                        solo
                    ></v-text-field>
                </v-flex>
                <!--This is the input box for the user password-->
                <v-flex xs1>
                    <v-text-field 
                        :type="'password'"
                        prepend-inner-icon="fas fa-lock"
                        class="center-block input-width"
                        label="password"
                        placeholder="Password"
                        solo
                    ></v-text-field>
                </v-flex>
                <!--This is the input box for the display name-->
                <v-flex xs1>
                    <v-text-field 
                        prepend-inner-icon="far fa-user"
                        class="center-block input-width"
                        label="password"
                        placeholder="Display Name"
                        solo
                    ></v-text-field>
                </v-flex>
                <v-flex xs1></v-flex>
                <v-flex xs2>
                    <!--This is the submit button that you have to bind an on-click event for-->
                    <v-btn height="4em" width="13em" color="#4DB848" class="white--text body-1">Sign Up</v-btn>
                    <!--Eventually, add a link to take the user to the login page when they click the span-->
                    <p class="mt-6">Already have an account? <router-link to="/login"><span class="underlined">Log In!</span></router-link></p>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-app>
</template>

<script>
import Navbar from "./Navbar";

export default {
    components: {
        Navbar
    },
    data () {
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Text+Me+One&display=swap');

.underlined {
    text-decoration: underline;
}
.input-width{
    width: 50%;
}
.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

.tagline {
    font-family: 'Text Me One', sans-serif;
    text-transform: uppercase;
    color:white;
    font-weight: normal;
    margin: 2em;
    font-size:2.5em;
}

</style>
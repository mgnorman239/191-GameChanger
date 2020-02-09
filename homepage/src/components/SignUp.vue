<template>
    <v-app class="grey lighten-4">
        <Navbar/>
        <v-layout row>
            <v-flex md5>
                <v-img height="95vh" src="../assets/keyboard.png" alt="Picture of hand typing on keyboard"></v-img>
            </v-flex>
            <v-layout column md7 text-center>
                <v-flex xs3></v-flex>
                <v-flex xs1 class="mb-10">
                    <h1>Create an Account</h1>
                </v-flex>
                <!--This is the input box for the user email-->
                <v-flex xs1>
                    <v-text-field text-center class="center-block input-width"
                        label="email"
                        placeholder="E-mail"
                        solo
                    ></v-text-field>
                </v-flex>
                <!--This is the input box for the user password-->
                <v-flex xs1>
                    <v-text-field class="center-block input-width"
                        label="password"
                        placeholder="Password"
                        solo
                    ></v-text-field>
                </v-flex>
                <v-flex xs1>
                </v-flex>
                <v-flex xs2>
                    <!--This is the submit button that you have to bind an on-click event for-->
                    <v-btn height="4em" width="15em" color="#4DB848" class="white--text body-1">Sign Up</v-btn>
                    <!--Eventually, add a link to take the user to the login page when they click the span-->
                    <p class="mt-10">Already have an account? <span class="underlined">Log In!</span></p>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-app>
</template>

<script>
import Navbar from './Navbar';

export default {
    components: {
        Navbar
    }
}
</script>

<style scoped>
.underlined {
    text-decoration: underline;
}
.input-width{
    width: 40%;
}
.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

</style>
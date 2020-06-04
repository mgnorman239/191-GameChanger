<template>
    <v-app class="grey lighten-4">
        <Navbar />
        <v-layout row>
            <v-flex md6 sm12>
                <!--100% picture are larger screen size-->
                <v-container d-none d-md-block>
                    <v-img class="no-margin" height="100vh" src="../assets/keyboard.png" alt="Picture of hand typing on keyboard">
                        <h1 class="tagline">Share the story of<br> your creation</h1>
                    </v-img>
                </v-container>
                <!--40% picture are larger screen size-->
                <v-container d-flex d-md-none>
                    <v-img height="40vh" src="../assets/keyboard.png" alt="Picture of hand typing on keyboard">
                        <h1 class="tagline">Share the story of<br> your creation</h1>
                    </v-img>
                </v-container>
            </v-flex>
            <v-layout column md7 text-center>
                <v-flex xs2 d-none d-md-block></v-flex>
                <v-flex xs1 class="mb-10">
                    <h1>Confirm Signing Up</h1>
                </v-flex>
                <!--This is the user's email after initially signing up-->
                <v-flex xs1>
                    <v-text-field 
                        :type="'confirmation'"
                        prepend-inner-icon="far fa-envelope"
                        class="center-block input-width"
                        :label="email"
                        placeholder=""
                        solo
                        disabled
                    ></v-text-field>
                </v-flex>
                 <!--Add spacing when small-->
                <v-container d-md-none>
                    <v-spacer></v-spacer>
                </v-container>
                <!--This is the input box for the user's confirmation code-->
                <v-flex xs1>
                    <v-text-field 
                        :type="'confirmation'"
                        v-model="confirmationCode"
                        prepend-inner-icon="fas fa-lock"
                        class="center-block input-width"
                        label="confirmation"
                        placeholder="Confirmation code"
                        solo
                    ></v-text-field>
                </v-flex>
                 <!--Add spacing when small-->
                <v-container d-md-none>
                    <v-spacer></v-spacer>
                </v-container>
                <p><span class="underlined"><a href="#">Resend code</a></span></p>
                <v-flex xs1></v-flex>
                <v-flex xs2>
                    <!--This is the submit button that you have to bind an on-click event for-->
                    <v-flex  d-none d-md-block>
                        <v-btn height="4em" width="13em" color="#4DB848" class="white--text body-1" @click="confirmSignUp">Confirm</v-btn>
                    </v-flex>
                     <v-container d-flex d-md-none>
                        <v-btn height="3em" width="9em" color="#4DB848" class="center-block white--text body-1" @click='confirmSignUp'>Confirm</v-btn>
                    </v-container>
                    <!--Eventually, add a link to take the user to the login page when they click the span-->
                    <p class="mt-6">Already have an account? <router-link to="/login"><span class="underlined">Log In!</span></router-link></p>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-app>
</template>

<script>
import Navbar from "./Navbar";
import { Auth } from "aws-amplify";

export default {
    data(){
        return {
            email: this.$route.query.email,
            confirmationCode:''
        };
    },
    components: {
        Navbar
    },
    methods: {
        async confirmSignUp(){
            Auth.confirmSignUp(this.email, this.confirmationCode, {
                forceAliasCreation: true
            }).then(data => {
                console.log(data)
                this.$router.push({ path: '/login', query: { email: this.email } })
                })
            .catch(err => console.log(err));
        }
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

.no-margin {
    margin-bottom: -2em;
}


</style>
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
                <p><span class="underlined"><a href="#">Resend code</a></span></p>
                <v-flex xs1></v-flex>
                <v-flex xs2>
                    <!--This is the submit button that you have to bind an on-click event for-->
                    <v-btn height="4em" width="13em" color="#4DB848" class="white--text body-1" @click="confirmSignUp">Confirm</v-btn>
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

</style>
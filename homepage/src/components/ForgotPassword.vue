<template>
<v-app class="grey lighten-4">
    <Navbar />
    <v-layout row class="top-spacer">
        <v-flex md6 sm12>
            <!--100% picture are larger screen size-->
            <v-container d-none d-md-block>
                <v-img class="no-margin" height="auto" src="../assets/keyboard.png" alt="Picture of hand typing on keyboard">
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
                <h1>Forgot Your Password?</h1>
                <br>
                <p>Type in your email, and we'll send you a code<br>to reset your password with.</p>
            </v-flex>
            
            <!--This is the input box for the user email-->
            <v-flex xs1>
                <v-text-field 
                    prepend-inner-icon="far fa-envelope"
                    text-center class="center-block input-width" 
                    label="email"
                    v-model="email" 
                    placeholder="E-mail" 
                    solo>
                </v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs2>
                <v-flex  d-none d-md-block>
                    <!--This is the send code button-->
                    <v-btn height="3.5em" width="10em" color="#4DB848" class="white--text body-1" @click="sendCode">Send</v-btn>
                </v-flex>
                <!--Center Button for smaller screens-->
                <v-container d-flex d-md-none>
                    <br>
                    <v-btn height="3em" width="7em" color="#4DB848" class="center-block white--text body-1" @click="sendCode">Send</v-btn>
                </v-container>
                <!--Eventually, add a link to take the user to the login page when they click the span-->
                <p class="mt-6">Don't have an account yet? <router-link to="/signup"><span class="underlined">Sign up!</span></router-link></p>
            </v-flex>
        </v-layout>
    </v-layout>
    <Footer class="mt-8 mt-sm-0"/>
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
    data() {
        return {
            email: ''
        };
    },
    methods: {
        async sendCode() {
            Auth.forgotPassword(this.email)
            .then(user => {
                this.$router.push({ path: '/forgotpasswordsubmission', query: { email: this.email } })
            })
            .catch(err => {
                console.log(err)
            });
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
    margin: 8vh;
    font-size:2.5em;
}

.no-margin {
    margin-bottom: -2em;
}

.top-spacer {
    margin-top: 2.5em;
}

</style>
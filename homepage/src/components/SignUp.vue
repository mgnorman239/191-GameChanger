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
            <v-layout column md7 xs12 text-center>
                <v-flex xs2 d-none d-md-block></v-flex>
                <v-flex xs1 class="mb-10 mt-6 mt-sm-0">
                    <h1>Create an Account</h1>
                    <!-- Potential Error Message -->
                    <div id="error_message" hidden>
                        <br>
                        <p>{{message}}</p>
                        <p :hidden='display_name_error_hidden'>Display name cannot be blank</p>
                    </div>
                </v-flex>

                <!--This is the input box for the user email-->
                <v-flex xs1>
                    <v-text-field text-center class="center-block input-width"
                        prepend-inner-icon="far fa-envelope fa-xs"
                        v-model="email"
                        id="email"
                        name="email"
                        label="email"
                        placeholder="E-mail"
                        solo
                    ></v-text-field>
                </v-flex>
                 <!--Add spacing when small-->
                <v-container d-md-none>
                    <v-spacer></v-spacer>
                </v-container>
                <!--This is the input box for the user password-->
                <v-flex xs1>
                    <v-text-field 
                        :type="'password'"
                        prepend-inner-icon="fas fa-lock"
                        v-model="password"
                        id="password"
                        name="password"
                        class="center-block input-width"
                        label="password"
                        placeholder="Password"
                        solo
                    ></v-text-field>
                </v-flex>
                 <!--Add spacing when small-->
                <v-container d-md-none>
                    <v-spacer></v-spacer>
                </v-container>
                <!--This is the input box for the display name-->
                <v-flex xs1>
                    <v-text-field 
                        prepend-inner-icon="far fa-user"
                        v-model="username"
                        id="username"
                        name="username"
                        class="center-block input-width"
                        label="password"
                        placeholder="Display Name"
                        solo
                    ></v-text-field>
                </v-flex>
                <v-flex xs2 class="mt-10">
                    <!--This is the submit button that you have to bind an on-click event for-->
                    <v-flex  d-none d-md-block>
                        <v-btn height="3.5em" width="10em" color="#4DB848" class="white--text body-1" @click='createAccount'>Sign Up</v-btn>
                    </v-flex>
                    <v-container d-flex d-md-none>
                        <br>
                        <v-btn height="3em" width="7em" color="#4DB848" class="center-block white--text body-1" @click='createAccount'>Sign Up</v-btn>
                    </v-container>
                    <!--Eventually, add a link to take the user to the login page when they click the span-->
                    <p class="mt-6">Already have an account? <router-link to="/login"><span class="underlined">Log In!</span></router-link></p>
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
    data(){
        return {
            email: '',
            password: '',
            username: '',
            message: '',
            display_name_error_hidden: true
        };
    },
    components: {
        Navbar,
        Footer
    },

    created() {
        //scroll to the top 
        window.scrollTo(0, 0)
    },
    
    methods: {
        async createAccount() {
            // check if display name is blank
            if ((this.username).trim().length == 0) {
                this.display_name_error_hidden = false;
            }
            else {
                this.display_name_error_hidden = true;
            }

            // error message element id
            var err_message = document.getElementById('error_message')

            // reset error message before starting
            this.message = '';
            err_message.style.display = 'none'

            Auth.signUp({
                username: this.email,
                password: this.password,
                attributes: {
                    email: this.email,
                    name: this.username
                },
                validationData: [],
                })
                .then(data => {
                    //console.log(data)
                    this.$router.push({ path: '/confirmsignup', query: { email: this.email } })
                    })
                .catch(err => {
                    console.log(err)
                    err_message.style.display = 'block';
                    if ((err.message).includes("validation error detected: Value at 'password'")) {
                        // shorten error message
                        this.message = 'Password must be at least 6 characters.'
                    }
                    else {
                        this.message = err.message;
                    }
                    
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

.hidden {
  display:none;
}

#error_message {
    color: red;
}

.no-margin {
    margin-bottom: -2em;
}

.top-spacer {
    margin-top: 2.5em;
}

</style>
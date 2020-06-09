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
                <p>Enter in the code and your new password to reset.</p>
            </v-flex>
            
            <!--This is the box for displaying the user's email-->
            <v-flex xs1>
                <v-text-field 
                    prepend-inner-icon="far fa-envelope"
                    text-center class="center-block input-width" 
                    :label="email" 
                    placeholder="" 
                    solo
                    disabled>
                </v-text-field>
            </v-flex>
            <!--This is the input box for the forgot password verification code-->
            <v-flex xs1>
                <v-text-field text-center class="center-block input-width"
                    prepend-inner-icon="far fa-envelope fa-xs"
                    v-model="code"
                    id="code"
                    name="code"
                    label="Code"
                    solo
                ></v-text-field>
            </v-flex>
            <!--This is the input box for the new requested password-->
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
            <v-flex xs1></v-flex>
            <v-flex xs2>
                <v-flex  d-none d-md-block>
                    <!--This is the reset password button-->
                    <v-btn height="3.5em" width="10em" color="#4DB848" class="white--text body-1" @click="submitNewPassword">Reset</v-btn>
                </v-flex>
                <!--Center Button for smaller screens-->
                <v-container d-flex d-md-none>
                    <br>
                    <v-btn height="3em" width="7em" color="#4DB848" class="center-block white--text body-1" @click="submitNewPassword">Reset</v-btn>
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
    data(){
        return {
            email: this.$route.query.email,
            code: '',
            password: ''
        };
    },
    methods: {
        async submitNewPassword() {
            Auth.forgotPasswordSubmit(this.email, this.code, this.password)
            .then(user => {
                alert("Your password has been reset.")
                this.$router.push({ path: '/login', query: { email: this.email } })
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
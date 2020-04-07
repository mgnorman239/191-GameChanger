<template>
    <v-app>
        <v-img class="background" src="../assets/landing.png" alt="Picture of a crowd, Photo by Nicholas Green on Unsplash">
            <v-container-fluid>
                <v-row>
                    <v-flex md2></v-flex>
                    <v-flex md8>
                        <h1 class="text-overlay text-md-left">DreamHack <br> {{location}}</h1>
                    </v-flex>
                    <v-flex md2></v-flex>
                </v-row>
                <v-row>
                    <v-flex md4></v-flex>
                    <v-flex md4 text-center class="center-me">
                        <div>
                            <Countdown :deadline="date"></Countdown>
                            <div>
                                <router-link to="/homepage"><v-btn large rounded outlined color="black">View More</v-btn></router-link>
                            </div>
                        </div>
                    </v-flex>
                    <v-flex md4></v-flex>
                </v-row>
            </v-container-fluid>
        </v-img>
    </v-app>
</template>

<script>
import Countdown from 'vuejs-countdown';

export default {
    components: {
        Countdown
    },
    data() {
        return {
            //This will change based on the location of the upcoming DreamHack
            location: 'Anaheim',
            //This will change based on the data for the events
            date: 'February 21, 2020'
        }
    }
    
}
</script>
    
<style scoped>
    .background {
        height:100vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        /* opacity: 0.55; */
    }
 
    .text-overlay {
        margin-top: 1.5em;
        font-size: 4em;
    }
    
    .center-me {
        margin-top: 9em;
        margin-left: auto;
        margin-right: auto;
        width: 40%;
    }


/*
    .timer-overlay {
        position: absolute;
        margin-left: 40%;
        margin-top: 50%;
        width: 50%;
    }

    .button-overlay {
        position: absolute;
        margin-top: 60%;
        margin-left: 45%;
    } */

</style>
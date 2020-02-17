<template>
    <v-app>
        <v-img class="background" src="../assets/landing.jpg" alt="Picture of a crowd, Photo by Nicholas Green on Unsplash">
            <h1 class="text-overlay">DreamHack <br> {{location}}</h1>
            <Countdown class="timer-overlay" :deadline="date"></Countdown>
            <router-link to="/homepage"><v-btn large rounded class="button-overlay" outlined color="black">View More</v-btn></router-link>
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
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        //opacity: 0.55;
        filter: grayscale(100%);
    }

    .text-overlay {
        position: absolute;
        margin-left: 12%;
        margin-top: 10%;
        font-size: 4em;
    }

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
    }

</style>
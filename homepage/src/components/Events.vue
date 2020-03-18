<template>
<v-app class="grey lighten-4">
    <Navbar />
        <!-- Main image for Events -->
        <v-img class="background" src="../assets/events.png" alt="Concert with lights">
            <v-container fill-height align="center">
                <v-col>
                    <v-row justify="center">
                        <h1 class="white--text">DreamHack Anaheim</h1>
                    </v-row>
                    <v-row justify="center">
                        <h3 class="white--text">Anaheim Convention Center, CA</h3>
                    </v-row>
                    <v-row justify="center">
                        <h3 class="white--text">February 21 - 23</h3>
                    </v-row>
                </v-col>
            </v-container>
        </v-img>
    <!-- Display event cards -->
    <v-container>
        <v-row>
            <h1 class="pa-3 pt-0">Events</h1>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" justify="center" v-for="i in 4" :key="i.index">
                <v-card raised>
                    <v-img src="../assets/event-card2.png" alt="Guy wearing headphones in front of a computer.">
                        <v-container fill-height align="center">
                            <v-row>
                                <v-col justify="center">
                                    <h2 class="text-center white--text">DreamHack {{location}}</h2>
                                    <p class="text-center white--text">{{place}}</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script>
import Navbar from "./Navbar";

export default {
    components: {
        Navbar
    },
    data() {
        return {
            location: 'Dallas',
            place: 'Kay Bailey Hutchinson Convention Center'
        }
    }

}
</script>

<style scoped>

    .background {
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        
    }
    
</style>>

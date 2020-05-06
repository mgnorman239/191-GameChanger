<template>
<v-app class="grey lighten-4">
    <Navbar />
        <!-- Main image for Events -->
        <v-img class="background" src="../assets/events.png" alt="Concert with lights">
            <v-container fill-height align="center">
                <v-col>
                    <v-row justify="center">
                        <h1 class="white--text event-title">DreamHack Anaheim</h1>
                    </v-row>
                    <v-row justify="center">
                        <h3 class="white--text event-subtitles">Anaheim Convention Center, CA</h3>
                    </v-row>
                    <v-row justify="center">
                        <h3 class="white--text event-subtitles">February 21 - 23</h3>
                    </v-row>
                </v-col>
            </v-container>
        </v-img>
    <!-- Display event cards -->
    <v-container class="px-12">
        <v-row>
            <h1 class="pa-3 pt-0">Events</h1>
        </v-row>
        <v-row>
            <v-col class="pa-5" cols="12" sm="6" justify="center" v-for="i in 4" :key="i.index">
                <v-card outlined>
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
    <Footer />
</v-app>
</template>

<script>
import Navbar from "./Navbar";
import Footer from "./Footer";

export default {
    components: {
        Navbar,
        Footer
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

    .event-title {
        font-size: 3em;
    }

    .event-subtitles {
        font-size: 1.5em;
        font-weight: 400;
    }

    .background {
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        
    }
    
</style>>

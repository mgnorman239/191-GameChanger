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
            <h1 class="mx-3 mx-sm-12">Events</h1>
        </v-row>
        <v-col>
            <v-row justify="center">
                <v-card raised hover class="ma-5">
                    <v-img src="../assets/event-card2.png" alt="Guy wearing headphones in front of a computer.">
                        <v-container fill-height align="center">
                            <v-col>
                                <v-row justify="center">
                                    <h2 class="text-center white--text">DreamHack {{location}}</h2>
                                    <p class="text-center white--text">{{place}}</p>
                                </v-row>
                            </v-col>
                        </v-container>
                    </v-img>
                </v-card>
                <v-card raised hover class="ma-5">
                    <v-img src="../assets/event-card2.png" alt="Guy wearing headphones in front of a computer.">
                        <v-container fill-height align="center">
                            <v-col>
                                <v-row justify="center">
                                    <h2 class="text-center white--text">DreamHack {{location}}</h2>
                                    <p class="text-center white--text">{{place}}</p>
                                </v-row>
                            </v-col>
                        </v-container>
                    </v-img>
                </v-card>
            </v-row>
        </v-col>
        <v-col>
            <v-row justify="center">
                <v-card raised hover class="ma-5">
                    <v-img src="../assets/event-card2.png" alt="Guy wearing headphones in front of a computer.">
                        <v-container fill-height align="center">
                            <v-col>
                                <v-row justify="center">
                                    <h2 class="text-center white--text">DreamHack {{location}}</h2>
                                    <p class="text-center white--text">{{place}}</p>
                                </v-row>
                            </v-col>
                        </v-container>
                    </v-img>
                </v-card>
                <v-card raised hover class="ma-5">
                    <v-img src="../assets/event-card2.png" alt="Guy wearing headphones in front of a computer.">
                        <v-container fill-height align="center">
                            <v-col>
                                <v-row justify="center">
                                    <h2 class="text-center white--text">DreamHack {{location}}</h2>
                                    <p class="text-center white--text">{{place}}</p>
                                </v-row>
                            </v-col>
                        </v-container>
                    </v-img>
                </v-card>
            </v-row>
        </v-col>
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

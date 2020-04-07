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
                                    <h2 class="text-center white--text">DreamHack {{location1}}</h2>
                                    <p class="text-center white--text">{{place1}}</p>
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
                                    <h2 class="text-center white--text">DreamHack {{location2}}</h2>
                                    <p class="text-center white--text">{{place2}}</p>
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
                                    <h2 class="text-center white--text">DreamHack {{location3}}</h2>
                                    <p class="text-center white--text">{{place3}}</p>
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
                                    <h2 class="text-center white--text">DreamHack {{location4}}</h2>
                                    <p class="text-center white--text">{{place4}}</p>
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
import EventService from '@/services/EventService.js';

export default {
    components: {
        Navbar
    },
    data() { 
        var events = this.getEventData();
        // eslint-disable-next-line no-console
        console.log(events);
        return {
            events: events,
            location1: "l1",
            place1: events.place1,
            location2: events.location2,
            place2: events.place2,
            location3: events.location3,
            place3: events.place3,
            location4: events.location4,
            place4: events.place4
        }
    },
    created() {
        this.getEventData(); // NEW - call getEventData() when the instance is created
    },
    methods: {
        async getEventData() {
        // Use the eventService to call the getEvents() method
        EventService.getEvents() //this.$route.params.id
        .then(
            (events => {
            this.$set(this, "events", events);
            }).bind(this)
        );}
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

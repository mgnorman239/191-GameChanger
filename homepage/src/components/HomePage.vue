<template>
    <v-app>
        <Navbar />
        <v-img class="background" src="../assets/Rectangle81.png" alt="Backview of man play games">
            <v-flex>
                <v-row 
                :align="alignment-center"
                :justify="justify-center"
                class="white--text">
                    <h1>DreamHack Anaheim</h1>
                </v-row>
                <v-row 
                :align="alignment-center"
                :justify="justify-center"
                class="white--text">
                    <h1>Anaheim Convention Center</h1>
                </v-row>
                <v-row
                :align="alignment-center"
                :justify="justify-center"
                class="white--text ">>
                    <h1>February 21-23</h1>
                </v-row> 
            </v-flex>
        </v-img>
    </v-app>
</template>

<script>
import Navbar from "./Navbar";

export default {
    components: {
        Navbar
    }
}
</script>

<style scoped>
    .background {
        background-position: center;
        background-repeat: no-repeat;
        background-size: 50% auto;
    }
</style>
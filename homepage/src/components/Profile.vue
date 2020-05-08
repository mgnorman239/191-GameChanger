<template>
<v-app class="grey lighten-4">
    <Navbar />
    <v-container class="mt-12">
        <v-row class="mt-8">
            <v-col class="px-5" cols="4">
                <v-card outlined>
                    <v-container>
                        <v-row>
                            <v-col align="center">
                                <v-avatar size="130">
                                    <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                                </v-avatar>
                            </v-col>
                        </v-row>
                        <v-card-title class="justify-center">Name</v-card-title>
                        <v-card-text class="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus enim id ut consectetur malesuada.</v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn icon class="ma-4">
                                <i class="fab fa-linkedin-in fa-2x"></i>
                            </v-btn>
                            <v-btn icon class="ma-4">
                                <i class="fab fa-github fa-2x"></i>
                            </v-btn>
                            <v-btn icon class="ma-4">
                                <i class="fab fa-twitter fa-2x"></i>
                            </v-btn>
                        </v-card-actions>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="8" class="px-5">
                <h1>Name's Projects</h1>
                <v-container fluid>
                    <v-row>
                        <v-col cols="6" v-for="i in 6" :key="i.index">
                            <v-card outlined>
                                <v-img src="../assets/placeholder3.png"></v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
    <Footer />
</v-app>
</template>

<script>
import Navbar from './Navbar';
import Footer from './Footer';

export default {
    components: {
        Navbar,
        Footer
    }
}
</script>

<style>

</style>

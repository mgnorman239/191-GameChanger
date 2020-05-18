<template>
<<<<<<< Updated upstream
    <v-app class="background-color">
        <Navbar2 />
        <!-- Form page -->
        <v-container fluid class="header-spacing">
            <v-layout>
                <v-flex md2></v-flex>
                <v-flex md8 class="form-color bigger-font">
                    <h1 class="header-padding">User Settings</h1>
                    <br>
                    <p class="left-tab"> <i class="fas fa-edit right-tab gamechanger-green"></i><b class="right-tab">Display name:</b> {{ userSubmission.userName }} </p>
                    <br>
                    <p class="left-tab"> <i class="fas fa-edit right-tab gamechanger-green"></i><b class="right-tab">Password:</b> {{ userSubmission.userPassword }} </p>
                    <br>
                    <p class="left-tab"> <i class="fas fa-edit right-tab gamechanger-green"></i> <b class="right-tab">Email:</b> {{ userSubmission.userEmail }} </p>
                    <br>
                    <v-file-input class="left-tab" accept="image/*" label="User Picture" v-model="userSubmission.userPicture"></v-file-input>
                </v-flex>
                <v-flex md2></v-flex>
            </v-layout>
=======
    <v-app class="grey lighten-4">
        <Navbar />
        <!-- Form page -->
        <v-container class="header-spacing">
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-card outlined class="pa-3">
                        <v-card-title class="font-weight-bold headline">Settings</v-card-title>
                            <v-row align="center">
                                <v-col class="pr-0" cols="12" md="3">
                                    <v-card-text class="font-weight-medium">Display Name</v-card-text>
                                </v-col>
                                <v-col class="pl-0 ml-n6" cols="12" md="5">
                                    <v-text-field dense outlined :value="userSubmission.userName"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row align="center">
                                <v-col class="pr-0" cols="12" md="3">
                                    <v-card-text class="font-weight-medium">Password</v-card-text>
                                </v-col>
                                <v-col class="pl-0 ml-n6" cols="12" md="5">
                                    <v-text-field dense outlined :value="userSubmission.userPassword"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="pr-0" cols="12" md="3">
                                    <v-card-text class="font-weight-medium">Email</v-card-text>
                                </v-col>
                                <v-col class="pl-0 ml-n6" cols="12" md="5">
                                    <v-text-field dense outlined :value="userSubmission.userEmail"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-btn dark depressed large color="#4DB848" class="body-1 font-weight-medium">Save</v-btn>
                            </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
>>>>>>> Stashed changes
        </v-container>
        <Footer />
    </v-app>
</template>

<script>
<<<<<<< Updated upstream
import Navbar2 from "./Navbar-2";

export default {
    components: {
        Navbar2
=======
import Navbar from "./Navbar";
import Footer from "./Footer";

export default {
    components: {
        Navbar,
        Footer
>>>>>>> Stashed changes
    },
    // This is for the user information. Data right now is hard coded.
    data: () => ({
        userSubmission: 
        { 
            userName: 'Sam',
            userPassword: '********',
            userEmail: 'testing@gmail.com',
            userPicture: null,
        }
    }),
}
</script>

<style scoped>
  .gamechanger-green {
      color: #4DB848;
  }

  .header-spacing {
    margin-top: 5em;
  }
</style>
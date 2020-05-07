<template>
    <v-app class="background-color">
        <Navbar />
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
                    <!--<v-file-input class="left-tab" accept="image/*" label="User Picture" v-model="userSubmission.userPicture"></v-file-input>-->
                </v-flex>
                <v-flex md2></v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import Navbar from "./Navbar";

export default {
    components: {
        Navbar
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
  .background-color {
    background: #E5E5E5;
    padding-bottom: 4em;
  }

  .form-color {
    background: #FFFFFF;
    padding-top: 2em;
    padding-bottom: 6em;
    padding-left: 6em;
    padding-right: 6em;
  }

  .left-tab {
      padding-left: 3em;
  }

  .right-tab {
      padding-right: 1em;
  }

  .gamechanger-green {
      color: #4DB848;
  }

  .header-spacing {
    margin-top: 9em;
  }

  .header-padding {
      margin-bottom: 1.5em;
  }

  .bigger-font {
      font-size: 18px;
  }
</style>
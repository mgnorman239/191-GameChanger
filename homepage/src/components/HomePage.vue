<template>
    <v-app class="grey lighten-4">
        <Navbar />
        <v-img class="background" src="../assets/Rectangle81.png" alt="Backview of man play games">
            <v-container fluid text-center class="white--text center-in-image">
                <h1 class="event-title">Pause For a Cause Hackathon</h1>
                <h1 class="event-subtitles">Anaheim Convention Center</h1>
                <h1 class="event-subtitles">February 21-23</h1>
            </v-container>
        </v-img>
        <v-container fluid>
            <!--About area-->
            <v-layout class="padding-between-text">
                <v-flex md1></v-flex>
                <v-flex md4 xs12>
                    <h1>ABOUT</h1>
                    <br>
                    <p class="paragraph-font">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie facilisis sapien, ac lacinia nunc rhoncus et. Mauris vehicula vehicula lacus id ultricies. Nulla eu ligula dapibus, laoreet quam luctus, pharetra ligula. Nunc et ornare diam. Ut ut urna et dui varius gravida venenatis eget lacus. 
                    </p>
                </v-flex>
                <v-flex md1></v-flex>
                <v-flex md5>
                    <v-img justify-center align-center src="../assets/about-image.svg" alt="Image from unDraw"></v-img>
                </v-flex>
                <v-flex md1></v-flex>
            </v-layout>
        </v-container>
        <v-container fluid>
            <!--Judging Criteria area-->
            <v-layout class="padding-between-text">
                <v-flex md1></v-flex>
                <v-flex md5>
                    <v-img justify-center align-center src="../assets/judging-image.svg" alt="Image from unDraw"></v-img>
                </v-flex>
                <v-flex md1></v-flex>
                <v-flex md4 xs12>
                    <h1>JUDGING CRITERIA</h1>
                    <br>
                    <ul class="paragraph-font">
                        <li>Loreum Ipsum</li>
                        <li>Loreum Ipsum</li>
                    </ul>
                    <br>
                    <h1>REQUIREMENTS</h1>
                    <br>
                    <p class="paragraph-font">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus cursus eu justo enim.
                    </p>
                    <br>
                    <v-btn height="3em" width="10em" color="#4DB848" class="white--text body-1">
                        <v-icon left>mdi-open-in-new</v-icon>
                        REGISTER
                    </v-btn>
                </v-flex>
                <v-flex md1></v-flex>
            </v-layout>
        </v-container>
        <v-container fluid>
            <!--FAQ area-->
            <v-layout class="padding-between-text">
                <v-flex md1></v-flex>
                <v-flex md4 xs12>
                    <h1>F.A.Q.</h1>
                    <br>
                    <p class="questions-font"> What do you do at a hackathon?
                    </p>
                    <p class="paragraph-font"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nisl in ut lacus tortor, nisl. Cum mauris quam.
                    </p>
                    <p class="questions-font"> What do you do at a hackathon?
                    </p>
                    <p class="paragraph-font"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nisl in ut lacus tortor, nisl. Cum mauris quam.
                    </p>
                    <p class="questions-font"> What do you do at a hackathon?
                    </p>
                    <p class="paragraph-font"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nisl in ut lacus tortor, nisl. Cum mauris quam.
                    </p>
                </v-flex>
                <v-flex md1></v-flex>
                <v-flex md5>
                    <v-img justify-center align-center src="../assets/questions.svg" alt="Image from unDraw"></v-img>
                </v-flex>
                <v-flex md1></v-flex>
            </v-layout>
        </v-container>
        <v-container fluid>
            <v-layout class="padding-between-text">
                <v-flex md1></v-flex>
                <v-flex md10>
                    <h1>SPONSORS</h1>
                    <br>
                    <v-img justify-center align-center src="../assets/sponsors.svg" alt="Image from unDraw"></v-img>
                </v-flex>
                <v-flex md1></v-flex>
            </v-layout>
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
    }
}
</script>

<style scoped>
    .background {
        background-position: center;
        background-repeat: no-repeat;
        background-size: 200px auto;
    }

    .center-in-image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .event-title {
        font-size: 3em;
    }

    .event-subtitles {
        font-size: 1.5em;
        font-weight: 400;
    }

    .padding-between-text {
        margin-top: 12em;
    }

    .questions-font {
        font-weight: bold;
        font-size: 18px;
    }

    .paragraph-font {
        font-weight: 500;
        font-size: 16px;
    }

    .rectangle-bottom {
        margin-top: 5em;
        background: #E5F0E5;
    }

</style>
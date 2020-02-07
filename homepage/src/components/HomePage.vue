<template>
<v-app class="grey lighten-4">
    <!--Start of two rows-->
    <v-container class="mt-12">
        <v-layout row>
            <v-flex xs12 md6>
                <!--Displaying the winning picture-->
                <v-img id="winning-project-picture" height="380" width="540" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
            </v-flex>
            <v-flex xs12 md6>
                <!--Displaying the title for the winning project-->
                <h1 class="text-left">{{title}}</h1>
                <hr>
                <!--Displaying the tags for the project-->
                <v-btn v-bind:key="tag.id" v-for="tag in tags" class="tag" outlined rounded x-small disabled>{{tag.name}}</v-btn>
                <!--Displaying the description for the winning project-->
                <p class="text-left">{{description}}</p>
                <!--Displaying the play button that will link to another page-->
                <v-btn medium color="#4DB848">Learn More</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
    <!--Display the carousel component-->
    <v-container>
        <h1>Other Projects</h1>
        <swiper :options="swiperOption">
            <swiper-slide><v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img></swiper-slide>
            <swiper-slide><v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img></swiper-slide>
            <swiper-slide><v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img></swiper-slide>
            <swiper-slide>I'm Slide 4</swiper-slide>
            <swiper-slide>I'm Slide 5</swiper-slide>
            <swiper-slide>I'm Slide 6</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <!-- <v-slide-group
                v-model="model"
                class="pa-4"
                :prev-icon="prevIcon ? 'mdi-minus' : undefined"
                :next-icon="nextIcon ? 'mdi-plus' : undefined"
                :multiple="multiple"
                :mandatory="mandatory"
                :show-arrows="showArrows"
                :center-active="centerActive" -->

        <!--Showing 15 iteams with v-for but change it to however many projects-->
        <!-- <v-slide-item
                v-for="n in 15"
                :key="n"
                v-slot:default="{ active, toggle }"
                > -->
        <!--Change this from color to an image-->
        <!-- <v-card
                    :color="active ? 'primary' : 'grey lighten-1'"
                    class="ma-4"
                    height="190"
                    width="300"
                    @click="toggle"
                >
                    <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                    >
                    <v-scale-transition>
                        <v-icon
                        v-if="active"
                        color="white"
                        size="48"
                        v-text="'mdi-close-circle-outline'"
                        ></v-icon>
                    </v-scale-transition>
                    </v-row>
                </v-card>
                </v-slide-item>
            </v-slide-group> -->
    </v-container>
</v-app>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            drawer: false,
            //Put in the links to the other pages using the route:
            links: [],
            //Put in the Winner Project Title here
            title: "Proxy Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            //Tags for Winner Project here
            tags: [{
                    id: 1,
                    name: "Winner"
                },
                {
                    id: 2,
                    name: "Action"
                }
            ],
            images: [{
                id: 1,
                url: "someurl.com"
            }],
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                loop: true,
                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    }
}
</script>

<style>
hr {
    size: 6px;
    margin-top: 1em;
    margin-bottom: 1em;
}

.tag {
    margin: 0em 1em 1em 0em;
}

.swiper-button-next {
    background-image: url("https://i.imgur.com/nBnz8UR.png")
}

.swiper-button-prev {
    background-image: url("https://i.imgur.com/2nP0mMO.png")
}
</style>

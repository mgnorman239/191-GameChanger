<template>
    <v-app class="grey lighten-4">
        <Navbar />
        <v-container id="navbar-spacing">
            <v-row>
                <v-col class="pt-0 mt-0" cols="12" md="12">
                    <v-btn to="/project" text class="subtitle-2 font-weight-bold"><v-icon small left>fas fa-arrow-left</v-icon>Back to Project</v-btn>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" md="3">
                    <v-card outlined class="pa-2" height="100%">
                        <v-card-title class="pb-1"><b>Recent Entries</b></v-card-title>
                        <v-divider class="pb-2"></v-divider>
                        <v-card-text class="pa-0">
                            <v-list-item v-for="item in recents" :key="item.index">
                                <v-list-item-content>
                                    <v-list-item-title>{{item.title}}</v-list-item-title>
                                    <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="8">
                    <v-card outlined class="pa-2">
                        <v-card-title class="headline"><b>Log Title</b></v-card-title>
                        <v-card-subtitle>Author(s): Name, Name, Name
                            <v-spacer></v-spacer>
                            April 30, 2020
                        </v-card-subtitle>
                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Luctus accumsan tortor posuere ac ut consequat semper. Ac ut consequat semper viverra nam libero justo laoreet. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Lorem donec massa sapien faucibus et. Dolor sit amet consectetur adipiscing elit pellentesque. Porttitor leo a diam sollicitudin tempor. Aliquet nibh praesent tristique magna sit amet. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Vitae tortor condimentum lacinia quis vel eros donec. Auctor augue mauris augue neque gravida. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Interdum velit euismod in pellentesque massa placerat duis ultricies.<br><br>
                            Sed blandit libero volutpat sed cras ornare arcu. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Sagittis vitae et leo duis. Tortor aliquam nulla facilisi cras fermentum odio eu. Lectus quam id leo in vitae turpis massa sed elementum. Aliquet sagittis id consectetur purus ut faucibus. Nibh cras pulvinar mattis nunc. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Donec enim diam vulputate ut pharetra sit amet aliquam. Scelerisque in dictum non consectetur. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Quis imperdiet massa tincidunt nunc pulvinar sapien et. In ante metus<br><br>
                            dictum at. Ut placerat orci nulla pellentesque dignissim enim sit. Libero justo laoreet sit amet cursus sit amet. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Id volutpat lacus laoreet non curabitur.
                        </v-card-text>
                        <v-container>
                            <v-row>
                                <v-col align="center">
                                    <v-img width="350" height="200" src="https://via.placeholder.com/350x200"></v-img>
                                </v-col>
                            </v-row>
                        </v-container>
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
            recents: [
                {
                    title: 'Some title',
                    date: '5/6/2020' 
                },
                {
                    title: 'Title 2',
                    date: '3/10/2020'
                },
                {
                    title: 'Title 3',
                    date: '12/25/2019'
                }
            ]
        }
    },

    created() {
        //scroll to the top 
        window.scrollTo(0, 0)
    }
}

</script>

<style scoped>

ul {
    list-style-type: none;
}

.text-to-gray {
    color: black;
    text-decoration: underline;
}

a:hover {
    color: #4DB848;
}

#navbar-spacing{
    margin-top: 5em;
}

.dropdown-container {
  display: none;
  padding-left: 8px;
}

/* Optional: Style the caret down icon */
.fa-caret-down {
  float: right;
  padding-right: 8px;
}

.full-button{
    width: 100%;
    text-align: left;
}

.right-align{
    float: right;
}

</style>
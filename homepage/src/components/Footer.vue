<template>
<v-footer color="grey darken-4" class="spacer">
    <v-row class="text-center" justify="center">
        <v-col v-for="item in socialMedia" :key="item.index" cols="3" md="1">
            <v-btn icon class="ma-4" :href="item.link" target="_blank">
                <v-icon color="white" size="30px">{{item.icon}}</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12" class="text-center">
            <p class="white--text">© 2020 GameChanger</p>
        </v-col>
    </v-row>
</v-footer>
</template>

<script>
export default {
    data: () => ({
        socialMedia: [{
            icon: 'fab fa-facebook-f',
            link: 'https://www.facebook.com/gamechangerorg/'
        }, {
            icon: 'fab fa-twitter',
            link: 'https://twitter.com/gamechangerorg'
        }, {
            icon: 'fab fa-instagram',
            link: 'https://www.instagram.com/gamechangerorg/'
        }]
    })

}
</script>

<style scoped>
.spacer {
    margin-top: 6em;
}
</style>

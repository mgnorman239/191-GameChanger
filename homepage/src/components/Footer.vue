<template>
<v-footer color="grey darken-4" class="spacer">
    <v-row class="text-center" justify="center">
        <v-col v-for="icon in icons" :key="icon" cols="3" md="1">
            <v-btn icon class="ma-4">
                <v-icon color="white" size="30px">{{icon}}</v-icon>
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
        icons: [
            'fab fa-facebook-f',
            'fab fa-twitter',
            'fab fa-instagram'
        ]
    })

}
</script>

<style scoped>
.spacer {
    margin-top: 6em;
}
</style>

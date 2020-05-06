<template>
<v-app class="grey lighten-4 spacer">
    <Navbar />
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
                <v-sheet class="mt-10 pa-12 border mx-auto" height="630">
                    <v-form>
                        <h2>Log Submission</h2>
                        <v-text-field required color="#4DB848" placeholder="Title" class="mb-5"></v-text-field>
                        <v-text-field required color="#4DB848" placeholder="Author(s)" class="mb-5"></v-text-field>
                        <v-textarea required color="#4DB848" placeholder="Description" rows="4"></v-textarea>
                        <v-file-input color="#4DB848" placeholder="Add some pictures to your log!" class="top-spacer"></v-file-input>
                        <v-btn class="subtitle-1 font-weight-medium space-2 mr-5" large depressed color="#4DB848" dark>
                            <v-icon small left>far fa-paper-plane</v-icon>SUBMIT
                        </v-btn>
                        <v-btn v-on="on" class="subtitle-1 font-weight-medium space-2" large outlined color="#4DB848">
                            <v-icon small left>far fa-trash-alt</v-icon>CANCEL
                        </v-btn>
                    </v-form>
                </v-sheet>
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
    },
    data() {
        return {
            dialog: false,
        }
    }

}
</script>

<style scoped>
.spacer {
    margin-top: 4em;
}

.border {
    border-width: 1px;
    border-color: #e3e3e3;
    border-style: solid;
}

.top-spacer {
    margin-top: 7em;
}

.space-2 {
    margin-top: 5em;
}
</style>

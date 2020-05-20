<template>
<v-app class="grey lighten-4">
    <Navbar />
    <!-- Form page -->
    <v-container class="header-spacing">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card outlined class="pa-5 pl-8">
                    <!-- Inputs -->
                    <v-card-title class="headline font-weight-bold">Add New Project</v-card-title>
                    <!-- Project title name -->
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-text-field dense label="Project Name" required outlined>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <!-- Project Description -->
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-textarea outlined rows="5" row-height="15" label="Project Description" :rules="description_rules" :value="description_placeholder" counter class="project-description-spacing">
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <!-- Project URL -->
                        <v-row>
                            <v-col cols="12" md="5">
                                <v-text-field outlined label="Project URL" dense required>
                                </v-text-field>
                            </v-col>
                            <!-- Project Tags -->
                            <v-col cols="12" md="5">
                                <v-select :items="tags" label="Tags" dense outlined multiple>
                                </v-select>
                            </v-col>
                        </v-row>
                        <!-- Add team members -->
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-text-field outlined dense label="Member Names" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <!-- Add picture for project -->
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-file-input outlined dense accept="image/*" label="Project Picture"></v-file-input>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- Add the submit buttons -->
                    <v-card-actions>
                        <v-btn to="/success" class="subtitle-1 font-weight-medium space-2 mr-5" large depressed color="#4DB848" dark>
                            <v-icon small left>far fa-paper-plane</v-icon>SUBMIT
                        </v-btn>
                        <v-btn class="subtitle-1 font-weight-medium space-2" large outlined color="#4DB848">
                            <v-icon small left>far fa-trash-alt</v-icon>CANCEL
                        </v-btn>
                    </v-card-actions>
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
    // This is for the project description counter
    data: () => ({
        description_rules: [v => v.length <= 500 || 'Max 500 characters'],
        description_placeholder: 'Give a quick description about your game!',
        tags: ['Action', 'Adventure', 'RPG', 'Romance'],
    })
}
</script>

<style scoped>
.background-color {
    background: #E5E5E5;
}

.form-color {
    background: #FFFFFF;
    padding-top: 2em;
    padding-bottom: 4em;
    padding-left: 6em;
    padding-right: 6em;
}

.header-spacing {
    margin-top: 5em;
}

.input-width {
    width: 45%;
}

.project-description-spacing {
    margin-bottom: 9em;
}

.spacing-left {
    margin-left: 0px;
}

.spacing-right {
    margin-right: 0px;
}
</style>>

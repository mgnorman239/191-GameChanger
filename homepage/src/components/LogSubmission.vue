<template>
<v-app class="grey lighten-4 spacer">
    <Navbar />
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
                <v-sheet class="mt-10 pa-12 border mx-auto" height="630">
                    <v-form>
                        <h2>Log Submission</h2>
                        <v-text-field required color="#4DB848" placeholder="Title" class="mb-5" v-model="project_log.title"></v-text-field>
                        <v-text-field required color="#4DB848" placeholder="Member Names (separate names with ;)" class="mb-5" v-model="project_log.teamMembers"></v-text-field>
                        <v-textarea required color="#4DB848" placeholder="Description" rows="4" v-model="project_log.description"></v-textarea>
                        <!-- <v-file-input color="#4DB848" placeholder="Add some pictures to your log!" class="top-spacer"></v-file-input> -->
                        <router-link to='/success'><v-btn class="subtitle-1 font-weight-medium space-2 mr-5" v-on:click="submitProjectLogToDatabse()" color="#4DB848" dark large depressed>
                            <v-icon small left>far fa-paper-plane</v-icon>SUBMIT
                        </v-btn></router-link>
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
            project_log: {
                title: '',
                description: '',
                teamMembers: ''
            }
        }
    },

    methods: {
        /* Format team members into an item that DynamboDB accepts*/
        formatTeamMembers(members) {
        //console.log(members)
        var member_list = members.split(';')
        var results = []

        for (var i in member_list) {
          results.push(member_list[i].trim())
        }
        return results
      },

      submitProjectLogToDatabse() {
            var AWS = require('aws-sdk');
            // Initialize the Amazon Cognito credentials provider
            AWS.config.region = 'us-west-2'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-west-2:c8838837-ac29-45f7-b5c2-6ec245a55ed1',
            });

            var dynamodb = new AWS.DynamoDB.DocumentClient()

            var params = {
                TableName: 'Projects',
                Key: {
                    "title": 'Roblox'
                },
                UpdateExpression: "SET #projectLog = list_append(#projectLog, :newLog)",
                ExpressionAttributeNames: {
                    "#projectLog": "logs"
                },
                ExpressionAttributeValues: {
                   ":newLog" : [{
                        title: this.project_log.title,
                        description: this.project_log.description,
                        teamMembers: this.formatTeamMembers(this.project_log.teamMembers)
                   }]
                }
            }

            dynamodb.update(params, function(err, data) {
                if (err) {
                    console.log(err)
                }
            })
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

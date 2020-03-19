<template>
    <v-app>
        <Navbar />
        <v-container fluid id="navbar-spacing">
            <v-row>
                <v-flex md1></v-flex>
                <!--Log Archive-->
                <v-flex md2>
                    <h1>Log Archive</h1>
                        <br>
                        <button class="full-button">April 2020<i class="fas fa-plus right-align"></i></button>
                        <!--Replace these with actual entries for the year-->
                        <div class="dropdown-container">
                            <ul>
                                <li><a class="text-to-gray" href="#">Link 1</a></li>
                                <li><a class="text-to-gray" href="#">Link 2</a></li>
                                <li><a class="text-to-gray" href="#">Link 3</a></li>
                            </ul>
                        </div>
                        <hr>
                        <button class="full-button">March 2020<i class="fas fa-plus right-align"></i></button>
                        <div class="dropdown-container">
                            <ul>
                                <li><a class="text-to-gray" href="#">Link 1</a></li>
                                <li><a class="text-to-gray" href="#">Link 2</a></li>
                                <li><a class="text-to-gray" href="#">Link 3</a></li>
                            </ul>
                        </div>
                        <hr>
                        <button class="full-button">February 2020<i class="fas fa-plus right-align"></i></button>
                        <div class="dropdown-container">
                            <ul>
                                <li><a class="text-to-gray" href="#">Link 1</a></li>
                                <li><a class="text-to-gray" href="#">Link 2</a></li>
                                <li><a class="text-to-gray" href="#">Link 3</a></li>
                            </ul>
                        </div>
                </v-flex>
                <v-flex md1></v-flex>
                <!--Actual thing-->
                <v-flex md6>
                    <h1>Title</h1>
                    <p>Team: Name, Name, Name</p>
                    <br>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At laoreet mattis fermentum rhoncus cursus. Aliquam curabitur mattis lorem tincidunt ac feugiat varius urna risus. Id magna sed nam consequat arcu, iaculis commodo vulputate eu. Pretium vitae in lectus pellentesque. Blandit magna libero, sollicitudin convallis mi posuere suscipit nulla. Ipsum faucibus neque bibendum non vitae, cras ultricies arcu a. Adipiscing lacinia eget in arcu pharetra mus.</p>

                    <p>At ullamcorper adipiscing ultrices et eu adipiscing neque pulvinar. Tortor, pellentesque proin risus enim sit a massa. Ut faucibus rutrum tincidunt id. Ipsum ullamcorper aliquam dignissim lacus massa in fringilla lectus a. Etiam integer et odio magnis neque sed. Elementum sit diam nunc, urna in elementum cras sed. Varius sit egestas porttitor vitae eleifend adipiscing nisl nulla ultricies. In donec nibh integer feugiat.
                    </p>
                    
                </v-flex>
                <v-flex md2></v-flex>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import Navbar from "./Navbar";
import $ from 'jquery';

//Code to make the dropdown button work
$(function(){
    var dropdown = document.getElementsByClassName("full-button");
    var i;

    for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        } else {
        dropdownContent.style.display = "block";
        }
    });
    }
});

export default {
    components: {
        Navbar
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
    margin-top: 6em;
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
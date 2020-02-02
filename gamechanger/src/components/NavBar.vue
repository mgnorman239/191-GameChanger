<template>
    <nav id="navbar">
        <a href="/">Test</a>
        <a href="/">Test2</a>
        <a href="/">Test3</a>
    </nav>
</template>

<script>
    export default {
        name: "NavBar"

    }
</script>

<style scoped>
#navbar {
    background-color:#2C2C2C;
    padding:15px;
    text-align: left;
}

nav a {
    padding: 0px 20px 20px 0px;
    color: white;
}
</style>
<template>
    <div id="app">
        <v-app id="inspire">
            <v-container>
                <Main/>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import Main from "./components/main.vue";
export default {
    components: {
        Main,
    },
};
</script>

<style>
[v-cloak] {
    display: none;
}

body {
    font-family: Meiryo, Arial, Verdana, Sans-Serif, Microsoft JhengHei;
    margin: auto auto;
    -webkit-overflow-scrolling: touch;
}
</style>

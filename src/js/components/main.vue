<template>
    <div>
        {{ test }}
        <v-btn @click="test_fun()">submit</v-btn>
    </div>
</template>

<script>
export default {
    data: () => ({
        test: "HELLO",
    }),

    created: function() {

    },

    methods: {
        test_fun () {
            alert("Hi");
        },

    },
};
</script>

<style>

</style>

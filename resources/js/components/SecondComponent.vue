<template>
    <div>
        <h1 v-on:click="call">Hola, {{ name }}</h1>        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: "Josué Componente"
            }
        },
        methods: {
            call() {
                this.name = "Josué Magaña Valencia"
            }
        }
    }
</script>

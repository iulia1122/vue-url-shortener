<template>
    <div>
        <h2> Recently generated urls </h2>
        <a class="link" v-for="url in urls" :key="url._id" :href="url.longUrl"> {{url.shortUrl}}</a>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UrlList',

    data() {
        return {
            urls: []
        }
    },

    async mounted() {
        let result = await axios.get('http://localhost:3000/url/all')

        this.urls = result.data;
        console.log(result)
    }
}
</script>

<style scoped>
.link {
    text-decoration: none;
    display: block;
    margin: 11px 0;
    color: #516375;
}
</style>
<template>
    <div>
        <h2> Recently generated urls </h2>
        <a class="link" v-for="url in urls" :key="url._id" :href="url.longUrl"> {{url.shortUrl}}</a>
    </div>
</template>

<script>
import axios from 'axios'
import {
    mapMutations,
    mapGetters
} from 'vuex'

export default {
    name: 'UrlList',

    async mounted() {
        let result = await axios.get('http://localhost:3000/url/all')
        this.setUrlList(result.data)
    },

    methods: {
        ...mapMutations({
            setUrlList: 'urls/setUrlList'
        })
    },

    computed: {
        ...mapGetters({
            urls: 'urls/getUrlList'
        })
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
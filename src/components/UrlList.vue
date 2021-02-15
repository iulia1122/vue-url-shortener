<template>
<div>
    <h2> Recently generated urls </h2>
    <div class="url-container">
        <div class="list-item" v-for="url in urls" :key="url._id">
            <div class="center-link">
                <a class="link" :href="url.shortUrl">{{url.shortUrl}}</a>
                <a class="link long-url" :href="url.longUrl">({{ url.longUrl}}) </a>
            </div>
        </div>
    </div>
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
    margin: 11px;
    color: #516375;
    font-size: 16px;
}

.center-link {
    margin: 0 auto;
}

.long-url {
    color: #D3D3D3;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
}

.list-item {
    color: #155724;
    display: flex;
}

.url-container {
    max-height: 500px;
    overflow-y: scroll;
}

@media (min-width: 576px) {
    .center-link {
        display: flex;
    }
}
</style>

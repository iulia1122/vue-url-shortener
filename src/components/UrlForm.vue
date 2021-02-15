<template>
<div class="form">
    <input type="text" class="input" placeholder="Enter url here.." v-model="url" />
    <button v-on:click="getShortUrl">Shorten URL</button>
    {{ validationError }}
</div>
</template>

<script>
import axios from 'axios'
import {
    mapMutations
} from 'vuex'
import SimpleVueValidation from 'simple-vue-validator';
let Validator = SimpleVueValidation.Validator;

export default {
    name: 'UrlForm',

    data() {
        return {
            url: '',
            shortUrl: '',
            validationError: ''
        }
    },

    methods: {
        async getShortUrl() {

            if (!this.url) {
                return this.validationError = 'Please provide a link'
            }

            let urlToValidate = this.getUrlWithProtocol(this.url)

            let validationResult = Validator.value(urlToValidate).url()

            if (validationResult._messages.length > 0) {
                return this.validationError = 'That doesn\'t look like a valid url.'
            } else {
                this.validationError = ''
            }

            let response = await axios.post('http://localhost:3000/url/shorten', {
                url: this.url
            })

            this.shortUrl = response.data.shortUrl

            this.updateUrlList(response.data)

        },

        // append http:// if the url doesn't have a protocol
        getUrlWithProtocol(url) {
            let protocols = ['http://', 'https://']
            return protocols.some(protocol => url.includes(protocol)) ? url : `http://${url}`
        },

        ...mapMutations({
            updateUrlList: 'urls/updateUrlList' // map `this.add()` to `this.$store.dispatch('increment')`
        })
    }
}
</script>

<style scoped>
.input {
    outline: none;
    display: block;
    width: 100%;
    margin: 0 0 20px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #ccc;
    font-family: "Roboto";
    box-sizing: border-box;
    font-size: 14px;
}

.input:focus {
    color: #333;
    border: 1px solid #44c4e7;
}

label {
    font-weight: bold;
    text-align: left;
    text-transform: uppercase;
}
</style>

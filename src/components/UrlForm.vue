<template>
<div class="form">
    <input type="text" :class="borderStyles" class="input" placeholder="Enter url here.." v-model="url" />
    <span class="info" :class="textStyles">{{ validationError }}</span>
    <button v-on:click="getShortUrl">Shorten URL</button>

    <a class="new-link" :href="shortUrl">{{shortUrl}}</a>
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

            this.shortUrl =''

            if (!this.url) {
                return this.validationError = 'Please provide a link'
            }

            let urlToValidate = this.getUrlWithProtocol(this.url)

            let validationResult = Validator.value(urlToValidate).url()

            if (validationResult._messages.length > 0) {
                return this.validationError = 'Please type a valid url'
            } else {
                this.validationError = ''
            }

            let response = await axios.post('http://localhost:3000/url/shorten', {
                url: this.url
            })

            this.resetErrors()

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
        }),

        resetErrors() {
            this.validationError = ''
        }
    },

    computed: {
        hasErrors() {
            return this.validationError ? true : false
        },

        borderStyles() {
            if (this.validationError) {
                return 'input-warning'
            }

            return ''
        },

        textStyles() {
            if (this.validationError) {
                return 'text-warning'
            }

            return ''
        }
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
    color: #516375;
    box-sizing: border-box;
    font-size: 16px;
}

.input:focus {
    border: 1px solid #44c4e7;
}

.input-warning {
    border: 1px solid #dc3545;
}

.text-warning {
    color: #dc3545
}

.success {
    border: 1px solid #28a745;
}

button {
    border-radius: 6px;
    font-weight: 600;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;

}

button:hover {
    cursor: pointer;
}

.info {
    display: block;
}

.new-link {
    color: #28a745;
    text-decoration: none;
    cursor: pointer;
    margin-top: 22px;
    font-weight: bold;
    display:block;
}
</style>

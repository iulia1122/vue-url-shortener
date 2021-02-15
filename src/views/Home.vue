<template>
<div class="container">

    <h1 class="title"> Url shortener app </h1>

    <div class="form-container">
        <UrlForm class="form" />
    </div>

    <UrlList class="list" />
</div>
</template>

<script>
import UrlForm from '@/components/UrlForm'
import UrlList from '@/components/UrlList'

export default {
    name: 'Home',
    components: {
        UrlForm,
        UrlList
    }
}
</script>

<style scoped>
.container {
    display: block;
    width: 100%;
}

.title {
    color: #2b3c4d;
    line-height: 1.25;
}

.form {
    background: #fff;
    max-width: 285px;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin: 0 auto;
}

.form-container {
    margin-bottom: 11px;
}

@media (min-width: 576px) {
    .container {
        padding: 33px;
    }
}
</style>

<template>
<div class="container">
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
    display: flex;
}

.form-container {
  width: 70%;
  margin: 11px 0;
}

.form {
    background: #fff;
    width: 285px;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin: 0 auto;
}

.list {
    width: 30%;
}
</style>

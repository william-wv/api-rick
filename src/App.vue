<script setup>
import HeaderPage from './components/HeaderPage.vue';


</script>

<template>
  <HeaderPage/>
  <router-view :key="$route.fullPath"></router-view>
</template> 

<style scoped>

</style>

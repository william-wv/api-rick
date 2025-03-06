<script setup>
import { getCharacters } from '@/services/HttpService'

const personagens = ref([])

async function getPersonagens() {
    const resultado = await getCharacters()
    personagens.value = resultado.data.results
}


onMounted(() => {
    getPersonagens(route.params.page)
})
</script>

<template>
  
</template>

<style scoped>

</style>
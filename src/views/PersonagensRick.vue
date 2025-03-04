<script setup>
import { getCharacters } from '@/services/HttpService'
import { onMounted, ref } from 'vue';

const personagens = ref([]);
const locations = ref([]);

async function getPersonagens() {
    const resultado = await getCharacters()
    personagens.value = resultado.data.results
}

onMounted(() => {
    getPersonagens();
})

</script>

<template>
    <main>
    <div class="container-cards ">
        <div class="card-personagem d-flex" v-for="pers in personagens" :key="pers.id">
            <div class="div-img"><img :src="pers.image"></div>

            <div class="div-info">
                <ul class="ul-pers">
                    <li class="li-item name"> Name: {{ pers.name }} </li>
                    <li class="li-item status">  
                        Status: {{ pers.status }}
                        <span :class="{
                            green: pers.status === 'Alive',
                            red: pers.status === 'Dead',
                            gray: pers.status !== 'Alive' && pers.status !== 'Dead'
                        }">
                        </span>
                    </li>
                    <li class="li-item species"> Species: {{ pers.species }}</li>
                    <li class="li-item gender"> Gender: {{ pers.gender }}</li>
                    <li class="li-item location"> Last location: {{ pers.location.name }}</li>
                </ul>
            </div>
        </div>
    </div>
    </main>
</template>


<style scoped>
.container-cards {
    display: grid;
    grid-gap: 30px;
}


    img {
    width: 30vw;
    height: auto;
    border-radius: 10px;
}

li {
    color: var(--Black);
}

.green {
    background-color: green;
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 50%;
}

.red {
    background-color: red;
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 50%;
}

.gray {
    background-color: gray;
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 50%;
}

@media (max-width: 425px) {
    main {
        padding: 10px !important;
    }

    .container-cards {
        grid-template-columns: repeat(1, 1fr);
    
    }

    .card-personagem{
        border-radius: 10px; 
        border: 1px solid gray;   
    }

    .div-info {
        width: 100%;
        padding: 10px !important;
    }

    .div-name {
        width: 100%;
    }

    .ul-pers {
        font-size: 0.8rem;
        color: var(--Black);

    }
    .name {
        font-size: 1rem;
    }

}
</style>
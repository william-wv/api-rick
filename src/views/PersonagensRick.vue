<script setup>
import { prxPagi } from '@/services/HttpService';
import { getCharacters } from '@/services/HttpService'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const personagens = ref([])
const route = useRoute()
const pagina = ref(1)

async function getPersonagens() {
    const resultado = await getCharacters()
    personagens.value = resultado.data.results
}

async function carregarPagina() {
    const dados = await prxPagi(pagina.value);
    if (dados) {
        personagens.value = dados.results;
    }
}

function proximaPagina() {
    if (pagina.value < 42) {
        pagina.value++;
        carregarPagina();
    }
}

function paginaAnterior() {
    if (pagina.value > 1) {
        pagina.value--;
        carregarPagina();
    }
}

onMounted(() => {
    carregarPagina();
});
onMounted(() => {
    getPersonagens(route.params.page)
})

watch(
    () => route.params.page,
    (newPage) => {
        getPersonagens(newPage)
    }
)



</script>
<template>
    <main>
        <h1>Personagens da série</h1>
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
                            - {{ pers.species }}
                        </li>
                        <li class="li-item gender"> Gender: {{ pers.gender }}</li>
                        <li class="li-item location"> Last location: {{ pers.location.name }}</li>
                        <li class="li-item location">
                            <router-link class="link" to="/episodeosPers">Episodeos participantes</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="btn-naveg">

            <div class="btn-menos">
                <button class="btn-green" @click="paginaAnterior" :disabled="pagina === 1">Anterior</button>
            </div>
            <div>
                Pagina {{ pagina }} de 42
            </div>
            <div class="btn-mais">
                <button class="btn-green" @click="proximaPagina" :disabled="pagina === 42">Próxima</button>
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
    border-radius: 15px 0 0 15px;
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

main {
    padding: 10px !important;
}

.container-cards {
    grid-template-columns: repeat(1, 1fr);

}

.card-personagem {
    border-radius: 15px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3),
        -5px -5px 10px rgba(255, 255, 255, 0.8);
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


@media (max-width:400px) {
    li {
        line-height: 1rem;
    }
}

@media (min-width:770px) and (max-width:1024px) {
    .container-cards {
        margin: 20px !important;
    }

    .container-cards {
        grid-template-columns: repeat(2, 2fr);
    }

    img {
        width: 100%;
    }
}

@media (min-width:1025px) and (max-width:1440px) {
    .container-cards {
        margin: 20px !important;
    }

    .container-cards {
        grid-template-columns: repeat(3, 2fr);
    }

    img {
        width: 100%;
    }
}

@media (min-width:1441px) and (max-width:2560px) {
    .container-cards {
        margin: 20px !important;
    }

    .container-cards {
        grid-template-columns: repeat(3, 2fr);
    }

    img {
        width: 100%;
    }

    li {
        font-size: 1.3rem;
    }

}
</style>
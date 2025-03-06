<script setup>
import { getLocalization } from '@/services/HttpService';
import { onMounted, ref } from 'vue';
import { proxPagiLoc } from '@/services/HttpService'

const locations = ref([]);
const pagina = ref(1); 

async function getLocalizations() {
  const result = await getLocalization()
  locations.value = result.data.results;
}

async function carregarPaginas() {
  const dados = await proxPagiLoc(pagina.value)
  if (dados) {
      locations.value = dados.results;
    }
}

function proximaPagina() {
  if (pagina.value < 7) {
    pagina.value++;
    carregarPaginas();
  }
}

function voltarPagina() {
  if (pagina.value > 1) {
    pagina.value--;
    carregarPaginas();
  }
}

onMounted(() => {
  console.log('mudando para aba localizations')
  getLocalizations();
})

</script>

<template>
  <h1>Localizações</h1>
  <div class="div-loc">
    <div v-for="location in locations" :key="location.id" class="card-loc">
      <ul>
        <li>
          Localização: {{ location.name }}
        </li>
        <li>
          Tipo: {{ location.type }}
        </li>
        <li>
          Dimenção: {{ location.dimension }}
        </li>
        <li>
          Criação: {{ location.created }}
        </li>
      </ul>
    </div>
  </div>
  <div class="btn-naveg">
    <button class="btn-green" @click="voltarPagina">Voltar</button>
    <span>{{ pagina }} - 7</span> 
    <button class="btn-green" @click="proximaPagina">Próxima</button>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 25px !important;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

li {
  color: black;
}

.div-loc {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 10px !important;
  margin: 0 50px !important;
  gap: 20px !important;
}

.card-loc {
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.3),
    5px 5px 10px rgba(255, 255, 255, 0.8);
  padding: 20px !important;
  background-color: #ddd;
}



@media (min-width: 768px) {
  .div-loc {
    grid-template-columns: repeat(2, 1fr);
  }
}


@media (min-width:1025px) {
  .div-loc {
    grid-template-columns: repeat(3, 1fr);
  }
}


</style>
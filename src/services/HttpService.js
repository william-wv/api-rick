import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/';

const api = axios.create({
    baseURL: baseUrl,
})

export async function prxPagi(pagina) {
    try {
        const resposta = await api.get(`character?page=${pagina}`);
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao buscar personagens:", erro);
        return null;
    }
}

export async function proxPagiLoc(pagina) {
    try {
        const resp = await api.get(`location?page=${pagina}`);
        return resp.data;
    } catch (erro) {
        console.error("Erro ao buscar locvalizações:", erro);
        return null;
    }
}

export async function getCharacters() {
    const response = await api.get('character')
    return response
}

export async function getLocalization() {
    const response = await api.get('location')
    return response
}

export async function getEpisodes() {
    const response = await api.get('episode')
    return response
}


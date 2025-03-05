import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/';

const api = axios.create({
    baseURL: baseUrl,
})

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
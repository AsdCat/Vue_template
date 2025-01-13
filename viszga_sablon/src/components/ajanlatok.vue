<script setup>
import Axios from "axios";
import { ref, onMounted } from "vue";
import {useRouter} from "vue-router";

const utazasok = ref([]);
const router = useRouter()


onMounted(async () => {
    // Ez akkor fut le, amikor betöltődik ez a komponens

    try {
        const res = await (await Axios.get("https://utazasi-iroda.jedlik.cloud/api/journeys"))
        utazasok.value = res.data
        //console.log(utazasok.value);
    } catch (error) {
        return error
    }
})


const atiranyit =()=>{

    router.push('/register')
}

</script>

<template>
    <h1>Utazási Ajánlatok</h1>
    <table class="table table-info">
        <tr>
            <td>Ország:</td>
            <td>Utazási Mód: </td>
            <td>Indulás: </td>
            <td>Max létszám:</td>
            <td>Leírás:</td>
            <td>Fénykép:</td>
        </tr>
        <tr v-for="utazas in utazasok">
            <td>{{ utazas.country }}</td>
            <td>{{ utazas.vehicle.type }}</td>
            <td>{{ utazas.departure }}</td>
            <td>{{ utazas.capacity }}</td>
            <td>{{ utazas.description }} <button @click="atiranyit(utazas.id)">Érdekel</button> </td>
            <td><img :src="utazas.pictureUrl" alt=""></td>
        </tr>
    </table>

</template>

<style scoped>
.table img, td{
    text-align: justify;
    margin: 10px;
    height: 200px; 
    width: 0,5px;
    text-wrap: initial;
}
</style>
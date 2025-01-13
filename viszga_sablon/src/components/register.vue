<script setup>
import Axios from "axios";
import { ref, reactive, onMounted } from "vue";

const utazasok = ref([]);
const hiba = ref('');
const valaszok = ref([])
const valasztotid = ref(0);
const foglalas = reactive({
    journeyId: 0,
    name: "",
    email: "",
    numberOfParticipants: 0,
    lastCovidVaccineDate: "",
    acceptedConditions: false
})

onMounted(async () => {
    // Ez akkor fut le, amikor betöltődik ez a komponens

    try {
        const res = await (await Axios.get("https://utazasi-iroda.jedlik.cloud/api/journeys/short"))
        utazasok.value = res.data
        //console.log(utazasok.value);
    } catch (error) {
        return error
    }



})

// const valaszto = async () => {
//     // Ha a backend-en nincs olyan végpont, ami csak a kiválasztott gyártó id-jű mobilokat adja vissza,
//     // akkor az összes mobilt le kell kérni és kiválogatni közülük a megfelelőket:

//     try {  // Összes mobil lekérése
//         const res = await Axios.get("https://utazasi-iroda.jedlik.cloud/api/journeys/short")
//         utazasok.value = res.data
//         console.log(utazasok.value);
//     } catch (error) {
//         return error
//     }

    // Az adott gyártójúak kiválogatása
    // kiválasztottUtazasok.value = utazasok.value.filter(
    //     (m) => m.utazasId === valasztutazid.value
    // );

    // ha van megfelelő végpont (és kellene, hogy legyen) akkor használjuk azt (:
//};
const kuld = async () => {
    try {
        const res = await Axios.post("https://utazasi-iroda.jedlik.cloud/api/reserve", foglalas)
        valaszok.value = res.data
        //console.log(valaszok.value);
        alert(`Regisztációját ${valaszok.value.id}-s azonođítószámon Rögzítettük.`)
    } catch (error) {
        hiba.value = error.response.data
        return error.response.data
    }

}



</script>

<template>
    <h1>Regisztráció</h1>
    <form>
        <div class="mb-3">
            <label for="text" class="form-label">Utazás:</label>
            <select v-model="foglalas.journeyId" @change="valaszto">
                <option v-for="utazas in utazasok" :value="utazas.id">{{ utazas.destination }}</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="text" class="form-label">Az ön neve:</label>
            <input type="text" class="form-control" v-model="foglalas.name">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Az ön e-mailje:</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                v-model="foglalas.email">
        </div>
        <div class="mb-3">
            <label for="number" class="form-label">Résztvevők Száma:</label>
            <input type="number" class="form-control" v-model="foglalas.numberOfParticipants">
        </div>
        <div class="mb-3">
            <label for="date" class="form-label">Az Utolsó Covid Oltás Dátuma:</label>
            <input type="date" class="form-control" v-model="foglalas.lastCovidVaccineDate">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="foglalas.acceptedConditions">
            <label class="form-check-label" for="exampleCheck1">Felhasználási Feltételeket elfogadom</label>
        </div>
        <button @click="kuld" type="submit" class="btn btn-primary">Küldés</button>
    </form>
    <h2>{{ hiba }}</h2>

</template>

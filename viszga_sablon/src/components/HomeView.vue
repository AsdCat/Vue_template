<script setup>
import Axios from "axios";
import { ref, onMounted } from "vue";

const gyartok = ref([]);
const mobilok = ref([]);
const valasztottGyartoId = ref(0);
const kiválasztottMobilok = ref([]);

onMounted(async () => {
    // Ez akkor fut le, amikor betöltődik ez a komponens

    try {
      const res = await Axios.get("http://localhost:3000/gyartok")
      gyartok.value = res.data
      //console.log(gyartok.value);
    } catch (error) {
      return error
    }



})

const valaszto = async () => {
    // Ha a backend-en nincs olyan végpont, ami csak a kiválasztott gyártó id-jű mobilokat adja vissza,
    // akkor az összes mobilt le kell kérni és kiválogatni közülük a megfelelőket:

    try {  // Összes mobil lekérése
      const res = await Axios.get("http://localhost:3000/mobilok")
      mobilok.value = res.data
      console.log(mobilok.value);
    } catch (error) {
      return error
    }

    // Az adott gyártójúak kiválogatása
    kiválasztottMobilok.value = mobilok.value.filter(
        (m) => m.gyartId === valasztottGyartoId.value
    );

    // ha van megfelelő végpont (és kellene, hogy legyen) akkor használjuk azt (:
};
</script>

<template>
    <!-- <select v-model="valasztottGyartoId" @change="valaszto">
        <option v-for="gyarto in gyartok" :value="gyarto._id">{{ gyarto.nev }}</option>
    </select>
    <h1>A kiválasztott gyártó mobiljai:</h1>
    <ul class="m-4">
        <li v-for="mobil in kiválasztottMobilok">{{ mobil.nev }}</li>
    </ul> -->
</template>


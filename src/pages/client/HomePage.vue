<template>
  <div class="q-pa-md">
    <div class="full-width column items-center">
      <q-img
        src="src/assets/homeIcon.webp"
        spinner-color="dark"
        style="height: 40px; max-width: 40px"
      />
      <p class="title-large">Home Page</p>
    </div>
    <div class="cardList">
      <div v-for="card in HOME_CARD_LIST" :key="card.id">
        <HomeCard :title="card.title" :icon="card.icon" :link="card.link" />
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeCard from 'src/components/HomeCard.vue'
import { HOME_CARD_LIST } from 'src/shared/constansts/homeCardList'
</script>

<style>
.cardList {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style>

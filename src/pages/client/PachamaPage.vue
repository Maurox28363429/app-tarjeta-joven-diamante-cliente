<template>
  <div class="full-width q-py-xl row justify-center items-center q-gutter-x-md">
    <a
      href="https://www.instagram.com/grupopachama/"
      rel="noopener noreferrer"
      target="_blank"
    >
      <q-card class="my-card">
        <q-card-section class="column items-center justify-center">
          <q-img
            :src="instagramIcon"
            spinner-color="white"
            style="height: 40px; max-width: 40px"
          />
          <p class="q-ma-none">Instagram</p>
        </q-card-section>
      </q-card>
    </a>

    <a
      href="https://www.youtube.com/@pachamaecologico5714"
      rel="noopener noreferrer"
      target="_blank"
    >
      <q-card class="my-card">
        <q-card-section class="column items-center justify-center">
          <q-img
            :src="youtubeIcon"
            spinner-color="white"
            style="height: 40px; max-width: 40px"
          />
          <p class="q-ma-none">Youtube</p>
        </q-card-section>
      </q-card>
    </a>
  </div>
</template>

<script setup>
import instagramIcon from "../../assets/images/instagramIcon.png";
import youtubeIcon from "../../assets/images/youtubeIcon.png";
</script>

<style>
.my-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  cursor: pointer;
}
</style>

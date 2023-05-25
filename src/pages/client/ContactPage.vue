<script setup>
import contactImg from "../../assets/images/contact.png";

const INSTAGRAM_URL = "https://www.instagram.com/tarjetajovendiamante/";
const EMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=informacion@tarjetajovendiamante.com";
const WEB_URL = "https://www.tarjetajovendiamante.com/";
</script>

<template>
  <div
    class="full-width q-py-xl column justify-center items-center q-gutter-y-md"
  >
    <q-img :src="contactImg" width="360px" height="240px" alt="contact image" />
    <ul class="d style">
      <li class="row items-center">
        <q-icon name="email" class="q-mr-xs" />
        <p class="q-ma-none">informacion@tarjetajovendiamante.com</p>
      </li>
      <li class="row items-center">
        <q-icon name="la la-whatsapp" class="q-mr-xs" />
        <p class="q-ma-none">+507 6540-9984</p>
      </li>
    </ul>

    <div class="row q-gutter-md">
      <a
        href="https://wa.me/50765409984"
        target="_blank"
        rel="noopener noreferrer"
      >
        <q-btn round color="positive" size="md" icon="la la-whatsapp" />
      </a>
      <a :href="EMAIL_URL" target="_blank" rel="noopener noreferrer">
        <q-btn round color="primary" size="md" icon="email" />
      </a>
      <a :href="INSTAGRAM_URL" target="_blank" rel="noopener noreferrer">
        <q-btn round icon="la la-instagram" color="purple-4" size="md"
      /></a>
      <a :href="WEB_URL" target="_blank" rel="noopener noreferrer">
        <q-btn round icon="language" color="primary" size="md"
      /></a>
    </div>
  </div>
</template>

<style scoped>
.my-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 270px;
  min-height: 170px;
  cursor: pointer;
}
</style>

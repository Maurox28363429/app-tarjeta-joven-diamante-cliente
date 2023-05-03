<template>
  <div
    class="full-width q-py-xl column justify-center items-center q-gutter-y-md"
  >
    <q-img src="../../assets/images/contact.png" />
    <ul class="d style">
      <li class="row items-center">
        <q-icon name="email" class="q-mr-xs" />
        <p class="q-ma-none">informacion@tarjetajovendiamante.com</p>
      </li>
      <li class="row items-center">
        <q-icon name="la la-whatsapp" class="q-mr-xs" />
        <p class="q-ma-none">+507 6578-9280</p>
      </li>
    </ul>

    <div class="row q-gutter-md">
      <a href="https://wa.me/50765789280">
        <q-btn round color="positive" size="md" icon="la la-whatsapp" />
      </a>
      <a href="mailto:informacion@tarjetajovendiamante.com">
        <q-btn round color="primary" size="md" icon="email" />
      </a>
    </div>
  </div>
</template>

<script setup></script>

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

<template>
  <div
    class="full-width q-py-xl column justify-center items-center q-gutter-y-md"
  >
    <a
      href="https://wa.me/50765789280"
      target="_blank"
      rel="noopener noreferrer"
    >
      <q-card class="my-card">
        <q-card-section class="column items-center justify-center">
          <q-img
            :src="whatsappIcon"
            spinner-color="white"
            style="height: 70px; max-width: 70px"
          />
          <p class="q-ma-none text-dark">Contactanos</p>
          <p class="q-ma-none text-dark">+507 6578-9280</p>
        </q-card-section>
      </q-card>
    </a>
    <a
      href="mailto:informacion@tarjetajovendiamante.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <q-card class="my-card">
        <q-card-section class="column items-center justify-center full-height">
          <p class="q-ma-none text-dark">
            Nuestro correo: informacion@tarjetajovendiamante.com Estamos para
            ayudarte si tienes alguna duda o problema con tu cuenta puedes
            contactarnos
          </p>
        </q-card-section>
      </q-card>
    </a>
  </div>
</template>

<script setup>
import whatsappIcon from "../../assets/images/whatsappIcon.png";
</script>

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

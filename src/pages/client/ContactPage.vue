<script setup>
import { ref } from 'vue';
import { useGetDirectivo } from 'src/querys/directivoQuery';

const page = ref(1);
const search = ref('');

const { data: directivo, isLoading: isLoadingDirectivos } = useGetDirectivo({
  page,
  search,
});

const INSTAGRAM_URL = 'https://www.instagram.com/tarjetajovendiamante/';
const EMAIL_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=informacion@tarjetajovendiamante.com';
const WEB_URL = 'https://www.tarjetajovendiamante.com/';
</script>

<template>
  <div
    v-if="!isLoadingDirectivos"
    class="full-width q-py-xl column justify-center items-center q-gutter-y-md q-px-md"
  >
    <div style="max-width: 500px" class="text-center full-width">
      <q-toolbar class="text-justify">
        <q-toolbar-title
          >Directivos
          <q-icon name="la la-address-book" size="md" />
        </q-toolbar-title>
      </q-toolbar>
      <template v-for="diretory in directivo.data" :key="diretory.id">
        <a
          :href="'https://wa.me/507' + diretory.telefono.replace('-', '')"
          target="_blank"
          rel="noopener noreferrer"
        >
          <q-card
            class="q-my-sm full-width cursor-pointer card-diretory text-dark"
          >
            <q-list>
              <q-item class="text-justify">
                <q-item-section class="diretory-info">
                  <q-item-label lines="1"
                    ><p class="q-ma-none">
                      {{ diretory.nombre }}
                    </p></q-item-label
                  >
                  <q-item-label caption lines="1">
                    <p class="q-ma-none">{{ diretory.rol }}</p>
                  </q-item-label>
                  <q-item-label caption>
                    <p class="q-ma-none">{{ diretory.telefono }}</p>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="la la-whatsapp" color="positive" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </a>
      </template>
    </div>

    <ul style="max-width: 500px">
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

<style>
.card-diretory:hover {
  background: #4d57a9;
}

.card-diretory:hover p {
  color: white;
}

.card-diretory:hover i {
  color: white !important;
}
</style>

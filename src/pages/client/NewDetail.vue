<script setup>
import { useGetNewInformative } from '../../querys/newsQuerys';
import { useRouter } from 'vue-router';

const { currentRoute } = useRouter();

const { data: newData, isLoading: isLoadingData } =
  useGetNewInformative(currentRoute);

const thereAreRedes = (redes) => {
  return (
    redes?.link_facebook !== 'null' ||
    redes?.link_instragram !== 'null' ||
    redes?.link_otros !== 'null' ||
    redes?.link_web !== 'null' ||
    redes?.link_youtube !== 'null'
  );
};

const isLink = (link) => {
  return link !== 'null';
};
</script>

<template>
  <div class="full-width column items-center justify-center q-pa-md">
    <p class="text-medium text-h5">Detalle de noticia</p>
    <q-card class="full-width" style="max-width: 600px" v-if="!isLoadingData">
      <q-card-section class="q-py-xs q-px-md">
        <div class="news-title">{{ newData.titulo }}</div>
      </q-card-section>
      <q-separator />
      <div class="full-width row justify-center">
        <img
          :src="newData.img_url"
          style="object-fit: contain; width: 240px; min-height: 200px"
        />
      </div>
      <q-separator />

      <q-card-section class="q-pt-none scroll" style="max-height: 50vh">
        <div class="" v-html="newData.descripcion" />
        <div>
          <p>Redes:</p>
          <p v-if="!thereAreRedes(newData)">No hay redes</p>
          <div class="row" v-if="thereAreRedes(newData)">
            <a
              v-if="isLink(newData?.link_youtube)"
              :href="newData.link_youtube"
              target="_blank"
              ><q-icon name="la la-youtube" color="primary" size="md"
            /></a>
            <a
              v-if="isLink(newData?.link_web)"
              :href="newData?.link_web"
              target="_blank"
              ><q-icon name="language" color="primary" size="md"
            /></a>
            <a
              v-if="isLink(newData?.link_instragram)"
              :href="newData?.link_instragram"
              target="_blank"
              ><q-icon name="la la-instagram" color="primary" size="md"
            /></a>
            <a
              v-if="isLink(newData?.link_facebook)"
              :href="newData?.link_facebook"
              target="_blank"
              ><q-icon name="facebook" color="primary" size="md"
            /></a>
            <a
              v-if="isLink(newData?.link_otros)"
              :href="newData?.link_otros"
              target="_blank"
              ><q-icon name="link" color="primary" size="md"
            /></a>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style></style>

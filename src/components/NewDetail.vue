<script setup>
defineProps({
  modalCurrent: {
    type: Object,
    required: true,
  },
});

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
  <q-card class="news-card modal-card">
    <q-card-section class="q-py-xs q-px-md">
      <div class="news-title">{{ modalCurrent.titulo }}</div>
    </q-card-section>
    <q-separator />
    <div class="full-width row justify-center">
      <img
        :src="modalCurrent?.img_url"
        style="object-fit: contain; width: 240px; min-height: 200px"
      />
    </div>
    <q-separator />

    <q-card-section class="q-pt-none scroll" style="max-height: 50vh">
      <div class="news-description" v-html="modalCurrent.descripcion" />
      <div>
        <p>Redes:</p>
        <p v-if="!thereAreRedes(modalCurrent)">No hay redes</p>
        <div class="row" v-if="thereAreRedes(modalCurrent)">
          <a
            v-if="isLink(modalCurrent?.link_youtube)"
            :href="modalCurrent.link_youtube"
            target="_blank"
            ><q-icon name="la la-youtube" color="primary" size="md"
          /></a>
          <a
            v-if="isLink(modalCurrent?.link_web)"
            :href="modalCurrent?.link_web"
            target="_blank"
            ><q-icon name="language" color="primary" size="md"
          /></a>
          <a
            v-if="isLink(modalCurrent?.link_instragram)"
            :href="modalCurrent?.link_instragram"
            target="_blank"
            ><q-icon name="la la-instagram" color="primary" size="md"
          /></a>
          <a
            v-if="isLink(modalCurrent?.link_facebook)"
            :href="modalCurrent?.link_facebook"
            target="_blank"
            ><q-icon name="facebook" color="primary" size="md"
          /></a>
          <a
            v-if="isLink(modalCurrent?.link_otros)"
            :href="modalCurrent?.link_otros"
            target="_blank"
            ><q-icon name="link" color="primary" size="md"
          /></a>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn v-close-popup flat color="primary" label="Cerrar" />
    </q-card-actions>
  </q-card>
</template>

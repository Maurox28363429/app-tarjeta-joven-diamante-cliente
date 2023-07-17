<script setup>
import { defineProps, ref } from 'vue';
import wazeIcon from './../assets/images/wazeIcon.jpg';

const openModal = ref(false);

const openWaze = (link) => {
  link.forEach((element) => {
    window.open(element.link, '_blank');
  });
};

const handleBuy = () => {
  console.log('buy');
};

const showModal = () => {
  openModal.value = true;
};

const props = defineProps({
  mapLink: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: false,
  },
  commerceName: {
    type: String,
    required: false,
  },
  totalPrice: {
    type: String,
    required: false,
  },
  images: {
    type: Array,
    required: true,
  },
  withModal: {
    type: Boolean,
    default: true,
  },
});

const links = props.mapLink.filter((element) => {
  return element.link?.includes('http');
});

const isValidLink = props.mapLink && links?.length > 0;
</script>

<template>
  <q-card class="column" style="height: 370px; width: 100%; gap: 0">
    <q-card-section class="q-px-xs q-py-none">
      <q-img
        style="height: 120px; width: 100%; max-height: 200px"
        fit="contain"
        :src="
          images[0] ? images[0] : 'https://cdn.quasar.dev/img/mountains.jpg'
        "
      />
      <q-separator />
      <q-list>
        <q-item clickable class="q-ma-none q-pa-none" style="padding: 1em">
          <q-item-section class="q-ma-none q-pa-none">
            <q-item-label>
              <p class="line-clamp-1">{{ name }}</p>
            </q-item-label>
            <q-item-label caption>
              {{ commerceName }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable class="q-ma-none q-pa-none" v-if="totalPrice > 0">
          <div class="q-mr-md q-ml-xs row items-center">
            <q-icon size="xs" color="red" name="sell" />
          </div>

          <q-item-section>
            <q-item-label v-if="totalPrice > 0"
              >{{ totalPrice }} $</q-item-label
            >
            <q-item-label v-if="discount > 0" caption
              >Descuento{{ discount }} %</q-item-label
            >
          </q-item-section>
        </q-item>
        <p class="line-clamp-4 q-mb-none q-px-md" v-html="description" />
      </q-list>
    </q-card-section>
    <q-card-actions
      align="right"
      class="q-pt-none full-width"
      style="flex: 1; align-items: end"
    >
      <q-btn
        v-if="!withModal"
        color="primary"
        @click="handleBuy"
        label="Comprar"
      />
      <div class="row full-width justify-between" v-if="withModal">
        <q-img
          v-if="isValidLink"
          @click="openWaze(links)"
          :src="wazeIcon"
          spinner-color="white"
          style="
            height: 40px;
            max-width: 40px;
            border-radius: 8px;
            cursor: pointer;
          "
        />
        <q-btn color="primary" @click="showModal" flat>Ver más</q-btn>
      </div>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="openModal">
    <q-card class="news-card modal-card">
      <q-card-section class="q-py-xs q-px-md">
        <div class="news-title">{{ name }}</div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-pt-none scroll" style="max-height: 50vh">
        <img :src="images[0]" class="news-image" />
        <q-separator />
        <div class="body-medium" v-html="description" />
        <div>
          <p>Dirección:</p>
          <q-img
            @click="openWaze(mapLink)"
            :src="wazeIcon"
            spinner-color="white"
            style="
              height: 40px;
              max-width: 40px;
              border-radius: 8px;
              cursor: pointer;
            "
          />
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Cerrar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.24) 0px 1px 1px 0px;
  overflow: hidden;
}

.news-image {
  height: 140px;
  width: 100%;
  object-fit: contain;
}

.news-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.modal-card {
  width: 700px;
  max-width: 80vw;
}
</style>

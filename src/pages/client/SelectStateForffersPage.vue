<script setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGetStates } from 'src/querys/offersQuerys';
import disableIcon from '../../assets/images/bandImage.png';
import activeIcon from '../../assets/icons/stateIcon.webp';

const props = defineProps({
  typeOffers: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const sort = ref({});

const icon = (ofertas, universidades) => {
  if (props.typeOffers === 'Offers') {
    if (ofertas === 0) {
      return disableIcon;
    } else {
      return activeIcon;
    }
  } else {
    if (universidades === 0) {
      return disableIcon;
    } else {
      return activeIcon;
    }
  }
};

switch (props.typeOffers) {
  case 'Offers':
    sort.value = { sort_ofertas: 1 };

    break;
  case 'OffersForUniversitys':
    sort.value = { sort_uni: 1 };

    break;

  default:
    sort.value = { sort_ofertas: 1 };
    break;
}

const { data, isLoading } = useGetStates(sort.value);

const openOffers = ({ state, offers, universidades }) => {
  if (props.typeOffers === 'Offers') {
    if (offers !== 0) {
      router.push(`/cliente/${props.typeOffers}/${state}`);
      console.log('hay ofertas');
    } else {
      console.log('no hay ofertas', offers);
    }
  } else {
    if (universidades !== 0) {
      router.push(`/cliente/${props.typeOffers}/${state}`);
    } else {
      console.log('no hay universidades', universidades);
    }
  }
};
</script>
<template>
  <q-inner-loading :showing="isLoading">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
  <div class="q-px-md" v-if="!isLoading">
    <div>
      <p class="title-large q-mt-xl text-center">Selecciona una provincia</p>
    </div>

    <div class="row wrap q-gutter-md justify-center q-my-lg">
      <template v-for="state in data" :key="state.id">
        <q-card
          class="stateCard column items-center cursor-pointer"
          @click="
            openOffers({
              state: state.name,
              offers: state.ofertas,
              universidades: state.universidades,
            })
          "
        >
          <q-card-section class="full-width column items-center">
            <q-img
              :src="icon(state.ofertas, state.universidades)"
              spinner-color="white"
              style="height: 80px; max-width: 80px"
            />
            <p>{{ state.name }}</p>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </div>
</template>

<style>
.stateCard {
  width: 140px;
  height: 140px;
}
</style>

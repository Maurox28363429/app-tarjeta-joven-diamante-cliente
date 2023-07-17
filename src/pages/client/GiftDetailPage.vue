<script setup>
import { useGetRaffles } from 'src/querys/rafflesQuerys';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();

const { data: raffles, isLoading } = useGetRaffles();

const detail = computed(() =>
  raffles.value?.data?.find((item) => item.id === Number(params.id))
);
</script>

<template>
  <div class="q-pa-md" v-if="!isLoading">
    <div class="row q-gutter-x-md">
      <div>
        <p class="q-ma-none text-h6">{{ detail?.titulo }}</p>
        <p class="q-ma-none grey">
          {{ detail?.init_date }} a {{ detail?.end_date }}
        </p>
        <p class="q-ma-none text-subtitle1">Pasos para el sorteo</p>
      </div>
      <q-img
        src="../../assets/images/trophy.png"
        alt="trophy"
        width="46px"
        height="43px"
      />
    </div>
    <q-timeline color="secondary" class="q-mt-md">
      <q-timeline-entry icon="check" v-for="item in detail?.steps" :key="item">
        <div>
          {{ item }}
        </div>
      </q-timeline-entry>
    </q-timeline>

    <div class="row justify-center full-width">
      <q-card class="q-my-md full-width" style="max-width: 800px">
        <q-card-section class="row">
          <div>
            <p class="q-ma-none text-h6">Recompensa</p>
            <p class="q-ma-none text-subtitle1" style="width: 200px">
              Membresia por 1 año mas
            </p>
          </div>
          <q-img
            src="../../assets/images/gift.png"
            alt="gift"
            width="91px"
            height="86px"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

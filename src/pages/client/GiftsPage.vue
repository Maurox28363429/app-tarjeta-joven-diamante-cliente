<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGetRaffles } from 'src/querys/rafflesQuerys';

const { data: raffles, isLoading } = useGetRaffles();

const tab = ref('premios');
const router = useRouter();

const winners = computed(() =>
  raffles.value?.data?.filter((item) => item.user !== null)
);

const handleDetail = (id) => {
  console.log(id);
  router.push('/cliente/gifts/' + id);
};

console.log(winners.value);
</script>

<template>
  <div class="full-width bg-white window-height">
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="premios">
        <section
          class="full-width column items-center q-pa-md"
          v-if="!isLoading"
        >
          <div
            class="full-width column items-center relative"
            style="height: 270px"
          >
            <p class="text-center">Quedan 21 días: 20h: 30min : 00s</p>
            <p class="text-uppercase text-h6">Mes de junio</p>
            <q-img
              src="../../assets/images/trophy.png"
              alt="Trophy"
              width="75px"
              height="70px"
            />
            <p class="texy-pimary">
              <a href="#" style="text-decoration: underline">ver sorteo</a>
            </p>
            <q-img
              src="../../assets/images/party.png"
              alt="Party"
              width="86px"
              height="74px"
              class="absolute"
              style="top: 70px; left: 32px"
            />
            <q-img
              src="../../assets/images/party.png"
              alt="Party"
              width="86px"
              height="74px"
              class="absolute"
              style="top: 120px; right: 32px"
            />
          </div>
          <div
            class="full-width full-height row items-center relative wrap q-gutter-sm"
          >
            <q-card
              v-for="item in raffles.data"
              :key="item.id"
              class="cursor-pointer"
              @click="handleDetail(item.id)"
            >
              <q-card-section
                class="text-center column items-center justify-center"
                style="min-height: 142px; width: 138px"
              >
                <p class="text-caption q-ma-none">{{ item.titulo }}</p>
                <q-avatar size="60px">
                  <img
                    :src="item.img"
                    alt="Trophy"
                    style="object-fit: cover"
                    width="34px"
                    height="34px"
                  />
                </q-avatar>
                <p class="text-caption q-ma-none text-grey">
                  {{ item.descripcion }}
                </p>
              </q-card-section>
            </q-card>
          </div>
        </section>
      </q-tab-panel>
      <q-tab-panel name="ganadores">
        <section class="full-width column items-center q-pa-md">
          <div
            class="full-width column items-center relative"
            style="height: 270px"
          >
            <p class="text-uppercase text-h6">Ultimo ganador</p>
            <q-avatar size="80px">
              <img
                src="../../assets/images/avatar.jpg"
                alt="avatar"
                width="75px"
                height="70px"
                style="object-fit: cover"
              />
            </q-avatar>

            <p class="texy-pimary">
              <a href="#" style="text-decoration: underline">ver ganador</a>
            </p>
            <q-img
              src="../../assets/images/party.png"
              alt="Party"
              width="86px"
              height="74px"
              class="absolute"
              style="top: 70px; left: 32px"
            />
            <q-img
              src="../../assets/images/party.png"
              alt="Party"
              width="86px"
              height="74px"
              class="absolute"
              style="top: 120px; right: 32px"
            />
          </div>
          <div
            class="full-width full-height row items-center relative wrap q-gutter-sm"
          >
            <q-card
              v-for="item in winners"
              :key="item.id"
              class="cursor-pointer"
            >
              <q-card-section
                class="text-center column items-center justify-center"
                style="min-height: 142px; width: 138px"
              >
                <p class="text-caption q-ma-none">{{ item.titulo }}</p>
                <q-avatar size="50px">
                  <img
                    :src="item.user.img_url"
                    alt="Trophy"
                    fit="contain"
                    style="object-fit: cover"
                  />
                </q-avatar>
                <p class="text-caption q-ma-none text-gray">
                  {{ item.user.name }}
                </p>
              </q-card-section>
            </q-card>
          </div>
        </section>
      </q-tab-panel>
    </q-tab-panels>

    <q-tabs
      v-model="tab"
      style="top: 294px"
      dense
      class="text-grey absolute full-width"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="premios" label="Premios" />
      <q-tab name="ganadores" label="Ganadores" />
    </q-tabs>
  </div>
</template>

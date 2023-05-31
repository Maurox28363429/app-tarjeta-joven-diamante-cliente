<script setup>
import { useRouter } from 'vue-router'
import MembershipsCard from 'src/components/MembershipsCard.vue'
import { useMemberships } from 'src/composables/useMemberships'
import { useAuthStore } from 'src/stores/useAuthStore'

const { go, push } = useRouter()
const auth = useAuthStore()

const { loading, memberships } = useMemberships()

const logOut = () => {
  auth.logout()
  push('/login')
}
</script>

<template>
  <div class="memberships">
    <div class="background_blue absolute bg-primary"></div>

    <div class="full-width row justify-between q-px-md q-pt-md">
      <div @click="go(-1)">
        <q-icon
          name="arrow_back"
          size="md"
          color="white"
          class="cursor-pointer"
        />
      </div>
      <div @click="logOut">
        <q-icon
          name="power_settings_new"
          size="md"
          color="white"
          class="cursor-pointer"
        />
      </div>
    </div>
    <div
      class="width-full column justify-center membershipsContainer column items-center relative-position"
    >
      <div
        class="memberships_description text-white column justify-center q-px-md q-mt-xl"
      >
        <p class="title-large text-center">Planes flexibles & precios</p>
        <p class="body-medium text-center">
          Bienvenido a nuestra plataforma de Tarjeta joven diamante, donde
          puedes encontrar todas tus tiendas favoritas en un solo lugar.Para
          hacerlo aún más fácil, ofrecemos diferentes planes que se adaptan a
          tus necesidades y presupuesto.
        </p>
      </div>
      <div
        class="memberships_plans full-width row justify-center q-pb-xl"
        v-if="!loading"
      >
        <template
          v-for="{ id, image, name, price, benefits } in memberships"
          :key="id"
        >
          <MembershipsCard
            :image="image"
            :name="name"
            :price="price"
            :benefits="benefits"
            :id="id"
          />
        </template>
      </div>
      <div
        class="memberships_plans full-width justify-center row q-pb-xl"
        v-if="loading"
      >
        <template v-for="(items, index) in 2" :key="index">
          <q-card class="membership-card-skeleton">
            <q-item class="row justify-center full-width">
              <q-item-section avatar>
                <q-skeleton type="QAvatar" />
              </q-item-section>
            </q-item>

            <q-item-section class="q-mb-lg">
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>

            <q-item class="benefit">
              <q-item-section avatar class="benefitPoint">
                <q-skeleton type="QAvatar" class="sizePoint" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="65%" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="benefit">
              <q-item-section avatar class="benefitPoint">
                <q-skeleton type="QAvatar" class="sizePoint" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="65%" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="benefit">
              <q-item-section avatar class="benefitPoint">
                <q-skeleton type="QAvatar" class="sizePoint" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="65%" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-card-actions class="full-width">
              <q-skeleton type="QBtn" class="full-width" />
            </q-card-actions>
          </q-card>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.memberships .button {
  display: flex;
  align-items: flex-end;
  flex: 1;
}

.membershipsContainer {
  z-index: 10;
}

.memberships_plans {
  gap: 100px;
  padding: 0 32px 80px;
}

.background_blue {
  width: 100%;
  height: 416px;
}

.memberships_description {
  height: 326px;
  max-width: 736px;
}

.memberships {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #e9e9e9;
}

.membership-card-skeleton {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  width: 320px;
  min-height: 427px;
  padding: 32px;
}

.benefit {
  max-width: 300px;
}

.benefitPoint {
  min-width: 0;
}

.sizePoint {
  width: 22px;
  height: 22px;
}
</style>

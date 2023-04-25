<script setup>
import MembershipsCard from "src/components/MembershipsCard.vue";
import { useRouter } from "vue-router";
import { useMemberships } from "src/composables/useMemberships";

const router = useRouter();
const arr = new Array(2).fill(0);

const { loading, memberships } = useMemberships();
const goBack = () => {
  router.go(-1);
};
console.log(memberships);
const salir = () => {
  localStorage.removeItem("user");
  router.push("login");
};
</script>

<template>
  <div class="memberships">
    <div class="background_blue"></div>

    <div @click="goBack" class="back-button">
      <q-icon
        name="arrow_back"
        size="md"
        color="white"
        class="cursor-pointer"
      />
    </div>
    <div
      @click="salir"
      class="back-button"
      style="margin-left: 4em; cursor: pointer"
    >
      <q-icon name="logout" size="md" color="white" class="cursor-pointer" />
      <span style="font-size: 1em; color: white">Salir</span>
    </div>

    <div class="width-full column justify-center membershipsContainer">
      <div
        class="memberships_description column justify-center q-px-md q-mt-xl"
      >
        <p class="title-large text-center">Planes flexibles & precios</p>
        <p class="body-medium text-center">
          Bienvenido a nuestra plataforma de Tarjeta joven diamante, donde
          puedes encontrar todas tus tiendas favoritas en un solo lugar.Para
          hacerlo aún más fácil, ofrecemos diferentes planes que se adaptan a
          tus necesidades y presupuesto.
        </p>
      </div>
      <div class="memberships_plans width-full q-pb-xl" v-if="!loading">
        <template v-for="membership in memberships" :key="membership.id">
          <MembershipsCard
            :image="membership.image"
            :name="membership.name"
            :price="membership.price"
            :benefits="membership.benefits"
            :id="membership.id"
          />
        </template>
      </div>
      <div class="memberships_plans width-full q-pb-xl" v-if="loading">
        <template v-for="(items, index) in arr" :key="index">
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.memberships_plans {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 100px;
  padding: 0 32px 80px;
}

.background_blue {
  background: #4d57a9;
  width: 100%;
  position: absolute;
  height: 416px;
}

.memberships_description {
  color: #ffffff;
  height: 326px;
  max-width: 736px;
}

.memberships {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #e9e9e9;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 20;
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

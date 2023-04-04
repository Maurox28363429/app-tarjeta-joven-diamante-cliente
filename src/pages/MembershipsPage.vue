<script setup>
import MembershipsCard from 'src/components/MembershipsCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  console.log('go back')
  router.go(-1)
}

const memberships = [
  {
    name: 'pro',
    price: 100,
    image: 'src/assets/rocket.svg',
    benefits: [
      'Obten descuentos en tus compras',
      'Participa en sorteos y obten premios',
      'Tendras acceso a la compra de productos y servicios premium'

    ]
  },
  {
    name: 'free',
    price: 0,
    image: 'src/assets/plane.svg',
    benefits: [
      'Obten descuentos en tu periodo de prueba',
      'Tendras acceso a productos y servicios premium'
    ]
  }
]
</script>

<template>
  <div class="memberships">
    <div class="background_blue"></div>

    <div
      @click="goBack"
      style="position: absolute; top: 20px; left: 20px; z-index: 20"
    >
      <q-icon
        name="arrow_back"
        size="md"
        color="white"
        class="cursor-pointer"
      />
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
      <div class="memberships_plans width-full q-pb-xl">
        <template v-for="membership in memberships" :key="membership.price">
          <MembershipsCard
            :image="membership.image"
            :name="membership.name"
            :price="membership.price"
            :benefits="membership.benefits"
          />
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
  background: #272e67;
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
</style>

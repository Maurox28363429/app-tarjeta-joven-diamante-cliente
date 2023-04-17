<script setup>
import { userAuth } from "src/composables/userAuth";
import { ref, computed } from "vue";

const props = defineProps({
  benefits: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  id: {
    type: Number,
    required: true,
  },
});

const baseurl = "/memberships/";

const { user } = userAuth();

const userIsmembershipFree = ref(
  Boolean(user?.membresia?.id === 7 || user?.membresia?.status === "activa")
);

const planValidate = computed(() => {
  if (userIsmembershipFree.value && props.name === "free") {
    return "disableGray";
  } else {
    return "plan-white";
  }
});
</script>

<template>
  <div :class="'plan' + ' ' + planValidate">
    <q-img
      :src="image"
      spinner-color="white"
      style="height: 58px; max-width: 62px"
    />
    <p class="title-large text-secondary text-uppercase q-my-md">
      {{ name }}
    </p>
    <p class="text-weight-medium text-h3" v-if="price > 0">
      <span class="text-h5">$</span>{{ price }}
    </p>
    <p class="text-weight-medium text-h3" v-if="price == 0">
      <span class="text-h5"></span>Gratis
    </p>
    <ul class="benefitsList">
      <li v-for="(benefit, index) of benefits" :key="index">
        <q-img
          src="./../assets/checkIcon.svg"
          spinner-color="dark"
          style="height: 22px; max-width: 22px"
        />
        <p class="body-medium">{{ benefit }}</p>
      </li>
    </ul>
    <div class="full-width button">
      <q-btn
        outline
        color="secondary"
        :label="price > 0 ? 'Comprar' : 'Obtener'"
        class="full-width"
        :to="baseurl + id"
      />
    </div>
  </div>
</template>

<style>
.plan {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  width: 320px;
  min-height: 427px;
  border-radius: 4px;
  padding: 32px;
}

.disableGray {
  background: #e2e2e2;
}

.plan-white {
  background: #ffffff;
}

.benefitsList p {
  margin: 0;
}

.benefitsList li {
  gap: 8px;
  align-items: center;
  width: 100%;
  display: flex;
}

.benefitsList {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

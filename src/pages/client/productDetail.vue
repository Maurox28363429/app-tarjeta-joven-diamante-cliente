<script setup>
import { useGetProductById } from 'src/querys/productQuery';
import { useRoute } from 'vue-router';
import { openURL } from 'quasar';
import { useProductCart } from 'src/stores/useProductCart';
import { useToast } from 'src/composables/useToast';

const { params } = useRoute();
const { data: product, isLoading } = useGetProductById(params.id);

const store = useProductCart();
const { triggerPositive } = useToast();

const handleContact = () => {
  openURL('https://wa.me/507' + product.value?.whatsap);
};

const addToCard = () => {
  triggerPositive('Producto agregado al carrito');
  store.setProduct(product.value);
};
</script>

<template>
  <div class="full-width column justify-center items-center full-height">
    <p class="text-weight-bold text-h6">Detalle del producto</p>
    <q-card v-if="!isLoading" style="max-width: 300px" class="full-width">
      <q-img :src="product?.img" class="full-width" spinner-color="white" />
      <q-card-section class="text-weight-medium container-section">
        <div class="row justify-between">
          <p>Nombre:</p>
          <p>{{ product?.nombre }}</p>
        </div>
        <div class="row justify-between">
          <p>Descripcion:</p>
          <div v-html="product?.descripcion" style="overflow: hidden" />
        </div>
        <div class="row justify-between">
          <p>Precio:</p>
          <p>${{ product?.precio }}</p>
        </div>
        <div class="row justify-between">
          <p>Stock:</p>
          <p>{{ product?.stock }}</p>
        </div>
      </q-card-section>
      <q-card-section style="gap: 2px" class="row">
        <q-btn
          color="positive"
          icon="la la-whatsapp"
          label="contactar"
          size="sm"
          @click="handleContact"
        />
        <q-btn
          color="primary"
          label="Agregar al carrito"
          size="sm"
          @click="addToCard"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="sass">
.container-section div p:first-child
  color: $grey
</style>

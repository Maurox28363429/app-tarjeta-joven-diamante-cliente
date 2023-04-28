<template>
  <div class="q-pa-md">
    <div class="full-width column items-center">
      <q-img
        src="../../assets/images/homeIcon.webp"
        spinner-color="dark"
        style="height: 40px; max-width: 40px"
      />
      <p class="q-ma-none text-center title-large">Home Page</p>
    </div>
    <div class="cardList">
      <div v-for="card in HOME_CARD_LIST" :key="card.id">
        <HomeCard :title="card.title" :icon="card.icon" :link="card.link" v-if="!card.evento"/>
        <HomeCard :title="card.title" :icon="card.icon" :link="card.link" v-if="card.evento" @click="showModal = true"/>
      </div>
    </div>
<!--     <div class="full-width row justify-center q-my-xl">
      <q-btn
        @click="showModal = true"
        color="primary"
        label="Seguro de accidentes personales 24/7"
      />
    </div> -->
  </div>

  <q-dialog v-model="showModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Seguro de accidentes personales 24/7</div>
      </q-card-section>

      <div class="full-width row justify-center">
        <div class="table">
          <q-table
            :dense="$q.screen.lt.md"
            flat
            bordered
            :rows="rows"
            :columns="columns"
            row-key="name"
            separator="cell"
            hide-bottom
          />
        </div>
      </div>

      <q-card-section style="max-height: 50vh" class="scroll">
        <p>
          Todas las coberturas son contra reembolso. Se necesita ingresar el
          reclamo a la aseguradora para poder recibir dicha indemnización
        </p>
        <p>
          Para el cobro de la indemnización por muerte accidental, es importante
          que el asegurado designe un beneficiario a quien se le debe entregar
          dicho dinero.
        </p>
        <p></p>

        <div class="q-mb-lg">
          <p class="q-ma-none text-weight-bold">
            Para realizar la gestión de su reclamo:
          </p>
          <p class="q-ma-none">✉️ reclamos@gtseguros.com.pa</p>
          <p class="q-ma-none">📞264-7443</p>
        </div>

        <div>
          <p class="q-ma-none text-weight-bold">
            Para consultas y mayor información sobre la póliza:
          </p>
          <p class="q-ma-none">✉️ clee@gtseguros.com.pa</p>
          <p class="q-ma-none">📞6397-0866</p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import HomeCard from 'src/components/HomeCard.vue'
import { HOME_CARD_LIST } from 'src/shared/constansts/homeCardList'
import { ref } from 'vue'

const showModal = ref(false)

const columns = [
  { name: 'cobertura', align: 'left', label: 'Cobertura', field: 'cobertura' },
  {
    name: 'limite',
    label: 'Límite',
    align: 'left',
    field: 'limite'
  }
]

const rows = [
  {
    cobertura: 'Gastos Médicos por Accidente',
    limite: '$150'
  },
  {
    cobertura: 'Muerte Accidental',
    limite: '$1,500'
  },
  {
    cobertura: 'Traslado terrestre o aéreo por accidente',
    limite: '$150'
  }
]
</script>

<style>
.cardList {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
  gap: 35px;
}

.table {
  width: 400px;
}
</style>

<template>
  <section>
    <article class="row">
      <div class="col-12 col-md-6" style="padding:1em">
         <q-card>
          <q-card-section>
            <q-img
              :src="chartUrl"
              loading="lazy"
              spinner-color="black"
              spinner-size="50"
              style="width: 100%; height: 100%"
            />
          </q-card-section>
        </q-card>
      </div>
       <div class="col-12 col-md-6" style="padding:1em">
           <q-card>
            <q-card-section>
              <q-img
                :src="chartUrl"
                loading="lazy"
                spinner-color="black"
                spinner-size="50"
                style="width: 100%; height: 100%"
              />
            </q-card-section>
          </q-card>
        </div>
         <div class="col-12 col-md-6" style="padding:1em">
           <q-card>
            <q-card-section>
              <q-img
                :src="chartUrl"
                loading="lazy"
                spinner-color="black"
                spinner-size="50"
                style="width: 100%; height: 100%"
              />
            </q-card-section>
          </q-card>
        </div>
         <div class="col-12 col-md-6" style="padding:1em">
         <q-card>
          <q-card-section>
            <q-img
              :src="chartUrl"
              loading="lazy"
              spinner-color="black"
              spinner-size="50"
              style="width: 100%; height: 100%"
            />
          </q-card-section>
        </q-card>
      </div>
    </article>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import QuickChart from 'quickchart-js';
const chart = new QuickChart();
const chartUrl = ref('');
chart.setConfig({
  type: 'pie',
  data: {
    labels: ['Administradores', 'Profesionales de la salud', 'Obreros'],
    datasets: [
      {
        label: 'Colors',
        data: [20, 10, 10],
        backgroundColor: ['#42a5f5', '#3f51b5', '#009688'],
      },
    ],
  },
});
chartUrl.value = chart.getUrl();
</script>

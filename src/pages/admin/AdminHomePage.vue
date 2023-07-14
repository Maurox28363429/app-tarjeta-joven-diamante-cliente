<template>
  <section>
    <article class="row">
      <div class="col-12 col-md-6" style="padding: 1em">
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
      <div class="col-12 col-md-6" style="padding: 1em">
        <q-card>
          <q-card-section style="text-align:center;">
            <h6>Comercios por provincia</h6>
            <q-img
              :src="chartUrl2"
              loading="lazy"
              spinner-color="black"
              spinner-size="50"
              style="width: 100%; height: 100%"
            />
          </q-card-section>
        </q-card>
      </div>
      <!--       <div class="col-12 col-md-6" style="padding: 1em">
        <q-card>
          <q-card-section>
            <q-img
              :src="chartUrl3"
              loading="lazy"
              spinner-color="black"
              spinner-size="50"
              style="width: 100%; height: 100%"
            />
          </q-card-section>
        </q-card>
      </div> -->
    </article>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import QuickChart from 'quickchart-js';
import getDashboardAdmin from 'src/api/getDashboardAdmin.js';

const chart = new QuickChart();
const chartUrl = ref('');

const chartUrl2 = ref('');
const chart2 = new QuickChart();

const chartUrl3 = ref('');
const chart3 = new QuickChart();

const obtenerData = async () => {
  const response = await getDashboardAdmin();
  if (response) {
    const meses = [];
    const meses_datos = [];
    response.edades_array.forEach((element) => {
      meses.push(element.edad);
      meses_datos.push(element.count);
    });
    chart.setConfig({
      type: 'bar',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Edades de los usuarios con membresia',
            data: meses_datos,
          },
        ],
      },
    });
    chartUrl.value = chart.getUrl();

    const provincias = [];
    const provincias_datos = [];
    response.empresas_por_provincia.forEach((element) => {
      if (element.count > 0) {
        if (element.provincia === null || element.provincia === '') {
          element.provincia = 'Sin provincia';
        }
        provincias.push(element.provincia + ' - ' + element.count);
        provincias_datos.push(element.count);
      }
    });

    chart2.setConfig({
      type: 'outlabeledPie',
      data: {
        labels: provincias,
        datasets: [
          {
            backgroundColor: [
              '#FF3784',
              '#36A2EB',
              '#4BC0C0',
              '#F77825',
              '#9966FF',
              '#10ed56',
              '#d7ed10',
              '#4a72f5',
              '#10edbf',
              '#09efb0',
              '#000000',
            ],
            data: provincias_datos,
          },
        ],
      },
      options: {
        plugins: {
          legend: false,
          outlabels: {
            text: '%l ',
            color: 'white',
            stretch: 35,
            font: {
              resizable: true,
              minSize: 12,
              maxSize: 18,
            },
          },
        },
      },
    });
    chartUrl2.value = chart2.getUrl();

    chart3.setConfig({
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [0, 1],
            backgroundColor: ['#ff7ea3', '#4153f7'],
            label: 'Dataset1',
            borderWidth: 0,
          },
        ],
        labels: ['Mujeres', 'Hombres'],
      },
      options: {
        circumference: Math.PI,
        rotation: Math.PI,
        cutoutPercentage: 75,
        layout: { padding: 50 },
        legend: { display: false },
        plugins: {
          datalabels: {
            color: '#404040',
            anchor: 'end',
            align: 'end',
            formatter: (val) => val + '',
            font: { size: 25, weight: 'bold' },
          },
          doughnutlabel: {
            labels: [
              { text: '\nVisitas', font: { size: 20 } },
              {
                text: '\nPor genero',
                color: '#000',
                font: { size: 25, weight: 'bold' },
              },
            ],
          },
        },
      },
    });
    chartUrl3.value = chart3.getUrl();
  }
};
onMounted(async () => {
  await obtenerData();
});
</script>

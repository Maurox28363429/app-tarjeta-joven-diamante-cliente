<template>
  <section>
    <article class="row">
      <div class="col-12 col-md-6" style="padding: 1em">
        <q-card>
          <q-card-section>
            <h5>Visitas por mes</h5>
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
          <q-card-section>
            <h5>Visitas por edad</h5>
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
      <div class="col-12 col-md-6" style="padding: 1em">
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
      </div>
    </article>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import QuickChart from 'quickchart-js';
import getDashboardComercio from 'src/api/getDashboardComercio.js';

const chart = new QuickChart();
const chartUrl = ref('');

const chartUrl2 = ref('');
const chart2 = new QuickChart();

const chartUrl3 = ref('');
const chart3 = new QuickChart();

const obtenerData = async () => {
  const response = await getDashboardComercio(
    JSON.parse(localStorage.getItem('user')).user.id
  );
  if (response) {
    console.log(response);
    const meses = [];
    const meses_datos = [];
    response.visitas_por_mes.forEach((element) => {
      meses.push(element.mes);
      meses_datos.push(element.visitas);
    });

    chart.setConfig({
      type: 'bar',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Visitas',
            data: meses_datos,
          },
        ],
      },
    });
    chartUrl.value = chart.getUrl();

    const edades = [];
    const edades_datos = [];
    response.edades_visitas.forEach((element) => {
      edades.push(element.edad);
      edades_datos.push(element.visitas);
    });
    chart2.setConfig({
      type: 'pie',
      data: {
        labels: edades,
        datasets: [
          {
            label: 'Visitas',
            data:edades_datos
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: 'white' // set color of numbers on y-axis to white
            }
          }]
        }
      }
    });
    chartUrl2.value = chart2.getUrl();

    chart3.setConfig({
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [response.sexo_visitas[0], response.sexo_visitas[1]],
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

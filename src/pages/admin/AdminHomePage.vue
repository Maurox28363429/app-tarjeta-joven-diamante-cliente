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
          <q-card-section>
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
      <div class="col-12 col-md-6" style="padding: 1em">
        <q-card>
          <q-card-section>
            <q-img
              :src="chartUrl4"
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
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Users',
        data: [50, 60, 70, 180],
      },
      {
        label: 'Revenue',
        data: [100, 200, 300, 400],
      },
    ],
  },
});
chartUrl.value = chart.getUrl();

const chartUrl2 = ref('');
const chart2 = new QuickChart();
chart2.setConfig({
  type: 'radar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      { label: 'Dogs', data: [50, 60, 70, 180, 190] },
      { label: 'Cats', data: [100, 200, 300, 400, 500] },
    ],
  },
});
chartUrl2.value = chart2.getUrl();

const chartUrl3 = ref('');
const chart3 = new QuickChart();
chart3.setConfig({
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [24, 66],
        backgroundColor: ['green', '#eee'],
        label: 'Dataset1',
        borderWidth: 0,
      },
    ],
    labels: ['A', 'C'],
  },
  options: {
    circumference: Math.PI,
    rotation: Math.PI,
    cutoutPercentage: 75,
    layout: { padding: 40 },
    legend: { display: false },
    plugins: {
      datalabels: {
        color: '#404040',
        anchor: 'end',
        align: 'end',
        formatter: (val) => val + '%',
        font: { size: 25, weight: 'bold' },
      },
      doughnutlabel: {
        labels: [
          { text: '\nYourstatusis', font: { size: 20 } },
          {
            text: '\nhealthy',
            color: '#000',
            font: { size: 25, weight: 'bold' },
          },
        ],
      },
    },
  },
});
chartUrl3.value = chart3.getUrl();

const chartUrl4 = ref('');
const chart4 = new QuickChart();
chart4.setConfig({
  type: 'polarArea',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{ data: [50, 60, 70, 180, 190] }],
  },
});
chartUrl4.value = chart4.getUrl();
</script>

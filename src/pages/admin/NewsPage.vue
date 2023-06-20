<template>
  <q-page class="flex">
    <section class="row" style="width:100%;padding:1em">
      <div class="col-12">
        <q-form class="full-width row justify-center" @submit="buscar()" style="padding:1em">
          <q-input
            class="full-width"
            rounded
            v-model="search"
            style="max-width: 400px"
            outlined
            type="search"
            label="Buscar noticia"
            color="primary"
          >
            <q-btn
              type="submit"
              size="md"
              style="
              right: -12px;
              bottom: 0;
              top: 0;
              border-radius: 0 26px 26px 0;
            "
              color="primary"
              label="Buscar"
              icon="search"
              class="absolute"
            />
          </q-input>
        </q-form>
        <table style="width:100%;">
          <thead>
            <tr>
              <th>ID</th>
              <th>IMG</th>
              <th>Titulo</th>
              <th>Prioridad</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="noticia,index in noticias" :key="index">
              <td>{{noticia.id}}</td>
              <td>
                <q-img
                  :src="noticia.img_url"
                  loading="lazy"
                  spinner-color="white"
                  style="width:100%;height:auto;min-width:30px;"
                />
              </td>
              <td>
                {{ noticia.titulo }}
              </td>
              <td>
                {{ noticia.prioridad }}
              </td>
              <td>
                {{ noticia.created_at }}
              </td>
              <td>
                 <q-btn flat icon="more_vert">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section>Editar</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Eliminar</q-item-section>
                      </q-item>
                    </q-list>
                    </q-menu>
                  </q-btn>
              </td>
            </tr>
          </tbody>
        </table>
        <article style="margin:1em">
           <q-pagination
              v-model="paginador.current"
              :max="paginador.lastPage"
              direction-links
              outline
              color="blue"
              active-design="unelevated"
              active-color="white"
              active-text-color="blue"
              class="flex justify-center"
            />
        </article>
      </div>
    </section>
    <!--Modal ADD AND EDIT-->
    <q-dialog v-model="formulario">
      <form id="form">
        <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">
                {{ edit_id ? 'Editar' : 'Agregar' }} Noticia
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input v-model="form_noticia.titulo" label="Titulo" />
              <q-input v-model="form_noticia.descripcion" label="Descripcion" />
              <q-input v-model="form_noticia.prioridad" label="Prioridad" />
              <q-input v-model="form_noticia.img"  type="file"/>

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancelar" v-close-popup />
              <q-btn flat label="Enviar" v-close-popup />
            </q-card-actions>
          </q-card>
      </form>
      </q-dialog>
    <!--Floating button-->
    <q-page-sticky position="bottom-right" style="margin:12px">
      <q-btn fab icon="add" color="blue" @click="formulario=true"/>
    </q-page-sticky>
  </q-page>
</template>
<style>
  td,th{
    text-align:center;
  }
  table{
    border-collapse: collapse;
  }
  table, th, td {
    border: 1px solid rgb(4, 120, 203);
  }
  td,th{
    min-width:30px;
    padding:0.5em;
  }
</style>
<script setup>
import { ref,onMounted } from 'vue'
import getNewsInformative from 'src/api/getNewsInformative.js'
import createNoticiaInformativa from 'src/api/createNoticiaInformativa.js'
import editNoticiaInformativa from 'src/api/editNoticiaInformativa.js'

const paginador = ref({
  current: 1,
  lastPage: 1,
})
const formulario = ref(false);
const noticias = ref([]);
const edit_id = ref(null);
const form_noticia=ref({
  titulo:'',
  descripcion:'',
  prioridad:'',
  img:'',
});
const search = ref('');
const getNoticias = async () => {
  const { data } = await getNewsInformative({
    page: paginador.value.current,
    search: search.value,
  });
  noticias.value = data.data;
  paginador.value = {
    current: data.pagination.currentPage,
    lastPage: data.pagination.lastPage,
  };

};
const buscar=async ()=>{
  await getNoticias();
}
onMounted(async()=>
{
  await getNoticias();
});
</script>

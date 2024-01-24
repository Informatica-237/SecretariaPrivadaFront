<template>
  <NavBar @buscar="filtrarDatos"></NavBar>

  <div v-if="isAuthenticated" class="div-tabla">
    <div class="table-responsive">
      <table class="table table-hover tabla">
        <thead>
          <tr class="table-active table-primary">
            <!-- <th class="columnas" scope="col">#</th> -->
            <th class="columnas columnas-ordenadas" scope="col">NOMBRE</th>
            <th class="columnas columnas-ordenadas" scope="col">APELLIDO</th>
            <th class="columnas columnas-ordenadas" scope="col">direccion</th>
            <th class="columnas columnas-ordenadas" scope="col">CARGO</th>
            <th class="columnas columnas-ordenadas" scope="col">TELEFONOS</th>
            <th class="columnas columnas-ordenadas" scope="col">ESTADO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dato in datosPaginados" :key="dato.id">
            <!-- <th scope="row">{{ dato.id }}</th> -->
            <td class="columnas columnas-ordenadas">{{ dato.nombre }}</td>
            <td class="columnas columnas-ordenadas">{{ dato.apellido }}</td>
            <td class="columnas columnas-ordenadas">{{ dato.direccion }}</td>
            <td class="columnas columnas-ordenadas">{{ dato.cargo }}</td>
            <td class="columnas columnas-ordenadas">{{ dato.telefonos }}</td>
            <td class="columnas columnas-ordenadas">
              <select
  class="form-select"
  v-model="datoSeleccionado.auditar"
  @change="cambiarAuditar(datoSeleccionado)"
  :style="{
    backgroundColor: datoSeleccionado.auditar === true ? 'yellow' : '#2AD353',
  }"
>
  <option value="true">Pendiente</option>
  <option value="false">Terminado</option>
</select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paginacion">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: paginaActual === 1 }">
            <a
              class="page-link"
              @click="cambiarPagina(paginaActual - 1)"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            v-for="pagina in paginasMostradas"
            :key="pagina"
            class="page-item"
            :class="{ active: pagina === paginaActual }"
          >
            <a class="page-link" @click="cambiarPagina(pagina)">{{ pagina }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: paginaActual === numeroPaginas }"
          >
            <a
              class="page-link"
              @click="cambiarPagina(paginaActual + 1)"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import { onMounted } from "vue";
import useAuth from "../composables/useUser";
import axios from "axios";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      datos: [],
      paginaActual: 1,
      elementosPorPagina: 8,
      filtroBusqueda: "",
      datoSeleccionado: {},
      datosAcciones: "",
      nuevoDato: {
        auditar: null,
      },
    };
  },
  created() {
    this.crearDatos();
  },
  setup() {
    const { validateToken, user, isAuthenticated } = useAuth(); // Añade isAuthenticated aquí

    onMounted(async () => {
      await validateToken();
    });

    return {
      user,
      isAuthenticated, // Añade isAuthenticated aquí
    };
  },
  computed: {
    datosPaginados() {
      const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
      const fin = inicio + this.elementosPorPagina;

      const datosFiltrados = this.datos.filter(
        (dato) =>
          dato.nombre
            .toLowerCase()
            .includes(this.filtroBusqueda.toLowerCase()) ||
          dato.apellido
            .toLowerCase()
            .trim()
            .includes(this.filtroBusqueda.toLowerCase().trim())
        //     &&
        // dato.auditar === true // Agregar esta condición para filtrar por auditar en true
      );

      return datosFiltrados.slice(inicio, fin);
    },

    numeroPaginas() {
      return Math.ceil(this.datos.length / this.elementosPorPagina);
    },
    paginasMostradas() {
      const cantidadPaginasMostradas = 5; // Puedes ajustar este valor según tus necesidades
      const mitadCantidadPaginasMostradas = Math.floor(
        cantidadPaginasMostradas / 2
      );

      let inicio = this.paginaActual - mitadCantidadPaginasMostradas;
      inicio = Math.max(1, inicio); // Asegurarse de que no sea menor que 1

      let fin = inicio + cantidadPaginasMostradas - 1;
      fin = Math.min(this.numeroPaginas, fin); // Asegurarse de que no sea mayor que el total de páginas

      return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
    },
  },
  methods: {
    filtrarDatos(filtro) {
      this.filtroBusqueda = filtro;
    },

    cambiarAuditar(datoSeleccionado) {
  const id = datoSeleccionado.id;
  const url = `/datos/actualizar/${id}`;

  axios
    .patch(url, { auditar: datoSeleccionado.auditar }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // Actualizar el dato en la lista
        const index = this.datos.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.datos[index].auditar = datoSeleccionado.auditar;
        }
        console.log(`Valor de auditar cambiado para el dato con ID ${id}.`);
        console.log(response.data); // Imprime los datos de la respuesta

        // Guardar el valor en nuevoDato
        this.nuevoDato.auditar = datoSeleccionado.auditar;
      } else {
        console.error("La solicitud no fue exitosa:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error al actualizar los datos:", error);
    });
  },

    cambiarPagina(pagina) {
      this.paginaActual = pagina;
      this.filtroBusqueda = "";
    },
    cambiarPaginaDesdeBusqueda() {
      this.paginaActual = 1;
    },

    crearDatos() {
      axios
        .get("/datos/all")

        .then((response) => {
          this.datos = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style scoped>
.amarillo {
  background-color: yellow;
}

.verde {
  background-color: green;
}
</style>


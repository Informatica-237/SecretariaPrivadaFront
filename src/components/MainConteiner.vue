<template>
  <!-- TABLA PRINCIPAL -->
  <div v-if="isAuthenticated">
    <NavBar @buscar="filtrarDatos" />

    <div class="div-tabla m-3 d-flex justify-content-start">
      <button
        class="btn btn-outline-primary btn-lg"
        type="submit"
        data-bs-toggle="modal"
        data-bs-target="#modalCrear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
          />
        </svg>
        Agregar Persona
      </button>
    </div>

    <div class="div-tabla d-flex justify-content-start">
      <div class="table-responsive w-100">
        <table class="table table-striped table-hover tabla">
          <thead>
            <tr class="table-primary">
              <!-- <th class="columnas" scope="col">#</th> -->
              <th class="columnas columnas-ordenadas" scope="col">NOMBRE</th>
              <th class="columnas columnas-ordenadas" scope="col">APELLIDO</th>
              <th class="columnas columnas-ordenadas" scope="col">DNI</th>
              <th class="columnas columnas-ordenadas" scope="col">CARGO</th>
              <th class="columnas columnas-ordenadas" scope="col">TELEFONOS</th>
              <th class="columnas columnas-ordenadas" scope="col">
                OBSERVACIONES
              </th>
              <th class="columnas"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dato in datosPaginados" :key="dato.id">
              <!-- <th scope="row">{{ dato.id }}</th> -->

              <td class="columnas columnas-ordenadas ancho-td">
                {{ dato.nombre }}
              </td>
              <td class="columnas columnas-ordenadas ancho-td">
                {{ dato.apellido }}
              </td>
              <td class="columnas columnas-ordenadas ancho-td">
                {{ dato.dni }}
              </td>
              <td class="columnas columnas-ordenadas ancho-td">
                {{ dato.cargo }}
              </td>
              <td class="columnas columnas-ordenadas ancho-td">
                {{ dato.telefonos }}
              </td>
              <td
                class="columnas columnas-ordenadas ancho-td"
                @click="mostrarModalAcciones(dato.acciones)"
              >
                {{ dato.acciones }}
              </td>
              <td class="alinear-botones">
                <button class="btn editar" @click="mostrarModalInfoCompleta(dato)"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18.5 6.59c-1.333-.726-2.667-1.09-4-1.09s-2.667.364-4 1.09v9.91c1.333-.667 2.667-1 4-1s2.667.333 4 1z"/><path d="M16.556 7.788c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m-3.888-6C7.87 7.596 7.186 7.5 6.5 7.5s-1.37.096-2.056.288m4.112 2C7.87 9.596 7.186 9.5 6.5 9.5s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288"/><path d="M10.5 6.59c-1.333-.726-2.667-1.09-4-1.09s-2.667.364-4 1.09v9.91c1.333-.667 2.667-1 4-1s2.667.333 4 1z"/></g></svg></button>
                <button class="editar btn" @click="mostrarModalEditar(dato)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#eab308"
                      d="M10 15q-.425 0-.713-.288T9 14v-2.425q0-.4.15-.763t.425-.637l8.6-8.6q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.138.738t-.437.662l-8.6 8.6q-.275.275-.637.438t-.763.162H10Zm9.6-9.2l1.425-1.4l-1.4-1.4L18.2 4.4l1.4 1.4ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8.925l-6.35 6.35q-.275.275-.425.638T7 10.75V15q0 .825.588 1.412T9 17h4.225q.4 0 .763-.15t.637-.425L21 10.05V19q0 .825-.588 1.413T19 21H5Z"
                    />
                  </svg>
                </button>
                <button
                  class="eliminar btn btn-c"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-eliminar"
                  @click="mostrarModalEliminar(dato)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 304 384"
                  >
                    <path
                      fill="#e11d48"
                      d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- PAGINACION -->
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
    
    
    <!-- MODAL EDITAR -->
    <div
      class="modal fade"
      id="modalEditar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content borde-redondo">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabelEditar">
              EDITAR DATOS
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body contenedor ordenarContenido">
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.nombre"
                type="text"
                class="form-control borde-redondo"
                id="nombreEditar"
                autocomplete="off"
                placeholder="Nombre"
              />
              <label for="nombre">NOMBRE</label>
            </div>
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.apellido"
                type="text"
                class="form-control borde-redondo"
                id="apellidoEditar"
                autocomplete="off"
                placeholder="Apellido"
              />
              <label for="apellido">APELLIDO</label>
            </div>
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.dni"
                type="number"
                class="form-control borde-redondo"
                id="dniEditar"
                autocomplete="off"
                placeholder="DNI"
              />
              <label for="apellido">DNI</label>
            </div>
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.direccion"
                type="text"
                class="form-control borde-redondo"
                id="direccionEditar"
                autocomplete="off"
                placeholder="direccion"
              />
              <label for="direccion">DIRECCION</label>
            </div>
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.cargo"
                type="text"
                class="form-control borde-redondo"
                id="cargoEditar"
                autocomplete="off"
                placeholder="Cargo"
              />
              <label for="cargo">CARGO</label>
            </div>
            <div class="form-floating">
              <!-- EL ONINPUT HACE QUE SOLO SE PUEDA ESCRIBIR NUMEROS  -->
              <input
                v-model="datoSeleccionadoEditar.telefonos"
                oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                type="text"
                name="numero"
                pattern="[0-9]*"
                class="form-control borde-redondo"
                id="telefonosEditar"
                autocomplete="off"
                placeholder="Telefonos"
              />
              <label for="telefonos">TELEFONOS</label>
            </div>
            <div class="form-floating">
              <div class="form-check custom-checkbox-container">
                <button
                  v-on:click="datoSeleccionadoEditar.auditar = !datoSeleccionadoEditar.auditar"
                  class="btn btn-outline-primary"
                  :class="{ 'btn-custom-selected': datoSeleccionadoEditar.auditar }"
                  type="button"
                  id="auditarEditar"
                >
                  AUDIENCIA
                </button>
              </div>
            </div>
            </div>
            <h1 class="modal-title fs-5 m-4" id="exampleModalLabel">
              FICHA
            </h1>
            <div class="modal-body contenedor ordenarContenido">
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.nSolicitud"
                type="number"
                class="form-control borde-redondo"
                id="nSolicitudEditar"
                autocomplete="off"
                placeholder="Número de Solicitud"
              />
              <label for="nSolicitud">NÚMERO DE SOLICITUD</label>
            </div>

            <!-- Fecha -->
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.fecha"
                type="date"
                class="form-control borde-redondo"
                id="fechaEditar"
                autocomplete="off"
                placeholder="Fecha"
              />
              <label for="fecha">FECHA</label>
            </div>

            <!-- Tema de Audiencia -->
            <div class="form-floating">
              <textarea
                v-model="datoSeleccionadoEditar.temaAudiencia"
                type="text"
                class="form-control borde-redondo"
                id="temaAudienciaEditar"
                autocomplete="off"
                placeholder="Tema de Audiencia"
              ></textarea>
              <label for="temaAudiencia">TEMA DE AUDIENCIA</label>
            </div>

            <div class="mb-3"></div>

            <!-- Terreno -->
            <div class="form-check form-switch border border-primary rounded p-2 ">
              <input
                v-model="datoSeleccionadoEditar.terreno"
                class="form-check-input"
                type="checkbox"
                id="terrenoEditar"
              />
              <label id="switchEditar" class="form-check-label" for="terreno"
                >¿Tiene terreno?</label
              >
            </div>
          

            <!-- Anotado -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="datoSeleccionadoEditar.anotado"
                class="form-check-input"
                type="checkbox"
                id="anotadoEditar"
              />
              <label id="switch" class="form-check-label" for="anotado"
                >¿Está anotado?</label
              >
            </div>

            <!-- Año -->
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.año"
                type="number"
                class="form-control borde-redondo"
                id="añoEditar"
                autocomplete="off"
                placeholder="Año"
              />
              <label for="año">AÑO INSCRIPCION</label>
            </div>
            <div class="mb-3"></div>
            <!-- Tiene Casa -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="datoSeleccionadoEditar.tieneCasa"
                class="form-check-input"
                type="checkbox"
                id="tieneCasaEditar"
              />
              <label id="switch" class="form-check-label" for="tieneCasa"
                >¿Tiene casa?</label
              >
            </div>

            <!-- Donde Alquila -->
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.dondeAlquila"
                type="text"
                class="form-control borde-redondo"
                id="dondeAlquilaEditar"
                autocomplete="off"
                placeholder="Donde Alquila"
              />
              <label for="dondeAlquila">DONDE ALQUILA</label>
            </div>

            <!-- Tiene Trabajo -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="datoSeleccionadoEditar.tieneTrabajo"
                class="form-check-input"
                type="checkbox"
                id="tieneTrabajoEditar"
              />
              <label id="switch" class="form-check-label" for="tieneTrabajo"
                >¿Tiene trabajo?</label
              >
            </div>

            <!-- Donde Trabaja -->
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.dondeTrabaja"
                type="text"
                class="form-control borde-redondo"
                id="dondeTrabajaEditar"
                autocomplete="off"
                placeholder="Donde Trabaja"
              />
              <label for="dondeTrabaja">DONDE TRABAJA</label>
            </div>

            <!-- Motivo de Consulta -->
            <div class="form-floating">
              <textarea
                v-model="datoSeleccionadoEditar.motivoConsulta"
                type="text"
                class="form-control borde-redondo"
                id="motivoConsultaEditar"
                autocomplete="off"
                placeholder="Motivo de Consulta"
            ></textarea>
              <label for="motivoConsulta">MOTIVO DE CONSULTA</label>
            </div>
            <div class="mb-3"></div>

            <!-- Recibio Asistencia Social -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="datoSeleccionadoEditar.recibioASocial"
                class="form-check-input"
                type="checkbox"
                id="recibioASocialEditar"
              />
              <label id="switch" class="form-check-label" for="recibioASocial"
                >¿Recibió Asistencia Social?</label
              >
            </div>

            <!-- Barrio Asistencia Social -->
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.barrioASocial"
                type="text"
                class="form-control borde-redondo"
                id="barrioASocialEditar"
                autocomplete="off"
                placeholder="Barrio Asistencia Social"
              />
              <label for="barrioASocial">BARRIO ASISTENCIA SOCIAL</label>
            </div>

            <!-- Cuando Asistencia Social -->
            <div class="form-floating">
              <input
                v-model="datoSeleccionadoEditar.cuandoASocial"
                type="date"
                class="form-control borde-redondo"
                id="cuandoASocialEditar"
                autocomplete="off"
                placeholder="Cuando Asistencia Social"
              />
              <label for="cuandoASocial">CUANDO RECIBIO ASISTENCIA SOCIAL</label>
            </div>

            <!-- Recibe Asistencia Social -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="datoSeleccionadoEditar.recibeASocial"
                class="form-check-input"
                type="checkbox"
                id="recibeASocialEditar"
              />
              <label id="switch" class="form-check-label" for="recibeASocial"
                >¿Recibe Asistencia Social?</label
              >
            </div>

            <!-- Contraprestacion -->
            <div class="form-floating">
              <textarea
                v-model="datoSeleccionadoEditar.contraprestacion"
                type="text"
                class="form-control borde-redondo"
                id="contraprestacionEditar"
                autocomplete="off"
                placeholder="Contraprestación"
            ></textarea>
              <label for="contraprestacion">CONTRAPRESTACIÓN A REALIZAR</label>
            </div>

            <!-- Observaciones -->
            <div class="form-floating">
              <textarea
                v-model="datoSeleccionadoEditar.acciones"
                type="text"
                class="form-control borde-redondo"
                id="accionesEditar"
                autocomplete="off"
                placeholder="Acciones"
            ></textarea>
              <label for="acciones">OBSERVACIONES</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="
                () => {
                  guardarEdicion();
                }
              "
            >
              GUARDAR CAMBIOS
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FIN MODAL EDITAR  -->

    <!-- MODAL ELIMINAR  -->
    <div
      class="modal fade"
      id="modal-eliminar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              <b>SEGURO QUE QUIERE ELIMINAR ESTOS DATOS?</b>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- <p>ID: {{ datoSeleccionado.id }}</p> -->
            <p>NOMBRE: {{ datoSeleccionado.nombre }}</p>
            <p>APELLIDO: {{ datoSeleccionado.apellido }}</p>
            <!-- <p>DNI: {{ datoSeleccionado.dni }}</p>
            <p>direccion: {{ datoSeleccionado.direccion }}</p>
            <p>CARGO: {{ datoSeleccionado.cargo }}</p>
            <p>TELEFONOS: {{ datoSeleccionado.telefonos }}</p>
            <p>ACCIONES: {{ datoSeleccionado.acciones }}</p> -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              @click="eliminarDato()"
              type="submit"
              id="liveToastBtn"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ALERTA ELIMINADO  -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">AVISO</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">DATOS ELIMINADOS CORRECTAMENTE</div>
      </div>
    </div>
    <!-- FIN ALERTA ELIMINADO  -->

    <!-- FIN MODAL ELIMINAR  -->


    
    <!-- MODAL CREAR  -->
    <div
      class="modal fade"
      id="modalCrear"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content borde-redondo">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              NUEVOS DATOS
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body contenedor ordenarContenido">
            <div class="form-floating">
              <input
                v-model="nuevoDato.nombre"
                type="text"
                class="form-control borde-redondo"
                id="nombre"
                autocomplete="off"
                placeholder="Nombre"
              />
              <label for="nombre">NOMBRE</label>
            </div>
            <div class="form-floating">
              <input
                v-model="nuevoDato.apellido"
                type="text"
                class="form-control borde-redondo"
                id="apellido"
                autocomplete="off"
                placeholder="Apellido"
              />
              <label for="apellido">APELLIDO</label>
            </div>
            <div class="form-floating">
              <input
                v-model="nuevoDato.dni"
                type="number"
                class="form-control borde-redondo"
                id="dni"
                autocomplete="off"
                placeholder="DNI"
              />
              <label for="apellido">DNI</label>
            </div>
            <div class="form-floating">
              <input
                v-model="nuevoDato.direccion"
                type="text"
                class="form-control borde-redondo"
                id="direccion"
                autocomplete="off"
                placeholder="direccion"
              />
              <label for="direccion">DIRECCION</label>
            </div>
            <div class="form-floating">
              <input
                v-model="nuevoDato.cargo"
                type="text"
                class="form-control borde-redondo"
                id="cargo"
                autocomplete="off"
                placeholder="Cargo"
              />
              <label for="cargo">CARGO</label>
            </div>
            <div class="form-floating">
              <!-- EL ONINPUT HACE QUE SOLO SE PUEDA ESCRIBIR NUMEROS  -->
              <input
                v-model="nuevoDato.telefonos"
                oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                type="text"
                name="numero"
                pattern="[0-9]*"
                class="form-control borde-redondo"
                id="telefonos"
                autocomplete="off"
                placeholder="Telefonos"
              />
              <label for="telefonos">TELEFONOS</label>
            </div>
            <div class="form-floating">
              <div class="form-check custom-checkbox-container">
                <button
                  v-on:click="nuevoDato.auditar = !nuevoDato.auditar"
                  class="btn btn-outline-primary"
                  :class="{ 'btn-custom-selected': nuevoDato.auditar }"
                  type="button"
                  id="auditar"
                >
                  AUDIENCIA
                </button>
              </div>
            </div>
            </div>
            <h1 class="modal-title fs-5 m-4" id="exampleModalLabel">
              FICHA
            </h1>
            <div class="modal-body contenedor ordenarContenido">
            <div class="form-floating">
              <input
                v-model="nuevoDato.nSolicitud"
                type="number"
                class="form-control borde-redondo"
                id="nSolicitud"
                autocomplete="off"
                placeholder="Número de Solicitud"
              />
              <label for="nSolicitud">NÚMERO DE SOLICITUD</label>
            </div>

            <!-- Fecha -->
            <div class="form-floating">
              <input
                v-model="nuevoDato.fecha"
                type="date"
                class="form-control borde-redondo"
                id="fecha"
                autocomplete="off"
                placeholder="Fecha"
              />
              <label for="fecha">FECHA</label>
            </div>

            <!-- Tema de Audiencia -->
            <div class="form-floating">
              <textarea
                v-model="nuevoDato.temaAudiencia"
                type="text"
                class="form-control borde-redondo"
                id="temaAudiencia"
                autocomplete="off"
                placeholder="Tema de Audiencia"
              ></textarea>
              <label for="temaAudiencia">TEMA DE AUDIENCIA</label>
            </div>

            <div class="mb-3"></div>

            <!-- Terreno -->
            <div class="form-check form-switch border border-primary rounded p-2 ">
              <input
                v-model="nuevoDato.terreno"
                class="form-check-input"
                type="checkbox"
                id="terreno"
              />
              <label id="switch" class="form-check-label" for="terreno"
                >¿Tiene terreno?</label
              >
            </div>
          

            <!-- Anotado -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="nuevoDato.anotado"
                class="form-check-input"
                type="checkbox"
                id="anotado"
              />
              <label id="switch" class="form-check-label" for="anotado"
                >¿Está anotado?</label
              >
            </div>

            <!-- Año -->
            <div class="form-floating">
              <input
                v-model="nuevoDato.año"
                type="number"
                class="form-control borde-redondo"
                id="año"
                autocomplete="off"
                placeholder="Año"
              />
              <label for="año">AÑO INSCRIPCION</label>
            </div>
            <div class="mb-3"></div>
            <!-- Tiene Casa -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="nuevoDato.tieneCasa"
                class="form-check-input"
                type="checkbox"
                id="tieneCasa"
              />
              <label id="switch" class="form-check-label" for="tieneCasa"
                >¿Tiene casa?</label
              >
            </div>

            <!-- Donde Alquila -->
            <div class="form-floating">
              <input
                v-model="nuevoDato.dondeAlquila"
                type="text"
                class="form-control borde-redondo"
                id="dondeAlquila"
                autocomplete="off"
                placeholder="Donde Alquila"
              />
              <label for="dondeAlquila">DONDE ALQUILA</label>
            </div>

            <!-- Tiene Trabajo -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="nuevoDato.tieneTrabajo"
                class="form-check-input"
                type="checkbox"
                id="tieneTrabajo"
              />
              <label id="switch" class="form-check-label" for="tieneTrabajo"
                >¿Tiene trabajo?</label
              >
            </div>

            <!-- Donde Trabaja -->
            <div class="form-floating">
              <input
                v-model="nuevoDato.dondeTrabaja"
                type="text"
                class="form-control borde-redondo"
                id="dondeTrabaja"
                autocomplete="off"
                placeholder="Donde Trabaja"
              />
              <label for="dondeTrabaja">DONDE TRABAJA</label>
            </div>

            <!-- Motivo de Consulta -->
            <div class="form-floating">
              <textarea
                v-model="nuevoDato.motivoConsulta"
                type="text"
                class="form-control borde-redondo"
                id="motivoConsulta"
                autocomplete="off"
                placeholder="Motivo de Consulta"
            ></textarea>
              <label for="motivoConsulta">MOTIVO DE CONSULTA</label>
            </div>
            <div class="mb-3"></div>

            <!-- Recibio Asistencia Social -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="nuevoDato.recibioASocial"
                class="form-check-input"
                type="checkbox"
                id="recibioASocial"
              />
              <label id="switch" class="form-check-label" for="recibioASocial"
                >¿Recibió Asistencia Social?</label
              >
            </div>

            <!-- Barrio Asistencia Social -->
            <div class="form-floating">
              <input
                v-model="nuevoDato.barrioASocial"
                type="text"
                class="form-control borde-redondo"
                id="barrioASocial"
                autocomplete="off"
                placeholder="Barrio Asistencia Social"
              />
              <label for="barrioASocial">BARRIO ASISTENCIA SOCIAL</label>
            </div>

            <!-- Cuando Asistencia Social -->
            <div class="form-floating">
              <input
                v-model="nuevoDato.cuandoASocial"
                type="date"
                class="form-control borde-redondo"
                id="cuandoASocial"
                autocomplete="off"
                placeholder="Cuando Asistencia Social"
              />
              <label for="cuandoASocial">CUANDO RECIBIO ASISTENCIA SOCIAL</label>
            </div>

            <!-- Recibe Asistencia Social -->
            <div class="form-check form-switch border border-primary rounded p-2">
              <input
                v-model="nuevoDato.recibeASocial"
                class="form-check-input"
                type="checkbox"
                id="recibeASocial"
              />
              <label id="switch" class="form-check-label" for="recibeASocial"
                >¿Recibe Asistencia Social?</label
              >
            </div>

            <!-- Contraprestacion -->
            <div class="form-floating">
              <textarea
                v-model="nuevoDato.contraprestacion"
                type="text"
                class="form-control borde-redondo"
                id="contraprestacion"
                autocomplete="off"
                placeholder="Contraprestación"
            ></textarea>
              <label for="contraprestacion">CONTRAPRESTACIÓN A REALIZAR</label>
            </div>

            <!-- Observaciones -->
            <div class="form-floating">
              <textarea
                v-model="nuevoDato.acciones"
                type="text"
                class="form-control borde-redondo"
                id="acciones"
                autocomplete="off"
                placeholder="Acciones"
            ></textarea>
              <label for="acciones">OBSERVACIONES</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="guardarDatos"
            >
              GUARDAR DATOS
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- FIN MODAL CREAR  -->

    <!-- MODAL ACCIONES  -->
    <!-- Modal para mostrar los datos de la columna "Acciones" -->
    <div class="modal" id="modalAcciones" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Datos de Acciones</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Mostrar los datos de la columna "Acciones" -->
            <p>{{ datosAcciones }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
 

  <!-- FIN MODAL ACCIONES  -->

  <!-- Nueva sección para el modal de información completa -->
  <div class="modal fade" id="modalInfoCompleta" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Información Completa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ordenarContenido" :key="datoSeleccionado.id">
        <!-- Mostrar aquí la información completa -->

   
        <td class="border border-dark p-2" >NOMBRE: {{ datoSeleccionado.nombre }}</td>
        <td class="border border-dark p-2" >APELLIDO: {{ datoSeleccionado.apellido }}</td>
        <td class="border border-dark p-2" >DNI: {{ datoSeleccionado.dni }}</td>
        <td class="border border-dark p-2" >DIRECCION: {{ datoSeleccionado.direccion }}</td>
        <td class="border border-dark p-2" >CARGO: {{ datoSeleccionado.cargo }}</td>
        <td class="border border-dark p-2" >TELEFONOS: {{ datoSeleccionado.telefonos }}</td>
        <td class="border border-dark p-2" >NUMERO DE SOLICITUD: {{ datoSeleccionado.nSolicitud }}</td>
        <td class="border border-dark p-2" >FECHA: {{ datoSeleccionado.fecha }}</td>
        <td class="border border-dark p-2" >TEMA DE AUDIENCIA: {{ datoSeleccionado.temaAudiencia }}</td>
        <td class="border border-dark p-2" >¿TIENE TERRENO?: {{ datoSeleccionado.terreno ? 'Si' : 'No' }}</td>
        <td class="border border-dark p-2" >¿ESTA ANOTADO?: {{ datoSeleccionado.anotado ? 'Si' : 'No' }}</td>
        <td class="border border-dark p-2" >¿AÑO INSCRIPCION?: {{ datoSeleccionado.año }}</td>
        <td class="border border-dark p-2" >¿TIENE CASA?: {{ datoSeleccionado.tieneCasa ? 'Si' : 'No' }}</td>
        <td class="border border-dark p-2" >DONDE ALQUILA: {{ datoSeleccionado.dondeAlquila }}</td>
        <td class="border border-dark p-2" >¿TIENE TRABAJO?: {{ datoSeleccionado.tienetrabajo ? 'Si' : 'No' }}</td>
        <td class="border border-dark p-2" >DONDE TRABAJA: {{ datoSeleccionado.dondeTrabaja }}</td>
        <td class="border border-dark p-2" >MOTIVO DE CONSULTA: {{ datoSeleccionado.motivoConsulta }}</td>
        <td class="border border-dark p-2" >¿RECIBIO ASISTENCIA SOCIAL?: {{ datoSeleccionado.recibioASocial ? 'Si' : 'No' }}</td>
        <td class="border border-dark p-2" >BARRIO ASISTENCIA SOCIAL: {{ datoSeleccionado.barrioASocial }}</td>
        <td class="border border-dark p-2" >CUANDO ASISTENCIA SOCIAL: {{ datoSeleccionado.cuandoASocial }}</td>
        <td class="border border-dark p-2" >¿RECIBE ASISTENCIA SOCIAL?: {{ datoSeleccionado.recibeASocial ? 'Si' : 'No' }}</td>
        <td class="border border-dark p-2" >CONTRAPRESTACION: {{ datoSeleccionado.contraprestacion }}</td>
        <td class="border border-dark p-2" >OBSERVACIONES: {{ datoSeleccionado.acciones }}</td>
   

        <!-- Agrega más campos según tus datos -->
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" @click="descargarPDF">
    Exportar como PDF
  </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
  </div>


</div>
</template>
    
  <script>
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import { onMounted } from "vue";
import useAuth from "../composables/useUser";
// import NavBar from "./Nav.vue";
import NavBar from "./NavBar.vue";
import axios from "axios"; // Importa Axios
import router from "@/Router";
import { reactive } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";


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
        nombre: "",
        apellido: "",
        dni: 0,
        direccion: "",
        cargo: "",
        telefonos: 0,
        acciones: "",
        auditar: false,
        nSolicitud: 0,
        fecha: "",
        temaAudiencia: "",
        terreno: false,
        anotado: false,
        año: 0,
        tieneCasa: false,
        dondeAlquila: "",
        tieneTrabajo: false,
        dondeTrabaja: "",
        motivoConsulta: "",
        recibioASocial: false,
        barrioASocial: "",
        cuandoASocial: "",
        recibeASocial: false,
        contraprestacion: ""
      },
      datoSeleccionadoEditar: {
        id: null,
        nombre: "",
        apellido: "",
        dni: "",
        direccion: "",
        cargo: "",
        telefonos: "",
        acciones: "",
        auditar: false,
        nSolicitud: 0,
        fecha: "",
        temaAudiencia: "",
        terreno: false,
        anotado: false,
        año: 0,
        tieneCasa: false,
        dondeAlquila: "",
        tieneTrabajo: false,
        dondeTrabaja: "",
        motivoConsulta: "",
        recibioASocial: false,
        barrioASocial: "",
        cuandoASocial: "",
        recibeASocial: false,
        contraprestacion: ""
      },
    };
  },
  created() {
    this.crearDatos();
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

// INICIO PDF 
    descargarPDF() {
    // Crear un nuevo objeto jsPDF
    const pdf = new jsPDF();

    // Añadir un encabezado al PDF
    pdf.text("Datos de la Tabla", 14, 10);

    // Obtener solo las columnas que deseas mostrar
    const columnas = ['', '', '']; // Reemplaza con los nombres de las columnas deseadas

    // Obtener los datos de la tabla
    const datos = [
    ['NOMBRE:', this.datoSeleccionado.nombre],
    ['APELLIDO:', this.datoSeleccionado.apellido],
    ['DNI:', this.datoSeleccionado.dni],
    ['DIRECCION:', this.datoSeleccionado.direccion],
    ['CARGO:', this.datoSeleccionado.cargo],
    ['TELEFONOS:', this.datoSeleccionado.telefonos],
    ['NUMERO DE SOLICITUD:', this.datoSeleccionado.nSolicitud ],
    ['FECHA:', this.datoSeleccionado.fecha],
    ['TEMA DE AUDIENCIA:', this.datoSeleccionado.temaAudiencia],
    ['¿TIENE TERRENO?:', this.datoSeleccionado.terreno],
    ['¿ESTA ANOTADO?:', this.datoSeleccionado.anotado],
    ['¿AÑO INSCRIPCION?:', this.datoSeleccionado.año],
    ['¿TIENE CASA?:', this.datoSeleccionado.tieneCasa],
    ['DONDE ALQUILA:', this.datoSeleccionado.dondeAlquila],
    ['¿TIENE TRABAJO?:', this.datoSeleccionado.tienetrabajo],
    ['DONDE TRABAJA:', this.datoSeleccionado.dondeTrabaja],
    ['MOTIVO DE CONSULTA:', this.datoSeleccionado.motivoConsulta],
    ['¿RECIBIO ASISTENCIA SOCIAL?:', this.datoSeleccionado.recibeASocial],
    ['BARRIO ASISTENCIA SOCIAL:', this.datoSeleccionado.barrioASocial],
    ['CUANDO ASISTENCIA SOCIAL:', this.datoSeleccionado.cuandoASocial],
    ['¿RECIBE ASISTENCIA SOCIAL?:', this.datoSeleccionado.recibeASocial],
    ['CONTRAPRESTACION:', this.datoSeleccionado.contraprestacion],
    ['OBSERVACIONES:', this.datoSeleccionado.acciones],
  ];
  // Agrega más filas según la estructura de tu objeto

    // Agregar una tabla al PDF utilizando jsPDF autotable
    pdf.autoTable({
      head: [columnas],
      body: datos,
      startY: 20, // Ajusta la posición vertical de la tabla en el PDF
      margin: { bottom: 15 },
    });

    // Descargar el archivo PDF con un nombre específico
    const nombreArchivo = `${this.datoSeleccionado.nombre} ${this.datoSeleccionado.apellido}.pdf`;
pdf.save(nombreArchivo);
  },

  // FIN PDF 


    // PARA MODAL INFO 
    mostrarModalInfoCompleta(dato) {
    this.datoSeleccionado = dato; // Almacena el dato seleccionado para mostrarlo en el modal
    const modalInfoCompleta = new bootstrap.Modal(document.querySelector("#modalInfoCompleta"));
    modalInfoCompleta.show(); // Muestra el modal de información completa
  },
//  FIN MODAL INFO 

    filtrarDatos(filtro) {
      this.filtroBusqueda = filtro;
    },
    mostrarModalEditar(dato) {
      // Asignar los valores del dato seleccionado a datoSeleccionadoEditar para editarlos
      this.datoSeleccionadoEditar = { ...dato };
      // Mostrar el modal de edición usando Bootstrap
      const modalEditar = new bootstrap.Modal(
        document.querySelector("#modalEditar")
      );
      modalEditar.show();
    },

    // En el bloque script de Vue

    guardarEdicion() {
      const id = this.datoSeleccionadoEditar.id;
      const url = `/datos/actualizar/${id}`;
    
 
      axios
        .patch(url, this.datoSeleccionadoEditar, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // Actualizar el dato editado en la lista
            const index = this.datos.findIndex((dato) => dato.id === id);
            if (index !== -1) {
              this.$data.datos[index] = reactive(this.datoSeleccionadoEditar);
            }

            const modalEditar = new bootstrap.Modal(
              document.querySelector("#modalEditar")
            );
            modalEditar.hide();
            console.log(`Datos con ID ${id} actualizados correctamente.`);
            console.log(response);
          } else {
            console.error("La solicitud no fue exitosa:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error al actualizar los datos:", error);
        });
    },

    mostrarModalAcciones(datos) {
      this.datosAcciones = datos; // Asignar los datos de la columna "Acciones"
      const modal = new bootstrap.Modal(
        document.querySelector("#modalAcciones")
      );
      modal.show(); // Mostrar el modal
    },

    mostrarModalEliminar(dato) {
      this.datoSeleccionado = dato; // Almacenar el dato seleccionado
    },

    guardarDatos() {

      // ESTO ES PARA LO VALORES POR DEFECTO 
      if (!this.nuevoDato.nombre) {
        this.nuevoDato.nombre = "Valor Por Defecto nombre";
      }
      if (!this.nuevoDato.apellido) {
        this.nuevoDato.apellido = "Valor Por Defecto apellido";
      }
      if (!this.nuevoDato.direccion) {
        this.nuevoDato.direccion = "Valor Por Defecto direccion";
      }
      if (!this.nuevoDato.cargo) {
        this.nuevoDato.cargo = "Valor Por Defecto cargo";
      }
      if (!this.nuevoDato.temaAudiencia) {
        this.nuevoDato.temaAudiencia = "Valor Por Defecto temaAudiencia";
      }
      if (!this.nuevoDato.dondeAlquila) {
        this.nuevoDato.dondeAlquila = "Valor Por Defecto dondeAlquila";
      }
      if (!this.nuevoDato.dondeTrabaja) {
        this.nuevoDato.dondeTrabaja = "Valor Por Defecto dondeTrabaja";
      }
      if (!this.nuevoDato.motivoConsulta) {
        this.nuevoDato.motivoConsulta = "Valor Por Defecto motivoConsulta";
      }
      if (!this.nuevoDato.barrioASocial) {
        this.nuevoDato.barrioASocial = "Valor Por Defecto barrioASocial";
      }
      if (!this.nuevoDato.contraprestacion) {
        this.nuevoDato.contraprestacion = "Valor Por Defecto contraprestacion";
      }
      if (!this.nuevoDato.acciones) {
        this.nuevoDato.acciones = "Valor Por Defecto acciones";
      }
      if (!this.nuevoDato.fecha) {
        this.nuevoDato.fecha = new Date('2000-01-01T00:00:00');
      }
      if (!this.nuevoDato.cuandoASocial) {
        this.nuevoDato.cuandoASocial = new Date('2000-01-01T00:00:00');
      }




      // FIN VALORES POR DEFECTO 

      axios
        .post("/datos/crear", this.nuevoDato, {
        
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Datos guardados:", response.data);

          // Después de guardar los datos, vuelves a cargar la lista actualizada
          this.crearDatos();

          // Restableces el objeto nuevoDato para futuros usos
          this.nuevoDato = {
            nombre: "",
            apellido: "",
            dni: "",
            direccion: "",
            cargo: "",
            telefonos: "",
            acciones: "",
            auditar: false,
            nSolicitud: null,
            fecha: null,
            temaAudiencia: "",
            terreno: false,
            anotado: false,
            año: null,
            tieneCasa: false,
            dondeAlquila: "",
            tieneTrabajo: false,
            dondeTrabaja: "",
            motivoConsulta: "",
            recibioASocial: false,
            barrioASocial: "",
            cuandoASocial: null,
            recibeASocial: false,
            contraprestacion: "",
            
          };

          // Cierras el modal si es necesario (puedes ajustar esto según tus necesidades)
          const modalCrear = new bootstrap.Modal(
            document.querySelector("#modalCrear")
          );
          modalCrear.hide();

          // También puedes navegar a otra ruta si es necesario
          router.push("/secretaria");
        })
        .catch((error) => {
          console.error("Error al guardar los datos:", error);
          console.log(error.$data);
        });
    },

    eliminarDato() {
      const id = this.datoSeleccionado.id;

      axios
        .delete(`/datos/eliminar/${id}`, {
        
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.datos = this.datos.filter((dato) => dato.id !== id);
            console.log(`Dato con ID ${id} eliminado correctamente.`);
          } else {
            console.error("La solicitud no fue exitosa:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el dato:", error);
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
};
</script>
    
    <style scoped>
div-tabla {
  width: 100%;
  overflow-x: auto;
}

.tabla {
  border-collapse: collapse;
  width: 98.7%;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 10px;
  /* margin-right: 10px; */
}

.columnas {
  overflow: hidden;
  text-overflow: ellipsis;
  border: solid 1px #c9c9c9;
}
.columnas-ordenadas {
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 200px;
  max-width: 200px;
  white-space: nowrap;
}

.alinear-botones {
  display: flex;
  justify-content: center;
  border-right: solid 1px #c9c9c9;
  border-bottom: solid 1px #c9c9c9;
  height: 42px;
}

/* MODAL CREAR  */
.contenedor > div {
  display: flex;
  margin: 7px;
}

.ordenarContenido {
  display: grid;
  grid-template-rows: repeat(auto-fit);
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}
/* FIN MODAL CREAR  */

.btn-c {
  justify-content: center;
  align-items: center;
  border-color: #c9c9c9;
}

.paginacion > .contenedor {
  margin: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.numP {
  background-color: rgb(199, 199, 199);
  color: black;
}
.fleP {
  background-color: rgb(165, 164, 164);
  color: black;
}

/* TAMAÑO DE BOTONES Y INPUTS  */
.tamaño {
  display: flex;
  margin: 2%;
}

/* BOTON CREAR  */
.btn-crear {
  margin-left: 0.5%;
  border-radius: 5px;
  min-height: 45px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.651);
  display: flex;
  align-items: center;
}

.modal-content{
  background-color: #c9c9c9;
}
.form-check{
  display: flex;
  justify-content:center;
  align-items: center;
}

#switch{
  margin-left: 10px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.borde-redondo {
  border-radius: 5px;
}

.btn-info{
  display: flex;
  align-items: center;
}
.editar {
  display: flex;
  justify-content: center;
  margin-right: 15px;
  border-color: #c9c9c9;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: inline-block;
}

.eliminar {
  display: flex;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: inline-block;
}

/* MODAL LOGIN  */
/* EFECTO BORROSO MODAL LOGIN  */
.modal-openn::after {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(
    255,
    255,
    255
  ); /* Ajusta la opacidad según tus preferencias */
  z-index: -1; /* Ajusta el índice z para que el filtro esté por encima del modal */
}

.modal-openn {
  top: 20%;
  left: 29%;
  width: 700px;
  height: 700px;
}

@media only screen and (max-width: 600px) {
  .modal-openn {
    left: 80px !important;
    width: 400px !important;
    height: 400px !important;
  }
}

.Modal {
  border-radius: 5px;
}

.iniciar {
  border-radius: 5px;
}

/* FIN MODAL LOGIN  */

/* ALERTA ELIMINAR  */
.alerta-eliminar {
  background-color: grey;
}
/* FIN ALERTA ELIMNAR  */

.auditar {
  border: solid 1px gray;
  background-color: #c9c9c9;
}
/* Estilo personalizado para el botón cuando está seleccionado */
.btn-custom-selected {
  color: #fff; /* Color del texto cuando está seleccionado */
  background-color: #28a745 !important; /* Color de fondo verde */
  border-color: #28a745 !important; /* Color del borde verde */
}

/* Desactiva el efecto hover en el botón seleccionado */
.btn-custom-selected:hover {
  background-color: #28a745 !important;
  color: #fff !important;
  border-color: #28a745 !important;
}
</style>
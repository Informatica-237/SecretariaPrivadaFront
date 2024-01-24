<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #4a99ce">
      <div class="container-fluid">
        <router-link class="nav-link" to="/secretaria">SECRETARIA</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/"
                >Home</router-link
              >
            </li> -->
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/Login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Register">Sign in</router-link>
            </li> -->
            <!-- </ul> -->
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
            <!-- <li class="nav-item">
              <button
                class="btn btn-secondary my-2 my-sm-0 tamaño btn-crear"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#modalCrear"
              >
                CREAR
              </button>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link auditar" to="/auditar">AUDITAR</router-link>
            </li>
            <li class="nav-item">
              <input
                class="form-control me-sm-2 tamaño inBuscar"
                type="search"
                placeholder="BUSCAR"
                v-model="filtroBusqueda"
                @input="realizarBusqueda"
              />
            </li>
            <li class="nav-item ">
              <button class="btn  my-2 my-sm-0 tamaño btn-crear cerrar" href="javascript:void(0)" @click="handleClick">CERRAR SESION<svg class="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#dc2626" d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z"/></svg></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useAuth from "../composables/useUser";

export default {
  name: "NavBar",
  methods: {
    handleClick() {
      const { logout } = useAuth();
      logout();
      this.$router.push("/");
    },

    realizarBusqueda() {
    this.$emit("buscar", this.filtroBusqueda);
  },
  },
  setup() {
    const { isAuthenticated } = useAuth();
    return {
      isAuthenticated,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

.navbar {
  font-family: "Roboto", sans-serif;
}

.inBuscar{
  position: relative;
  left: 200px;
  min-height: 45px;
  min-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.651);
}

.auditar{
  position: relative;
  left: 20px;
  color: black;
  top: 3px;
}

.cerrar{
  color: black;
  position: relative;
  left: 550px;
  top: 3.5px;
}
.svg{
position: relative;
left: 5px;
bottom: 2px;
}


/* Estilos de tu aplicación */
</style>


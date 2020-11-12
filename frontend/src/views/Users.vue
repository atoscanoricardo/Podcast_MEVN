<template>
  <div>
    <table class="table">
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nickname</th>
              <th scope="col">Password</th>
              <th scope="col">Picture</th>            
            </tr>
        </thead>
        <tbody>
            <tr v-bind="users" v-for="(item, index) in users" :key="index">              
              <th scope="row">{{item._id}}</th>
              <td>{{item.nickname}}</td>
              <td>{{item.password}}</td>
              <td>{{item.picture}}</td>
            <td>
                <b-button class="btn-warning btn-sm mx-2" @click="activeEdition(item._id)">Actualizar</b-button>
                <b-button class="btn-danger btn-sm mx-2" @click="deleteUser(item._id)">Eliminar</b-button>
                <!-- Dentro del ciclo for (Tabla) -->
            </td>
            </tr>
        </tbody>
    </table>
    <!-------------------Put--------------------------------------------->
    <form @submit.prevent="addUser(user)" v-if="agregar">
      <h3 class="text-center">Agregar nuevo usuario</h3>
      <input type="text" placeholder="Ingrese un Nombre" class="form-control my-2" v-model="user.nickname">
      <input type="text" placeholder="Ingrese una Password" class="form-control my-2" v-model="user.password">
      <input type="text" placeholder="Ingrese una Imagen" class="form-control my-2" v-model="user.picture">
      <b-button class="btn-sm btn-block btn-success" type="submit">Agregar</b-button>
    </form>
    <!-------------------Update------------------------------------------------->
    <form @submit.prevent="editUser(userEdit)" v-else>
      <h3 class="text-center">Editar Nota</h3>
      <input type="text" placeholder="Ingrese un Nickname" class="form-control my-2" v-model="userEdit.nickname">
      <input type="text" placeholder="Ingrese una Password" class="form-control my-2" v-model="userEdit.password">
      <input type="text" placeholder="Ingrese una Imagen" class="form-control my-2" v-model="userEdit.picture">
      <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit">Editar</b-button>
      <b-button class="btn-sm btn-block" @click="agregar = true">Cancelar</b-button>
    </form>    
    <!-------------------end------------------------------------------------>
  </div>
</template>
<script>
export default {
  name: 'Users',
  data() {
    return {
      users: [],      
      user: {},
      agregar: true,
      userEdit:{},
      mensaje: {color: 'success', texto: ''},
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  created(){
    this.usersList();
  },
  methods:{
    usersList(){
      this.axios.get('users')
      .then((response) => {        
        this.users = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    addUser(item){
      console.log(item)
      this.axios.post('users/', item)
        .then(res => {          
          // Agrega al inicio de nuestro array users          
          this.users.unshift(res.data);          
          // Alerta de mensaje
          this.showAlert();
          this.mensaje.texto = 'users Add!'
          this.mensaje.color = 'success';          
        })
        .catch( e => {})
      this.user = {}
    },
    deleteUser(id){
      this.axios.delete(`users/${id}`)
        .then(res => {
          let index = this.users.findIndex( item => item._id === res.data._id )
          this.users.splice(index, 1);

          this.showAlert();
          this.mensaje.texto = 'user deleted!'
          this.mensaje.color = 'danger'
        })
        .catch( e => {
          console.log(e.response);
        })
    },
    activeEdition(id){
    this.agregar = false;
    this.axios.get(`users/${id}`)
      .then(res => {
        this.notaEditar = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    editUser(item){
      this.axios.put(`users/${item._id}`, item)
        .then(res => {
          let index = this.notas.findIndex( itemNota => itemNota._id === this.notaEditar._id);
          this.notas[index].nombre = this.notaEditar.nombre;
          this.notas[index].descripcion = this.notaEditar.descripcion;
          this.notaEditar = {}

          this.showAlert();
          this.mensaje.texto = 'Nota Actualizada'
          this.mensaje.color = 'success'
        })
        .catch(e => {
          console.log(e);
        })
      this.agregar = true;
    }
  }
};
</script>
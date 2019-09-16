<template>
    <div class="container container-person">        
        <div class="row">
            <div class="col-sm-12 text-right">
                <router-link :to="{name: 'createPerson'}" class="btn btn-success"><i class="fa fa-plus"></i> Nueva Persona</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h2>Personas</h2>
                <table class="table text-center">                    
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Email</th>
                            <th scope="col">Fecha de Nacimiento</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="person in arrayPersons" :key="person.id">
                            <td v-text="person.name"></td>
                            <td v-text="person.surname"></td>
                            <td v-text="person.email"></td>
                            <td v-text="person.birthday"></td>
                            <td>
                                <button
                                    class="btn btn-sm btn-primary"
                                    @click="loadFieldsUpdate(person)"
                                >
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" @click="deletePerson(person)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <div class="col-md-6">
                <div class="form-group">
                    <label>Nombre</label>
                    <input v-model="name" type="text" class="form-control">

                    <label>Primer Apellido</label>
                    <input v-model="first_surname" type="text" class="form-control">

                    <label>Segundo Apellido</label>
                    <input v-model="second_surname" type="text" class="form-control">

                    <label>Email</label>
                    <input v-model="email" type="text" class="form-control">
                    
                    <label>Fecha de Nacimiento</label>
                    <input v-model="birthday" type="text" class="form-control">
                </div>
                <div class="container-buttons">                    
                    <button v-if="update == 0" @click="savePersons()" class="btn btn-success">Añadir</button>                    
                    <button v-if="update != 0" @click="updatePersons()" class="btn btn-warning">Actualizar</button>                    
                    <button v-if="update != 0" @click="clearFields()" class="btn">Atrás</button>
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "", 
            first_surname: "", 
            second_surname: "", 
            email: "", 
            birthday: "", 
            update: 0,
            arrayPersons: [] 
        };
    },
    methods: {
        getPeople() {
            let me = this;
            let url = "/persons"; 
            axios
                .get(url)
                .then(function(response) {                    
                    me.arrayPersons = response.data;
                })
                .catch(function(error) {                    
                    console.log(error);
                });
        },
        savePersons() {
            let me = this;
            let url = "/persons";
            axios
                .post(url, {                    
                    name: this.name,
                    first_surname: this.first_surname,
                    second_surname: this.second_surname,
                    email: this.email,
                    birthday: this.birthday
                })
                .then(function(response) {
                    me.getPeople(); 
                    me.clearFields(); 
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        updatePersons() {            
            let me = this;
            axios
                .put("/persons/" + this.update, {
                    id: this.update,
                    name: this.name,
                    first_surname: this.first_surname,
                    second_surname: this.second_surname,
                    email: this.email,
                    birthday: this.birthday
                })
                .then(function(response) {
                    me.getPeople(); 
                    me.clearFields(); 
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        loadFieldsUpdate(data) {        
            this.update = data.id;
            let me = this;
            let url = "/persons/" + this.update;
            axios
                .get(url)
                .then(function(response) {
                    me.name = response.data.name;
                    me.first_surname = response.data.first_surname;
                    me.second_surname = response.data.second_surname;
                    me.email = response.data.email;
                    me.birthday = response.data.birthday;
                })
                .catch(function(error) {                    
                    console.log(error);
                });
        },
        deletePerson(data) {
            let me = this;
            let person_id = data.id;
            swal({
                title: "¿Desea continuar?",
                text: "Una vez eliminado el registro no se recuperará",
                icon: "warning",
                buttons: {
                    confirm: {
                        text: "Sí, borrar",
                        className: "btn btn-sm btn-danger"
                    },
                    cancel: {
                        text: "Cancelar",
                        visible: true,
                        className: "btn btn-sm btn-danger"
                    }
                }
            }).then(result => {
                if (result) {
                    $.ajaxSetup({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                                "content"
                            )
                        }
                    });
                    axios
                        .delete("/persons/" + person_id)
                        .then(function(response) {
                            me.getPeople();
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            });
        },
        clearFields() {
            this.name = "";
            this.first_surname = "";
            this.second_surname = "";
            this.email = "";
            this.birthday = "";
            this.update = 0;
        }
    },
    mounted() {
        this.getPeople();
    }
};
</script>

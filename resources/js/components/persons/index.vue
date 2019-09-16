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
                                <router-link :to="{name: 'editPerson', params: { id : person.id }}" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></router-link>                               
                                <button class="btn btn-sm btn-danger" @click="deletePerson(person)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {            
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
                    axios
                        .delete("/persons/" + person_id)
                        .then(function(response) {
                            me.getPeople();
                            swal({
                                text: "El elemento ha sido eliminado",
                                icon: "success"                                
                            })
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            });
        }
    },
    mounted() {
        this.getPeople();
    }
};
</script>

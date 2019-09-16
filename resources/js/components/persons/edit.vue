<template>
    <div class="container container-person">
        <div class="row">
            <div class="col-sm-12 text-right">
                <router-link to="/" class="btn btn-success">
                    <i class="fa fa-arrow-left"></i> Regresar
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h2>Editar Información</h2>
                <form v-on:submit="savePerson()">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input v-model="person.name" type="text" class="form-control" />

                        <label>Primer Apellido</label>
                        <input v-model="person.first_surname" type="text" class="form-control" />

                        <label>Segundo Apellido</label>
                        <input v-model="person.second_surname" type="text" class="form-control" />

                        <label>Email</label>
                        <input v-model="person.email" type="text" class="form-control" />

                        <label>Fecha de Nacimiento</label>
                        <input v-model="person.birthday" type="text" class="form-control" />
                    </div>
                    <div class="container-buttons">
                        <button class="btn btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            person: {
                id: null,
                name: "",
                first_surname: "",
                second_surname: "",
                email: "",
                birthday: "",
            }            
        };
    },
    methods: {
        savePerson() {
            let app = this;
            axios
                .put("/persons/" + app.person.id, {
                    id: app.person.id,
                    name: app.person.name,
                    first_surname: app.person.first_surname,
                    second_surname: app.person.second_surname,
                    email: app.person.email,
                    birthday: app.person.birthday
                })
                .then(function(response) {
                    swal({
                        text: "La información ha sido actualizada",
                        icon: "success",
                    }).then(() => {
                        app.$router.push({path: '/'});
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        let app = this;
        axios
            .get("/persons/" + app.$route.params.id)
            .then(function(resp) {                
                app.person = resp.data;
                console.log(app.person);
            })
            .catch(function() {
                
            });
    }
};
</script>

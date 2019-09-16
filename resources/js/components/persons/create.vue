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
                <h2>Nueva Persona</h2>
                <form v-on:submit="savePerson()">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input v-model="name" type="text" class="form-control" />

                        <label>Primer Apellido</label>
                        <input v-model="first_surname" type="text" class="form-control" />

                        <label>Segundo Apellido</label>
                        <input v-model="second_surname" type="text" class="form-control" />

                        <label>Email</label>
                        <input v-model="email" type="text" class="form-control" />

                        <label>Fecha de Nacimiento</label>
                        <input v-model="birthday" type="text" class="form-control" />
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
        savePerson() {
            let app = this;
            let url = "/persons";
            axios
                .post(url, {
                    name: app.name,
                    first_surname: app.first_surname,
                    second_surname: app.second_surname,
                    email: app.email,
                    birthday: app.birthday
                })
                .then((response) => {
                    swal({
                        text: "El elemento ha sido creado",
                        icon: "success",
                    }).then(() => {
                        app.$router.push({path: '/'});
                    });                    
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>

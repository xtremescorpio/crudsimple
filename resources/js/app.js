/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import PersonsIndex from './components/persons/index.vue';
import PersonsCreate from './components/persons/create.vue';
import PersonsEdit from './components/persons/edit.vue';

const routes = [
    {
        path: '/',
        components: {
            personsIndex : PersonsIndex
        }
    },
    {
        path: '/persons/create',
        components: {
            personsCreate : PersonsCreate
        },        
        name: 'createPerson'
    },
    {
        path: '/persons/edit/:id',
        components: {
            personsEdit : PersonsEdit
        },
        name: 'editPerson'
    },
]

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('second-component', require('./components/SecondComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

export const router = new VueRouter({ routes });

// const app = new Vue({
//     el: '#app',
// });

const app = new Vue({ 
    router        
}).$mount('#app');
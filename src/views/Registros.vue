<template>
    <b-container class="myContainer">
        <Formulario :editable="registroEditable" :activador="dialogRegistro" v-if="dialogRegistro" :listaRegistro="listaRegistro" @closeDialog='closeDialog()'/>
        
        
        <b-row class="my-5 p-4">
            <b-col cols="10">
                <h3>Listado de registros</h3>
            </b-col>
            <b-col cols="2" >
                <b-button pill @click="dialogRegistro = true" variant="primary" style="width:100%;">Crear registro</b-button><br>
            </b-col>
        </b-row>

        <b-row class="my-1 px-4">
            <b-col sm="8" md="8"></b-col>
            <b-col sm="4" md="4">
                <b-form-input
                    type="text"
                    v-model="filtro"
                    placeholder="Busqueda por nombre o correo"
                    required
                ></b-form-input>
            </b-col>
        </b-row>    

        <div class="p-4">    
            <b-table 
                responsive hover 
                :items="registrosFiltrados" 
                :fields="fields" 
                :current-page="currentPage" 
                :per-page="perPage" 
                :show-empty="true" 
                empty-text="No hay registros para mostrar"
                ><template #cell(Acciones)="data">
                <div style="text-align:center;">
                    <b-button size="sm" variant="link" @click="registroEditable=data.item; dialogRegistro = true"><b-icon icon="pencil-fill"></b-icon></b-button>
                    <b-button size="sm" variant="link" @click="borrarRegistro(data.item)" style="color:#AB1111"><b-icon icon="trash-fill"></b-icon></b-button>
                    <b-button size="sm" variant="link" @click="data.toggleDetails" v-if="data.detailsShowing" style="color:#484747"><b-icon icon="chevron-up"></b-icon></b-button>
                    <b-button size="sm" variant="link" @click="data.toggleDetails" v-else><b-icon icon="chevron-down" style="color:#484747"></b-icon></b-button>
                </div>
                </template>

                <template #cell(nombre)="data">
                    <div>
                        <span>{{data.item.nombre}} {{data.item.apellido}}</span>
                    </div>
                </template>

                <template #cell(telefono)="data">
                    <div>
                        <span v-if="data.item.telefono">{{formatPhoneNumber(data.item.telefono)}}</span>
                        <span v-else>Indefinido</span>
                    </div>
                </template>

                <template #cell(edad)="data">
                    <div style="text-align:center;">
                        {{data.item.edad}}
                    </div>
                </template>

                <template #cell(comidaEntregada)="data">
                    <div style="text-align:center;">
                        <label class="switch">
                            <input type="checkbox" @change="entregarComida()"
                            v-model="data.item.comidaEntregada">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </template>
                
                <template #row-details="row">
                    <b-card>
                        <b-row class="mb-2">
                            <b><b-icon icon="house-door-fill"></b-icon>&nbsp;Dirección:</b> 
                            <b-col cols="12">
                                <span v-if="row.item.direccion">{{ row.item.direccion }}</span>
                                <span v-else>Indefinida</span>
                            </b-col>
                        </b-row>
                        <b-row class="mb-2">
                            <b><b-icon icon="eye-fill"></b-icon>&nbsp;Observación:</b> 
                            <b-col cols="12">
                                <span v-if="row.item.observacion">{{ row.item.observacion }}</span>
                                <span v-else>Ninguna</span>
                            </b-col>
                        </b-row>
                    </b-card>
                </template>
            </b-table>
            <b-row>
                <b-col sm="8" md="8"></b-col>
                <b-col sm="4" md="4">
                    <b-pagination
                    pills
                    variant="primary"
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                    ></b-pagination>
                </b-col>
            </b-row>
        </div>

    </b-container>
</template>

<script>

import Formulario from '../components/Formulario.vue'

export default {
  name: 'Registros',
  components: {
    Formulario,
  },
  data() {
        return {
            dialogRegistro: false,
            listaRegistro: [],
            registroEditable: null,
            perPage: 5,
            currentPage: 1,
            pageOptions: [5, 10, 15],
            totalRows: 1,
            filtro: '',
            fields: [
                { key:'nombre', label:'Nombre' },
                { key:'telefono', label:'Teléfono' },
                { key:'correo', label:'Correo' },
                { key:'edad', label:'Edad' },
                { key:'comidaEntregada', label:'Comida entregada' },
                'Acciones',
            ],
        }
    },
    watch: {
        listaRegistro: function(valor){
            this.totalRows = this.listaRegistro.length;
        }
    },
    methods: {
        obtenerRegistros: function(){
            try {
                let datosDB = JSON.parse(localStorage.getItem('rRegistros'));
                if(datosDB != null){
                this.listaRegistro = datosDB;
            }
            } catch (error) {
                console.log(error);
            }
        
        },

        closeDialog: function(){
            try {
                this.dialogRegistro = false;
                this.registroEditable = null;
                this.obtenerRegistros();
            } catch (error) {
                console.log(error);
            }

        },

        borrarRegistro: async function(registro){
            try {
                let alerta = await this.$confirm('Eliminar registro', 'Está seguro que desea eliminar este registro?');
                if(alerta.isConfirmed == true){
                    let resultado = this.listaRegistro.filter((item) => item.id !== registro.id);
                    localStorage.setItem('rRegistros', JSON.stringify(resultado));
                    this.obtenerRegistros();
                    this.$toast('success', 'Registro borrado correctamente');
                }
            } catch (error) {
                console.log(error);
            }
            
        },

        entregarComida: function(){
            localStorage.setItem('rRegistros', JSON.stringify(this.listaRegistro));
        },
        
        filtroRegistro: function(registros, filtro){
            try {
                if(!registros) return [];
                
                return registros.filter(
                    e => e.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
                         e.correo.toLowerCase().includes(filtro.toLowerCase()) ||
                         e.apellido.toLowerCase().includes(filtro.toLowerCase()) 
                )

            } catch (error) {
                console.log(error);
            }
        },
        formatPhoneNumber: function(str) {
            let cleaned = ('' + str).replace(/\D/g, '');
            
            let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
            
            if (match) {
            let intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
            }
            
            return str;
        },
    },
    computed:{
        registrosFiltrados(){
            return this.filtroRegistro(this.listaRegistro, this.filtro)
        }
    },
    mounted() {
        this.obtenerRegistros();
    },
}
</script>
<style>
    .myContainer{
        background-color:#fff;
        border-radius: 25px
    }

    th {
        white-space: pre!important;
    }
    th:nth-child(5) {
       text-align: center!important;
    }
    th:nth-child(6) {
       text-align: center!important;
    }
    th:nth-child(4) {
       text-align: center!important;
    }

    td {
        white-space: pre!important;
    }

    .switch {
     margin: 10px;
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    }
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    }
    .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }
    input:checked + .slider {
    background-color: #1976D2;
    }
    input:focus + .slider {
    box-shadow: 0 0 1px #1976D2;
    }
    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }
    .slider.round {
    border-radius: 34px;
    }
    .slider.round:before {
    border-radius: 50%;
    }
</style>
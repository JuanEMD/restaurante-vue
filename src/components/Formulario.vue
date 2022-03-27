<template>
<div v-if="mounted">
    <b-modal no-close-on-backdrop v-model="activador" hide-footer> 

        
        <template #modal-header="{ }">
            <!-- Emulate built in modal header close button action -->
            <h3>{{titulo}}</h3>
        </template>

        <b-form>
            <b-row class="my-3">
                <b-col sm="6">
                    <b-form-group>
                        <b-form-input
                            id="nombre"
                            type="text"
                            v-model.trim="$v.registro.nombre.$model"
                            placeholder="Nombre"
                            :class="{'is-invalid':$v.registro.nombre.$error,'is-valid':!$v.registro.nombre.$invalid}"
                        
                        ></b-form-input>
                        
                        <b-form-invalid-feedback v-if="!$v.registro.nombre.$required">Campo reqerido</b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
                <b-col sm="6">
                <b-form-group >
                    <b-form-input
                        id="apellido"
                        type="text"
                        v-model.trim="$v.registro.apellido.$model"
                        placeholder="Apellido"
                        :class="{'is-invalid':$v.registro.apellido.$error,'is-valid':!$v.registro.apellido.$invalid,}"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.registro.apellido.$required">Campo reqerido</b-form-invalid-feedback>
                </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col sm="6">
                    <b-form-group>
                        <b-form-input
                            id="telefono"
                            type="number"
                            v-model="registro.telefono"
                            placeholder="Télefono"
                        ></b-form-input>
                    </b-form-group>
                </b-col>

                    <b-col sm="6">
                        <b-form-group>
                            <b-form-input
                                id="edad"
                                type="number"
                                v-model.trim="$v.registro.edad.$model"
                                placeholder="Edad"
                                :class="{'is-invalid':$v.registro.edad.$error,'is-valid':!$v.registro.edad.$invalid}"
                            ></b-form-input>
                         <b-form-invalid-feedback v-if="!$v.registro.edad.$required">Campo reqerido</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
            </b-row>
            
            <b-row class="mb-3">
                <b-col sm="12">
                    <b-form-group>
                        <b-form-input
                            id="correo"
                            type="email"
                            v-model.trim="$v.registro.correo.$model"
                            placeholder="Correo"
                            :class="{'is-invalid':$v.registro.correo.$error,'is-valid':!$v.registro.correo.$invalid,}"
                        ></b-form-input>
                         <b-form-invalid-feedback v-if="!$v.registro.correo.$required">Campo reqerido.</b-form-invalid-feedback>
                         <b-form-invalid-feedback v-if="!$v.registro.correo.$email">Email invalido. </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row class="mb-3" >
                <b-col sm="12">
                    <b-form-group>
                        <b-form-input
                            id="direccion"
                            type="text"
                            v-model="registro.direccion"
                            placeholder="Dirección"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            
            <b-row class="mb-5">
                <b-col sm="12">
                    <b-form-group>
                        <b-form-textarea
                            id="observacion"
                            type="text"
                            v-model="registro.observacion"
                            placeholder="Observación"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>


            <b-row align-h="end">
                <b-col cols="3">
                    <b-button pill style="width: 100%;" @click="close" variant="danger">Cancelar</b-button>
                </b-col>
                <b-col cols="3">
                    <b-button pill style="width: 100%;" @click="guardarRegistro" variant="primary">Guardar</b-button>
                </b-col>
            </b-row>

        </b-form>
    </b-modal>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'Formulario',
    data() {
        return {
            mounted: false,
            registro:{
                id: null,
                nombre: null,
                apellido: null,
                telefono: null,
                correo: null,
                edad: null,
                direccion: null,
                comidaEntregada: false,
                observacion: null,
            },
            titulo: 'Crear registro'
        }
    },
    props:[
        "activador",
        "editable",
        "listaRegistro"
    ],
    validations:{
        registro: {
            nombre:{
                required,
            },
            apellido:{
                required,
            },
            correo:{
                required,
                email,
            },
            edad:{
                required,
            },
            
        }
    },
    methods: {

        guardarRegistro: async function(){
            try {
                let listaRegistro = this.listaRegistro;
                console.log(listaRegistro);

                this.$v.$touch()
                if(!this.$v.$invalid){
                    if(this.editable == null){
                        let intentos = await this.intentos();
                        if(intentos < 2){
                            this.registro.id = await listaRegistro.length+1;
                            await listaRegistro.push(this.registro)
                            localStorage.setItem('rRegistros', JSON.stringify(listaRegistro));
                            this.$toast('success', 'Registro agregado correctamente!');

                            localStorage.setItem('rIntentos', intentos+1);

                        } else {
                            this.$alert('error', 'Nuevo registro', 'Ocurrio un error al momento de insertar un registro, favor intentar nuevamente.', 2000);
                            localStorage.setItem('rIntentos', 0);
                        }
                        
                    }else{
                        let resultado = listaRegistro.filter((item) => item.id != this.registro.id);
                        resultado.push(this.registro);
                        localStorage.setItem('rRegistros', JSON.stringify(resultado));
                        this.$toast('success', 'Registro editado correctamente!');
                    }
                    this.close();
                }
                
                
            } catch (error) {
                console.log(error);
            }
        },

        close: function(){
            this.$emit('closeDialog');
        },

        intentos: function(){
            let intento = JSON.parse(localStorage.getItem('rIntentos'));
            if(intento == null){
                return 0;
            } else {
                return parseInt(intento);
            }
        },
    },
    mounted() {
        this.mounted = true;
        if(this.editable){
            this.titulo= 'Editar registro';
            this.registro = this.editable;
        }
        console.log(this.editable);
        
    },
}
</script>

<style>
    .modal-content{
        border-radius: 25px !important; 
    }

    .form-control{
        border-radius: 25px !important; 
    }
</style>
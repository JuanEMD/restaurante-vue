import Vue from 'vue';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
  

function alert( icon, title, text, timer ){
    if(timer != null){
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: timer
        })
    }else{
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        })
    }
}


function toast( icon,  text ){

    Toast.fire({
        icon: icon,
        title: text
    })
}

async function confirm( title,  text ){

    let result = await Swal.fire({
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonColor: '#1976D2',
        cancelButtonColor: '#FF6060',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
        })
    return result;
}

Vue.prototype.$alert = alert;
Vue.prototype.$toast = toast;
Vue.prototype.$confirm = confirm;
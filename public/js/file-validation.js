const fileValidation = (file) => {
    let sizeByte = file.files[0].size;
    let sizeKiloBytes = parseInt( sizeByte / 1024 );
    if( sizeKiloBytes <= 5000 ){
        return { code: 'ok', message: 'exito' }
    }else {
        return { code: 'error', message: '<strong>¡Advertencia!</strong> La imagen no puede ser mayor a <strong>5MB</strong>' }
    }
}
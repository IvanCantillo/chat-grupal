const loading = ( bool ) => {
    container = document.getElementById('loading');
    if( bool ){
        container.classList.remove('d-none');
    }else{
        container.classList.add('d-none');
    }
}

//Pantalla de carga 
document.body.innerHTML += `
    <div id="loading" class="loading d-none" style="display: flex; right: 0">
        <div class="w-100">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <h5>Cargando...</h5>
        </div>
    </div>
`; 
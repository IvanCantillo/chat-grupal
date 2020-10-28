const fileValidation = (filePath) => {
    let url = '';
    let validExtensions = /(.jpg|.jpeg|.png)$/i;
    if (!validExtensions.exec(filePath)) {
        return { code: 'error', message: 'Porfavor escoja un archvio con las extensiones .jpg .jpeg .png' }
    } else {
        url = String(filePath);
        url = url.replace(/\\/g, '/').split('/');
        url = url[url.length - 1];
        return { code: 'ok', img: url }
    }
}
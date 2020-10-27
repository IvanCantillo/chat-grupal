const notifySuccess = (data) => {
    let html = `
        <div class="col-6 col-md-4 col-lg-3 col-xl-3 ml-auto my-1 bg-success text-white rounded py-2 notify-show">
            ¡<strong>${data}</strong> ha ingresado! 🥳
        </div>
    `;
    return html;
}
const notifyDanger = (data) => {
    let html = `
        <div class="col-6 col-md-4 col-lg-3 col-xl-3 ml-auto my-1 bg-danger text-white rounded py-2 notify-show">
            ¡<strong>${data}</strong> se ha salido! 😭
        </div>
    `;
    return html;
}
const notifyInfo = (data) => {
    let html = `
        <div class="col-6 col-md-4 col-lg-3 col-xl-3 ml-auto my-1 bg-info text-white rounded py-2 notify-show">
            ¡<strong>${data}</strong> info! 👌
        </div>
    `;
    return html;
}
const notifyWarning = (data) => {
    let html = `
        <div class="col-6 col-md-4 col-lg-3 col-xl-3 ml-auto my-1 bg-warning text-white rounded py-2 notify-show">
            ¡<strong>${data}</strong> warning! 😱
        </div>
    `;
    return html;
}
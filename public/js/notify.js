const notifySuccess = (data) => {
    let html = document.createElement("div");
    html.setAttribute("id", "notify-success");
    html.setAttribute("class", "col-6 col-md-4 col-lg-3 col-xl-3 ml-auto my-1 bg-success text-white rounded py-2 notify-show");
    html.innerHTML = `¡<strong>${data}</strong> ha ingresado! 🥳`;
    return html;
}
const notifyDanger = (data) => {
    let html = document.createElement("div");
    html.setAttribute("id", "notify-danger");
    html.setAttribute("class", "col-6 col-md-4 col-lg-3 col-xl-3 ml-auto my-1 bg-danger text-white rounded py-2 notify-show");
    html.innerHTML = `¡<strong>${data}</strong> se ha salido! 😭`;
    return html;
}
const notifyInfo = (data) => {
    let html = document.createElement("div");
    html.setAttribute("id", "notify-info");
    html.setAttribute("class", "col-6 col-md-4 col-lg-3 col-xl-3 ml-auto my-1 bg-info text-white rounded py-2 notify-show");
    html.innerHTML = `¡<strong>${data}</strong> info! 👌`;
    return html;
}
const notifyWarning = (data) => {
    let html = document.createElement("div");
    html.setAttribute("id", "notify-warning");
    html.setAttribute("class", "col-6 col-md-4 col-lg-3 col-xl-3 ml-auto my-1 bg-warning text-white rounded py-2 notify-show");
    html.innerHTML = `¡<strong>${data}</strong> warning! 😱`;
    return html;
}
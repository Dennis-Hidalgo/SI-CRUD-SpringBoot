
function colocarInput(){
    const urlParams = new URLSearchParams(window.location.search);
    inputs = document.getElementsByTagName('input');
    inputs[0].value = urlParams.get('nombre')
    inputs[1].value = urlParams.get('nota')
    inputs[2].value = urlParams.get('periodo')
}
function cadastraEquipe() {
    // Obtém os valores dos campos do formulário
    var nome = $("#nome").val();

    axios.post("http://localhost:8080/equipes", {
        "nome": nome
    })
    .then(function(response) {
        console.log(response);
        alert("Equipe cadastrada com sucesso!");
        document.location = "listaEquipe.html";
    })
    .catch(function(error) {
        console.log(error);
    });
}
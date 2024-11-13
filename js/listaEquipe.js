function getAllEquipes() {
    axios.get("http://localhost:8080/equipes")
    .then(function(response) {
        console.log(response);

        var jsonData = response.data;
        var tableBody = $("table tbody");

        tableBody.empty();

        jsonData.forEach(equipe => {
            var markup = "<tr>" +
                            "<td>" + equipe.id + "</td>" +
                            "<td>" + equipe.nome + "</td>" +
                            "<td>" + "<button class='btn btn-danger' onclick='deletaEquipe(" + equipe.id + ")' style='margin-right: 10px'>Deletar</button>" +
                                     "<button class='btn btn-warning' onclick='editaEquipe(" + equipe.id + ")'>Editar</button>" + 
                            "</td>" +
                        "</tr>";

            tableBody.append(markup);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}

function deletaEquipe(id) {
    axios.delete("http://localhost:8080/equipes/" + id)
    .then(function(response) {
        console.log(response);
        
        alert("Equipe excluída com sucesso!");
        getAllEquipes();
    })
    .catch(function(error) {
        console.log(error);
    });
}

function editaEquipe(id) {
    axios.get(`http://localhost:8080/equipes/${id}`)
    .then(function(response) {
        const equipe = response.data;

        // Preenche os campos do modal com os dados da equipe
        document.getElementById("id").value = equipe.id;
        document.getElementById("nome").value = equipe.nome;

        // Abre o modal
        const modal = new bootstrap.Modal(document.getElementById("editaEquipeModal"));
        modal.show();
    })
    .catch(function(error) {
        console.log(error);
    });
}

function salvaEdicaoEquipe() {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;

    // Cria o objeto com os dados atualizados
    const equipe = {
        id: id,
        nome: nome
    }

    // Envia o objeto atualizado ao back-end
    axios.put(`http://localhost:8080/equipes/${id}`, equipe)
    .then(function(response) {
        console.log(response);

        // Fecha o modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("editaEquipeModal"));
        modal.hide();

        // Atualiza a lista de equipes
        getAllEquipes();
    })
    .catch(function(error) {
        console.log(error);
    });
}
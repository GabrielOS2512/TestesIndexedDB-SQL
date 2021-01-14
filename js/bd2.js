
    console.log("|--- IndexedDB ---|");
    //Criar/Abrir BD
    var db = new Dexie("BD-TesteSQL");
    db.version(1).stores({
      pessoas: "++id,nome,idade,cidade",
      cachorros: "++id,nome,pessoas_id"
    });
    db.open();
    //db.close();
    console.log("|--- IndexedDB Criado ---|");

    //Inserir Novo no IndexedDB
    // Popular
    $(document).ready(function(){
        $("#popular").click(function(){
          //alert("|== Popular BD ==|");

          console.log("|== Popular BD ==|");
          var n = document.getElementById("nome").value;
          var i = document.getElementById("idade").value;
          var c = document.getElementById("cidade").value;

          var novo = [ { nome: n, idade: i, cidade: c } ];
          console.log("Nome : " + n);
          console.log("Idade : " + i);
          console.log("Cidade : " + c);

          db.pessoas.add({nome: n, idade: i, cidade: c});
          //db.pessoas.add(novo);
          //alert("|== "+novo+" ==|");

          //db.pessoas.put({nome: "Gabriel", idade: 23, cidade: "Belo Horizonte"});
      });
    });


    //ao clicar no botao começa
    //Salvar
      $(document).ready(function(){
          $("#salvar").click(function(){

              var id;
              var nome;
              var idade;
              var cidade;
              var i;
              //console.log ("Id : " + id);
              //console.log ("Nome : " + nome);
              //console.log ("Idade : " + idade);
              //console.log ("Cidade : " + cidade);

              // contar quantos precisao ser
              db.pessoas.toCollection().count(function (count) {
                  i = count;
                  console.log("Dados Presentes no IndexedDB : "+i);
                  alert("Dados Presentes no IndexedDB : "+i);
              }).then(function (result) {
                  if(i > 0) {
                    alert("Entrou no if Dados : "+i);

                  db.pessoas
                      .orderBy('id')
                      .toArray()
                      .then(function (result) {
                          //console.log (results);
                          alert (JSON.stringify(results));
                          alert("Results : "+ results);
                          for(x=0;x<i;x++){ //enquanto nao estiver vazio

                            id = results[x].id;
                            nome = results[x].nome;
                            idade = results[x].idade;
                            cidade = results[x].cidade;
                            console.log ("Id : " + id);
                            console.log ("Nome : " + nome);
                            console.log ("Idade : " + idade);
                            console.log ("Cidade : " + cidade);

                            //envia pro php inserir na mysql
                            $.ajax({
                                url:'inserir.php',
                                method:'POST',
                                data:{
                                  nome:nome,
                                  idade:idade,
                                  cidade:cidade,
                                },
                                success:function(data){
                                  console.log ("|--- Inserido com sucesso ---|");
                                  alert("|---  Inserido com sucesso ---|");
                                }
                            });
                          }
                        //console.log (JSON.stringify(results));

                      }).then(function (r) {
                        db.pessoas.clear()
                        console.log("|--- IndexedDB Limpo ---|");
                        alert("|--- IndexedDB Limpo ---|");
                      });

                  //Limpa a tabela IndexedDB


                  } else {
                      console.log("|=== IndexedDB Vazio ===|");
                      alert("Vazio : ");
                    }
              }).catch(function (e) {
                alert("Erro: "+e)
              }).finally(function () {
                  alert("|--Finally--|");
              });
              //Pega todos os dados da tabela e armazena em um array results


            });
      });

    function salvar(){
      alert("Salvar : "+i);

      var id;
      var nome;
      var idade;
      var cidade;
      var i;
      //console.log ("Id : " + id);
      //console.log ("Nome : " + nome);
      //console.log ("Idade : " + idade);
      //console.log ("Cidade : " + cidade);

      // contar quantos precisao ser
      db.pessoas.toCollection().count(function (count) {
          i = count;
          console.log("Dados Presentes no IndexedDB : "+i);
          alert("Dados Presentes no IndexedDB : "+i);
      });

      //Pega todos os dados da tabela e armazena em um array results

      if(i > 0) {
        alert("Dados : "+i);
        db.pessoas
          .orderBy('id')
          .toArray()
          .then(function (results) {
              //console.log (results);
              alert("Dados : "+i);
              for(x=0;x<i;x++){ //enquanto nao estiver vazio

                id = results[x].id;
                nome = results[x].nome;
                idade = results[x].idade;
                cidade = results[x].cidade;
                console.log ("Id : " + id);
                console.log ("Nome : " + nome);
                console.log ("Idade : " + idade);
                console.log ("Cidade : " + cidade);

                //envia pro php inserir na mysql
                $.ajax({
                    url:'inserir.php',
                    method:'POST',
                    data:{
                      nome:nome,
                      idade:idade,
                      cidade:cidade,
                    },
                    success:function(data){
                      console.log ("|--- Inserido com sucesso ---|");
                      alert("|---  Inserido com sucesso ---|");
                    }
                });
              }
            //console.log (JSON.stringify(results));

          });

      //Limpa a tabela IndexedDB
      db.pessoas.clear()
      console.log("|--- IndexedDB Limpo ---|");
      alert("|--- IndexedDB Limpo ---|");

    } else {
        console.log("|=== IndexedDB Vazio ===|");
        alert("Vazio : ");
    }
  }


    //Criar/Abrir BD
    var db = new Dexie("BD-TesteSQL");
    db.version(1).stores({
      pessoas: "++id,nome,idade,cidade",
      //cachorros: "++id,nome,pessoas_id",
    });
    db.open();
    console.log("|--- IndexedDB Criado ---|");

    // Popular
    //db.pessoas.put({nome: "Gabriel", idade: 23, cidade: "Belo Horizonte"});

    //Inserir Teste
    $(document).ready(function(){
        $("#popular").click(function(){
          //alert("|== Popular BD ==|");
          //await inserir();

          //db.pessoas.add(novo);
          //alert("|== "+novo+" ==|");

          //db.pessoas.put({nome: "Gabriel", idade: 23, cidade: "Belo Horizonte"});
      });
    });

    //ao clicar o botao começa
    $(document).ready(function(){
          $("#salvar").click(function(){
              //alert("|== Salvar no SQL ==|");

            });

      });

      //Funçao pra insercao no IndexedDB
      async function inserir(){
        online = window.navigator.onLine;

        //Se online salva no SQL Direto
          if (online){
            alert("Dispositivo Online1");
            console.log("|== Enviar ao SQL ==|");
            var nome = document.getElementById("nome").value;
            var idade = document.getElementById("idade").value;
            var cidade = document.getElementById("cidade").value;

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
                }
            });

          } else { //Se não salva no IndexedDB
            alert("Dispositivo Offline1");
            console.log("|== Popular IndexedDB ==|");
            var n = document.getElementById("nome").value;
            var i = document.getElementById("idade").value;
            var c = document.getElementById("cidade").value;

            var novo = [ { nome: n, idade: i, cidade: c } ];
            console.log("Nome : " + n);
            console.log("Idade : " + i);
            console.log("Cidade : " + c);

            db.pessoas.add({nome: n, idade: i, cidade: c});
          }
      }

      //Enviar pro MySql
      async function salvarsql(){
        online = window.navigator.onLine;

        //Se online envia do IndexedDB pro SQL
        if (online){
          alert("Dispositivo Online2");
          var id;
          var nome;
          var idade;
          var cidade;
          var i;

          // contar quantos precisao ser
          db.pessoas.toCollection().count(function (count) {
              i = count;
              console.log("Dados Presentes no IndexedDB : "+i);
          });

          //Pega todos os dados da tabela e armazena em um array results
          db.pessoas
            .orderBy('id')
            .toArray()
            .then(function (results) {
                //console.log (results);
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
                      }
                  });
                }
                //console.log (JSON.stringify(results));
                limpar();
          }).catch(function (error) {
            console.log("Erro: "+ error);
          }).finally(function () {
              //Limpa a tabela IndexedDB

          });
        } else { //Se nao
          alert("Dispositivo Offline2");
        }

      }

      async function limpar(){
      //  await salvarsql();
        db.pessoas.clear();
        console.log("|--- IndexedDB Limpo ---|");
      }

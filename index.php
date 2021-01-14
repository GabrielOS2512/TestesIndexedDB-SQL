<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#0014DD"/>
    <meta name="Toyexample PWA">
    <title>PWA</title>
    <link rel="apple-touch-icon" href="images\icons\icon-72x72.png">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="manifest" href="manifest.json">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <script src="js/jquery.js"></script>
    <script src="js/dexie.js"></script>
    <script src="js/bd.js"></script>
    <script src="js/conexao.js"></script>
    <script>
      // Checar se o SW é suportado pelo navegador
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('service-worker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          });
        });
      }
    </script>
  </head>
  <body>
    <?php
      include 'conectar.php';//incluir a coneção ao bd
    ?>

    <form class="form-control" name="pesquisa" method="post" action="">
      <h1 class="jumbotron">Teste BD</h1>

      <br>

      <label for="nome">Nome</label>
      <input class="form-control" type="text" name="nome" id="nome">
      <br>
      <label for="idade">Idade</label>
      <input class="form-control" type="text" name="idade" id="idade">
      <br>
      <label for="cidade">Cidade</label>
      <input class="form-control" type="text" name="cidade" id="cidade">

      <br><br>

      <button type="submit" id="popular" class="btn btn-secondary" onClick="inserir()">Popular</button>
      <button type="submit" id="salvar" class="btn btn-success" onClick="salvarsql()">Salva no SQL</button>
      <a href="teste.html" class="btn btn-warning">Teste</a>

      <!-- <input type="submit" id="salvar2" value="Salvar2" class="btn btn-primary mr-sm-4" onClick="salvar()"> -->
    </form>
    <br>
    <h1 class="jumbotron">IndexedDB - SQL</h1>

  </body>
</html>

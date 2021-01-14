 <?php
  include 'conectar.php';

  $nome=$_POST['nome'];
  $idade=$_POST['idade'];
  $cidade=$_POST['cidade'];
  
  $sql="INSERT INTO `pessoas` (`nome`, `idade`, `cidade`) VALUES ('$nome', '$idade', '$cidade')";
  if ($conn->query($sql) === TRUE) {
      echo "|--- Inserido ---|";
  }
  else
  {
      echo "|=== ERRO ===|";
  }
?>

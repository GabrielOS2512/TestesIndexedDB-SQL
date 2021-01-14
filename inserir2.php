 <?php
  // include 'conectar.php';
  //
  // $nome=$_POST['nome'];
  // $idade=$_POST['idade'];
  // $cidade=$_POST['cidade'];
  // $sql="INSERT INTO `pessoas` (`nome`, `idade`, `cidade`) VALUES ('$nome', '$idade', '$cidade')";
  // if ($conn->query($sql) === TRUE) {
  //     echo "data inserted";
  // }
  // else
  // {
  //     echo "failed";
  // }
?>
<?php
  include 'conectar.php';

  $nome=$_POST['nome'];
  $idade=$_POST['idade'];
  $cidade=$_POST['cidade'];
  $array=$_POST['array'];

  $sql="INSERT INTO `pessoas` (`nome`, `idade`, `cidade`) VALUES $array";
  if ($conn->query($sql) === TRUE) {
      echo "data inserted";
  }
  else
  {
      echo "failed";
  }
?>

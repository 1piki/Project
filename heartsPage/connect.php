<?php

    $con = mysqli_connect('localhost','root','');
   
   if(!$con)
   {
	   echo 'Connection to the server failed.';
   }
   
   if(!mysqli_select_db($con,'inputs'))
   {
	   echo 'Database cannot be accessed.';
   }
   
    $instagram = $_POST['instagram'];
   $content = $_POST['content'];
   
   $sql = "INSERT INTO data(instagram, content) VALUES ('$instagram', '$content')";
   
   if(!mysqli_query($con,$sql))
   {
	   echo 'Insertion failed';
   }else{
	   echo 'Inserted into DB.';
   }
   
   header("refresh:2; url=FINAL-HEARTS.html");
?>
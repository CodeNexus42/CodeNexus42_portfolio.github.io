<!--RECUERDA Tienes que poner el correo al que esta direccioanda la página, y volver a ver todo el vídeo para corregir el código-->
<?php
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['message'];

/*Tiene que ser el mismo correo que el de la página*/
$email_from = 'aldamichelle.2@gmail.com'; 

$email_asunto = 'Preguntas de usuarios';

$email_body = "User Name: $name.\n".
                "User Email: $visitor_email.\n".
                    "Subject: $asunto.\n".
                      "User Message: $mensaje.\n";

$to = 'A01750910@tec.mx';

$headers = "From : $email_from \r\n";

$headers .= "Reply-To: $visitor_email \r\n";

mail($to, $email_asunto, $email_body, $headers);

header("Location: citas.html");
?>

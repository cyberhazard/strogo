
<?php
$to      = 'tai.traffic@gmail.com,info@strogo-mtm.ru,andrey.gl.pro@gmail.com';
$subject = 'Заявка с сайта';
$message = 'Заявка.  Имя: ' . $_POST["name"] . ' Телефон: ' . $_POST["phone"] ;
$headers = 'From: admin@strogo-boots.ru' . "\r\n" .
    'Content-Type: text/plain; charset=utf8;' . "\r\n" .
    'Reply-To: admin@strogo-boots.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
?>

<?php
$name = $_POST["name"];
$phone = $_POST["phone"];
if(empty($name)) die();
$to      = 'tai.traffic@gmail.com,info@strogo-mtm.ru,andrey.gl.pro@gmail.com';
$subject = 'Подарочный сертификат';
$message = "Заявка на подарочный сертификат .\n Имя: {$name}, телефон: {$phone}";
$headers = 'From: admin@shoes.strogo-mtm.ru' . "\r\n" .
    'Content-Type: text/plain; charset=utf8;' . "\r\n" .
    'Reply-To: admin@shoes.strogo-mtm.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
echo mail($to, $subject, $message, $headers);
?>


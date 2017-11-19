<? echo $_POST["user-name"]; ?>
<? echo $_POST["user-phone"]; ?>
<? echo $_POST; ?>


<?php
$to      = 'tai.traffic@gmail.com,info@strogo-mtm.ru,andrey.gl.pro@gmail.com';
$subject = 'Заявка с сайта';
$mmm = isset($_POST["user-text"])? ' Сообщение: ' . $_POST["user-text"] : '';
$message = 'Заявка.  Имя: ' . $_POST["user-name"] . ' Телефон: ' . $_POST["user-phone"] . $mmm;
$headers = 'From: admin@beget.tech' . "\r\n" .
    'Content-Type: text/plain; charset=utf8;' . "\r\n" .
    'Reply-To: admin@beget.tech' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
?>

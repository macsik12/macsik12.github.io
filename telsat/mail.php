<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$number = $_POST['number'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'teslatelecom@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'numark36'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('teslatelecom@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('teslatelecom@yandex.ru');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка на подключение от ' .$name;
$mail->Body    = '<div style="background-color: #bbffbb; border-top: 10px solid #9999ff; text-align: center; padding: 10px">' .$name . ' оставил заявку<br>Телефон:' .$number. '<br>Почта: ' .$email. '<br>Адрес:' .$address. '</div>';


$mail->AltBody = '';


if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>
<?php
print('Abriendo Archivo...<br>');
$fichero_url = fopen('archivo.txt', 'r');

$texto = '';

while ( $trozo = fgets($fichero_url) ) {
    $texto .= $trozo;
}

print($texto);

print('<br>Haciendo otra cosa');
<?php

    // credenciales base de datos
    define('DB_USER', 'manuelgithub');
    define('DB_PASS', 'min8chars');
    define('DB_HOST', '85.10.205.173:3306');
    define('DB_NAME', 'agendaphp');

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    //echo $conn -> ping();

?>

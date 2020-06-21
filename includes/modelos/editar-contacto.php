<?php

    if ($_POST['accion'] == 'editar') {
        //Editar un Contacto

        require_once('../funciones/db.php');

        //Validar las entradas
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
        $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);

        try {
            //Prepare Statement
            $stmt = $conn->prepare("UPDATE contactos SET nombre = ?, empresa = ?, telefono = ? WHERE id = ?");
            $stmt->bind_param("sssi", $nombre, $empresa, $telefono, $id);
            $stmt->execute();
            if ($stmt->affected_rows ==1) {
                $respuesta = array(
                    'respuesta' => 'correcto'
                );
            } else {
                $respuesta = array(
                    'respuesta' => 'error'
                );
            }
            $stmt->close();
            $conn->close();
        } catch (EXCEPTION $e) {
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }

        echo json_encode($respuesta);
    }
?>
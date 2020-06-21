<?php
    if($_GET['accion'] == 'borrar') {
        //Eliminar Contacto

        require_once('../funciones/db.php');

        $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

        try {
            $stmt = $conn->prepare("DELETE FROM contactos WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();

            if ($stmt->affected_rows ==1) {
                $respuesta = array(
                    'respuesta' => 'correcto'
                );
            }

            $stmt->close();
            $conn->close();
        } catch (Exception $e) {
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }   
        echo json_encode($respuesta);
    }

?>
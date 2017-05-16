<?php
/**
 * Created by PhpStorm.
 * User: rickard.doverfelt
 * Date: 2017-05-16
 * Time: 11:32
 */

$db = new mysqli("localhost", "root", "", "threeGame");
if (!$db->set_charset("utf-8")) {
    http_response_code(500);
    echo json_encode(["error" => "Internal server error", "errorCode" => $db->errno]);
    die();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['payload'])) {
        //TODO Actually post highscore
    } else {
        http_response_code(400);
        echo json_encode(["error" => "No payload"]);
        die();
    }

} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //TODO Actually return highscores
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed", "method" => $_SERVER['REQUEST_METHOD']]);
}
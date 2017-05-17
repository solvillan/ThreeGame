<?php
/**
 * Created by PhpStorm.
 * User: rickard.doverfelt
 * Date: 2017-05-16
 * Time: 11:32
 */

$db = new mysqli("localhost", "root", "", "threeGame");
/*if (!$db->set_charset("utf-8")) {
    http_response_code(500);
    echo json_encode(["error" => "Internal server error", "errorCode" => $db->errno]);
    die();
}*/
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['payload'])) {
        $insert = $db->prepare("INSERT INTO scores VALUES (0, ?, ?);");
        $data = json_decode($_POST["payload"]);
        $name = $data->name;
        $score = $data->score;
        $insert->bind_param("si", $name, $score);
        if ($insert->execute()) {
            echo json_encode(["result" => true, "data" => $data]);
        } else {
            echo json_encode(["error" => "Internal server error", "errorCode" => $insert->errno]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "No payload"]);
        die();
    }

} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $fetch = $db->prepare("SELECT score, name FROM scores ORDER BY score DESC;");
    $score;
    $name;
    $out = [];
    $fetch->bind_result($score, $name);
    $fetch->execute();
    while ($fetch->fetch()) {
            $out[] = ["name" => $name, "score" => $score];
    }
    echo json_encode($out);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed", "method" => $_SERVER['REQUEST_METHOD']]);
}
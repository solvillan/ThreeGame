<?php
    $csrf = openssl_digest($_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT'].$_SERVER['SERVER_NAME'], "SHA512");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ThreeGame</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body onload="fetchHighscores();">
<div class="score">

</div>

<div class="healthBarBg"><div class="healthBarBorder"><div class="healthBar"></div></div></div>

<div class="crosshair center">
    <img src="img/crosshair.png">
</div>

<div class="menu">
    <div class="center">
        <h1>ThreeGame</h1>
        <h2>Highscores</h2>
        <table id="scores">

        </table>
        <button class="start" onclick="start();">Start Game!</button>
    </div>
</div>

<div class="gameOver">
    <div class="center">
        <h1>Game Over!</h1>
        <h2>Score: <span class="finalScore"></span></h2>
        <form onsubmit="return submitScore();">
            <input type="hidden" name="csrf" value="<?php echo $csrf; ?>">
            <label>
                <input type="text" name="name" placeholder="Name">
            </label>
            <input type="submit">
        </form>
    </div>
</div>

<script src="js/lib/vendor/Three.js"></script>
<script>
    if (typeof THREE === 'undefined') {
        document.write("<script src='/js/lib/vendor/Three.js' type='text/javascript'>\x3C/script>");
    }
</script>
<script src="js/lib/vendor/OBJLoader.js"></script>
<script src="js/lib/vendor/ColladaLoader.js"></script>
<script src="js/lib/Models/Cube.js"></script>
<script src="js/lib/Models/Plane.js"></script>
<script src="js/lib/Models/OBJModel.js"></script>
<script src="js/lib/Models/ColladaModel.js"></script>
<script src="js/lib/Input.js"></script>
<script src="js/lib/Entities/Enemy.js"></script>
<script src="js/lib/Entities/Bullet.js"></script>
<script src="js/lib/Models/SkyBox.js"></script>
<script src="js/main.js"></script>

</body>
</html>
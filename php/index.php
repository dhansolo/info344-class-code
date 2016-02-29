<<<<<<< HEAD
<?php 
$url = parse_url($_SERVER['REQUEST_URI']);
$name = substr($url['path'], 1);
if (strlen($name) == 0) {
	$name = 'World';
=======
<?php
$url = parse_url($_SERVER['REQUEST_URI']);
$name = substr($url['path'], 1);
if (strlen($name) == 0) {
    $name = 'World';
>>>>>>> 3c8515c4416a5c067735897bd2477625ce122fd5
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<<<<<<< HEAD
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta charset="UTF-8">
	<title>Hello <?= htmlentities($name) ?></title>
</head>
<body>
	<h1>Hello <?= htmlentities($name) ?>!</h1>

=======
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <title>Hello <?= htmlentities($name) ?></title>
</head>
<body>
    <h1>Hello <?= htmlentities($name) ?>!</h1>
    
>>>>>>> 3c8515c4416a5c067735897bd2477625ce122fd5
</body>
</html>
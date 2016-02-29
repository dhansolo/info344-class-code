<?php 
function getConnection() {
<<<<<<< HEAD
	require_once 'secret/db-credentials.php';
	
	try {
		$conn = new PDO("mysql:host=$dbHost;dbname=$dbDatabase", $dbUser, $dbPassword);
		return $conn;
	} catch(PDOException $e) {
		die('Could not connect to database' .  $e);
	}
=======
    require_once 'secret/db-credentials.php';
    
    try {
        $conn = new PDO("mysql:host={$dbHost};dbname={$dbDatabase}", 
              $dbUser, $dbPassword);
        
        return $conn;
        
    } catch(PDOException $e) {
        die('Could not connect to database ' . $e);
    }
>>>>>>> 3c8515c4416a5c067735897bd2477625ce122fd5
}

?>
<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "planning_generale";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
		
	// DB operations
	$sql = "INSERT INTO dati (ID_CELLA, VALORE, PERIODO, PROGETTO) VALUES ('". $_POST['id'] ."', ". $_POST['value'] .", " . $_POST['period'] . ", '" . $_POST['project'] . "')".
				"ON DUPLICATE KEY UPDATE ID_CELLA='". $_POST['id'] ."', VALORE=". $_POST['value'] . ", PERIODO=" . $_POST['period'] . ", PROGETTO='" . $_POST['project'] . "';";
	if ($conn->query($sql) === FALSE) {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	$conn->close();
?>
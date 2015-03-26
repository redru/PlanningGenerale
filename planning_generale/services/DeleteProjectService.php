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
	$sql = "DELETE FROM dati WHERE PERIODO='" . $_POST['period'] . "' AND PROGETTO='" . $_POST['project'] . "';";
	if ($conn->query($sql) === FALSE) {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	$conn->close();
?>
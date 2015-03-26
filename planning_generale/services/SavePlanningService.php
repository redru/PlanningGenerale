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
	$sql = "INSERT INTO plannings (ID_PLANNING, VALORE, PERIODO) VALUES ('". $_POST['planning'] ."', ". $_POST['value'] .", " . $_POST['period'] . ")".
				"ON DUPLICATE KEY UPDATE ID_PLANNING='". $_POST['planning'] ."', VALORE=". $_POST['value'] . ", PERIODO=" . $_POST['period'] . ";";
	if ($conn->query($sql) === FALSE) {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	$conn->close();
?>
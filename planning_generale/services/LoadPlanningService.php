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
	$sql = "SELECT * FROM plannings WHERE PERIODO=" . $_POST['period'];
	$result = $conn->query($sql);
	$response = array();
	
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			array_push($response, array('id_planning' => $row["ID_PLANNING"], 'value' => $row["VALORE"], 'period' => $row["PERIODO"]));
		}
	} else {
		echo "0 results";
	}
	
	echo json_encode($response); 
	$conn->close();
?>
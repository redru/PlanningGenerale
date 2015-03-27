<!DOCTYPE html>

<html>

<head>
	<link rel="stylesheet" type="text/css" href="css/planning.css">

	<script src="lib/jquery-1.11.2/jquery-1.11.2.min.js"></script>
	<script src="js/planning-scripts.js"></script>
	<script src="js/error.js"></script>
	<script src="js/db-functions.js"></script>

	<title>Planning Generale</title>
</head>

<body>
	<div id="mainContainer">
		<input id="newProject" placeholder="Nuovo Progetto"></input>
		<button onclick="addProject()">Aggiungi</button>
		<span id="selectedDate">Periodo visualizzato: </span>
		<select id="monthSelect" onchange="loadPeriod()">
		  <option value="1">Gennaio</option>
		  <option value="2">Febbraio</option>
		  <option value="3">Marzo</option>
		  <option value="4">Aprile</option>
		  <option value="5">Maggio</option>
		  <option value="6">Giugno</option>
		  <option value="7">Luglio</option>
		  <option value="8">Agosto</option>
		  <option value="9">Settembre</option>
		  <option value="10">Ottobre</option>
		  <option value="11">Novembre</option>
		  <option value="12">Diciembre</option>
		</select>
		<select id="yearSelect" onchange="loadPeriod()">
		  <option value="2014">2014</option>
		  <option value="2015">2015</option>
		  <option value="2016">2016</option>
		  <option value="2017">2017</option>
		  <option value="2018">2018</option>
		</select>
		<img class="loader" src="resources/ajax-loader.gif"/>
		
		<div id="top-error-area" class="error-area float-right width-50x100"></div>
		
		<br><br>
<!---------------------------------------------------------------------------->
		<label><strong>PM</strong></label>
		<div id="pm" class="planning">
			<label class='spacer-15'><strong>-------------</strong></label>
			<?php
				for ($x = 1; $x <= 31; $x++) {
					echo "<div class='day'>" . $x . "</div>";
				} 
			?>
			<div style="clear: both"></div>
			
			<div class="projectList"></div>
			
			<div class="totals">
				<label class='interno'><strong>PERSONALE</strong></label>
				<input class="inputPersonale" type="number" onfocusout='calculate()'></input>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='pm" . $x . "' class='cellPersonale cellPersonaleInterno'></div>";
					} 
				?>
				
				<label class='esterno'><strong>P. ESTERNO</strong></label>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='pm_e" . $x . "' class='cellPersonale cellPersonaleEsterno'></div>";
					} 
				?>
			</div>
			<div style="clear: both"></div>
		</div>
<!---------------------------------------------------------------------------->
		<label><strong>DESIGN</strong></label>
		<div id="design" class="planning">
			<label class='spacer-15'><strong>-------------</strong></label>
			<?php
				for ($x = 1; $x <= 31; $x++) {
					echo "<div id='" . $x . "' class='day'>" . $x . "</div>";
				} 
			?>
			<div style="clear: both"></div>
			
			<div class="projectList"></div>
			
			<div class="totals">
				<label class='interno'><strong>PERSONALE</strong></label>
				<input class="inputPersonale" type="number"></input>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='design" . $x . "' class='cellPersonale cellPersonaleInterno'></div>";
					} 
				?>
				
				<label class='esterno'><strong>P. ESTERNO</strong></label>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='design_e" . $x . "' class='cellPersonale cellPersonaleEsterno'></div>";
					} 
				?>
			</div>
			<div style="clear: both"></div>
		</div>
<!---------------------------------------------------------------------------->
		<label><strong>CAS</strong></label>
		<div id="cas" class="planning">
			<label class='spacer-15'><strong>-------------</strong></label>
			<?php
				for ($x = 1; $x <= 31; $x++) {
					echo "<div id='" . $x . "' class='day'>" . $x . "</div>";
				} 
			?>
			<div style="clear: both"></div>
			
			<div class="projectList"></div>
			
			<div class="totals">
				<label class='interno'><strong>PERSONALE</strong></label>
				<input class="inputPersonale" type="number"></input>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='cas" . $x . "' class='cellPersonale cellPersonaleInterno'></div>";
					} 
				?>
				
				<label class='esterno'><strong>P. ESTERNO</strong></label>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='cas_e" . $x . "' class='cellPersonale cellPersonaleEsterno'></div>";
					} 
				?>
			</div>
			<div style="clear: both"></div>
		</div>
<!---------------------------------------------------------------------------->
		<label><strong>FRESA</strong></label>
		<div id="fresa" class="planning">
			<label class='spacer-15'><strong>-------------</strong></label>
			<?php
				for ($x = 1; $x <= 31; $x++) {
					echo "<div id='" . $x . "' class='day'>" . $x . "</div>";
				} 
			?>
			<div style="clear: both"></div>
			
			<div class="projectList"></div>
			
			<div class="totals">
				<label class='interno'><strong>PERSONALE</strong></label>
				<input class="inputPersonale" type="number"></input>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='fresa" . $x . "' class='cellPersonale cellPersonaleInterno'></div>";
					} 
				?>
				
				<label class='esterno'><strong>P. ESTERNO</strong></label>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='fresa_e" . $x . "' class='cellPersonale cellPersonaleEsterno'></div>";
					} 
				?>
			</div>
			<div style="clear: both"></div>
		</div>
<!---------------------------------------------------------------------------->
		<label><strong>MODELLERIA</strong></label>
		<div id="modelleria" class="planning">
			<label class='spacer-15'><strong>-------------</strong></label>
			<?php
				for ($x = 1; $x <= 31; $x++) {
					echo "<div id='" . $x . "' class='day'>" . $x . "</div>";
				} 
			?>
			<div style="clear: both"></div>
			
			<div class="projectList"></div>
			
			<div class="totals">
				<label class='interno'><strong>PERSONALE</strong></label>
				<input class="inputPersonale" type="number"></input>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='modelleria" . $x . "' class='cellPersonale cellPersonaleInterno'></div>";
					} 
				?>
				
				<label class='esterno'><strong>P. ESTERNO</strong></label>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='modelleria_e" . $x . "' class='cellPersonale cellPersonaleEsterno'></div>";
					} 
				?>
			</div>
			<div style="clear: both"></div>
		</div>
<!---------------------------------------------------------------------------->
		<label><strong>VERNICIATURA</strong></label>
		<div id="verniciatura" class="planning">
			<label class='spacer-15'><strong>-------------</strong></label>
			<?php
				for ($x = 1; $x <= 31; $x++) {
					echo "<div id='" . $x . "' class='day'>" . $x . "</div>";
				} 
			?>
			<div style="clear: both"></div>
			
			<div class="projectList"></div>
			
			<div class="totals">
				<label class='interno'><strong>PERSONALE</strong></label>
				<input class="inputPersonale" type="number"></input>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='verniciatura" . $x . "' class='cellPersonale cellPersonaleInterno'></div>";
					} 
				?>
				
				<label class='esterno'><strong>P. ESTERNO</strong></label>
				<?php
					for ($x = 1; $x <= 31; $x++) {
						echo "<div id='verniciatura_e" . $x . "' class='cellPersonale cellPersonaleEsterno'></div>";
					} 
				?>
			</div>
			<div style="clear: both"></div>
		</div>
<!---------------------------------------------------------------------------->
	</div>
</body>

</html>

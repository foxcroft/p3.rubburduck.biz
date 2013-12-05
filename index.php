<DOCTYPE! html>

<html>

<head>

	<link rel="stylesheet" type="text/css" href="default.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

</head>

<body>

	<div id="frame">
		
		<div id="board">

			<!-- set up the grid of water squares -->
			<div class="square blank" id="blank"></div>
			<div class="square column" id="1">1</div>
			<div class="square column" id="2">2</div>
			<div class="square column" id="3">3</div>
			<div class="square column" id="4">4</div>
			<div class="square column" id="5">5</div>
			<div class="square column" id="6">6</div>
			<div class="square column" id="7">7</div><br><br><br>

			<?php include 'squares.php'; ?>

			<br>
			<div id="message">&nbsp;</div>
			<br>

			<!-- Set buttons for starting and hiding -->
			<div id="buttons">
				<button id='start'>START!</button>
				<button id='hide'>HIDE DUCKS</button>
				<button id='reveal'>REVEAL DUCKS</button>
			</div>

			<!-- 
			<div class="square open" id="e1"></div>
			<div class="square open" id="e2"></div>
			<div class="square open" id="e3"></div>
			<div class="square open" id="e4"></div>
			<div class="square open" id="e5"></div>
			-->

	 	</div>

	</div>

	<div id='stats'>
		<div id='defense'>
			<br><br><br>
			How many ducks does Bannigan have left to find? <span id='defense_left'>14</span>
		</div>
		<div id="bann_status"></div>
	</div>

	<script src="default.js"></script>

	<script>
	</script>

</body>

</html>
<DOCTYPE! html>

<html>

<head>

	<link rel="stylesheet" type="text/css" href="default.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

</head>

<body>

	<br>
	<h1>DUCKS <span style="font-size: 22px;">RUN</span> AMOK</h1>

	<div id="frame">
		
		<div id="board">

			<!-- set up the grid of water squares -->
			<div class="square blank" id="blank"></div>
			<div class="square column" id="1"><span class="col_content">1</span></div>
			<div class="square column" id="2"><span class="col_content">2</span></div>
			<div class="square column" id="3"><span class="col_content">3</span></div>
			<div class="square column" id="4"><span class="col_content">4</span></div>
			<div class="square column" id="5"><span class="col_content">5</span></div>
			<div class="square column" id="6"><span class="col_content">6</span></div>
			<div class="square column" id="7"><span class="col_content">7</span></div><br><br><br>

			<?php include 'squares.php'; ?>

			<br>
			<div id="message">&nbsp;</div>
			<br>

			<!-- Set buttons for starting and hiding -->
			<div id="buttons">
				<input type='button' id='start' value='START OVER'>
				<input type='button' id='hide' value='HIDE DUCKS'>
				<input type='button' id='reveal' value='REVEAL DUCKS'>
			</div>

			<!-- 
			<div class="square open" id="e1"></div>
			<div class="square open" id="e2"></div>
			<div class="square open" id="e3"></div>
			<div class="square open" id="e4"></div>
			<div class="square open" id="e5"></div>
			-->

	 	</div>

		<div id='stats'>
			<div id='defense' style='font-size:13px;'>
				<br><br><br>
				<div><h3>Ho! There are ducks hiding in them squares!</h3>
					You can find them if you just poke around a little.
					Ducks, as you know, like to stay in single file lines with ducks of the same color.
					Pointing leftward-rightward, or upward-downward, but always a line,
					and always close together. But of course, ducks are polite creatures,
					and a line will happily break apart briefly, if it is to let another
					line of ducks through.</div><br>
				<div>Click <strong>HIDE DUCKS</strong> to start those ducks hiding!
					Then click a square to try and find them.</div><br>
					<div>And watch out, Ol' Bannigan is looking for them too!
						If he finds them all first, <em>he eats them.</em></div><br>
			</div>
			<div id="bann_number">How many ducks does Bannigan have left to find? </div><div id='defense_left'>14</div>
			<br>
			<div id="bann_status"></div>
			<div id="badelynge_hit"></div>
		</div>

	</div>


	<script src="default.js"></script>

	<script>
	</script>

</body>

</html>
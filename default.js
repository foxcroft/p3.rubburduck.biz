var grid_width = 7;
var grid_height = 7;
var grid_size = grid_height * grid_width;

var row_array = Array(
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j'
);

var ducks_hidden = "FALSE";

var duck_array = Array(
	2,
	3,
	4,
	5
);

var my_ducks = count_ducks(duck_array);

var color_array = Array(
	'#9900CC',
	'#99FF11',
	'#33CCFF',
	'#FFAA11'
);

var bann_array = Array(
	2,
	3,
	4,
	5
)

var bann_ducks = 14;
var available_squares_bann = grid_size;
var badelynge_hit = 0;
var bann_hit_index = -1;
var bann_guesswork = 2;

$('#start').click(function() {
	location.reload();
});

//reveal all of the duck locations
$('#reveal').click(function() {

	reveal_ducks();

});

function reveal_ducks() {

	for (var i = 0; i < grid_height; i++) {
		
		for (var j = 1; j <= grid_width; j++) {
			var square_id = '#' + row_array[i] + j;

			if($(square_id).hasClass("target")) {
				var square_class = $(square_id).attr('class');
				var bg_color = grab_color(square_class);
				
				$('#' + row_array[i] + j).css('background-color', bg_color);
			}

		}

	}

}

// add duck class to certain squares
$('#hide').click(function() {
	$('#message').html('&nbsp;');

	if (ducks_hidden == "TRUE") {
		$('#message').html("You already hid them...");
	}
	else {
		hide_ducks(0);
		hide_ducks(1);
		hide_ducks(2);
		hide_ducks(3);

		ducks_hidden = "TRUE";
	}
});


function hide_ducks(badelynge_index) {

	// determine whether to place the duck horizontally or vertically
	var orientation = Math.floor( (Math.random() * 2) );

	var chain_length = duck_array[badelynge_index];
	var duck_color = color_array[badelynge_index];

	// if orientation generates to 0, place ducks horizontally.
	if (orientation == 0) {
		horizontal_duck(chain_length, duck_color);
	}
	else if (orientation == 1) {
		vertical_duck(chain_length, duck_color);
	}

}



function horizontal_duck(chain_length, duck_color) {

	// select the row
	function set_row() {
		var row_index = Math.floor( (Math.random() * grid_height) + 0);
		var row = row_array[row_index];
	
		return row;
	}

	var row = set_row();
	var row_open = "FALSE";


	// determine how many squares are open
	var open_squares = 0;

	// evaluate whether the random row has enough available squares, otherwise switch it
	while (row_open == "FALSE") {

		for (var j = 1; j <= grid_width; j++) {
			var square_class = $('#' + row + j).attr('class');
			var is_a_duck = check_square(square_class);

			if (is_a_duck == "NO") {
				open_squares++;
			}
		}

		if (open_squares < chain_length) {
			row = set_row();
			open_squares = 0;
		}
		else {
			row_open = "TRUE";
		}

	}


	// determine which squares it can start on
	var start_range = open_squares - (chain_length - 1);

	// randomly select the starting square
	var start_square = Math.floor( (Math.random() * start_range) + 1 );

	// set all the ducks down
	for (var j = start_square; j < (start_square + chain_length) ; j++) {
	
		var square_class = $('#' + row + j).attr('class');

		if (check_square(square_class) == "NO") {
			$('#' + row + j).removeClass("open").addClass("target").addClass(duck_color);
		}
		else {
			start_square++;
		}

	}

}


function vertical_duck(chain_length, duck_color) {

	// select the column
	function set_col() {
		var col_index = Math.floor( (Math.random() * grid_width) + 0);
		var col = col_index + 1;
		console.log("Column is " + col);
	
		return col;
	}

	var col = set_col();
	var col_open = "FALSE";

	// determine how many squares are open
	var open_squares = 0;

	// evaluate whether the random column has enough available squares, otherwise switch it
	while (col_open == "FALSE") {

		for (var i = 0; i < grid_height; i++) {
			var square_class = $('#' + row_array[i] + col).attr('class');
			var is_a_duck = check_square(square_class);

			if (is_a_duck == "NO") {
				open_squares++;
			}
		}

		if (open_squares < chain_length) {
			col = set_col();
			open_squares = 0;
		}
		else {
			col_open = "TRUE";
		}

	}

	// determine which squares it can start on
	var start_range = open_squares - (chain_length - 1);

	// randomly select the starting square
	var start_square = Math.floor( (Math.random() * start_range) );

	// set all the ducks down
	for (var i = start_square; i < (start_square + chain_length) ; i++) {
	
		var square_class = $('#' + row_array[i] + col).attr('class');

		if (check_square(square_class) == "NO") {
			$('#' + row_array[i] + col).removeClass("open").addClass("target").addClass(duck_color);
		}
		else {
			start_square++;
		}

	}

}


$('.water').click(function() {

	if (ducks_hidden == "FALSE") {
		$('#message').html("You've got to tell them ducks to hide first!");
	}
	else if (my_ducks == 0) {
		$('#message').html("You found them first! All the ducks are safe.<br>You can cuddle them in your backyard.");
	}
	else if (bann_ducks == 0) {
		$('#message').html("Ol' Banny already found them all.<br>You lose and he ate them.");
	}
	else {
		var square_id = $(this).attr('id');
		var square_class = $(this).attr('class');
		
		var is_a_duck = check_square(square_class);

		// if it's a duck, grab the color from the array, otherwise set to red.
		if (is_a_duck == "YES") {

			duck_color = grab_color(square_class);
			$(this).css('background-color', duck_color);
			my_ducks--;
		
		}
		else {
		
			$(this).css('background-color','#FF3333');
		
		}

		$('#message').html('You still need to find ' + my_ducks + ' ducks');

		check_bann();

	}

});


function check_square(square_class) {

		// split the ID's by the nbsp delimiter
		var class_array = square_class.split(" ");

		// check the ID: if it is a duck, change the background color.
		var is_a_duck = "NO";
		for (i in class_array) {

			if (class_array[i] == 'target') {
				is_a_duck = "YES";
				break;
			}
		}

		return is_a_duck;

};

function grab_color(square_class) {

		// split the ID's by the nbsp delimiter
		var class_array = square_class.split(" ");

		// set the duck's color to last term in class, which is the background color.
		var duck_color = "";

		for (i in class_array) {

			duck_color = class_array[i];

		}

		return duck_color;

}

// check to see if Bannigan found a duck
function check_bann() {

	// Bann randomly selects from his available squares
	var bann_guess = ( Math.floor(Math.random() * available_squares_bann) * 2 / 3 );

	// if Bann is currently working on one of the badelynges
	// in his array, evaluate at a greater likelihood of locating	
	if(0 <= bann_hit_index && bann_hit_index < bann_array.length) {

		// Bann now has 50% chance of finding another duck
		bann_guess = Math.floor(Math.random() * bann_guesswork);

		if (bann_guess == 0) {

			bann_ducks--;
			bann_array[bann_hit_index]--;
			available_squares_bann--;
			bann_guesswork = 2;

			// if there aren't any ducks left in the current badelynge, reset to -1
			if (bann_array[bann_hit_index] == 0) {
				bann_hit_index = -1;

				// when he's found a full badelynge, specify which badelynge in the stats
				$('#bann_status').html('Oh no, he found the last in that chain!<br>Available Squares: ' + available_squares_bann);
				$('#badelynge_hit').append('Bannigan found a chain of ' + badelynge_hit + ' ducks!<br>');
			}
			else {
				$('#bann_status').html('Bannigan caught another duck!<br>Available Squares: ' + available_squares_bann);

			}

			$('#defense_left').html(bann_ducks);

		}
		// if he misses, even at 50% (sheesh!)
		else {
			available_squares_bann--;
			$('#bann_status').html('Bannigan missed! Now hit him hard.<br>Available Squares: ' + available_squares_bann);
			bann_guesswork--;
		}

	}

	// if Bann's guess is within the first =bann_ducks of
	// the remaining squares, then he hit something
	else if (bann_guess < bann_ducks) {
	
		// determine which badelynge he hit among those with ducks remaining
		bann_hit_index = Math.floor(Math.random() * (bann_array.length));
	
		// if the randomly selected badelynge has no remaining ducks, try another!
		while (bann_array[bann_hit_index] < 1) {
			bann_hit_index = Math.floor(Math.random() * (bann_array.length));
		}

		// how many ducks are in the badelynge found?
		badelynge_hit = bann_array[bann_hit_index];

		bann_ducks--;
		bann_array[bann_hit_index]--;
		available_squares_bann--;
		$('#defense_left').html(bann_ducks);
		$('#bann_status').html('Bannigan caught a duck!<br>Available Squares: ' + available_squares_bann);


	}

	// if Bann isn't currently working on a badelynge, and he didn't
	// just hit one now, move on
	else {
		available_squares_bann--;
		$('#bann_status').html('Bannigan missed! Now hit him hard.<br>Available Squares: ' + available_squares_bann);
	}

	if (bann_ducks == 0) {
		reveal_ducks();
	}


}

function count_ducks(duck_array) {
	
	var tot_ducks = 0;

	for(i in duck_array) {
		tot_ducks = tot_ducks + duck_array[i];
	}

	return tot_ducks;

}



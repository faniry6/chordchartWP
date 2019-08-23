<?php
/**
 * Plugin Name: ChordChartWP
* Plugin URI: coming sson
* Description: A shortcode generator for the javascript based chord chart chordography2. Can be used for Ukulele, Banjo and any fretted string instrument.
* Version: 1.0
* Author: Faniry Razafindrazaka
* Author URI: coming soon
**/
function wpFindChord($chord) {
	// Define list of known chords
	$basic_chord = array (
			"A" => array (
					"x02220",
					"xx123x"
			),
			"B" => array (
					"x24442",
					"x12341"
			),
			"C" => array (
					"x32010",
					"x32x1x"
			),
			"D" => array (
					"xx0232",
					"xxx132"
			),
			"E" => array (
					"022100",
					"x231xx"
			),
			"F" => array (
					"133211",
					"134211"
			),
			"G" => array (
					"320003",
					"21xxx4"
			)
	);
	return $basic_chord [$chord];
}
function wpScriptInitialize(){
	wp_register_script('chart-data', plugin_dir_url(__FILE__).'js/chart.data.js');
	wp_enqueue_script('chart',plugin_dir_url(__FILE__).'js/chart.js',array('chart-data'));
}

add_action('wp_enqueue_scripts','wpScriptInitialize');

function wpChordChart($atts) {
	//wp_enqueue_script(chart);
	wpScriptInitialize();
	echo 'Launching the plugin';
	$attribute = shortcode_atts ( array (
			'title' => '',
			'frets' => '',
			'labels' => '',
			'footer' => '',
			'barre' => 'auto',
			'barHeight'=> 8,
			'barGirth'=> 3,
			'cellWidth'=> 20,
			'cellHeight'=> 24,
			'dotSize'=> 16,
			'fontHeight'=> 14,
			'fontBaseline'=> 5,
			'minSpan'=> 4,
			'nutHeight'=> 4,
			'padding'=> 7,
			'scale'=> 0.5,
			'style'=> "default"
	), $atts );
	$chords = ' ';

	if (! $attribute ['title']) {
		echo 'ERROR::Missing chords title\n';
		return $chords;
	}
	$title_array = explode ( ',', $attribute ['title'] );

	$need_chords_lookup = false;

	$frets_array = array ();
	$labels_array = array ();
	$footer_array = array ();

	if (! $attribute ['frets']) {
		// Enable look up for known chords
		$need_chords_lookup = true;

		$known_chord = false;
		$numChord = count ( $title_array );
		for($i = 0; $i < $numChord; $i ++) {
			$chord_info = wpFindChord ( $title_array [$i] );
			if (strlen((string)$chord_info[1]) !== 0) {
				$frets_array [$i] = $chord_info [0];
				$labels_array [$i] = $chord_info [1];
			} else {
				// Remove it from the title array since it wont be displayed
				unset ( $title_array [$i] );
			}
		}
		$title_array = array_values ( $title_array );
		$frets_array = array_values ( $frets_array );
		$labels_array = array_values ( $labels_array );

	} else {
		$frets_array = explode ( ',', $attribute ['frets'] );
		if ($attribute ['labels'])
			$labels_array = explode ( ',', $attribute ['labels'] );
			if ($attribute ['footer'])
				$footer_array = explode ( ',', $attribute ['footer'] );
	}

	// Need to make sure that our two arrays are exactly the same length before we continue
	if (count ( $title_array ) != count ( $frets_array )) {
		echo 'ERROR::Length of title and frets do not match!\n';
		return $chords;
	}

	// Create the chord chart as html
	$html = ' ';
	$html .= '<p></p>';
	$html .= '<div class="diagram">';
	$html .= '<span>';

	$arrayID = array ();

	for($i = 0; $i < count ( $title_array ); $i ++) {
		$html .= '<span style="border:0px #aaa solid; margin: 10px 5px; display: inline-block;" title="chords">';
		$arrayID [] = uniqid ();
		$html .= '<div id="' . $arrayID [$i] . '"></div>';
		$html .= '</span>';
	}

	$html .= '</span>';
	$html .= '</div>';

	//  All possible attribute
	// 	$html .='"barre":'    .$attribute['barre'] .',
	//             "barHeight":' .$attribute['barHeight'] .',
	//             "barGirth":'  .$attribute['barGirth'] .',
	//             "cellWidth":' .$attribute['cellWidth'] .',
	//             "cellHeight":'.$attribute['cellHeight'] .',
	//             "dotSize":'    .$attribute[ 'dotSize'] .',
	//             "fontHeight":' .$attribute['fontHeight'] .',
	//             "fontBaseline":'.$attribute['fontBaseline'] .',
	//             "minSpan":'.$attribute['minSpan'] .',
	//             "nutHeight":'.$attribute['nutHeight'] .',
	//             "padding":'.$attribute['padding'] .',
	//             "scale":'.$attribute['scale'] .',
	//             "style":"'.$attribute['style'].'"};';

	$html .= '<script> addGraphic = chordography({
		"cellHeight":' . $attribute ['cellHeight'] . ',
		"scale":'.$attribute['scale'] .',
		"dotSize":'    .$attribute[ 'dotSize'] .',
	        "fontHeight":' .$attribute['fontHeight'] .',
		"style":"'.$attribute['style'].'"});';

	// Defin udi
	for($i = 0; $i < count ( $title_array ); $i ++) {
		$contain_bracket = strpos ( $frets_array [$i], '(' );
		$frets_comma_split = '';

		if ($contain_bracket !== false) {
			$fretArray = explode ( '(', $frets_array [$i] );

			for($j = 0; $j < count ( $fretArray ); $j ++) {
				$subFretPos = strpos ( $fretArray [$j], ')' );

				if ($subFretPos !== false) {
					$subsubFret = array_filter ( explode ( ')', $fretArray [$j] ) );

					$frets_comma_split .= $subsubFret [0] . ',';
					if (count ( $subsubFret ) > 1) {
						$frets_comma_split .= substr ( chunk_split ( $subsubFret [1], 1, "," ), 0, - 1 ) . ',';
					}
				} else {
					$frets_comma_split .= substr ( chunk_split ( $fretArray [$j], 1, "," ), 0, - 1 ) . ',';
				}
			}
			$frets_comma_split = substr ( $frets_comma_split, 0, - 1 );
		} else {
			if(strlen($frets_array [$i])===0){
				$chord_info = wpFindChord ( $title_array [$i] );
				$frets_array[$i] = $chord_info[0];
				$labels_array [$i] = $chord_info [1];
			}
			$frets_comma_split = substr ( chunk_split ( $frets_array [$i], 1, "," ), 0, - 1 );
		}

		// Generate the chord as svg
		$html .= 'addGraphic({title:"' . $title_array [$i] . '",frets:"' . $frets_comma_split . '",';
		if (strlen((string)$labels_array [$i]) !== 0) {
			$labels_comma_split = substr ( chunk_split ( $labels_array [$i], 1, "," ), 0, - 1 );
			$html .= 'labels:"' . $labels_comma_split . '",';
		} else {
			$html .= 'labels:"",';
		}

		if (strlen((string)$footer_array[$i]) !== 0) {
			$footer_comma_split = substr ( chunk_split ( $footer_array [$i], 1, "," ), 0, - 1 );
			$html .= 'footer:"' . $footer_comma_split . '",';
		} else {
			$html .= 'footer:"",';
		}
		$html .= '},'.'document.getElementById("' . $arrayID [$i] . '"));';
	}
	$html .= '</script>';
	// Put it exactly where it should be
	echo $html; 
}
add_shortcode ( 'chordChart', 'wpChordChart' );
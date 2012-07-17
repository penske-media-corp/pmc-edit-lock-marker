<?php
/*
Plugin Name: PMC Edit Lock Marker
Plugin URI: http://www.pmc.com
Description: A plugin to mark the posts on wp-admin/edit.php page which are currently being edited by other users
Version: 0.3
Author: Amit Gupta
Author URI: http://www.pmc.com
*/

add_action('init', 'pmc_edit_lock_marker_loader');

function pmc_edit_lock_marker_loader() {
	//load plugin class
	require_once("class-pmc-edit-lock-marker.php");
	
	//init class
	$pmc_edit_lock_marker = PMC_Edit_Lock_Marker::get_instance();
}


//EOF
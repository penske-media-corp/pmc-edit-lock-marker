/**
 * Part of PMC Edit Lock Marker plugin
 * 
 * @since 2012-07-02 Amit Gupta
 * @version 2012-07-13 Amit Gupta
 * 
 **/

jQuery(document).ready(function($) {
	
	function pmc_check_post_edit_lock() {
		var post_ids = new Array();		//array to store post IDs on the page
		$("#the-list tr[id*=post-]").each(function(index) {
			var elem_id = jQuery(this).attr('id');
			//make sure ID has value & the type of value that we need
			if( elem_id && elem_id.substr(0,5) == "post-" ) {
				elem_id = elem_id.split("-");
				post_ids.push( parseInt( elem_id[1] ) );	//put the post ID in our array
			}
			elem_id = null;
		});
		//proceed only if there are any post IDs in our array
		if( post_ids.length > 0 ) {
			post_ids = post_ids.join(",");	//convert the array to a string to send to server
			// time to check for edit locks
			$.post(
				ajaxurl,
				{
					action: 'pmc-post-edit-lock-marker',
					_pmc_elm_ajax_nonce: pmc_edit_lock_marker.nonce,
					post_ids: post_ids
				},
				function(data) {
					//remove edit-lock marker class from any existing post rows
					$("#the-list tr[id*=post-]").removeClass("pmc-edit-lock");
					
					if( ! data || ! data.nonce || ! data.posts ) {
						//no data or our specific data isnt here, bail
						return false;
					}
					
					pmc_edit_lock_marker.nonce = data.nonce;
					var locked_posts = data.posts.split(",");	//convert locked post IDs to an array
					if( locked_posts.length < 1 ) {
						//locked post ID array is blank, bail
						return;
					}
					
					for( var i=0; i < locked_posts.length; i++ ) {
						$("#" + "post-" + locked_posts[i]).addClass("pmc-edit-lock");	//add edit-lock marker class to post row
					}
				},
				"json"
			);
		}
	}
	
	//execute only if we are on the edit.php
	if( adminpage && adminpage == "edit-php" ) {
		pmc_check_post_edit_lock();	//lets call it initially
		
		//now set it to poll every 30 seconds
		var pmc_post_edit_lock_check_timer = setInterval( pmc_check_post_edit_lock, 30000 );
	}
	
});

//EOF
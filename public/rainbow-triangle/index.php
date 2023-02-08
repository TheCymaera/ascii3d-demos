<?php
	$url = strtok("$_SERVER[REQUEST_SCHEME]://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]", "\?|#");

	// page basic settings
	$page_title 		= "Heledron";
	$page_description 	= "Ascii3D - Rainbow Triangle Demo";
	$page_author		= "Morgan";
	$page_keywords		= "Heledron, Hadron, Cymaera, OpenGL, WebGL, Ascii3D";

	// page open graph settings
	$page_og_title = $page_title;
	$page_og_description = $page_description;
	$page_og_url = $url;
	$page_og_image = dirname($page_og_url, 2) . "/" . "thumbnail.png";
	$page_og_type = "website";
?>
<!DOCTYPE html>
<html class="hadron-theme-light">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
	<!-- title & favicon -->
	<title><?php echo $page_title;?></title>
	<link rel="icon" href="/favicon.png" type="image/png"/>
	<link rel="canonical" href="<?php echo $page_og_url;?>"/>
	
	<!-- info -->
	<meta name="author" content="<?php echo $page_author;?>"/>
	<meta name="description" content="<?php echo $page_description;?>"/>
	<meta name="keywords" content="<?php echo $page_keywords;?>"/>
	
	<!-- sharing -->
	<meta property="og:title" content="<?php echo $page_og_title;?>"/>
	<meta property="og:description" content="<?php echo $page_og_description;?>"/>
	<meta property="og:url"   content="<?php echo $page_og_url;?>"/>
	<meta property="og:image" content="<?php echo $page_og_image;?>"/>
	<meta property="og:type"  content="<?php echo $page_og_type;?>"/>

	<!-- scripts -->
	<script type="module" src="./dst/main.js"></script>
</head>
<body>
	<canvas></canvas>
	<style>
		canvas {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;

			object-fit: contain;
			object-position: center;
		}
	</style>
</body>
</html>
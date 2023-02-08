<?php
	$url = strtok("$_SERVER[REQUEST_SCHEME]://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]", "\?|#");

	// page basic settings
	$page_title 		= "Ascii3D Water Demo";
	$page_description 	= "Ascii3D Water Demo";
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
<html class="full-window-document">
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

	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="/shared/fontawesome-free-5.13.1-web/css/all.min.css"/>
	<link rel="stylesheet" type="text/css" href="/shared/helion/v1/index.css"/>

	<!-- scripts -->
	<script type="module" src="/shared/helion/v1/index.js"></script>
	<script type="module" src="./dst/main.js"></script>
</head>
<body class=stack>
	<standard-view>
		<app-bar slot="header" center-title="">
			<app-bar-left>
				<a class="app-bar-icon-button" href="/">
					<i class="fa fa-angle-left"></i>
				</a>
			</app-bar-left>
			<app-bar-title>Ascii 3D Water Demo</app-bar-title>
		</app-bar>
		<sidebar-view id=sidebarView slot="body" sidebar-opened>
			<panel- slot=sidebar style="overflow: auto;">
				<?php include "./sidebar.html"; ?>
			</panel->
			<stack- slot=main>
				<aspect-ratio style="--aspect-ratio: 1; padding: 1em 4em;">
					<canvas class="panel" id=myCanvas></canvas>	
				</aspect-ratio>
				<div class="layout actionButtons">
					<button title="Information" class="circle-button js-toggleDialog">
						<i class="fa fa-info"></i>
					</button>
					<button title="Download" class="circle-button js-downloadImage">
						<i class="fa fa-download"></i>
					</button>
					<button title="Toggle Settings" class="circle-button js-toggleSidebar">
						<i class="fa fa-cog"></i>
					</button>
					<button title="Share" class="circle-button js-share">
						<i class="fa fa-share"></i>
					</button>
				</div>
			</stack->
		</sidebar-view>
	</standard-view>

	<panel- class=infoDialog>
		<div style="max-width: 600px; width: 100%; margin: auto;">
			<?php include "./info.html"; ?>
		</div>

		<div class="layout fill-parent actionButtons">
			<button class="circle-button js-toggleDialog" title="Close"> 
				<i class="fa fa-times"></i>
			</button>
		</div>
	</panel->

	<style>
		.infoDialog {
			opacity: 1;
			transition: opacity .2s ease;
			will-change: opacity;
		}

		body:not([data-info-dialog-opened]) .infoDialog {
			opacity: 0;
			pointer-events: none;
		}

		.actionButtons {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: start;
			grid-gap: .5em;
			padding: .5em;
		}

		panel- {
			padding: .5em;
		}
	</style>

	<script type="module">
		for (const button of document.querySelectorAll(".js-toggleDialog")) {
			button.onclick = ()=>{
				document.body.toggleAttribute("data-info-dialog-opened");
			}
		}
		
		for (const button of document.querySelectorAll(".js-share")) {
			button.onclick = async ()=>{
				if (!navigator.share) {
					alert("Sharing is not available in this environment.");
					return;
				}
				
				try {
					await navigator.share({
						title: document.title,
						text: (document.querySelector('meta[name="description"]'))?.content ?? document.title,
						url: window.location.href
					});
				} catch(e) {
					if (e.name === "AbortError") return;
					alert("An error occurred: " + e.name);
				}
			}
		}
		
		for (const button of document.querySelectorAll(".js-toggleSidebar")) {
			button.onclick = async ()=>{
				sidebarView.toggleAttribute("sidebar-opened");
			}
		}

		for (const button of document.querySelectorAll(".js-downloadImage")) {
			button.onclick = ()=>{
				const a = document.createElement("a");
				a.href = myCanvas.toDataURL("image/png", undefined);
				a.download = "ascii3d-water.png";
				a.click();
			}
		}

		new ResizeObserver(()=>{
			sidebarView.setAttribute("layout", 
				(sidebarView.clientWidth/sidebarView.clientHeight) < .8 ? "mobile" : "desktop"
			);
		}).observe(sidebarView);
	</script>
</body>
</html>
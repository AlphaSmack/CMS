<?php  return array (
  'resourceClass' => 'modDocument',
  'resource' => 
  array (
    'id' => 1,
    'type' => 'document',
    'contentType' => 'text/html',
    'pagetitle' => 'Home',
    'longtitle' => '',
    'description' => '',
    'alias' => 'index',
    'link_attributes' => '',
    'published' => 1,
    'pub_date' => 0,
    'unpub_date' => 0,
    'parent' => 0,
    'isfolder' => 0,
    'introtext' => NULL,
    'content' => '',
    'richtext' => 1,
    'template' => 1,
    'menuindex' => 0,
    'searchable' => 1,
    'cacheable' => 1,
    'createdby' => 1,
    'createdon' => 1412285731,
    'editedby' => 0,
    'editedon' => 0,
    'deleted' => 0,
    'deletedon' => 0,
    'deletedby' => 0,
    'publishedon' => 0,
    'publishedby' => 0,
    'menutitle' => '',
    'donthit' => 0,
    'privateweb' => 0,
    'privatemgr' => 0,
    'content_dispo' => 0,
    'hidemenu' => 0,
    'class_key' => 'modDocument',
    'context_key' => 'web',
    'content_type' => 1,
    'uri' => NULL,
    'uri_override' => 0,
    'hide_children_in_tree' => 0,
    'show_in_tree' => 1,
    'properties' => NULL,
    '_content' => '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>[*pagetitle*] - [(site_name)]</title>
<meta http-equiv="Content-Type" content="text/html; charset=[(modx_charset)]" />
<base href="[(site_url)]"></base>
<link rel="stylesheet" href="assets/templates/foundation/default.css" type="text/css" />
<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="[(site_url)][~11~]" />
  </head>
<body>
<body>
<div id="header">
	<h1><a href="[(site_url)]">[(site_name)]</a></h1>
	<h2>Your slogan here</h2>
</div>
<div id="left">
	<div id="menu" class="boxed">
		<h2 class="heading">Pages</h2>
[[Wayfinder?startId=`0` &level=`1`]]

		<h2 class="heading">Latest Entries</h2>
[[Ditto? &startID=`2` &summarize=`3` &total=`20` &commentschunk=`Comments` &tpl=`nl_sidebar` &showarch=`0` &truncLen=`100` &truncSplit=`0`]]
	</div>
</div>
<!-- end #left -->
<div id="right">
	<div class="boxed">
		<h2 class="heading">Latest News</h2>
[[ListIndexer?LIn_root=0]] 
		<h2 class="heading">Our Friends</h2>
<ul>
<li>List item number one</li>
<li>List item number two</li>
<li>List item number three </li>
<li>List item number four </li>
<li>List item number five </li>
<li>List item number six </li>
</ul>
	</div>
</div>
<!-- end #right -->
<div id="center">
	<div class="boxed">
		<h1 class="heading">[*pagetitle*]</h1>
		<p>[*#content*]</p>
	</div>
</div>
<!-- end #center -->
<div style="clear: both;">&nbsp;</div>
<div id="footer">
	<p id="legal">Copyright &copy; [(site_name)]. All Rights Reserved. Designed by <a href="http://www.freecsstemplates.org/">Free CSS Templates</a>. Template by <a href="http://modxd.com">MODx Templates</a></p>
	<p id="links"><a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></p>
</div>
</body>
</html>',
    '_isForward' => false,
  ),
  'contentType' => 
  array (
    'id' => 1,
    'name' => 'HTML',
    'description' => 'HTML content',
    'mime_type' => 'text/html',
    'file_extensions' => '.html',
    'headers' => NULL,
    'binary' => 0,
  ),
  'policyCache' => 
  array (
  ),
  'sourceCache' => 
  array (
    'modChunk' => 
    array (
    ),
    'modSnippet' => 
    array (
    ),
    'modTemplateVar' => 
    array (
    ),
  ),
);
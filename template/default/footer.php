</div>
<div align="center">
<img src="template/default/img/hr-line.png">
<a href="http://flgc.info/SBpgpd"><img src="http://s10.flagcounter.com/count/sF9y/bg_d9d4c8/txt_000000/border_BACCA3/columns_6/maxflags_20/viewers_OrionMu+Visitors/labels_0/pageviews_0/flags_0/" alt="free counters" border="0"></a>
</div>
</td></tr></table></div><div class="middle_bottom"></div></div></td>
























<td width="235px" valign="top">
<div class="br"><img src="template/default/img/bl_login.png" alt="Login" />
<div style="maring-left: 15px;">


<?if ( $_SESSION['user_login'] != ok ){?>


	<form method="post" name="loginform" action="">
	<table align="center" border="0" cellpadding="0" cellspacing="0" width="60%">
	<tbody>
<tr align="center">
<td height="23" width="67">
<INPUT onfocus="if(this.value=='Login')this.value=''" onblur="if(this.value=='')this.value='Login'" value="Login" type="text" class="txt-simple" maxLength="20"  size="15" name="user_<? echo($_SESSION['md5_post']); ?>">
</td>
</tr>
<tr align="center">
<td height="23" width="67">
<INPUT onfocus="if(this.value=='Password')this.value=''" onblur="if(this.value=='')this.value='Password'" value="Password" type="password" class="txt-simple" maxLength="20" size="15" name="pass_<? echo($_SESSION['md5_post']); ?>" >
<input type="hidden" name="username_login">
</td>
</tr>
<tr align="center">
<td colspan="2" height="25">
<input value="Login" class="txt-simple" name=login_start type="submit" onClick="encrypt_data('account_l','pass_content','Please Wait...','140');">
</td>
</tr>
<tr>
<td colspan="2" align="center" height="25">
<br>
<span><a href="<? echo($muweb['servername']); ?>-lostPassword.html">Forgot Password?</a></span>
</td>
</tr>
	</tbody></table></form>
<?}else{?>










<table border="0" align="center" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="100%" id="AutoNumber7">
<tr align="center">
		<td width="26%" valign="top">Hi, <? echo($_SESSION['user_login_name']); ?>
		<font size="1"><b><? include('Sub_Pages/VR.php'); ?></b></font>
		<font size="1"><b><? include('Sub_Pages/VR2.php'); ?></b></font><BR>
		<img width="100" src="template/default/img/no-avatar.gif">
               
                <div class="style2" id="logout_content">
                <input name="Submit" type="button" class="txt-simple" value="Logout" onClick="logout('Mu-Logout.html','logout_content','Please Wait...','140','Are you sure you want to log out?');">
		</div>
</td></tr>
</table>
</div></div>









<div class="br"><img src="template/default/img/bl_service.png" alt="Service" />
<div style="margin: 0px 50px 5px 35px;">
<table cellpadding="0" cellspacing="0">

<tr>
<td width="170"  align="center" class="mainMenu"><a href="<? echo($muweb['servername']); ?>-Account.html" onClick="sub_page('<? echo($muweb['servername']); ?>-Account.html');">Account Panel</a></td>
</tr>
<tr><td><img src="template/default/img/pixel.gif" width="4" height="10"></td></tr>						
<tr>
<td width="170"  align="center" class="mainMenu"><a href="<? echo($muweb['servername']); ?>-Characters.html" onClick="sub_page(\''.$muweb['servername'].'-Characters.html\');">Game Panel</a></td>
</tr>
<tr><td><img src="template/default/img/pixel.gif" width="4" height="10"></td></tr>			
<tr>
<td width="170"  align="center" class="mainMenu"><a href="<? echo($muweb['servername']); ?>-VoteReward.html" onClick="sub_page('<? echo($muweb['servername']); ?>-votereward.html');">Free Credits</a></td>
</tr>





<?if ( $_SESSION['admin_login'] == "ok" ){?>
<tr><td><img src="template/default/img/pixel.gif" width="4" height="10"></td></tr>	
<tr>							
<td width="170"  align="center" class="mainMenu"><a href="<? echo($muweb['servername']); ?>-GM.html" onClick="sub_page('<? echo($muweb['servername']); ?>-GM.html');">GM Panel</a></td>
</tr>
<?}?>
</table>
<?}?>
</div></div>






















<div class="br"><img src="template/default/img/bl_statistics.png" alt="Statistics" />
<div style="margin: 0px 50px 5px 35px;">
<table width="100%">

<? include('Sub_Pages/statistic.php'); ?>

</table></div></div>








<div class="br"><img src="template/default/img/VFU.png" alt="Statistics" />
<div style="margin: 0px 50px 5px 35px;">

<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr align="center"><td>
<!-- Begin Gamesites100 voting code -->
<a href="http://www.gamesites100.net/in.php?site=24445" title="Mu Online Top 100" target="_blank">
<img src="http://www.Gamesites100.net/images/votebutton.jpg" border="0" alt="Mu Online Top 100"/>
</a>
<!-- End gamesites100 voting code -->
</td></tr><tr align="center"><td>
<script src=http://wos.lv/v.php?13933></script>
</td></tr>

</table></div></div>










<div style="margin: 0px 50px 5px 35px;">
</div>
</td>
</tr>
</table>
</div></div>
<div style="padding-top: 50px;">
<div id="foot">
<center>
<div class="footer">
<div align="center">Copyright 2012 OrionMu. All Rights Reserved.</div>
</div>
</center>
</div>
</div></div>
</div>
</body>
</html>

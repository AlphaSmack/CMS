var ie4 = document.all;
var ns6 = document.getElementById && !document.all;

//**********************************************************

function confirm_proc(url, msg) {
	if (confirm(msg))
		window.location.href = url;
}

function strpos(str, ch) {
	for (var i = 0; i < str.length; i++) {
		if (str.substring(i, i+1) == ch)
			return i;
	}

	return -1;
}

//**********************************************************

var dropMenu = false;

function dm_hide() {
	if (dropMenu) {
		$("#"+dropMenu).hide();
		dropMenu = false;
	}
}

function dm_show(id) {
	dm_hide();
	$("#"+id).show(300);
	dropMenu = id;
}

function dm_checkparent(a, b) {
	while (b.parentNode) {
		if ((b = b.parentNode) == a) return true;
	}
	return false;
}

function dm_tryhide(e) {
	if (ie4 && !document.getElementById(dropMenu).contains(e.toElement)) dm_hide();
	else if (ns6 && e.currentTarget != e.relatedTarget && !dm_checkparent(e.currentTarget, e.relatedTarget)) dm_hide();
}

//**********************************************************

function showTime(container, timestring, timerscript) {

	this.containerId = "#"+container;

	if (!timerscript) {
		this.d = new Date(timestring);
		this.serverTime();
	}
	else {
		this.period = timestring;
		this.timerscript = timerscript;
		this.timerTime();
	}
}

showTime.prototype.numFormat = function(num) {
	return (num<10) ? "0"+num : num;
}

showTime.prototype.serverTime = function() {

	var thisobj = this;

	var day = this.numFormat(this.d.getDate());
	var month = this.numFormat(this.d.getMonth()+1);
	var year = this.d.getFullYear();
	var hour = this.numFormat(this.d.getHours());
	var minutes = this.numFormat(this.d.getMinutes());
	var seconds = this.numFormat(this.d.getSeconds());

	$(this.containerId).text(day+"-"+month+"-"+year+" "+hour+":"+minutes+":"+seconds);

	this.d.setSeconds(this.d.getSeconds()+1);

	setTimeout(function(){thisobj.serverTime()}, 1000);
}

showTime.prototype.timerTime = function() {

	var thisobj = this;

	var minutes = this.numFormat(Math.floor(this.period/60));
	var seconds = this.numFormat(this.period % 60);

	$(this.containerId).text(minutes+":"+seconds);

	if (this.period > 0) {
		this.period--;
		setTimeout(function(){thisobj.timerTime()}, 1000);
	}
	else {
		eval(this.timerscript);
	}
}

//**********************************************************

function elCheckUncheck(id) {
	if ($("input#"+id).attr("type") == 'checkbox') {
		if ($("input#"+id).attr("checked") == true)
			$("input#"+id).attr({checked: ""});
		else
			$("input#"+id).attr({checked: "checked"});
	}
}

function elShowHide(id, speed) {
	if (document.getElementById(id).style.display == 'none') {
		if (typeof(speed) != "undefined")
			$("#"+id).show(speed);
		else
			$("#"+id).show();
	}
	else {
		if (typeof(speed) != "undefined")
			$("#"+id).hide(speed);
		else
			$("#"+id).hide();
	}
}

function elCenterize(id, width, height) {
	var page_width = window.innerWidth || self.innerWidth || document.body.clientWidth;
	var page_height = window.innerHeight || self.innerHeight || document.body.clientHeight;

	var scroll_x = self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	var scroll_y = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

	var from_top = (((page_height - height) / 2) + scroll_y);
	var from_left = (((page_width - width) / 2) + scroll_x);

	$(id).css({left: from_left, top: from_top});
}

//**********************************************************

function tickBox(url, tb_width, tb_height, tb_id, loader) {
	$("#tbloader_"+tb_id).remove();
	$("#tbwindow_"+tb_id).remove();

	if (loader) {
		$("body").append('<div id="tbloader_'+tb_id+'" style="position:absolute; padding:7px; background-color:#ececec; border:1px solid #000000; text-align:center; width:235px; height:40px; display:block; z-index:999;"><b>Please wait! Loading...</b><br /><br /><img border="0" src="index/loading.gif"></div>');
		elCenterize("#tbloader_"+tb_id, 235, 40);
	}

	$("body").append('<div id="tbwindow_'+tb_id+'" style="position:absolute; background-color:#ececec; border:1px solid #000000; width:'+tb_width+'px; display:none; z-index: 999;"><div id="tbcontent_'+tb_id+'" style="padding:7px; text-align:left; height:'+tb_height+'px;"></div></div>');

	$("#tbcontent_"+tb_id).load(url,
		function() {
			elCenterize("#tbwindow_"+tb_id, tb_width, tb_height);

			$("#tbwindow_"+tb_id).fadeIn(400);

			if (loader) {
				$("#tbloader_"+tb_id).remove();
			}
			else {
				$("#tbcontent_"+tb_id).append('<br /><div align="center">'
				+ '<input class="button-gray" onclick="$(\'#tbwindow_'+tb_id+'\').remove();" value="'+lang_btclose+'" type="button">'
				+ '</div>');
			}
		}
	);
}

//**********************************************************

function keyTable(object) {
	this.obj = object;

	this.chEng = 'abcdefghijklmnopqrstuvwxyz';
	this.chDec = '0123456789';
	this.chSim = '!@^#*_-=~|';
	//this.chSim = '!@#$%^&*()_+|=-`~[]{}.,?><;:/';

	this.vPass = document.forms['loginform'].pass;
	this.vDiv = document.getElementById('keypad');

	this.keyTb = '';
}

keyTable.prototype.keyshow = function(shiftFl, tmp) {
	var out = '';

	for (var j = 0; j < tmp.length; j++) {
		ich = tmp.charAt(j);
		if (shiftFl) ich = ich.toUpperCase();
		out += '<input style="width:24px; height:24px; font:bold 16px Arial; cursor:pointer;" type="button" class="txt-simple" value="'+ich+'" onclick="'+this.obj+'.vPass.value+=this.value; this.blur();" />&nbsp;';
	}

	return out;
}

keyTable.prototype.keycreate = function(tmp) {
	var out = '';
	var cnt = tmp.length;

	for (var j = 0; j < cnt; j++) {
		tt = Math.floor(tmp.length * Math.random());
		out += tmp.charAt(tt);
		tmp = tmp.substring(0,tt).concat(tmp.substring(tt+1));
	}

	return out;
}

keyTable.prototype.keypadshow = function() {
	if (document.getElementById('keypad').style.display == 'none' ) $("#keypad").html(this.keyTb).fadeIn(500);
	else $("#keypad").hide();
}

keyTable.prototype.shKeypad = function(mod) {
	if (mod) {
		var chEng1 = this.keycreate(this.chEng);
		var chDec1 = this.keycreate(this.chDec);
		var chSim1 = this.keycreate(this.chSim);
	} else {
		var chEng1 = this.chEng;
		var chDec1 = this.chDec;
		var chSim1 = this.chSim;
	}

	this.keyTb = '<table border="0" style="border: 1px solid #6699cc; background-color: #e4eeff;">';
	this.keyTb += '<tr><td colspan="2">' + this.keyshow(0, chEng1) + '</td></tr>';
	this.keyTb += '<tr><td colspan="2">' + this.keyshow(1, chEng1)+ '</td></tr>';
	this.keyTb += '<tr><td colspan="2">' + this.keyshow(0, chDec1) + this.keyshow(0, chSim1) +'</td></tr>';
	this.keyTb += '<tr><td colspan="2" style="height: 8px;"></td></tr>';
	this.keyTb += '<tr><td>';
	this.keyTb += '<input style="width: 100px;" type="button" class="txt-simple" value="'+lang_btclear+'" onclick="document.forms[\'loginform\'].pass.value=\'\';">&nbsp;';
	this.keyTb += '<input style="width: 100px;" type="button" class="txt-simple" value="'+lang_btoriginal+'" onclick="'+this.obj+'.shKeypad(); $(\'#keypad\').html('+this.obj+'.keyTb);">&nbsp;';
	this.keyTb += '<input style="width: 100px;" type="button" class="txt-simple" value="'+lang_btresort+'" onclick="'+this.obj+'.shKeypad(1); $(\'#keypad\').html('+this.obj+'.keyTb);">&nbsp;';
	this.keyTb += '<input style="width: 40px;" type="button" class="txt-simple" value="&larr;" onclick="tt=document.forms[\'loginform\'].pass.value; document.forms[\'loginform\'].pass.value=tt.substring(0,tt.length-1);">&nbsp;';
	this.keyTb += '</td><td align="right">';
	this.keyTb += '<input style="width: 60px;" type="button" class="txt-simple" value="'+lang_btclose+'" onclick="$(\'#keypad\').hide();">&nbsp;';
	this.keyTb += '</td></tr>';
	this.keyTb += '</table>';
}

//**********************************************************

function selectInput(object, name, startTitle, startValue, formName, width) {
	if (object.substring(0, 3) == 'wi_') {
		this.obj = object.substring(3);
		this.outId = object;
	} else {
		this.obj = object;
		this.outId = false;
	}

	this.name = name;
	this.startTitle = startTitle;
	this.startValue = startValue;
	this.formName = formName;
	this.width = width;
	this.iList = [];
	this.iList2 = [];
	this.timer = null;
}

selectInput.prototype.add = function(discription, value, javascript) {
	this.iList[this.iList.length] = Array(discription, value, javascript);
}

selectInput.prototype.add2 = function(discription, value, javascript) {
	this.iList2[this.iList2.length] = Array(discription, value, javascript);
}

selectInput.prototype.timerReset = function() {
	clearTimeout(this.timer);
	this.timer = setTimeout("$(\"#selectinput_"+this.obj+"\").hide()", 500);
}

selectInput.prototype.timerStop = function() {
	clearTimeout(this.timer);
}

selectInput.prototype.click = function(txt, value) {
	$("#selectinput_"+this.obj).hide();
	$("#selectinput_title_"+this.obj).text(txt);
	$("#selectinput_input_"+this.obj).attr({value: ""+value+""});

	if (this.formName != '')
		eval("document."+this.formName+".submit();");
}

selectInput.prototype.reloadArr = function() {
	this.iList2 = [];
}

selectInput.prototype.construct = function() {
	if (this.iList.length > 10) {
		var div_scroll = 'height: 200px; overflow: auto; ';
	} else {
		var div_scroll = '';
	}

	var output = '<div style="margin:1px 0px 1px 0px; padding:0px; cursor:pointer; width:'+this.width+'px; z-index:5;" onclick="elShowHide(\'selectinput_'+this.obj+'\', 300);" onmouseover="'+this.obj+'.timerStop();" onmouseout="'+this.obj+'.timerReset();">'
	+ '<table border="0" cellpadding="0" cellspacing="1" height="15" bgcolor="#000000" width="100%"><tr>'
	+ '<td style="padding: 0px 5px 0px 5px;" bgcolor="#ffffff"><div id="selectinput_title_'+this.obj+'" style="font: bold 10px Verdana;">'+this.startTitle+'</div></td>'
	+ '<td width="17" bgcolor="#ffffff"><img alt="Open select menu" src="index/select_arrow.gif" border="0" height="15" width="17"></td>'
	+ '</tr></table>'
	+ '</div>'
	+ '<input type="hidden" id="selectinput_input_'+this.obj+'" name="'+this.name+'" value="'+this.startValue+'">'
	+ '<div id="selectinput_'+this.obj+'" style="margin:1px 0px 0px 0px; padding:0px; z-index:5; display:none; width:'+this.width+'px; position:absolute;" onmouseover="'+this.obj+'.timerStop();" onmouseout="'+this.obj+'.timerReset();">'
	+ '<div style="'+div_scroll+'border: 1px solid #000000;"><table border="0" cellpadding="0" cellspacing="3" width="100%" style="background-color: #ffffff;">';

	for (i = 0; i < this.iList.length; i++) {
		output += '<tr><td style="padding:3px; cursor:pointer;" onmouseover="$(this).css({ background: \'#e4eeff\', border: \'1px solid #3399ff\', padding: \'2px\' });" onmouseout="$(this).css({ background: \'#ffffff\', border: \'0px\', padding: \'3px\' });" onclick="'+this.obj+'.click(\''+this.iList[i][0]+'\',\''+this.iList[i][1]+'\');'+this.iList[i][2]+'">'+this.iList[i][0]+'</td></tr>';
	}

	for (i = 0; i < this.iList2.length; i++) {
		output += '<tr><td style="padding:3px; cursor:pointer;" onmouseover="$(this).css({ background: \'#e4eeff\', border: \'1px solid #3399ff\', padding: \'2px\' });" onmouseout="$(this).css({ background: \'#ffffff\', border: \'0px\', padding: \'3px\' });" onclick="'+this.obj+'.click(\''+this.iList2[i][0]+'\',\''+this.iList2[i][1]+'\');'+this.iList2[i][2]+'">'+this.iList2[i][0]+'</td></tr>';
	}

	output += '</table></div></div>';

	if (!this.outId)
		document.write(output);
	else
		$("#"+this.outId).html(output);
}

//**********************************************************

function forum_textarea(form, input_name, smiles_arr, value) {

	if (form.substring(0, 3) == 'wi_') {
		var outId = form;
		form = form.substring(3);
	} else {
		var outId = false;
	}

	var smiles = '<table cellspacing="0" cellpadding="0" border="0" class="btb" bgcolor="#ffffff"><tr class="style2">';
	var n = 0;

	for (el in smiles_arr) { /* smiles_arr[el][0] */
		smiles += ((n % 12) == 0 && n != 0) ? '</tr><tr class="style2">' : '';
		n++;
		smiles += '<td><img class="button" alt="'+smiles_arr[el][0]+'" onclick="textareaInsert(\''+smiles_arr[el][0]+'\',document.forms.'+form+'.'+input_name+'); $(\'#'+form+'_postsmiles\').hide();" src="'+smiles_arr[el][1]+'"></td>';
	}

	smiles += '</tr></table>';

	var output = '<table cellspacing="0" cellpadding="0" border="0" style="padding-bottom:2px;">'
	+ '<tr><td>'
	+ '<input type="button" value="B" class="txt-simple" style="width:25px; font-size:9px; font-weight:bold;" onclick="bbTag(\'[b]\',\'[/b]\',document.forms.'+form+'.'+input_name+');"><img width="3" src="index/spacer.gif">'
	+ '<input type="button" value="I" class="txt-simple" style="width:25px; font-size:9px; font-style:italic;" onclick="bbTag(\'[i]\',\'[/i]\',document.forms.'+form+'.'+input_name+');"><img width="3" src="index/spacer.gif">'
	+ '<input type="button" value="U" class="txt-simple" style="width:25px; font-size:9px; text-decoration:underline;" onclick="bbTag(\'[u]\',\'[/u]\',document.forms.'+form+'.'+input_name+');"><img width="5" src="index/spacer.gif">'

	+ '<input type="button" value="URL" class="txt-simple" style="width:30px; font-size:9px;" onclick="bbTag(\'[url]\',\'[/url]\',document.forms.'+form+'.'+input_name+');"><img width="3" src="index/spacer.gif">'
	+ '<input type="button" value="IMG" class="txt-simple" style="width:30px; font-size:9px;" onclick="bbTag(\'[img]\',\'[/img]\',document.forms.'+form+'.'+input_name+');"><img width="3" src="index/spacer.gif">'
	+ '<input type="button" value="QUOTE" class="txt-simple" style="width:50px; font-size:9px;" onclick="bbTag(\'[quote]\',\'[/quote]\',document.forms.'+form+'.'+input_name+');"><img width="3" src="index/spacer.gif">'
	+ '<input type="button" value=":)" class="txt-simple" style="width:25px; font-size:9px;" onclick="elShowHide(\''+form+'_postsmiles\');">'
	+ '</td><td align="right">'

	+ '<img width="3" src="index/spacer.gif"><input type="button" value="+" class="txt-simple" style="width:25px; font-size:9px; font-weight:bold;" onclick="$(\'#jsta_'+input_name+'\').height($(\'#jsta_'+input_name+'\').height()+50);">'
	+ '<img width="3" src="index/spacer.gif"><input type="button" value="-" class="txt-simple" style="width:25px; font-size:9px; font-weight:bold;" onclick="$(\'#jsta_'+input_name+'\').height($(\'#jsta_'+input_name+'\').height()-50);">'

	+ '</td></tr><tr><td colspan="2">'

	+ '<div id="'+form+'_postsmiles" style="display:none; padding-top:4px;">'+smiles+'</div>'
	+ '</td></tr><tr><td colspan="2">'
	+ '<textarea onkeyup="storeCaret(this);" onclick="storeCaret(this);" name="'+input_name+'" id="jsta_'+input_name+'" rows="7" style="width:430px;" onchange="storeCaret(this);" onselect="storeCaret(this);">'+value+'</textarea>'
	+ '</td></tr></table>';

	if (!outId)
		document.write(output);
	else
		$("#"+outId).html(output);
}

//**********************************************************

function caBox(object, loader) {
	this.obj = object;
	this.pList = [];
	this.currentUrl = '';
	this.loader = loader;
}

caBox.prototype.add = function(name, link) {
	this.pList[this.pList.length] = Array(name, link);
}

caBox.prototype.mhhover = function(action, id) {
	if (document.getElementById(this.obj+'_cabox_hm'+id).className != 'selected') {
		if (action)
			document.getElementById(this.obj+'_cabox_hm'+id).className = 'hover';
		else
			document.getElementById(this.obj+'_cabox_hm'+id).className = '';
	}
}

caBox.prototype.loadPage = function(url) {
	if (this.loader) {
		$("#"+this.obj+"_cabox_pc").html("<div align=\"center\"><div id=\""+this.obj+"_loader\" style=\"padding:7px; width:235px; height:40px; display:block;\"><B>Please wait! Loading...</B><br /><br /><img border=\"0\" src=\"index/loading.gif\"></div></div>");

		$("#"+this.obj+"_cabox_pc").load(url, function() {
			$("#"+this.obj+"_loader").remove();
		});
	} else {
		$("#"+this.obj+"_cabox_pc").load(url);
	}
	this.currentUrl = url;
}

caBox.prototype.click = function(id) {
	if (document.getElementById(this.obj+'_cabox_hm'+id).className != 'selected')
	{
		for (i = 0; i < this.pList.length; i++) {
			if (i == id)
				document.getElementById(this.obj+'_cabox_hm'+i).className = 'selected';
			else
				document.getElementById(this.obj+'_cabox_hm'+i).className = '';
		}

		this.loadPage(this.pList[id][1]);

		var urls = window.location.href.split("#");
		window.location.href = urls[0] + '#cb_' + id;
	}
}

caBox.prototype.clearMenu = function() {
		for (i = 0; i < this.pList.length; i++) {
				document.getElementById(this.obj+'_cabox_hm'+i).className = '';
		}
}

caBox.prototype.construct = function() {
	var output = '<div class="dynamic-tab"><div class="tab-row">';

	for (i = 0; i < this.pList.length; i++) {
		if (i == 0)
			output += '<div id="'+this.obj+'_cabox_hm'+i+'" class="selected" onclick="'+this.obj+'.click(\''+i+'\');" onmouseover="'+this.obj+'.mhhover(true, \''+i+'\');" onmouseout="'+this.obj+'.mhhover(false, \''+i+'\');">'+this.pList[i][0]+'</div>';
		else
			output += '<div id="'+this.obj+'_cabox_hm'+i+'" onclick="'+this.obj+'.click(\''+i+'\');" onmouseover="'+this.obj+'.mhhover(true, \''+i+'\');" onmouseout="'+this.obj+'.mhhover(false, \''+i+'\');">'+this.pList[i][0]+'</div>';
	}

	output += '</div><div id="'+this.obj+'_cabox_pc" style="width: 100%;"></div></div>';

	document.write(output);

	var testp = window.location.href.split("#cb_");

	if (typeof(testp[1]) != "undefined" && typeof(this.pList[testp[1]]) != "undefined") {
		for (i = 0; i < this.pList.length; i++) {
			if (i == testp[1])
				document.getElementById(this.obj+'_cabox_hm'+i).className = 'selected';
			else
				document.getElementById(this.obj+'_cabox_hm'+i).className = '';
		}
		this.loadPage(this.pList[testp[1]][1]);
	} else {
		this.loadPage(this.pList[0][1]);
	}
}

caBox.prototype.construct2 = function() {
	var output = '<div class="dynamic-tab"><div class="tab-row">';

	for (i = 0; i < this.pList.length; i++) {
		if (this.pList[i][1] == 'selected')
			output += '<div id="'+this.obj+'_cabox_hm'+i+'" class="selected">'+this.pList[i][0]+'</div>';
		else
			output += '<div id="'+this.obj+'_cabox_hm'+i+'" onclick="window.location.href = \''+this.pList[i][1]+'\';" onmouseover="'+this.obj+'.mhhover(true, \''+i+'\');" onmouseout="'+this.obj+'.mhhover(false, \''+i+'\');">'+this.pList[i][0]+'</div>';
	}

	output += '</div></div>';

	document.write(output);
}

//**********************************************************

function textareaInsert(txt,textarea) {
	// Attempt to create a text range (IE)
	if (typeof(textarea.caretPos) != "undefined" && textarea.createTextRange) {
		var caretPos = textarea.caretPos;
		caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? txt + ' ' : txt
		caretPos.select();
	}
	// Mozilla text range replace
	else if (typeof(textarea.selectionStart) != "undefined") {
		var begin = textarea.value.substr(0, textarea.selectionStart);
		var end = textarea.value.substr(textarea.selectionEnd);
		var scrollPos = textarea.scrollTop;

		textarea.value = begin + txt + end;

		if (textarea.setSelectionRange) {
			textarea.focus();
			textarea.setSelectionRange(begin.length + txt.length, begin.length + txt.length);
		}
		textarea.scrollTop = scrollPos;
	}
	// Just put it on the end
	else {
		textarea.value += txt;
		textarea.focus(textarea.value.length - 1);
	}
}

//**********************************************************
//**********************************************************
//**********************************************************

// Remember the current position.
function storeCaret(text) {
	if (typeof(text.createTextRange) != "undefined")
		text.caretPos = document.selection.createRange().duplicate();
}

function bbTag(opentag, closetag, textarea)
{
    // Can a text range be created?
    if (typeof(textarea.caretPos) != "undefined" && textarea.createTextRange)
    {
        var caretPos = textarea.caretPos, temp_length = caretPos.text.length;

        caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? opentag + caretPos.text + closetag + ' ' : opentag + caretPos.text + closetag;

        if (temp_length == 0)
        {
            caretPos.moveStart("character", -closetag.length);
            caretPos.moveEnd("character", -closetag.length);
            caretPos.select();
        }
        else
            textarea.focus(caretPos);
    }
    // Mozilla text range wrap.
    else if (typeof(textarea.selectionStart) != "undefined")
    {
        var begin = textarea.value.substr(0, textarea.selectionStart);
        var selection = textarea.value.substr(textarea.selectionStart, textarea.selectionEnd - textarea.selectionStart);
        var end = textarea.value.substr(textarea.selectionEnd);
        var newCursorPos = textarea.selectionStart;
        var scrollPos = textarea.scrollTop;

        textarea.value = begin + opentag + selection + closetag + end;

        if (textarea.setSelectionRange)
        {
            if (selection.length == 0)
                textarea.setSelectionRange(newCursorPos + opentag.length, newCursorPos + opentag.length);
            else
                textarea.setSelectionRange(newCursorPos, newCursorPos + opentag.length + selection.length + closetag.length);
            textarea.focus();
        }
        textarea.scrollTop = scrollPos;
    }
    // Just put them on the end, then.
    else
    {
        textarea.value += opentag + closetag;
        textarea.focus(textarea.value.length - 1);
    }
}

//**********************************************************

function mtBBprice(object, isprice, islvl) {
	if (object.substring(0, 3) == 'wi_') {
		this.obj = object.substring(3);
		this.outId = object;
	} else {
		this.obj = object;
		this.outId = false;
	}

	if (typeof(isprice) != "object") {
		this.price = isprice;
		this.price_add = isprice;
	} else {
		this.price = isprice[0];
		this.price_add = isprice[1];
	}

	this.ilvl = islvl;
	this.iexcopts = 0;
	this.ilvl13 = false;
}

mtBBprice.prototype.update = function() {
	var outPrice = this.price;

	if (this.iexcopts >= 1)
		outPrice = eval(outPrice+" + "+(this.price_add * 8));
	if (this.iexcopts >= 2)
		outPrice = eval(outPrice+" + "+(this.price_add * 8));
	if (this.iexcopts >= 3)
		outPrice = eval(outPrice+" + "+(this.price_add * 5));
	if (this.iexcopts >= 4)
		outPrice = eval(outPrice+" + "+(this.price_add * 1));
	if (this.iexcopts >= 5)
		outPrice = eval(outPrice+" + "+(this.price_add * 1));
	if (this.iexcopts >= 6)
		outPrice = eval(outPrice+" + "+(this.price_add * 1));

	if (this.ilvl > 11)
		outPrice *= 1.2;

	$("#mtbbprice_"+this.obj).html('<font color="green"><b>'+Math.ceil(outPrice)+' KRED</b></font>');
}

mtBBprice.prototype.setlvl = function(lvl) {
	this.ilvl = lvl;
	this.update();
}

mtBBprice.prototype.setexc = function(iid) {
	if ($("#"+iid).attr("checked") == true)
		this.iexcopts++;
	else
		this.iexcopts--;

	if (this.iexcopts >= 2 && !this.ilvl13) {
		mtbblvl.add2("+13","13","$('#mtbbim_lvl').text('+13'); mtbbprice.setlvl('13');");
		mtbblvl.construct();
		this.ilvl13 = true;
	} else if (this.iexcopts < 2 && this.ilvl13) {
		mtbblvl.reloadArr();
		mtbblvl.construct();
		mtbblvl.click('+11','11');
		$('#mtbbim_lvl').text('+11');
		mtbbprice.setlvl('11');
		this.ilvl13 = false;
	}

	this.update();
}

mtBBprice.prototype.construct = function() {
	var output = '<div id="mtbbprice_'+this.obj+'"><font color="green"><b>'+Math.ceil(this.price)+' KRED</b></font></div>';

	if (!this.outId)
		document.write(output);
	else
		$("#"+this.outId).html(output);
}

//**********************************************************

function treeMenu(object) {
	this.obj = object;
	this.iList = [];
	this.output = '';
	this.dir_hi = false;
}

treeMenu.prototype.add = function(parent_id, id, title, onclick) {
	if (typeof(this.iList[parent_id]) == "undefined")
		this.iList[parent_id] = Array();

	this.iList[parent_id][id] = Array(parent_id, id, title, onclick);
}

treeMenu.prototype.dirlist_click = function(id) {
	if (document.getElementById) {
		if (document.getElementById('tmid_'+id).style.display == 'none') {
			$("#tmid_"+id).show();
			$("#tmimg_"+id).attr({src: "index/t_minus.gif"});
		}
		else {
			$("#tmid_"+id).hide();
			$("#tmimg_"+id).attr({src: "index/t_plus.gif"});
		}
	} else if (document.all) {
		if (document.all['tmid_'+id].style.display == 'none') {
			$("#tmid_"+id).show();
			$("#tmimg_"+id).attr({src: "index/t_minus.gif"});
		}
		else {
			$("#tmid_"+id).hide();
			$("#tmimg_"+id).attr({src: "index/t_plus.gif"});
		}
	} else if (document.layers) {
		if (document.layers['tmid_'+id].display == 'none') {
			$("#tmid_"+id).show();
			$("#tmimg_"+id).attr({src: "index/t_minus.gif"});
		}
		else {
			$("#tmid_"+id).hide();
			$("#tmimg_"+id).attr({src: "index/t_plus.gif"});
		}
	}
}

treeMenu.prototype.dirlist = function(parent, level) {

	for (curdir in this.iList[parent]) {

		if (typeof(this.iList[this.iList[parent][curdir][1]]) != "undefined") {
			var long_tree = true;
			var img = '<img style="cursor:pointer;" onclick="'+this.obj+'.dirlist_click(\''+this.iList[parent][curdir][1]+'\');" id="tmimg_'+this.iList[parent][curdir][1]+'" src="index/t_plus.gif">';
		}
		else {
			var long_tree = false;
			var img = '<img alt="" src="index/t_none.gif">';
		}

		var offset = level * 10;
		var dir_name = (parent == 0) ? '<b>'+this.iList[parent][curdir][2]+'</b>' : this.iList[parent][curdir][2];

		var link = this.iList[parent][curdir][3];

		this.output += '<div style="padding-left:'+offset+'px; padding-bottom:2px;">'+img+'<a id="tmdn_'+this.iList[parent][curdir][1]+'" href="'+link+'">'+dir_name+'</a></div>';

		if (long_tree) {
			this.output += '<div id="tmid_'+this.iList[parent][curdir][1]+'" style="display:none;">';
			this.dirlist(this.iList[parent][curdir][1], (level + 1));
			this.output += '</div>';
		}
	}
}

treeMenu.prototype.construct = function() {
	this.dirlist(0,0);
	document.write(this.output);
}

treeMenu.prototype.opendir = function(id) {

	if (!this.dir_hi) {
		$("#tmdn_"+id).attr({href: "javascript:;"});
		$("#tmdn_"+id).css("color","#ff0000");
		this.dir_hi = true;
	}

	if(typeof(this.iList[0][id]) != "undefined") {
		$("#tmid_"+id).show();
		$("#tmimg_"+id).attr({src: "index/t_minus.gif"});
	}
	else {
		for (cur_parent in this.iList) {
			if (typeof(this.iList[cur_parent][id]) != "undefined") {

				if (this.iList[cur_parent][id][0] != 0) {
					$("#tmid_"+this.iList[cur_parent][id][0]).show();
					$("#tmimg_"+this.iList[cur_parent][id][0]).attr({src: "index/t_minus.gif"});

					this.opendir(this.iList[cur_parent][id][0]);
				}

				break;
			}
		}
	}
}
<?php /* Smarty version Smarty-3.0.4, created on 2014-10-01 08:07:39
         compiled from "C:/xampp/htdocs/CMS/setup/templates/language.tpl" */ ?>
<?php /*%%SmartyHeaderCode:8939542b9a2b2f6986-67903345%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e18eafb35a10e064b49cc2eba6071eeb20757c30' => 
    array (
      0 => 'C:/xampp/htdocs/CMS/setup/templates/language.tpl',
      1 => 1406032582,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '8939542b9a2b2f6986-67903345',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<form id="install" action="?" method="post">

<?php if ($_smarty_tpl->getVariable('restarted')->value){?>
    <br class="clear" />
    <br class="clear" />
    <p class="note"><?php echo (isset($_smarty_tpl->getVariable('_lang')->value['restarted_msg']) ? $_smarty_tpl->getVariable('_lang')->value['restarted_msg'] : null);?>
</p>
<?php }?>

<div class="setup_navbar" style="border-top: 0;">
    <p class="title"><?php echo (isset($_smarty_tpl->getVariable('_lang')->value['choose_language']) ? $_smarty_tpl->getVariable('_lang')->value['choose_language'] : null);?>
:
        <select name="language" autofocus="autofocus">
            <?php echo $_smarty_tpl->getVariable('languages')->value;?>

    	</select>
    </p>

    <input type="submit" name="proceed" value="<?php echo (isset($_smarty_tpl->getVariable('_lang')->value['select']) ? $_smarty_tpl->getVariable('_lang')->value['select'] : null);?>
" />
</div>
</form>
<?php if(ENVIRONMENT === "production"):?>
var logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                            window['console']['log'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;
                            window['console']['log'] = function() {};
                        };

    return pub;
}();
$(document).ready(function(){logger.disableLogger();});
<?php endif;?>
var addthis_config = addthis_config||{};
addthis_config.data_track_addressbar = false;
addthis_config.data_track_clickback = false;
addthis_config.ui_language = "<?=lang_iso_code();?>";
var loading = {
	start: function(){
		$.blockUI({ 
			message: $('#loading').html(),
			css: { 
				color: '#000', 
				backgroundColor:'#FBFCEF', 
				opacity: 0.6, 
				border: '2px solid #114D66',
				cursor: 'wait'
			},
			baseZ: 1000000,
			onBlock: function(){
				loading.status=true;
			},
			onUnblock: function(){
				loading.status=false;
			},
			ignoreIfBlocked: true
		});
	},
	end: function(){
		$.unblockUI();
	},
	status: false
};

var advsearch = {
	updateData: function(){
		$('#slug').val(JSON.stringify($('#advsearch').advancedSearch("val")));
	},
	start: function(){
		$.ajax({async: false,type: "POST",url: "<?php echo site_url('buscar/getList');?>",dataType: "json",data:{request:'clients'},
			success: function(data){ 
				$('#advsearch').advancedSearch({
					fields:[
						{ type:"text", id:"palabra-clave", label:"<?=_e('Palabra clave');?>", opDefault: 'lk', opHide: true},
						{ type:"text", id:"autor", label:"<?=_e('Autor');?>", opDefault: 'lk', opHide: true},
						{ type:"text", id:"revista", label:"<?=_e('Revista');?>", opDefault: 'lk', opHide: true},
						{ type:"text", id:"institucion", label:"<?=_e('Institución');?>", opDefault: 'lk', opHide: true},
						{ type:"text", id:"articulo", label:"<?=_e('Artículo');?>", opDefault: 'lk', opHide: true},
						{ type:"lov", id:"pais", label:"<?=_e('País de la revista');?>", list: data.paises, listPlaceholder: "<?php _e('Seleccione país');?>"},
						{ type:"lov", id:"disciplina", label:"<?=_e('Disciplina');?>", list: data.disciplinas, listPlaceholder: "<?php _e('Seleccione disciplina');?>"}
					],
					lang: {sEqual: '=', sLike: '&asymp;', sInList: "<?=_e('cualquiera de');?>"},
					enableSelect2: true,
					placeholder: "<?=_e('Seleccione filtro');?>"
				}).on('submit.search change.search', function(evt){
					advsearch.updateData();
				});
			}
		});
	},
	enabled: false
};
$.pnotify.defaults.history = true;
$.pnotify.defaults.styling = "bootstrap";
$(document).bind("contextmenu",function(e){
	return false;
});
$(document).ready(function()
{
<?php  
if ( lang_notification() ):
$broserLang = get_browser_lang();
?>
$.ajax({
	url: '<?=base_url("{$broserLang}/main/lang_notification");?>',
	dataType: 'json',
	success: function(data) {
		$.pnotify({
			title: data.message + '  ' + data.button,
			addclass: "stack-bar-top",
			type: 'info',
			cornerclass: "",
			width: "100%",
			stack: {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0}
		});
	}
});
$(document).on('click', '.translate', function(e) {
	location = '<?=site_url($this->lang->switch_uri($broserLang));?>';
});
<?php endif;?>
	$("#search-opts li").click(function(e) {
		e.preventDefault();
		var button = $(this).attr('rel');
		$('#search-type').attr('class', $('#op-'+button).attr('class'));
		$('#filtro').val(button);
		$('#slug').show();
		$('#advsearch').hide();
		console.log(button);
		if(button == "avanzada"){
			if(advsearch.enabled == false){
				advsearch.start();
			}
			$('#slug').hide();
			$('#advsearch').show();
			$('.evo-bNew').trigger('click');
		}
		if($('#search-opts').data('last') == "avanzada"){
			$('#advsearch').advancedSearch("clear");
			$('#slug').val('');
<?php if($class_method != "mainindex"):?>
			$('#slug').height(20);
<?php else:?>
			$('#slug').height(30);
<?php endif;?>
		}
		$('#search-opts').data('last', button);
	});

	$('#searchform #slug').keypress(function(e) {
		if(e.which == 13) {
			$('#searchform').submit();
			return false;
		}
	});
	$('#searchform').submit(function(e) {
		if($('#value').length > 0 && $('#value').val().length > 0 || $('#lov').length > 0){
			$('.evo-bAdd').trigger('click');
		}
		var data = $(this).serializeArray();
		data.push({name: "ajax", value: true});
		$.ajax({
			url: '<?=site_url('buscar');?>',
			async: false,
			type: 'POST',
			data: $.param(data),
			success: function(data) {
				window.location = data;
				return false;
			}
		});
		return false;
	});
	$('textarea').autosize();

	$('body').click(function(e) {
		$(".optionsMenu").hide();
	});
	$('body').on('click', '#solicitudDocumento', function(e) {
		$('.solicitudDocumento, #sd-disable, #sd-enable').toggle();
	});
	$('body').on('click', '#showmap', function(e) {
		$('#mapa-anexo').toggle();
	});
	$('body').on('submit', '#formSolicitudDocumento', function(e) {
		if(!loading.status){
			loading.start();
		}
		console.log($(this).attr("action"));
		$.ajax({
			url: $(this).attr("action"),
			type: 'POST',
			dataType: 'json',
			data: $(this).serialize(),
			success: function(data) {
				console.log(data);
				loading.end();
				if(data.type == 'success'){
					$('input:text').each(function(){
						$(this).val('');
					});
					$('.solicitudDocumento, #sd-disable, #sd-enable').toggle();
				}
				grecaptcha.reset();
				$.pnotify({
					title: data.title,
					icon: true,
					type: data.type,
					sticker: false
				});
				return false;
			}
		});
		return false;
	});
});

$(window).bind('beforeunload', function() {
	loading.start();
});
/* ========================================================================
* Bootstrap: bootstrap-dropdown-multilevel.js v1.0.0
* http://getbootstrap.com/javascript/#dropdowns
* ========================================================================
* Copyright 2011-2014 Twitter, Inc.
* Copyright 2014 George Donev.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */
+function ($) {
'use strict';
// DROPDOWN CLASS DEFINITION
// =========================
var backdrop = '.dropdown-backdrop';
var toggle = '[data-toggle=dropdown]';
var Dropdown = function (element) {
$(element).on('click.bs.dropdown', this.toggle);
};
Dropdown.prototype.toggle = function (e) {
var $this = $(this);
if ($this.is('.disabled, :disabled')) return;
var $parent = getParent($this);
var isActive = $parent.hasClass('open');
clearMenus($(this));
if (!isActive) {
if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
// if mobile we use a backdrop because click events don't delegate
$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
}
var relatedTarget = { relatedTarget: this };
$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
if (e.isDefaultPrevented()) return;
$parent
.toggleClass('open')
.trigger('shown.bs.dropdown', relatedTarget);
$this.focus();
}
return false;
};
Dropdown.prototype.keydown = function (e) {
if (!/(38|40|27)/.test(e.keyCode)) return;
var $this = $(this);
e.preventDefault();
e.stopPropagation();
if ($this.is('.disabled, :disabled')) return;
var $parent = getParent($this);
var isActive = $parent.hasClass('open');
if (!isActive || (isActive && e.keyCode == 27)) {
if (e.which == 27) $parent.find(toggle).focus();
return $this.click();
}
var desc = ' li:not(.divider):visible a';
var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc);
if (!$items.length) return;
var index = $items.index($items.filter(':focus'));
if (e.keyCode == 38 && index > 0) index--; // up
if (e.keyCode == 40 && index < $items.length - 1) index++; // down
if (!~index) index = 0;
$items.eq(index).focus();
};
function clearMenus(e) {
$(backdrop).remove();
$(toggle).each(function () {
var $parent = getParent($(this));
var $childMenus = $parent.find('.dropdown');
if ($childMenus.length) {
var $DoNotCloseThisOne = false;
$childMenus.each(function(){
if ($($(this).find(':first-child')[0]).is(e)) $DoNotCloseThisOne = true;
});
if ($DoNotCloseThisOne) return;
}
var relatedTarget = { relatedTarget: this };
if (!$parent.hasClass('open')) return;
$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
if (e.isDefaultPrevented()) return;
$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
})
}
function getParent($this) {
var selector = $this.attr('data-target');
if (!selector) {
selector = $this.attr('href');
selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
}
var $parent = selector && $(selector);
return $parent && $parent.length ? $parent : $this.parent();
}
// DROPDOWN PLUGIN DEFINITION
// ==========================
//var old = $.fn.dropdown
$.fn.dropdown = function (option) {
return this.each(function () {
var $this = $(this);
var data = $this.data('bs.dropdown');
if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)));
if (typeof option == 'string') data[option].call($this);
})
};
$.fn.dropdown.Constructor = Dropdown;
// DROPDOWN NO CONFLICT
// ====================
$.fn.dropdown.noConflict = function () {
//$.fn.dropdown = old
return this;
};
$(document)
.off('click.bs.dropdown.data-api', "**")
.off('keydown.bs.dropdown.data-api', "**");
// APPLY TO STANDARD DROPDOWN ELEMENTS
// ===================================
$(document)
.on('click.bs.dropdown.data-api', clearMenus)
.on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
.on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
.on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)
}(jQuery);

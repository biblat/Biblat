<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" href="{base_url('assets/img/favicon.ico')}" type="image/x-icon"/>
        <link rel="stylesheet" href="{base_url('assets/css/bootstrap.min.css')}" type="text/css" />
        <link rel="stylesheet" href="{base_url('css/jquery-ui.min.css')}" type="text/css" />
        <link rel="stylesheet" href="{base_url('assets/css/font-awesome.min.css')}" type="text/css" />
        <link rel="stylesheet" href="{base_url('assets/js/datatables/datatables.min.css')}" />	
        {foreach $template.css file}
            <link rel="stylesheet" href="{$file}" type="text/css" />
        {/foreach}
    </head>
    <body style="background-color: lightgray">
        <header>
            <div class="container" style="background-color:white; border-radius:5px">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <img style="max-height: 100px;max-width: 100%;display: block;margin-left: auto;margin-right: auto;" src="/img/Logo_Bib_Macro_sombra.png">
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-8">
                        <div style="min-height: 50px;text-align: center;padding-top: 15px">
                            <h4 style="color:#002c9a;text-shadow: 1px 1px 1px"><b>Revistas de la Red de Macrouniversidades de América Latina y el Caribe</b></h4>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="container" style="padding:0px">
            <div class="main" style="background-color:white; margin-top:20px; padding:15px; border-radius:5px;">
            {$template.body}
            </div>
            
        </div>
        
        <script src="{base_url('assets/js/jquery.js')}"></script>
        <script src="{base_url('assets/js/bootstrap.min.js')}"></script>
        <script src="{base_url('js/jquery-ui.min.js')}"></script>
        
        {foreach $template.js file}
            <script src="{$file}"></script>
	{/foreach}
        <script>
            {if $template.partials.utils_js}
                    {$template.partials.utils_js}
            {/if}
        </script>
        <script>
            {if $template.partials.view_js}
                    {if is_array($template.partials.view_js)}
                            {$template.partials.view_js[0]}
                    {else}
                            {$template.partials.view_js}
                    {/if}
                    {if $template.partials.view_js[1]}
                            {$template.partials.view_js[1]}
                    {/if}
            {/if}
            {if $template.partials.main_js}
			{$template.partials.main_js}
            {/if}
        </script>
    </body>
</html>



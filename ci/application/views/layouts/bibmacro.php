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
    <body>       
        
        <script src="{base_url('assets/js/jquery.js')}"></script>
        <script src="{base_url('assets/js/bootstrap.min.js')}"></script>
        <script src="{base_url('js/jquery-ui.min.js')}"></script>
        {$template.body}
        
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



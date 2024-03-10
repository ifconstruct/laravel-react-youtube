<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <!-- Fonts -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        @viteReactRefresh
        @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    </head>
    <body>

    <!--
    <div class="background">
        <iframe allowtransparence="true" width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/7tX3Dj?gui=false&t=10&paused=false&muted=true" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>
    </div>-->
    <!--<input type="text" id="dbg" value="" />
        <div id="example"></div>
        <div id="example2"></div>

        <div id="like_button_container"></div>-->
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-auto" >
                    <div id="root"></div>
                    <div id="add"></div>
                </div>
            </div>
        </div>



    </body>
</html>

<script>


</script>

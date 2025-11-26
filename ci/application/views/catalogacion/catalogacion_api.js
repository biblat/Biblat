class_cat = {
    ready: function(){
        class_cat.control();
    },
    control: function(){
        $("#btn_cifrar").on("click",async  function(event) {
            var api = $("#api_key").val();
            var ciph = await class_utils.ciph(api, env.C_KM);
            $('#res_api_key').html(ciph);

            });
    }
};


$(class_cat.ready);


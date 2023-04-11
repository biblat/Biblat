/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    $('#resultados').bind('DOMNodeInserted DOMNodeRemoved', function(event) {
        setTimeout(function(){
            try{
                $('a').each(function(i){
                    if(this.href.indexOf("altmetric") != -1){
                        if(this.innerHTML.indexOf("img") != -1){
                            if(this.innerHTML.indexOf('alt="Article has') == -1){
                                try{
                                    this.parentElement.remove();
                                }catch(e){
                                }
                            }
                        }
                        if(this.innerHTML.trim()==""){
                            try{
                                this.parentElement.remove();
                            }catch(e){
                            }
                        }
                    }
                });
            }catch(e){

            }

            $('.__dimensions_badge_embed__').each(function(i){
                if(this.innerHTML.indexOf("?count=0") !== -1 || this.innerHTML.indexOf('alt="?') !== -1){
                    try{
                        this.parentElement.remove();
                    }catch(e){
                    }
                    //this.style.display = "none";
                }
            });

            $('.PlumX-Popup').each(function(i){
                if(this.innerHTML.indexOf("No metrics available.") !== -1){
                    try{
                        this.parentElement.remove();
                    }catch(e){
                    }
                    //this.style.display = "none";
                }
            });

            try{
                $('.scite-badge').each(function(i){
                    
                    var hijo = this.children[0];
                    var count = (hijo.innerHTML.match(/>0</g) || []).length;
                    var countP = (hijo.innerHTML.match(/publications/g) || []).length;
                    if(count == 5 || (countP == 1 && count == 4))
                        this.remove();
									  
							 
						 
					 
                });
            }catch(e){
                console.log(e);
            }
    
        },500);
        });
});


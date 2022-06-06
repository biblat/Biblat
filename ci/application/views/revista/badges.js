/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    $('#resultados').bind('DOMNodeInserted DOMNodeRemoved', function(event) {
        setTimeout(function(){
            $('.Tally__logo___k79zv').hide();
            $('.SectionTally__logo___pEojg').hide();
            $('.SectionTally__chartSubheading___tm7gz').hide();

            $('.SectionTally__sectionTallyWrapper___nwj2j').each(function(i){
                if(this.innerHTML.indexOf('<svg ') == -1){
                    try{
                        this.parentElement.remove();
                    }catch(e){
                    }
                }
            });

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
                if(this.innerHTML.indexOf("?count=0") !== -1){
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
                    var hijo = this.children[0]
                    if(hijo.innerHTML.indexOf('Tally__tally___wF-n7') !== -1){
                        if(hijo.innerHTML.indexOf('Tally__show___EesAt') == -1){
                            try{
                                this.remove();
                            }catch(e){
                            }
                        }
                    }
                });
            }catch(e){
                console.log(e);
            }
    
        },1000);
        });
});


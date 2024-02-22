/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('.video').off('click').on('click', function(e){
   e.preventDefault();
   $('#frame-video').prop('src', this.href);
});


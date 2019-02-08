
  jQuery(document).ready(function($){
  
    var navTrigger = $('.nav-trigger'),
        pageContent = $('.content'),
        mainHeader = $('.header'),
        mainNav = $('.nav');
    
    navTrigger.on('click', function(event){
      event.preventDefault();
      mainHeader.toggleClass('nav-is-visible');
      mainNav.toggleClass('nav-is-visible');
      pageContent.toggleClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
              $('body').toggleClass('overflow-hidden');
          });
      if($('html').hasClass('no-csstransitions')) {
              $('body').toggleClass('overflow-hidden');
          }
    });
    
    $(document).keyup(function(event){
      if(event.which=='27'){
        mainHeader.removeClass('nav-is-visible');
        mainNav.removeClass('nav-is-visible');
        pageContent.removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
        if($('html').hasClass('no-csstransitions')) {
                $('body').removeClass('overflow-hidden');
            }
      }
    });
    
    pageContent.on('click', function(event){
      if( !$(event.target).is('.nav-trigger') ) {
        mainHeader.removeClass('nav-is-visible');
        mainNav.removeClass('nav-is-visible');
        pageContent.removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
        if($('html').hasClass('no-csstransitions')) {
                  $('body').removeClass('overflow-hidden');
              }
      }
    });
    
  });





  const headertext = [],
headers = document.querySelectorAll("#dataTable th"),
tablerows = document.querySelectorAll("#dataTable th"),
tablebody = document.querySelector("#dataTable tbody");

for(var i = 0; i < headers.length; i++) {
  var current = headers[i];
  headertext.push(current.textContent.replace(/\r?\n|\r/,""));
} 
for (var i = 0, row; row = tablebody.rows[i]; i++) {
  for (var j = 0, col; col = row.cells[j]; j++) {
    col.setAttribute("data-th", headertext[j]);
  } 
}




document.body.addEventListener('click', alert);
function alert(e) {
  const modal = document.getElementById('simpleModal');
  [].forEach.call(document.querySelectorAll('.delete'), (item) => {
    if (e.target === item) {
      openModal();
    }
  });

  function openModal() {
    modal.style.display = 'block';
  }
}

//  Function to close modal
function closeModal() {
  modal.style.display = 'none';
}
const dismiss = document.getElementById('dismiss');
let modal = document.getElementById('simpleModal');
const closeBtn = document.getElementsByClassName('closeBtn')[0];
closeBtn.addEventListener('click', closeModal);
dismiss.addEventListener('click', closeModal);
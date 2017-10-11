(function($){
	console.log("abc");
	
	$(window).resize(function(){
    megaMenu();
    megaMenuWide();    
    
	
	
    var windowWidth = $(window).width();
    if (windowWidth <= 974) {
      $('.dropdown-toggle').attr('data-toggle', 'dropdown');
      $('.navigation').removeClass('sticky');
    }
    if (windowWidth > 974) {
      $('.dropdown-toggle').removeAttr('data-toggle', 'dropdown');
      $('.dropdown').removeClass('open');
    }

  });


  /* Sticky Navigation
  -------------------------------------------------------*/
  $(window).scroll(function(){

    var windowWidth = $(window).width();
    if ($(window).scrollTop() > 190 & windowWidth > 974){
      $('#sticky-nav').addClass("sticky");
      $('#sticky-nav .logo-wrap').addClass("shrink");
    } else {
      $('#sticky-nav').removeClass("sticky");
      $('#sticky-nav .logo-wrap').removeClass("shrink");
    }

    if ($(window).scrollTop() > 200 & windowWidth > 974){
      $('#sticky-nav').addClass("offset");
    } else {
      $('#sticky-nav').removeClass("offset");
    }

    if ($(window).scrollTop() > 500 & windowWidth > 974){
      $('#sticky-nav').addClass("scrolling");
    } else {
      $('#sticky-nav').removeClass("scrolling");
    }


    if ($(window).scrollTop() > 190 ){
      $('.navbar-fixed-top').addClass("sticky");
    } else {
      $('.navbar-fixed-top').removeClass("sticky");
    }

  });
  

  /* Bootstrap Dropdown Navigation
  -------------------------------------------------------*/
  "use strict";!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(b){this.$element=a(b),this.$main=this.$element.closest(".dropdown, .dropup, .btn-group"),this.$menu=this.$element.parent(),this.$drop=this.$menu.parent().parent(),this.$menus=this.$menu.siblings(".dropdown-submenu");var d=this.$menu.find("> .dropdown-menu > "+c);this.$submenus=d.filter(".dropdown-submenu"),this.$items=d.not(".dropdown-submenu"),this.init()}var c=":not(.disabled, .divider, .dropdown-header)";return b.prototype={init:function(){this.$element.on({"click.bs.dropdown":this.click.bind(this),keydown:this.keydown.bind(this)}),this.$menu.on("hide.bs.submenu",this.hide.bind(this)),this.$items.on("keydown",this.item_keydown.bind(this)),this.$menu.nextAll(c+":first:not(.dropdown-submenu)").children("a").on("keydown",this.next_keydown.bind(this))},click:function(a){a.stopPropagation(),this.toggle()},toggle:function(){this.$menu.hasClass("open")?this.close():(this.$menu.addClass("open"),this.$menus.trigger("hide.bs.submenu"))},hide:function(a){a.stopPropagation(),this.close()},close:function(){this.$menu.removeClass("open"),this.$submenus.trigger("hide.bs.submenu")},keydown:function(a){if(/^(32|38|40)$/.test(a.keyCode)&&a.preventDefault(),/^(13|32)$/.test(a.keyCode))this.toggle();else if(/^(27|38|40)$/.test(a.keyCode))if(a.stopPropagation(),27==a.keyCode)this.$menu.hasClass("open")?this.close():(this.$menus.trigger("hide.bs.submenu"),this.$drop.removeClass("open").children("a").trigger("focus"));else{var b=this.$main.find("li:not(.disabled):visible > a"),c=b.index(a.target);if(38==a.keyCode&&0!==c)c--;else{if(40!=a.keyCode||c===b.length-1)return;c++}b.eq(c).trigger("focus")}},item_keydown:function(a){27==a.keyCode&&(a.stopPropagation(),this.close(),this.$element.trigger("focus"))},next_keydown:function(a){if(38==a.keyCode){a.preventDefault(),a.stopPropagation();var b=this.$drop.find("li:not(.disabled):visible > a"),c=b.index(a.target);b.eq(c-1).trigger("focus")}}},a.fn.submenupicker=function(c){var d=this instanceof a?this:a(c);return d.each(function(){var c=a.data(this,"bs.submenu");c||(c=new b(this),a.data(this,"bs.submenu",c))})}});
  $('.dropdown-submenu > i').submenupicker();


  /* Mobile Detect
  -------------------------------------------------------*/
  if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
     $("html").addClass("mobile");
     $('.dropdown-toggle').attr('data-toggle', 'dropdown');
  }
  else {
    $("html").removeClass("mobile");
  }

  /* IE Detect
  -------------------------------------------------------*/
  if(Function('/*@cc_on return document.documentMode===10@*/')()){ $("html").addClass("ie"); }


  /* Mega Menu
  -------------------------------------------------------*/
  function megaMenu(){
    $('.megamenu').each(function () {
      $(this).css('width', $('.container').width());
      var offset = $(this).closest('.dropdown').offset();
      offset = offset.left;
      var containerOffset = $(window).width() - $('.container').outerWidth();
      containerOffset = containerOffset /2;
      offset = offset - containerOffset - 15;
      $(this).css('left', -offset);
    });
  }

  function megaMenuWide(){
    $('.megamenu-wide').each(function () {
      $(this).css('width', $(window).outerWidth());
      var offset = $(this).closest('.dropdown').offset();
      offset = offset.left;
      var containerOffset = $(window).width() - $(window).outerWidth();
      containerOffset = containerOffset /2;
      offset = offset - containerOffset - 0;
      $(this).css('left', -offset);
    });
  }

});
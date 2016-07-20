cloudspark

    // =========================================================================
    // LAYOUT
    // =========================================================================
    
    .directive('dockNavbarToggle', function(){
        
        return {
            restrict: 'A',
            scope: {
                dockNavbarToggle: '='
            },
            
            link: function(scope, element, attr) {
                
                //Default State
                if (scope.dockNavbarToggle) {
                    element.prop('checked', true);
                }
                
                //Change State
                element.on('change', function(){
                    if (element.is(':checked')) {
                        localStorage.setItem('navbar--pinned', true);
                        scope.$apply(function(){
                            scope.dockNavbarToggle = true;
                        })
                    }
                    else {
                        localStorage.setItem('navbar--pinned', false);
                        scope.$apply(function(){
                            scope.dockNavbarToggle = false;
                        })
                    }
                })
            }
        }
    })

    // =========================================================================
    // MAINMENU COLLAPSE
    // =========================================================================

    .directive('toggleSidebar', function(){

        return {
            restrict: 'A',
            scope: {
                modelLeft: '=',
                modelRight: '='
            },
            
            link: function(scope, element, attr) {
                element.on('click', function(){
 
                    if (element.data('target') === 'mainmenu') {
                        if (scope.modelLeft === false) {
                            scope.$apply(function(){
                                scope.modelLeft = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelLeft = false;
                            })
                        }
                    }
                    
                    if (element.data('target') === 'chat') {
                        if (scope.modelRight === false) {
                            scope.$apply(function(){
                                scope.modelRight = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelRight = false;
                            })
                        }
                        
                    }
                })
            }
        }
    
    })
    

    
    // =========================================================================
    // SUBMENU TOGGLE
    // =========================================================================

    .directive('toggleSubmenu', function(){

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    element.next().slideToggle(200);
                    element.parent().toggleClass('toggled');
                });
            }
        }
    })


    // =========================================================================
    // STOP PROPAGATION
    // =========================================================================
    
    .directive('stopPropagate', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.stopPropagation();
                });
            }
        }
    })

    .directive('aPrevent', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.preventDefault();
                });
            }
        }
    })


    // =========================================================================
    // PRINT
    // =========================================================================
    
    .directive('print', function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.click(function(){
                    window.print();
                })   
            }
        }
    })

    // =========================================================================
    // KEY PRESSES
    // =========================================================================
    .directive('globalSearch', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                if (attributes.onEscape) {
                    element.on('focus', function () {
                        element.on('keyup', function (event) {
                            if (event.which === 27) {
                                scope.$apply(function () {
                                    scope.$eval(attributes.onEscape);
                                });
                            }
                        });
                    })
                    .on('blur', function (event) {
                        element.off('keyup');
                    });
                    scope.$on('$destroy', function () {
                        element.off('keyup');
                    });
                }
            }
        }
    })

    .directive('searchToggle', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                $('body').on('keydown.searchToggle', function (event) {
                    if (event.which === 191 && event.shiftKey && !$(document.activeElement).is('input[type="text"], textarea')) {
                        scope.$apply(function () {
                            scope.hctrl.toggleSearch();
                        });
                        event.preventDefault();
                    }
                });
                scope.$on('$destroy', function () {
                    $('body').off('keydown.searchToggle');
                });
            }
        }
    })
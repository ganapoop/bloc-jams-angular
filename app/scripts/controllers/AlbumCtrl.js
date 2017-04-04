(function(){
    function AlbumCtrl() {
    this.angular.copy(albumPicasso);
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
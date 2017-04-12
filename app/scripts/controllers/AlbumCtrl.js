(function(){
    function AlbumCtrl(Fixtures, songPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = songPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();

(function() {
    /**
 * @function songPlayer
 * @desc Plays or Pauses song depending on the conditions
 */
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };


        /**
 * @desc Active song object from list of songs
 * @type {Object}
 */
        SongPlayer.currentSong = null;
        /**
 * @desc Buzz object audio file
 * @type {Object}
 */
        var currentBuzzObject = null;

        /**
* @function stopSong
* @desc Stops the currently playing song
* @param song
*/

        var stopSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
        };
        /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */

        var setSong = function(song) {
            stopSong();
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
 * @function playSong
 * @desc Plays song
 * @param {Object} song
 */
        var playSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.play()
                song.playing = true;
            }
        };

        /**
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
 * @function SongPlayer.pause
 * @desc Pause current song
 * @param {Object} song
 */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
 * @function SongPlayer.previous
 * @desc Skips back to previous song on album
 */
        SongPlayer.previous = function() {
            /**
* @desc Access to the album
* @type {Object}
*/
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
* @function SongPlayer.next
* @desc Skips forward to next song in the album
*/
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex < getSongIndex) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();

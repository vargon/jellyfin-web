/* eslint-disable indent */
import connectionManager from 'connectionManager';

class BackdropScreensaver {
    constructor() {
        this.name = 'Backdrop ScreenSaver';
        this.type = 'screensaver';
        this.id = 'backdropscreensaver';
        this.supportsAnonymous = false;
    }
        show() {
            const query = {
                ImageTypes: 'Backdrop',
                EnableImageTypes: 'Backdrop',
                IncludeItemTypes: 'Movie,Series,MusicArtist',
                SortBy: 'Random',
                Recursive: true,
                Fields: 'Taglines',
                ImageTypeLimit: 1,
                StartIndex: 0,
                Limit: 200
            };

            const apiClient = connectionManager.currentApiClient();
            apiClient.getItems(apiClient.getCurrentUserId(), query).then(function (result) {

                if (result.Items.length) {

                    import('slideshow').then(slideshow => {

                        var newSlideShow = new slideshow({
                            showTitle: true,
                            cover: true,
                            items: result.Items
                        });

                        newSlideShow.show();
                        this.currentSlideshow = newSlideShow;
                    }).catch(console.error);
                }
            });
        }

        hide() {
            if (this.currentSlideshow) {
                this.currentSlideshow.hide();
                this.currentSlideshow = null;
            }
        }
    }
/* eslint-enable indent */

export default BackdropScreensaver;

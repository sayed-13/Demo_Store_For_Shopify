import { waitFor } from '../../../../utils/alpha/pollFor';

import { q, qa } from '../../../../utils/alpha/updateEle';

import { insert, poll } from '../../../../utils/common';

import { addContent } from './func/addContent';

import { ID, VAR, expLog } from './info';

window.runningExperiments = window.runningExperiments || {};

window.runningExperiments[ID] = {

    name: 'Add functionalities & special features as Storymenu icons on PILLOW PDP',

    logs: []

};

waitFor(

    () => q(`body:not(.${ID})`),

    (body) => {

        expLog('variation', ID, VAR);

        body.classList.add(ID, `${ID}_${VAR}`);

    }

);

const addNewImage = () => {

    const elem = qa("media-carousel .product-gallery__media")[0];

    addContent(elem);

}


const init = () => {

    waitFor(

        () => qa("media-carousel .product-gallery__media").length > 0,

        () => {

            addNewImage();

            // this is for main image

            const newImage = q(`.${ID}-content`);

            document.querySelector('media-carousel')?.items?.splice(1, 0, newImage);

        }

    )

    waitFor(

        () => qa(".product-gallery__thumbnail-list .product-gallery__thumbnail").length > 0,

        () => {

            // this is for thumbnail

            qa(".product-gallery__thumbnail-list .product-gallery__thumbnail").forEach((btn, index) => {

                // Insert new thumbnail button in 2nd position

                if (index === 1) {

                    insert(btn, 'beforebegin', `
<button type="button" class="${ID}-content-thumbnail product-gallery__thumbnail" aria-current="false" aria-label="Gehe zu Element 2">
<img src="https://assets.ablyft.com/44305516/xQ5NTx6yoG6TPxaLh3c96lQUSxh5ApBtJ1JDkMet.webp" width="2000" height="2000" loading="lazy" sizes="(max-width: 699px) 56px, 64px" class="object-contain rounded-sm">
</button>

          `);

                    // Update aria-labels for all thumbnails after adding new button

                    qa('.product-gallery__thumbnail').forEach((thumbnail, i) => {

                        thumbnail.setAttribute('aria-label', `Gehe zu Element ${i + 1}`);

                    });

                }

            });

            const newThumbnail = q(`.${ID}-content-thumbnail`);

            document.querySelector('.product-gallery__thumbnail-list').items.splice(1, 0, newThumbnail);

        }

    )

    document.querySelectorAll('[is="product-zoom-button"]').forEach((btn, index) => {

        btn.addEventListener('click', function (event) {

            // Stop existing event handlers (like the built-in zoom)

            event.stopImmediatePropagation();

            // Custom logic for zoom button

            if (index === document.querySelectorAll('[is="product-zoom-button"]').length - 1) {

                let index = Array.from(document.querySelectorAll('.product-gallery__media')).findIndex(el => el.classList.contains('is-selected'));

                btn.dispatchEvent(new CustomEvent("lightbox:open", {

                    bubbles: true,

                    detail: {

                        index: index

                    }

                }));

            } else {

                btn.dispatchEvent(new CustomEvent("lightbox:open", {

                    bubbles: true,

                    detail: {

                        index: index

                    }

                }));

            }

        }, true);

    });

    // Custom logic for thumbnail

    document.querySelectorAll('.product-gallery__thumbnail').forEach((btn, index) => {

        btn.addEventListener('click', function (event) {

            // Stop existing event handlers (like the built-in zoom)

            event.stopImmediatePropagation();

            qa(".product-gallery__thumbnail[aria-current='true']").forEach((btn, index) => {

                btn.setAttribute('aria-current', 'false');

            });

            // Dispatch event to update page dots

            q('page-dots')._dispatchEvent(index)

        }, true);

    });

}


poll(

    () => q('body') && qa("media-carousel .product-gallery__media").length > 0 && qa(".product-gallery__thumbnail-list .product-gallery__thumbnail").length > 0,

    () => {

        init();

    }

);

/*************************************************************

*************************************************************/



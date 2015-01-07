define([
    'qwery',
    'lodash/objects/defaults',
    'lodash/functions/once',
    'common/utils/$',
    'common/utils/$css',
    'common/utils/config',
    'common/modules/commercial/create-ad-slot'
], function (
    qwery,
    defaults,
    once,
    $,
    $css,
    config,
    createAdSlot
) {

    function init(options) {
        var $mainCol, adType,
            opts        = defaults(
                options || {},
                {
                    columnSelector: '.js-secondary-column',
                    adSlotContainerSelector: '.js-mpu-ad-slot'
                }
            ),
            $col        = $(opts.columnSelector),
            colIsHidden = $col.length && $css($col, 'display') === 'none';

        // is the switch off, or not an article, or the secondary column hidden
        if (!config.switches.standardAdverts || !/Article|LiveBlog/.test(config.page.contentType) || colIsHidden) {
            return false;
        }

        $mainCol = config.page.contentType === 'Article' ? $('.js-content-main-column') : false;
        if (!$mainCol.length || $mainCol.dim().height >= 1800) {
            adType = 'right-sticky';
        } else if ($mainCol.dim().height >= 600) {
            adType = 'right';
        } else {
            adType = 'right-small';
        }

        return $(opts.adSlotContainerSelector)
            .append(createAdSlot(adType, 'mpu-banner-ad'));
    }

    return {

        init: init

    };

});

// Sets the page element set as the top display that will be effected in this script.
// !! Change ID to headerButtonDisplay !!
var topButtons = document.getElementsByClassName("overHeadButton");

// Designated amount of time to allow the display window to open and close. 
const _topButtonFadeTime = 0.4;
// Determines if the top display is currently faded out or not. 
var _currTopButtonsFaded = false;
// Determines if the top display window is desired open or closed.
var _setTopButtonsToFade = false;
// Amount of time the top display has before its transition is complete.
var _currTopButtonFadeTime = 0;

// Sets the page element set as the top display that will be effected in this script.
var btmButtons = document.getElementsByClassName("bottomDisplayButton");

// Designated amount of time to allow the bottom display window to open and close. 
const _btmButtonFadeTime = 0.3;
// Determines if the bottom display is currently faded out or not. 
var _currBtmButtonsFaded = false;
// Determines if the bottom display window is desired open or closed.
var _setBtmButtonsToFade = false;
// Amount of time the bottom display has before its transition is complete.
// Amount of time the top display has before its transition is complete.
var _currBtmButtonFadeTime = 0;

function FadeButtons ()
{
    // *************************************************** TOP *******************************************************

    if(_setTopButtonsToFade && _currTopButtonFadeTime > 0 && !_currTopButtonsFaded)
    {
        _currTopButtonFadeTime -= _effectTimeIncrementation;

        percentageOfButtonFade = _currTopButtonFadeTime / _topButtonFadeTime;
        //console.log("Current fade out percentage = " + percentageOfButtonFade + "%");

        var i;
        for (i = 0; i < topButtons.length; i++) 
        {
            topButtons[i].style.opacity = percentageOfButtonFade;
        };
    }

    else if(_setTopButtonsToFade && _currTopButtonFadeTime <= 0 && !_currTopButtonsFaded)
    {
        //console.log("Shutting off button display attribute!!");
        var i;
        for (i = 0; i < topButtons.length; i++) 
        {
            topButtons[i].style.display = "none";
        };

        _currTopButtonsFaded = true;
        //console.log("Buttons should now be faded = " + _currTopButtonsFaded);
    }

    else if(!_setTopButtonsToFade && _currTopButtonFadeTime > 0 && _currTopButtonsFaded)
    {
        var i;
        for (i = 0; i < topButtons.length; i++) 
        {
            topButtons[i].style.display = "inline-block";
        };

        _currTopButtonFadeTime -= _effectTimeIncrementation;

        percentageOfButtonFade = 1-(_currTopButtonFadeTime / _topButtonFadeTime);
        //console.log("Current fade in percentage = " + percentageOfButtonFade + "%");

        var i;
        for (i = 0; i < topButtons.length; i++) 
        {
            topButtons[i].style.opacity = percentageOfButtonFade;
        };
    }

    else if(!_setTopButtonsToFade && _currTopButtonFadeTime <= 0 && _currTopButtonsFaded)
    {
        _currTopButtonsFaded = false;
        //console.log("Buttons should now be faded = " + _currFadedOut);
    }

    // *************************************************** BOTTOM *******************************************************

    if(_setBtmButtonsToFade && _currBtmButtonFadeTime > 0 && !_currBtmButtonsFaded)
    {
        _currBtmButtonFadeTime -= _effectTimeIncrementation;

        percentageOfButtonFade = _currBtmButtonFadeTime / _btmButtonFadeTime;
        //console.log("Current fade out percentage = " + percentageOfButtonFade + "%");

        var i;
        for (i = 0; i < btmButtons.length; i++) 
        {
            btmButtons[i].style.opacity = percentageOfButtonFade;
        };
    }

    else if(_setBtmButtonsToFade && _currBtmButtonFadeTime <= 0 && !_currBtmButtonsFaded)
    {
        //console.log("Shutting off button display attribute!!");
        var i;
        for (i = 0; i < btmButtons.length; i++) 
        {
            btmButtons[i].style.display = "none";
        };

        _currBtmButtonsFaded = true;
        //console.log("Buttons should now be faded = " + _currTopButtonsFaded);
    }

    else if(!_setBtmButtonsToFade && _currBtmButtonFadeTime > 0 && _currBtmButtonsFaded)
    {
        var i;
        for (i = 0; i < btmButtons.length; i++) 
        {
            btmButtons[i].style.display = "inline-block";
        };

        _currBtmButtonFadeTime -= _effectTimeIncrementation;

        percentageOfButtonFade = 1-(_currBtmButtonFadeTime / _btmButtonFadeTime);
        //console.log("Current fade in percentage = " + percentageOfButtonFade + "%");

        var i;
        for (i = 0; i < btmButtons.length; i++) 
        {
            btmButtons[i].style.opacity = percentageOfButtonFade;
        };
    }

    else if(!_setBtmButtonsToFade && _currBtmButtonFadeTime <= 0 && _currBtmButtonsFaded)
    {
        _currBtmButtonsFaded = false;
        //console.log("Buttons should now be faded = " + _currFadedOut);
    }
}
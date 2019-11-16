// !!****** Nav Button Display Behavior System: Display Window Ops Section ******!! // 
//

// Sets the page element set as the top display that will be effected in this script.
// !! Change ID to headerButtonDisplay !!
var topButtonDisplay = document.getElementById("overHeadButtonDisplay");

// The amount of pixels the top display window will extent to when open. 
const _topNavButtonDisplayWindowOpenHeight = 175;
// Designated amount of time to allow the display window to open and close. 
const _topDisplayWindowCloseTime = 0.3;
// Determines if the top display is currently faded out or not. 
var _currTopDisplayWindowClosed = false;
// Determines if the top display window is desired open or closed.
var _setTopDisplayWindowClosed = false;
// Amount of time the top display has before its transition is complete.
var _currTopDisplayWindowCloseTime = 0;


// Sets the page element set as the top display that will be effected in this script.
var btmButtonDisplay = document.getElementById("buttonButtonDisplay");

// The amount of pixels the bottom display window will extent to when open. 
const _btmNavButtonDisplayWindowOpenHeight = 75;
// Designated amount of time to allow the bottom display window to open and close. 
const _btmDisplayWindowCloseTime = 0.3;
// Determines if the bottom display is currently faded out or not. 
var _currBtmDisplayWindowClosed = false;
// Determines if the bottom display window is desired open or closed.
var _setBtmDisplayWindowClosed = false;
// Amount of time the bottom display has before its transition is complete.
var _currBtmDisplayWindowCloseTime = 0;

function TransitionDisplayWindows ()
{

    // *************************************************** TOP *******************************************************
    
    if(_setTopDisplayWindowClosed && _currTopDisplayWindowCloseTime > 0 && !_currTopDisplayWindowClosed)
    {
        _currTopDisplayWindowCloseTime -= _effectTimeIncrementation;

        percentageOfTransition = _currTopDisplayWindowCloseTime / _topDisplayWindowCloseTime;
        //console.log("Current transition percentage = " + String(percentageOfTransition) + "%");

        newDisplayHeight = _topNavButtonDisplayWindowOpenHeight * percentageOfTransition;

        if(newDisplayHeight < 0)
        {
            newDisplayHeight = 0;
        }

        else if(newDisplayHeight > _topNavButtonDisplayWindowOpenHeight)
        {
            newDisplayHeight = _topNavButtonDisplayWindowOpenHeight;
        }

        currTopDisplayHeight = String(newDisplayHeight) + "px";
        //console.log("Current transition height = " + currTopDisplayHeight);
        topButtonDisplay.style.height = currTopDisplayHeight;
        //topButtonDisplay.style.opacity = percentageOfTransition;
    }

    else if(_setTopDisplayWindowClosed && _currTopDisplayWindowCloseTime <= 0 && !_currTopDisplayWindowClosed)
    {
        topButtonDisplay.style.padding = "0";
        topButtonDisplay.style.height = "0";
        _currTopDisplayWindowClosed = true;
        //console.log("Display should now be transitioned out = " + _currTopDisplayWindowClosed);

        _topClosed = true;
        //console.log ("Top Nav Button Display Window closed = " + _topClosed);
    }

    else if(!_setTopDisplayWindowClosed && _currTopDisplayWindowCloseTime > 0 && _currTopDisplayWindowClosed)
    {
        _currTopDisplayWindowCloseTime -= _effectTimeIncrementation;

        percentageOfTransition = 1-(_currTopDisplayWindowCloseTime / _topDisplayWindowCloseTime);
        //console.log("Current transition in percentage = " + percentageOfTransition + "%");

        newDisplayHeight = _topNavButtonDisplayWindowOpenHeight * percentageOfTransition;

        if(newDisplayHeight < 0)
        {
            newDisplayHeight = 0;
        }

        else if(newDisplayHeight > _topNavButtonDisplayWindowOpenHeight)
        {
            newDisplayHeight = _topNavButtonDisplayWindowOpenHeight;
        }

        currTopDisplayHeight = String(newDisplayHeight) + "px";
        //console.log("Current transition height = " + currTopDisplayHeight);
        topButtonDisplay.style.height = currTopDisplayHeight;
        //topButtonDisplay.style.opacity = percentageOfTransition;
    }

    else if(!_setTopDisplayWindowClosed && _currTopDisplayWindowCloseTime <= 0 && _currTopDisplayWindowClosed)
    {
	topButtonDisplay.style.padding = "5px 0 0";
        _currTopDisplayWindowClosed = false;
        //console.log("Display should now be transitioned out = " + _currTopDisplayWindowClosed);
    }

    // *************************************************** BOTTOM *******************************************************

    if(_setBtmDisplayWindowClosed && _currBtmDisplayWindowCloseTime > 0 && !_currBtmDisplayWindowClosed)
    {
        _currBtmDisplayWindowCloseTime -= _effectTimeIncrementation;

        percentageOfTransition = _currBtmDisplayWindowCloseTime / _btmDisplayWindowCloseTime;
        //console.log("Current transition percentage = " + String(percentageOfTransition) + "%");

        newDisplayHeight = _btmNavButtonDisplayWindowOpenHeight * percentageOfTransition;

        if(newDisplayHeight < 0)
        {
            newDisplayHeight = 0;
        }

        else if(newDisplayHeight > _btmNavButtonDisplayWindowOpenHeight)
        {
            newDisplayHeight = _btmNavButtonDisplayWindowOpenHeight;
        }

        currBtmDisplayHeight = String(newDisplayHeight) + "px";
        //console.log("Current transition height = " + currTopDisplayHeight);
        btmButtonDisplay.style.height = currBtmDisplayHeight;
        //topButtonDisplay.style.opacity = percentageOfTransition;
    }

    else if(_setBtmDisplayWindowClosed && _currBtmDisplayWindowCloseTime <= 0 && !_currBtmDisplayWindowClosed)
    {
        btmButtonDisplay.style.padding = "0";
        btmButtonDisplay.style.height = "0";
        _currBtmDisplayWindowClosed = true;
        //console.log("Display should now be transitioned out = " + _currTopDisplayWindowClosed);

        _btmClosed = true;
        //console.log ("Top Nav Button Display Window closed = " + _topClosed);
    }

    else if(!_setBtmDisplayWindowClosed && _currBtmDisplayWindowCloseTime > 0 && _currBtmDisplayWindowClosed)
    {
        _currBtmDisplayWindowCloseTime -= _effectTimeIncrementation;

        percentageOfTransition = 1-(_currBtmDisplayWindowCloseTime / _btmDisplayWindowCloseTime);
        //console.log("Current transition in percentage = " + percentageOfTransition + "%");

        newDisplayHeight = _btmNavButtonDisplayWindowOpenHeight * percentageOfTransition;

        if(newDisplayHeight < 0)
        {
            newDisplayHeight = 0;
        }

        else if(newDisplayHeight > _btmNavButtonDisplayWindowOpenHeight)
        {
            newDisplayHeight = _btmNavButtonDisplayWindowOpenHeight;
        }

        currBtmDisplayHeight = String(newDisplayHeight) + "px";
        //console.log("Current transition height = " + currTopDisplayHeight);
        btmButtonDisplay.style.height = currBtmDisplayHeight;
        //topButtonDisplay.style.opacity = percentageOfTransition;
    }

    else if(!_setBtmDisplayWindowClosed && _currBtmDisplayWindowCloseTime <= 0 && _currBtmDisplayWindowClosed)
    {
	btmButtonDisplay.style.padding = "5px 0 0";
        _currBtmDisplayWindowClosed = false;
        //console.log("Display should now be transitioned out = " + _currTopDisplayWindowClosed);
    }
}
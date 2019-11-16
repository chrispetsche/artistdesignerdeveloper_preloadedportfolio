// Author: Chris Petsche
// Experience Designer and Developer Portfolio
// NavButtonDisplayBehavior.js
// Version: 2.7.1
// Updated: 10 Nov 2019

// The purpose of this script is run the behavior of the navigation buttons at the
// top and bottom of the screen. It is designed so that the toggle buttons associated
// opens and closes the display the buttons are contained in by fading the buttons in
// and out, along with shrinking and expanding the display window. There are timers for 
// both displays that will make their window automatically close. The timer is set as      
// soon as the site launches, and after a display is open so that the center of the
// screen is open to show the viewer more area on the page. Beyond the basic 
// functionality is the simple effects that are only for cosmetic flare.

// Basic concept goes:
//  - Window open on launch
//  - If the toggle button pressed or auto close timer hits zero:
//      - Fade display buttons in, and just before they completely fade shrink window
//  - If window is closed and toggle button pressed:
//      - Expand window, and just before completely open fade display buttons in. 

// !!****** Nav Button Display Behavior System: Main Ops Section ******!! //
// In this section the viewer input is taken in, the main ops variables are set, and the
// functions of the system are updated via the SiteClockWork.js script.

// Since the entire system is called on a 1/100th second cycle, any timers running
// within it need to be incremented at the same rate in order to keep everything
// synced and in time. This is also a value that will never change and is therefore
// set to a constant. 
const _effectTimeIncrementation = 0.01;

// Variable set when the top display functions complete all their tasks during
// the change from open to close, or close to open. 
var _topClosed = false;
// Variable set when the top display functions are to start running their tasks
// to make the change from open to close, or close to open. 
var _topSetToClose = false;
// Timer set as a buffer between the window display transition and the buttons fading
// to simulate the desired effect as the display opens or closes. 
var _topSecondaryTransitionTimer = 0;
// When set to something above zero, the time will represent the number of seconds
// until the top display will automatically close.
var _autoTopDisplayWindowTransitionTime = 0;

// There are two displays that are able to run at seperate times due to the second set
// of ops variables for the bottom display.
var _btmClosed = false;
var _btmSetToClose = false;
var _btmSecondaryTransitionTimer = 0;
var _autoBtmDisplayWindowTransitionTime = 0;

// !!! SINGLE CALL FUNCTIONS !!! //

// Function called to change the state of the navigation button displays from open to closed, or
// from closed to open. It takes in a single parameter telling the inner content that it's either
// the top or the bottom display wanting to change. The function can be called from the viewer
// toggle buttons in the html files and from the automatic close function below.
function ToggleButtonDisplayStatus (_changeTop)
{
    // If viewer wants to change the open/closed status of the button display at the top of the page
    // or its appropriate auto close timer calls in...
    if(_changeTop)
    {
        // and the button display is currently not closed and not set to close...
        if(!_topClosed && !_topSetToClose)
        {
            // the viewer is obviously calling to close the display. 
            // So the system sets the display to be closed. 
            _topSetToClose = true;
            // Set up the system to make the tranisiton as the top display.
            InitiateButtonDisplayTransition (_changeTop);
        }

        // but if the button display is currently closed and set to close...
        else if(_topClosed && _topSetToClose)
        {
            // the viewer is calling to open the display.
            _topSetToClose = false;
            // Again, set up the system to make the tranisiton as the top display.
            InitiateButtonDisplayTransition (_changeTop);
        }      
    }

    // If viewer wants to change the open/closed status of the button display at the bottom of the page, or
    // like the top, the automatic close timer calls in...
    else if(!_changeTop)
    {
        // and the button display is currently not closed and not set to close...
        if(!_btmClosed && !_btmSetToClose)
        {
            // the viewer is obviously calling to close the display. 
            // So the system sets the display to be closed. 
            _btmSetToClose = true;
            // Set up the system to make the tranisiton as the bottom display.
            InitiateButtonDisplayTransition (_changeTop);
        }
        // but if the button display is currently closed and set to close...
        else if(_btmClosed && _btmSetToClose)
        {
            // the viewer is calling to open the display, and the system
            // the display to be opened.
            _btmSetToClose = false;
            // Once again, set up the system to make the tranisiton as the top display.
            InitiateButtonDisplayTransition (_changeTop);
        }
    } 
}

// As each transition is based on a set of timers counting down at specific stages, from open to 
// closed and then closed to open, this function sets the timer for the first element to transition 
// and a secondary timer that will eventually be a parameter in setting the timer for the second 
// element to be transitioned. It takes in a parameter telling the inner content if it's the top or
// bottom display that's being set.
function InitiateButtonDisplayTransition (_top)
{
    // If the top is to be set...
    if(_top)
    {
        // And the top is not closed as well as set to close...
        if(!_topClosed && _topSetToClose)
        {
            // Set buttons transition timer first!
            SetDisplayButtonsTransitionTimer (_top);

            // Then, set timer to close the display window just before buttons completely fade out.
            SetSecondaryTransitionTimer (_top, _topSetToClose);
        }
        
        // But, if the top is close and it is not set to close...
        else if(_topClosed && !_topSetToClose)
        {
            // Set display window transition timer first!
            SetDisplayWindowTransitionTimer (_top);
            // The display buttons should start to fade in just before display window is completely open. 
            SetSecondaryTransitionTimer (_top, _topSetToClose);
        }
    }

    // If it's no the top being requested, set the bottom...
    else if(!_top)
    {
        // Then, under the same conditions as the top display...
        if(!_btmClosed && _btmSetToClose)
        {
            // Set buttons transition timer first!
            SetDisplayButtonsTransitionTimer (_top);

            // Set timer to close the display window just before buttons completely fade out.
            SetSecondaryTransitionTimer (_top, _btmSetToClose);
        }
        
        // or...
        else if(_btmClosed && !_btmSetToClose)
        {
            // Set display window transition timer first!
            SetDisplayWindowTransitionTimer (_top);
            // The display buttons should start to fade in just before display window is 
            // completely open. 
            SetSecondaryTransitionTimer (_top, _btmSetToClose);
        }
    }
}

//
function SetDisplayWindowTransitionTimer (_top)
{
    if(_top)
    {
        _currTopDisplayWindowCloseTime = _topDisplayWindowCloseTime;
        //console.log ("Top Display Window Close Time = " + _currTopDisplayWindowCloseTime);
    }

    else if(!_top)
    {
        _currBtmDisplayWindowCloseTime = _btmDisplayWindowCloseTime;
    }
}

//
function SetDisplayButtonsTransitionTimer (_top)
{
    if(_top)
    {
        _currTopButtonFadeTime = _topButtonFadeTime;
        //console.log ("Top button fade timer = " + _currTopButtonFadeTime);
    }

    else if(!_top)
    {
        _currBtmButtonFadeTime = _btmButtonFadeTime;
    }
}

//
function SetSecondaryTransitionTimer (_top, _close)
{
    if(_top && _close)
    {
        _topSecondaryTransitionTimer = 0.15;
        //console.log("Top secondary timer set for a closing transition!! The timer is initialized at: " 
        //+ _topSecondaryTransitionTimer + "sec!!!");
    }

    else if(_top && !_close)
    {
        _topSecondaryTransitionTimer = 1.95;
        //console.log("Top secondary timer set for a opening transition!! The timer is initialized at: " 
        //+ _topSecondaryTransitionTimer + "sec!!!");
    }

    else if(!_top && _close)
    {
        _btmSecondaryTransitionTimer = 0.2;
        //console.log("Bottom secondary timer set for a closing transition!!");
    }

    else if(!_top && !_close)
    {
        _btmSecondaryTransitionTimer = 1.5;
        //console.log("Bottom secondary timer set for a opening transition!!");
    }
}
// !!TO BE CALLED ON START (just uncomment them when ready), AND ONCE A DISPLAY IS SET TO !_?Closed!!
//
function SetNavButtonDisplayWindowAutoTransitionTimer (_top)
{
    if(_top)
    {
        _autoTopDisplayWindowTransitionTime = 3;
        //console.log("Top auto display timer set to: " + _autoTopTransitionTime);
    }

    else if(!_top)
    {
        _autoBtmDisplayWindowTransitionTime = 4;
        //console.log("Bottom auto display timer set to: " + _autoBtmTransitionTime);
    }
}

// !!! DRIVE FUNCTIONS !!! //

// !!TO BE THE DRIVNG FUNCTION THAT RUNS THE ENTIRE SYSTEM VIA THE HUNTH CLOCK IN THE siteDriverFunctions.js
// (just need to uncomment when ready to use) WILL CALL THE AUTO TIMER RUN FUNCTION BELOW AND THE TRANSTION 
// FUNCTIONS IN THEIR OWN SCRIPTS!!

//
function ChangeSiteNavButtonDisplayWindowStatus ()
{
    RunDisplayAutoCloseTimer ();
    RunSecondaryTransitionTimer ();

    // If open...
    if(!_topClosed && _topSetToClose)
    {
        // If the top button are not currently faded and they're not set to fade...
        if(!_currTopButtonsFaded && !_setTopButtonsToFade)
        {
	    // The set them to fade out.
            _setTopButtonsToFade =  true;
        }
	
	// But if the top buttons are not currently faded and they are set to fade...
        else if(!_currTopButtonsFaded && _setTopButtonsToFade)
        {
	    // Then fade the buttons out!
            FadeButtons ();
        }

        // Check the secondary transition timer to see if the display window should close.
        if(_topSecondaryTransitionTimer <= 0)
        {
	    // If the display window close timer is less than zero, the display is not currently closed and it is
	    // not set to be closed...
            if(_currTopDisplayWindowCloseTime <= 0 && !_currTopDisplayWindowClosed && !_setTopDisplayWindowClosed)
            {
		// Set the window to be closed,
                _setTopDisplayWindowClosed = true;
		// Then set the transition timer to apply a smooth effect.
                SetDisplayWindowTransitionTimer (true);
                //console.log ("Top Nav Button Display Window should be set to close!!!");
            }

	    // If the display window is not closed and it is set to be closed...
            if(!_currTopDisplayWindowClosed && _setTopDisplayWindowClosed)
            {
		// Close the display window!
                TransitionDisplayWindows ();
                //console.log ("Top Nav Button Display Window should be closing!!!");
            }

	    // But if the top display window is closed and is set to be closed...
            if(_currTopDisplayWindowClosed && _setTopDisplayWindowClosed)
            {
                //console.log ("Checking to set top closed!!");
                if(_currTopButtonsFaded)
                {
                    _topClosed = true;
                    //console.log (_topClosed);
                }
                
                //console.log ("Top Nav Button Display Window closed = " + _topClosed);
            }
        }
    }

    // If closed...
    else if(_topClosed && !_topSetToClose)
    {
         // Open window
         if( _currTopDisplayWindowClosed && _setTopDisplayWindowClosed)
        {
            _setTopDisplayWindowClosed = false;
            //console.log ("Top Nav Button Display Window should be set to open!!!");
        }

        else if(_currTopDisplayWindowClosed && !_setTopDisplayWindowClosed)
        {
            TransitionDisplayWindows ();
            //console.log ("Top Nav Button Display Window should be opening!!!");
        }

        else if(!_currTopDisplayWindowClosed && !_setTopDisplayWindowClosed)
        {
	    if(!_currTopButtonsFaded)
	    {
        	_topClosed = false;
	    }

            //console.log ("Top Nav Button Display Window closed = " + _topClosed);
        }

         // Fade buttons
         if(_topSecondaryTransitionTimer <= 0)
         {
            if(_currTopButtonFadeTime  <= 0 && _currTopButtonsFaded && _setTopButtonsToFade)
            {
                _setTopButtonsToFade = false;
                SetDisplayButtonsTransitionTimer (true);
                //console.log ("Should be setting top buttons to fade in!!! Buttons to be faded = " + _setTopButtonsToFade + "Trans timer = " + _currTopButtonFadeTime);
            }

            if(_currTopButtonsFaded && !_setTopButtonsToFade)
            {
                FadeButtons ();
                //console.log ("Should be fading buttons in!!!");
            }
    
            else if(!_currTopButtonsFaded && !_setTopButtonsToFade)
            {
		        //console.log ("Buttons should be visable!!!");
                // Set auto close timer here!!!
                SetNavButtonDisplayWindowAutoTransitionTimer (true);
            }
        }
    }


    // ****** BOTTOM DISPLAY ******

    // and the button display is currently not closed and not set to close...
    if(!_btmClosed && _btmSetToClose)
    {
        // If the top button are not currently faded and they're not set to fade...
        if(!_currBtmButtonsFaded && !_setBtmButtonsToFade)
        {
            // The set them to fade out.
            _setBtmButtonsToFade =  true;
            //console.log ("Botton set to be closed= " + _setBtmButtonsToFade);
        }
	
	// But if the top buttons are not currently faded and they are set to fade...
        else if(!_currBtmButtonsFaded && _setBtmButtonsToFade)
        {
            // Then fade the buttons out!
            FadeButtons ();
        }

        // Check the secondary transition timer to see if the display window should close.
        if(_btmSecondaryTransitionTimer <= 0)
        {
            // If the display window close timer is less than zero, the display is not currently closed and it is
            // not set to be closed...
            if(_currBtmDisplayWindowCloseTime <= 0 && !_currBtmDisplayWindowClosed && !_setBtmDisplayWindowClosed)
            {
                // Set the window to be closed,
                _setBtmDisplayWindowClosed = true;
                // Then set the transition timer to apply a smooth effect.
                SetDisplayWindowTransitionTimer (false);
                //console.log ("Top Nav Button Display Window should be set to close!!!");
            }

	        // If the display window is not closed and it is set to be closed...
            if(!_currBtmDisplayWindowClosed && _setBtmDisplayWindowClosed)
            {
		    // Close the display window!
                TransitionDisplayWindows ();
                //console.log ("Top Nav Button Display Window should be closing!!!");
            }

	        // But if the top display window is closed and is set to be closed...
            if(_currBtmDisplayWindowClosed && _setBtmDisplayWindowClosed)
            {
                //console.log ("Checking to set top closed!!");
                if(_currBtmButtonsFaded)
                {
                    // 
                    _btmClosed = true;
                }
                
                //console.log ("Top Nav Button Display Window closed = " + _topClosed);
            }
        }
    }

    // but if the button display is currently closed and set to close...
    else if(_btmClosed && !_btmSetToClose)
    {
        // Open window
        if( _currBtmDisplayWindowClosed && _setBtmDisplayWindowClosed)
        {
            _setBtmDisplayWindowClosed = false;
            //console.log ("Top Nav Button Display Window should be set to open!!!");
        }

        else if(_currBtmDisplayWindowClosed && !_setBtmDisplayWindowClosed)
        {
            TransitionDisplayWindows ();
            //console.log ("Top Nav Button Display Window should be opening!!!");
        }

        else if(!_currBtmDisplayWindowClosed && !_setBtmDisplayWindowClosed)
        {
            if(!_currBtmButtonsFaded)
            {
                // 
                _btmClosed = false;
            }
  
            //console.log ("Top Nav Button Display Window closed = " + _topClosed);
        }
  
        // Fade buttons
        if(_btmSecondaryTransitionTimer <= 0)
        {
            if(_currBtmButtonFadeTime  <= 0 && _currBtmButtonsFaded && _setBtmButtonsToFade)
            {
                _setBtmButtonsToFade = false;
                SetDisplayButtonsTransitionTimer (false);
                //console.log ("Should be setting top buttons to fade in!!! Buttons to be faded = " + _setTopButtonsToFade + "Trans timer = " + _currTopButtonFadeTime);
            }

            if(_currBtmButtonsFaded && !_setBtmButtonsToFade)
            {
                FadeButtons ();
                //console.log ("Should be fading buttons in!!!");
            }
    
            else if(!_currBtmButtonsFaded && !_setBtmButtonsToFade)
            {
                //console.log ("Buttons should be visable!!!");
                // Set auto close timer here!!!
                SetNavButtonDisplayWindowAutoTransitionTimer (false);
            }
        }
    }
}

// !!EDIT VOCAB AND GENERAL LOCIC. TO BE CALLED FROM THE ChangeSiteNavButtonDisplayStatus () ABOVE!!
//
function RunDisplayAutoCloseTimer ()
{
    //
    if(_autoTopDisplayWindowTransitionTime > 0)
    {
        _autoTopDisplayWindowTransitionTime -= _effectTimeIncrementation;
        //console.log("Running top display auto fade timer!!!");
    }
    //
    if(_autoTopDisplayWindowTransitionTime <= 0 && !_topClosed)
    {
        ToggleButtonDisplayStatus (true);
    }

    //
    if(_autoBtmDisplayWindowTransitionTime > 0)
    {
        _autoBtmDisplayWindowTransitionTime -= _effectTimeIncrementation;
    }
    //
    if(_autoBtmDisplayWindowTransitionTime <= 0 && !_btmClosed)
    {
        ToggleButtonDisplayStatus (false);
    }
}

function RunSecondaryTransitionTimer ()
{
    if(_topSecondaryTransitionTimer > 0)
    {
        _topSecondaryTransitionTimer -= _effectTimeIncrementation;
        //console.log (_topSecondaryTransitionTimer);
    }

    if(_btmSecondaryTransitionTimer > 0)
    {
        _btmSecondaryTransitionTimer -= _effectTimeIncrementation;
    }
}

// ****** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ****** //


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



// !!****** Nav Button Display Behavior System: Display Buttons Ops Section ******!! // 
//


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


// Author: Chris Petsche
// Experience Designer and Developer Portfolio
// DisplayExtendedSummaryBehavior.js
// Version: 1.0
// Updated: 11 Nov 2019 

// The opening and closing of each display extended summary is ran through this script.
// After designing and coding the NavButtonDisplayBehavior.js, the idea came to use the
// same general idea to give the viewer more content on any project containing an extented 
// summary if they'd like just a little bit detail before viewing the full project through
// the VIEW PROJECT button within all displays. Each display will send in its ID, and then 
// the system will be set based on whether or not there is a display currently open, and if 
// so compare its ID to the new one being sent in. If there is one open and it's not a match,
// close it out as an old display and then set a new display to open with the parameters of 
// the ID sent.

// This current version is to test the initial toggle logic for the system, to set the objects
// that will feed the functional variables of both the opening and closing operations.

// Basic concept goes:
//  - If the view calls in to toggle a display, it sends in the ID of the display
//      - If the ID is the same as a current open display
//          - Use the ID to set the old display parameters
//          - Reset the parameters for a new  display to be opened
//          - Then execute the closing of the window that's open.
//      - If though, the ID being sent in does not match
//          - If the current value of the new display ID is not 'Empty' or null
//              - Use the ID current in the new display to set the old display parameters
//              and execute its closing operations.
//              - The set the new display parameters of the ID being sent in and open the 
//              display a viewer wishes to see. 
//          - But if the current value of the new display ID is 'Empty' or null
//              - Use the ID being sent in to set the new display parameters and open the display. 


// !!****** Display Extended Summary System: Display Toggle and Reset Section ******!! //
// In this section, the viewer is able ot call in and set off the effects of one to two
// displays. It contains a small list of needed variables and two functions. One for the
// toggling, and the other to reset the new display window object below. 

// When a viewer calls in to have a display transitioned, the toggle function below will
// check its ID against the value of this variable. By default is it set to 'Empty' per
// the system design requirements.
var _newDisplayWindowId = "Empty";

// This is one of two object variables the behavior system uses to open and close displays.
// The new display is factored in to be the opening display. It will hold all the information
// to perform the task as it is called on in the operations functions to come. 
var _newDisplayWindow;
//
var _newDisplayWindowOpen = false;
//
var _setOpenNewDisplayWindow = false;

// Since the new display is seen as the opening object, the old is the closing. And therefore
// hold the closing information.
var _oldDisplayWindow;
//
var _oldDisplayWindowClosed = false;
//
var _setCloseOldDisplayWindow = false;

// This is the toggle function that viewers will call through the toggle buttons in the displays.
// As described, the toggle button sends in the ID of the extended display it is to toggle, and 
// that ID is ran through a series of checks to determine the behavior that is to happen.
function ToggleDisplayExtendedSummaryWindow (_displayId)
{
    // If the ID being passed in is equal to the ID current set in the new display object...
    if(_displayId == _newDisplayWindowId)
    {
        // Then the display is already opend, so use the ID being passed in to set the old display 
        // for closing.
        _oldDisplayWindow = DisplayExtentedSummaryToTransition (_displayId);
        
        // Set old display to close
        _setCloseOldDisplayWindow = true;
	_oldDisplayWindowClosed = false;
        //
        InitiateEffectTimers (false, true);
        
        // Then call to reset the new display and ready it for another call.
        ResetNewDisplayWindowParameters ();
	_newDisplayWindowOpen = false;
    }

    // If the ID being passed in is not equal to the ID currently set in the new display...
    else if(_displayId != _newDisplayWindowId)
    {
        // And the currently set ID is not equal to 'Empty' or null...
        if(_newDisplayWindowId != "Empty" && _newDisplayWindowId != null)
        {
            // Another display must be open. So, use its ID to set the old display for closing.
            _oldDisplayWindow = DisplayExtentedSummaryToTransition (_newDisplayWindowId);

            // Set old display to close
            _setCloseOldDisplayWindow = true;
	    _oldDisplayWindowClosed = false;
            //
            InitiateEffectTimers (false, true);

            // The new display ID can now be set as the ID being passed in and...
            _newDisplayWindowId = _displayId;
            // the new display object can be set for opening.
            _newDisplayWindow = DisplayExtentedSummaryToTransition (_newDisplayWindowId);
            
            // Set new display to open
            _setOpenNewDisplayWindow = true;
	        _newDisplayWindowOpen = false;
            //
            InitiateEffectTimers (true, true);
        }

        // But should the ID currently set in the new object be equal to 'Empty' or null...
        else if(_newDisplayWindowId == "Empty" || _newDisplayWindowId == null)
        {
            // Then no displays are currently open and the new display ID can be set to 
            // the ID being passed in, and then...
            _newDisplayWindowId = _displayId;
            // the new display object is set to open.
            _newDisplayWindow = DisplayExtentedSummaryToTransition (_newDisplayWindowId);
            
            // Set new display to open
            _setOpenNewDisplayWindow = true;
	    _newDisplayWindowOpen = false;
            //
            InitiateEffectTimers (true, true);
        }
    }
}

// When the new display object is called to be reset, this is the function that handles the process.
function ResetNewDisplayWindowParameters ()
{
    // The new display object is set to be the first object in the list with the "empty" variables.
    _newDisplayWindow = DisplayExtentedSummaryToTransition ('ResetNewDisplayObject');
    // Then the new display's ID is reset to the default 'Empty'.
    _newDisplayWindowId = _newDisplayWindow.resetNewID;
}




//
var newContentFadeTimer = 0;
// 
var newWindowTransitonTimer = 0;
//
var totalOpeningTimer = 0;
//
var openHeight = 0;

//
var oldContentFadeTimer = 0;
// 
var oldWindowTransitonTimer = 0;
//
var totalClosingTimer = 0;
//
var closingHeight = 0;

//
function WindowDisplayHeight (_new, _display)
{
    upperScreenLimit = 470;
    midScreenLimit = upperScreenLimit - 50;
    minimalScreenLimit = upperScreenLimit - 100;

    if(_new)
    {
	openHeight = 0;
	console.log ("Open height is = " + openHeight);
    }

    else if(!_new)
    {
	closingHeight = 0;
	console.log ("Closing height is = " + closingHeight);
    }



    currentScreenWidth = screen.width;

    if(currentScreenWidth > upperScreenLimit)
    {
	return _display.displayOpenHeight;
    }

    else if(currentScreenWidth < upperScreenLimit && currentScreenWidth >= midScreenLimit)
    {
	newHeight = _display.displayOpenHeight + 24;
	console.log ("Set height is = " + newHeight);
	return newHeight;
    }

    else if(currentScreenWidth < midScreenLimit && currentScreenWidth >= minimalScreenLimit)
    {
	newHeight = _display.displayOpenHeight + 48;
	console.log ("Set height is = " + newHeight);
	return newHeight;
    }

    else if(currentScreenWidth < minimalScreenLimit)
    {
	console.log ("This scaling is not available! Larger screen size is required!!!!");
    }
}

//
function InitiateEffectTimers (_new, _firstStage)
{
    if(_new)
    {
        if(_setOpenNewDisplayWindow && !_newDisplayWindowOpen)
        {
            // Open display window
            if(_firstStage)
            {
		openHeight = WindowDisplayHeight (true, _newDisplayWindow);
                newWindowTransitonTimer = _windowTransitonTime;
                totalOpeningTimer = _contentFadeTime + newWindowTransitonTimer;
		        //console.log ("New window transition timer = " + newWindowTransitonTimer +
		        //", and Total opening timer = " +  totalOpeningTimer);
            }

            // Fade content in
            else if(!_firstStage)
            {
                newContentFadeTimer = _contentFadeTime;
		        //console.log ("New content fade timer = " + newContentFadeTimer);
            }
        }
    }

    else if(!_new)
    {
        if(_setCloseOldDisplayWindow && !_oldDisplayWindowClosed)
        {
            // Fade content out
            if(_firstStage)
            {
                oldContentFadeTimer = _contentFadeTime;
                totalClosingTimer = _contentFadeTime + _windowTransitonTime;
		        //console.log ("Old content fade timer = " + oldContentFadeTimer +
		        //", and Total closing timer = " +  totalClosingTimer);
            }

            // Close display window
            else if(!_firstStage)
            {
		closingHeight = WindowDisplayHeight (false, _oldDisplayWindow);
                oldWindowTransitonTimer = _windowTransitonTime;
		        //console.log ("Old window transition timer = " + oldWindowTransitonTimer);
            }
        }
    }
}

// !!******  ******!! //

//
function ChangeDisplayExtendedWindowStatus ()
{
    RunSystemTimers ();

    if(_setOpenNewDisplayWindow && !_newDisplayWindowOpen && totalOpeningTimer > 0)
    {
        // If the new window transition timer is greater than zero, transition new display
        // window open.
        if(newWindowTransitonTimer > 0)
        {
            // Transition display window open!!
            percentageOfTransition = 1-(newWindowTransitonTimer / _windowTransitonTime);
            //console.log("Current transition in percentage = " + percentageOfTransition + "%");

            newDisplayHeight = openHeight * percentageOfTransition;

            if(newDisplayHeight < 0)
            {
                newDisplayHeight = 0;
            }

            else if(newDisplayHeight > openHeight)
            {
                newDisplayHeight = openHeight;
            }

            currTopDisplayHeight = String(newDisplayHeight) + "px";
            //console.log("Current transition height = " + currTopDisplayHeight);
            document.getElementById(_newDisplayWindow.windowToTransition).style.height = currTopDisplayHeight;
            //topButtonDisplay.style.opacity = percentageOfTransition;
	    }

        // But if the secondary timer is less than or equal to zero, fade in new display 
        // window content.
        else if(newWindowTransitonTimer <= 0)
        {
            if(newContentFadeTimer <= 0)
            {
                InitiateEffectTimers (true, false);
            }

	        else if(newContentFadeTimer > 0)
            {
                document.getElementById(_newDisplayWindow.contentToFade).style.display = "inline-block";

                percentageOfContentFaded = 1-(newContentFadeTimer / _contentFadeTime);
                document.getElementById(_newDisplayWindow.contentToFade).style.opacity = percentageOfContentFaded;
            }
	}

        //console.log ("Should now be calling to open new display window!!");
    }

    else if(_setOpenNewDisplayWindow && !_newDisplayWindowOpen && totalOpeningTimer <= 0)
    {
        _newDisplayWindowOpen = true;
        _setOpenNewDisplayWindow = false;
        //console.log ("Should now be calling to set new display window as open!!");
    }

    if(_setCloseOldDisplayWindow && !_oldDisplayWindowClosed && totalClosingTimer > 0)
    {
        // If the old window transition timer is greater than zero, fade content in old display.
        if(oldContentFadeTimer > 0)
        {
            percentageOfContentFaded = oldContentFadeTimer / _contentFadeTime;
            document.getElementById(_oldDisplayWindow.contentToFade).style.opacity = percentageOfContentFaded;
        }

        // But if the old content fade timer is less than or equal to zero, transition old display
        // window closed.
        else if(oldContentFadeTimer <= 0)
        {
            document.getElementById(_oldDisplayWindow.contentToFade).style.display = "none";

            if(oldWindowTransitonTimer <= 0)
            {
                InitiateEffectTimers (false, false);
                //console.log("Old window transition timer = " + oldWindowTransitonTimer);
            }

            else if(oldWindowTransitonTimer > 0)
            {
                // Transition display window closed!!!
                percentageOfTransition = oldWindowTransitonTimer / _windowTransitonTime;
                //console.log("Current transition percentage = " + String(percentageOfTransition) + "%");
        
                newDisplayHeight = closingHeight * percentageOfTransition;
        
                if(newDisplayHeight < 0)
                {
                    newDisplayHeight = 0;
                }
        
                else if(newDisplayHeight > closingHeight)
                {
                    newDisplayHeight = closingHeight;
                }
        
                currTopDisplayHeight = String(newDisplayHeight) + "px";
                //console.log("Current transition height = " + currTopDisplayHeight);
                document.getElementById(_oldDisplayWindow.windowToTransition).style.height = currTopDisplayHeight;
                //topButtonDisplay.style.opacity = percentageOfTransition;
            }
        }

        //console.log ("Should now be calling to close old display window!!");
    }

    else if(_setCloseOldDisplayWindow && !_oldDisplayWindowClosed && totalClosingTimer <= 0)
    {
        _oldDisplayWindowClosed = true;
        _setCloseOldDisplayWindow = false;
        //console.log ("Should now be calling to set old display window as closed!!");
    }
}

//
function RunSystemTimers ()
{
    if(newContentFadeTimer > 0)
    {
        newContentFadeTimer -= _effectTimeIncrementation;
    }

    if(newWindowTransitonTimer > 0)
    {
        newWindowTransitonTimer -= _effectTimeIncrementation;
    }

    if(totalOpeningTimer > 0)
    {
        totalOpeningTimer  -= _effectTimeIncrementation;
    }

// **************************************************************** //

    if(oldContentFadeTimer > 0)
    {
        oldContentFadeTimer  -= _effectTimeIncrementation;
    }

    if(oldWindowTransitonTimer > 0)
    {
        oldWindowTransitonTimer  -= _effectTimeIncrementation;
    }

    if(totalClosingTimer > 0)
    {
        totalClosingTimer  -= _effectTimeIncrementation;
    }
}

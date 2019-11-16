// Author: Chris Petsche
// Experience Designer and Developer Portfolio
// index.html (home page)
// Version: 4.0
// Updated: 17 Oct 2019

// Anything that needs to happen as soon as the site launches
// is called through this function.
function OnStart()
{
    // !!!TO BE USED IN FINAL BUILD!!!
    SetNavButtonDisplayWindowAutoTransitionTimer (true);
    SetNavButtonDisplayWindowAutoTransitionTimer (false);
}

// Anything that needs to be updated every second is called
// through this function. 
function Update() 
{
    
}

// Anything that needs to be updated every tenth of a second is 
// called through this function.
function UpdatePerTenth() 
{
    
}

// Anything that needs to be updated every hundredth of a second 
// is called through this function.
function UpdatePerHunth() 
{
    ChangeSiteNavButtonDisplayWindowStatus ();
    ChangeDisplayExtendedWindowStatus ();
}

// Anything that needs to be updated every thousandth of a second 
// is called through this function.
function UpdatePerThouth() 
{
    
}

// *** Running Temporial Calculation Functions *** //

// Counts up per second, from 0. Tracking time since site launch.
// Also drives the standard update function.
function SiteTime() {
    const now = Date.now();
    const then = now + 1 * 1000;

    setInterval(() => {
        
        const secondsPassed = (Math.round ((then - Date.now()) / 1000)) * -1;
	    Update();
        
    }, 1000);
}

// Counts up per tenth of a second, from 0. Tracking time since site launch.
// Also drives the tenth of a second update function.
function SiteTenthTime() {
    const now = Date.now();
    const then = now + 1 * 100;

    setInterval(() => {
        
        const secondsPassed = (Math.round ((then - Date.now()) / 100)) * -1;
	    UpdatePerTenth();
        
    }, 100);
}

// Counts up per hundredth of a second, from 0. Tracking time since site launch.
// Also drives the hundredth of a second update function.
function SiteHunthTime() {
    const now = Date.now();
    const then = now + 1 * 10;

    setInterval(() => {
        
        const secondsPassed = (Math.round ((then - Date.now()) / 10)) * -1;
	    UpdatePerHunth();
        
    }, 10);
}

// Counts up per thousandth of a second, from 0. Tracking time since site launch.

// Also drives the thousandth of a second update function.
function SiteThouthTime() {
    const now = Date.now();
    const then = now + 1 * 1;

    setInterval(() => {
        
        const secondsPassed = (Math.round ((then - Date.now()) / 1)) * -1;
	    UpdatePerThouth();
        
    }, 1);
}

// *** Site Behavior Ignition *** //

// Initiates all driving functions for the site.
function activateSiteBehavior(){
    OnStart();
    SiteTime();
	SiteTenthTime();
	SiteHunthTime();
	SiteThouthTime();
}


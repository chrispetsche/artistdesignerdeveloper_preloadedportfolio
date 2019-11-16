function IsAMobileScreen ()
{
    minWidth = 500;

    if((screen.width < screen.height && screen.width < minWidth) || screen.height < minWidth)
    {
        console.log ("This is a mobile screen!!!");
    }

    else
    {
        console.log ("This is not a mobile screen!!!");
    }
}

function CheckScreenSize ()
{
    IsAMobileScreen ();
    console.log ("Screen width = " + screen.width + ", and Screen height = " + screen.height);
}
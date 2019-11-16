var headerButtonCloseTimer = 0;
var headerButtonCloseTimerReset = 5;

function closeHeaderButtonBlock()
{
    if(headerButtonCloseTimer <= 0)
    {
		var x = document.getElementsByClassName("overHeadButton");
		var i;
		var y = document.getElementsByClassName("primaryContentBlock");
		var j;

		for (i = 0; i < x.length; i++) 
		{
			for (j = 0; j < y.length; j++)
			{
				x[i].style.opacity = "0";
				y[j].style.top = "100px";
			};
		};

		document.getElementById("buttonContainer").style.display = "none";
		document.getElementById("buttonContainer").style.height = "0";
		document.getElementById("buttonContainer").style.padding = "0";
		document.getElementById("buttonContainer").style.border = "0";
    }

    else if(headerButtonCloseTimer > 0)
    {
		--headerButtonCloseTimer;
    }
}

function openHeaderButtonBlock ()
{
    document.getElementById("buttonContainer").style.height = "35px";


    headerButtonCloseTimer = headerButtonCloseTimerReset;
}
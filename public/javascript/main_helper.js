TimeMe.initialize({
    currentPageName: "my-home-page", // current page
    idleTimeoutInSeconds: 15, // stop recording time due to inactivity // TODO: Increase
});

TimeMe.callAfterTimeElapsedInSeconds(2, function () {
    // console.log("The user has been using the page for 2 seconds! Let's prompt them with something.");
});

TimeMe.callWhenUserLeaves(() => {
    let timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    let timeInSeconds = "0"
    if(timeSpentOnPage) {
        timeInSeconds = timeSpentOnPage.toFixed(2);
    }
    let participant_id = getCookie("participantID")
    if(!participant_id){
        participant_id = Date.now().toString(36) + Math.random().toString(36).substr(2)
        document.cookie = `participantID=${participant_id}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }
    let myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    let rawData = JSON.stringify({
        "participant_id": participant_id,
        "duration": parseFloat(timeInSeconds),
        "cursor_coordinates_array": cursorCoordinatesArray,
        "time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        "path": window.location.pathname,
        "query": window.location.search
    });
    // Resetting values
    TimeMe.resetAllRecordedPageTimes()
    cursorCoordinatesArray = []

    // console.log("this is the raw data", rawData)
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: rawData,
        redirect: "follow"
    };
    // TODO: Need to reset the values before sending request
    fetch("https://server.pabloo.com/participant/add_participant_activity", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
})

let bufferDateReset = new Date();
bufferDateReset.setMilliseconds(bufferDateReset.getMilliseconds() + 250); // set timer to 250 milliseconds
let cursorCoordinatesArray = []

window.onload = function () {
    // Tracking mouse activity
    document.onmousemove = handleMouseMove;
    // TODO: Track page track page scrolling, super important for the iphone

    // Enable for testing
    // setInterval(function () {
    //     let timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    //     document.getElementById('timeInSeconds').textContent = timeSpentOnPage.toFixed(2);
    //
    //     if (TimeMe.isUserCurrentlyOnPage && TimeMe.isUserCurrentlyIdle === false) {
    //         document.getElementById('activityStatus').textContent = "You are actively using this page sir."
    //     } else {
    //         document.getElementById('activityStatus').textContent = "You have left the page."
    //     }
    //
    // }, 37);
}


function handleMouseMove(event) {
    let timeDiff = bufferDateReset - new Date();
    if (timeDiff > 0) {
        // Dropping this value because of throttle
        return
    }

    bufferDateReset.setMilliseconds(bufferDateReset.getMilliseconds() + 250); // set timer to 250 milliseconds
    let eventDoc, doc, body;

    event = event || window.event; // IE-ism
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    // Use event.pageX / event.pageY here
    cursorCoordinatesArray.push({'x': event.pageX, 'y': event.pageY})
    let tempObject = document.elementFromPoint(event.pageX, event.pageY) // TODO: pass that data up
    // TODO: Can we track how long the user has been on that object?
    // console.log("this is your object", tempObject)
}


function getCookie(name) {
    let cookies = document.cookie.split(';');
    for(let i=0; i < cookies.length; i++) {
        let currentCookieList = cookies[i].split("=");
        if (currentCookieList[0].includes(name)){
            return currentCookieList[1]
        }
    }
    return null;
}
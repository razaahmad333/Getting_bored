const activityThemes = {
    education: "#3498db",
    recreational: "#2ecc71",
    social: "#e67e22",
    diy: "#d35400",
    charity: "#9b59b6",
    cooking: "#f1c40f",
    relaxation: "#3498db",
    music: "#e74c3c",
    busywork: "#95a5a6"
}

let currentActivity = undefined
let debounceTimer

fetchActivity()


function onLoading() {
    $("#activity-text").css("opacity", "0.5")
    $("#activity-buttons #new-button").attr("disabled", true)
    $("#activity-buttons #save-button").attr("disabled", true)
}

function onLoadingComplete() {
    $("#activity-text").css("opacity", "1")
    $("#activity-buttons #new-button").attr("disabled", false)
    $("#activity-buttons #save-button").attr("disabled", false)
}

$("#activity-buttons #new-button").click(() => {
    fetchActivity()
})

$("#activity-buttons #save-button").click(() => {
    onLoading()
    const savedActivities = JSON.parse(localStorage.getItem("savedActivities") || "[]")
    console.log(localStorage.getItem("savedActivities"))
    savedActivities.push(currentActivity.key)
    localStorage.setItem("savedActivities", JSON.stringify(savedActivities))
    onLoadingComplete()
    populateCard(currentActivity)
})


function fetchActivity() {
    onLoading()
    const accessibility = Number(localStorage.getItem("accessibility") || "-1")
    const type = localStorage.getItem("type") || "all"
    const participants = localStorage.getItem("participants") || "-1"
    const queries = {
        ...(accessibility !== -1 && { accessibility }),
        ...(type !== "all" && { type }),
        ...(participants !== "-1" && { participants })
    }

    fetch(`https://www.boredapi.com/api/activity?${$.param(queries)}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                alert(data.error + "\n\n" + "Try changing your settings")
                return
            }
            populateCard(data)
            currentActivity = data
            onLoadingComplete()
        })
}


function populateCard(activity) {

    $("#activity-text #activity-name").text(activity.activity)
    $("#activity-text #activity-type").text(activity.type)
    $("#activity-text #participants").text(activity.participants)

    $("#activity-text #activity-type").css("color", activityThemes[activity.type])
    $("#activity-buttons #save-button").css("background-color", activityThemes[activity.type])
    $("#activity-buttons #new-button").css("background-color", activityThemes[activity.type])
    if (activity.link) {
        $("#activity-text #activity-link").attr("href", activity.link)
        $("#activity-text #activity-link").text(activity.link)
    } else {
        const link = "https://www.google.com/search?q=" + activity.activity.replace(" ", "+") + "&tbm=isch"
        $("#activity-text #activity-link").attr("href", link)
        $("#activity-text #activity-link").text("how about you google it?")
    }

    const savedActivities = JSON.parse(localStorage.getItem("savedActivities") || "[]")
    if (savedActivities.includes(activity.key)) {
        $("#activity-buttons #save-button").attr("disabled", true)
        $("#activity-buttons #save-button").text("Saved")
    } else {
        $("#activity-buttons #save-button").attr("disabled", false)
        $("#activity-buttons #save-button").text("Save")
    }



}


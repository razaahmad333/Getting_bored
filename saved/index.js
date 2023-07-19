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

const savedActivities = JSON.parse(localStorage.getItem("savedActivities") || "[]")

const fetchAllActivities = () => {
    const promises = savedActivities.map(activity => {
        return fetch(`https://www.boredapi.com/api/activity?key=${activity}`)
    })

    Promise.all(promises)
        .then(responses => {
            const jsonPromises = responses.map(response => response.json())
            return Promise.all(jsonPromises)
        })
        .then(activities => {
            console.log(activities)
            populateActivites(activities)
        })
}

fetchAllActivities()

function populateActivites(activities) {

    const activitiesContainer = $("#activities")
    activities.forEach(activity => {
        const activityContainer = $("<div>").attr("id", "activity")
        const activityText = $("<div>").attr("id", "activity-text")
        const activityName = $("<p>").attr("id", "activity-name").text(activity.activity)
        const activityType = $("<p>").attr("id", "activity-type").text(activity.type).css("color", activityThemes[activity.type])
        const participants = $("<p>").attr("id", "participants").text(activity.participants)
        let activityLink
        if (!activity.link) {
            activity.link = "https://www.google.com/search?q=" + activity.activity.replace(" ", "+") + "&tbm=isch"
            activityLink = $("<a>").attr("id", "activity-link").attr("href", activity.link).text("how about you google it?")
        } else {
            activityLink = $("<a>").attr("id", "activity-link").attr("href", activity.link).text(activity.link)
        }


        const removeButton = $("<button>").attr("id", "remove-button").text("Remove").click(() => {
            const index = savedActivities.indexOf(activity.key)
            if (index > -1) {
                savedActivities.splice(index, 1)
            }
            localStorage.setItem("savedActivities", JSON.stringify(savedActivities))
            activityContainer.remove()
        })

        activityText.append(activityName)
        activityText.append(activityType)
        activityText.append(participants)
        activityText.append(activityLink)

        activityContainer.append(activityText)
        activityContainer.append(removeButton)
        activitiesContainer.append(activityContainer)
    })

}
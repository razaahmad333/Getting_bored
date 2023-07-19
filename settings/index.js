const activityThemes = {
    "all": "#95a5a6",
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

populateSettings()


function populateSettings() {
    const accessibility = localStorage.getItem("accessibility") || -1
    $("#accessibility-slider").val(accessibility)
    $("#accessibility-value").text(accessibility)
    const type = localStorage.getItem("type") || "all"
    $(`.type-button`).removeClass("selected").css("background-color", "#eee").css("color", "#666")
    $(`#${type}`).addClass("selected").css("background-color", activityThemes[type]).css("color", "white")

    const participants = localStorage.getItem("participants") || "-1"
    $(`.participants-button`).removeClass("selected")
    $(`#${participants}`).addClass("selected")
}

$("#reset-accessibility").click(() => {
    localStorage.setItem("accessibility", "-1")
    populateSettings()
})

$("#restore-defaults").click(() => {
    const savedActivities = JSON.parse(localStorage.getItem("savedActivities") || "[]")
    localStorage.clear()
    localStorage.setItem("savedActivities", JSON.stringify(savedActivities))
    populateSettings()
})

$("#accessibility-slider").on("input", () => {
    const accessibility = $('#accessibility-slider').val()
    localStorage.setItem("accessibility", accessibility)
    populateSettings()
})

$(".type-button").click(function () {
    const type = $(this).attr("id")
    localStorage.setItem("type", type)
    populateSettings()
})

$(".participants-button").click(function () {
    const participants = $(this).attr("id")
    localStorage.setItem("participants", participants)
    populateSettings()
})
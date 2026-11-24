/* Project Three — original JavaScript */
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation button.
  const menuButton = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      navLinks.classList.toggle("nav-open");
    });
  }

  // Assignment-required Questions button: display the message on two lines.
  const questionsButton = document.querySelector("#questions-button");
  if (questionsButton) {
    questionsButton.addEventListener("click", function () {
      alert("If you have questions, contact me at:\njreynolds2@hawk.illinoistech.edu");
    });
  }
});

// Google Maps callback. Additional map features: marker, info window,
// map-style toggle, and a button that requests the visitor's location.
let projectMap;
let projectInfoWindow;
let alternateMapStyle = false;

function initMap() {
  const campus = { lat: 41.8349, lng: -87.6270 };
  const mapElement = document.getElementById("map");
  if (!mapElement || !window.google || !google.maps) {
    return;
  }

  projectMap = new google.maps.Map(mapElement, {
    center: campus,
    zoom: 15,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true
  });

  const campusMarker = new google.maps.Marker({
    position: campus,
    map: projectMap,
    title: "Illinois Institute of Technology"
  });

  projectInfoWindow = new google.maps.InfoWindow({
    content: "<strong>Illinois Institute of Technology</strong><br>Chicago, Illinois"
  });

  campusMarker.addListener("click", function () {
    projectInfoWindow.open(projectMap, campusMarker);
  });

  const styleButton = document.getElementById("map-style-button");
  if (styleButton) {
    styleButton.addEventListener("click", function () {
      alternateMapStyle = !alternateMapStyle;
      projectMap.setOptions({
        styles: alternateMapStyle ? [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }
        ] : []
      });
    });
  }

  const locationButton = document.getElementById("my-location-button");
  const status = document.getElementById("map-status");
  if (locationButton) {
    locationButton.addEventListener("click", function () {
      if (!navigator.geolocation) {
        if (status) status.textContent = "Your browser does not support location sharing.";
        return;
      }
      if (status) status.textContent = "Requesting your location permission...";
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const visitor = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          projectMap.setCenter(visitor);
          projectMap.setZoom(15);
          new google.maps.Marker({
            position: visitor,
            map: projectMap,
            title: "Your location"
          });
          if (status) status.textContent = "The map is now centered on your location.";
        },
        function () {
          if (status) status.textContent = "Location was unavailable or permission was not granted.";
        }
      );
    });
  }

  if (status) status.textContent = "Map loaded. Select the campus marker for details.";
}

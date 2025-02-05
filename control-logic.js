// /* Written and Debugged by: Won Seok Chang, Abhishek Chaudhuri, Srikrishnaraja Mahadas,
//  * Sri Sai Krishna Tottempudi */
// 'use strict';

// // Get location
// var x = document.getElementById("demo");
// let lat2=null;
// let long2=null;
// let tries = 0; // # of attempts to change the location
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   const lat = position.coords.latitude;
//   const long = position.coords.longitude;
//   ++tries;
//   if (lat === lat2 && long === long2) {
//     return;
//   }
//   x.innerHTML = "Location:<br>Lat: " + Math.round(lat*100000)/100000 +
//   "&deg;<br>Long: " + Math.round(long*100000)/100000 + "&deg;";
//   const velocity=getSpeed(lat,lat2,long,long2);
//   if (lat2 !== null) {
//     document.querySelector(".speed").innerHTML=`Speed: ${Math.round(velocity*100)/100} m/s`;
//   }
//   lat2=lat;
//   long2=long;
//   tries = 0;
// }

// function getSpeed(lat, lat2, long, long2){
// 	/*const r  = 6371;
// 	const latDistance = (lat-lat2)*Math.PI/180;
// 	const longDistance = (long-long2)*Math.PI/180;
// 	const area = Math.sin(latDistance/2)*Math.sin(latDistance/2)+Math.cos((lat)*Math.PI/180)*Math.cos((lat2)*Math.PI/180)*Math.sin(longDistance/2)*Math.sin(longDistance/2);
// 	const circum = 2* Math.atan(Math.sqrt(area), Math.sqrt(1-area));
// 	const distance = r*circum*1000;
// 	const totalDistance = Math.pow(distance,2);
// 	const speed = totalDistance/(3*tries);*/
//   const r = 6371;
//   const latDist = (lat2-lat)*(1/2);
//   const rad1 = latDist*Math.PI/180;
//   const longDist = (long2-long)*(1/2)
//   const rad2 = latDist*Math.PI/180;
//   const val1 = lat*Math.PI/180;
//   const val2 = lat2*Math.PI/180;
//   const dist = Math.sin(rad1)*Math.sin(rad1)+Math.cos(val1)*Math.cos(val2)*Math.sin(rad2)*Math.sin(rad2);
//   const value = 2*r*1000*Math.asin(Math.pow(dist,0.5));
//   const speed = value/(3*tries);
// 	return speed;
// }
// setInterval(getLocation,3000);

// // Get video feed
// const videoElement = document.querySelector('video');
// //const audioSelect = document.querySelector('select#audioSource');
// const videoSelect = document.querySelector('select#videoSource');

// navigator.mediaDevices.enumerateDevices()
//   .then(gotDevices).then(getStream).catch(handleError);

// //audioSelect.onchange = getStream;
// videoSelect.onchange = getStream;

// function gotDevices(deviceInfos) {
//   for (let i = 0; i !== deviceInfos.length; ++i) {
//     const deviceInfo = deviceInfos[i];
//     const option = document.createElement('option');
//     option.value = deviceInfo.deviceId;
//     /*if (deviceInfo.kind === 'audioinput') {
//       option.text = deviceInfo.label ||
//         'microphone ' + (audioSelect.length + 1);
//       audioSelect.appendChild(option);
//     } else*/ if (deviceInfo.kind === 'videoinput') {
//       option.text = deviceInfo.label || 'camera ' +
//         (videoSelect.length + 1);
//       videoSelect.appendChild(option);
//     } else {
//       console.log('Found another kind of device: ', deviceInfo);
//     }
//   }
// }

// function getStream() {
//   if (window.stream) {
//     window.stream.getTracks().forEach(function(track) {
//       track.stop();
//     });
//   }

//   const constraints = {
//     /*audio: {
//       deviceId: {exact: audioSelect.value}
//     },*/
//     video: {
//       deviceId: {exact: videoSelect.value}
//     }
//   };

//   navigator.mediaDevices.getUserMedia(constraints).
//     then(gotStream).catch(handleError);
// }

// function gotStream(stream) {
//   window.stream = stream; // make stream available to console
//   videoElement.srcObject = stream;
// }

// function handleError(error) {
//   console.error('Error: ', error);
// }

// function toggleVideo() {
//   const video = document.querySelector('#video');
//   video.hidden = !video.hidden;
// }

// document.querySelector('.fa-power-off').onclick = toggleVideo; // Toggle between seeing video

// // Get USB devices
// /*navigator.usb.getDevices()
// .then(devices => {
//   document.querySelector('.controls').innerHTML += "Total devices: " + devices.length;
//   devices.forEach(device => {
//     document.querySelector('.controls').innerHTML += "Product name: " + device.productName + ", serial number " + device.serialNumber;
//   });
// });*/

// // Get battery status
// window.onload = function () {
// 	function updateBatteryStatus(battery) {
// 		const label = document.querySelector('#level');
// 		label.textContent = `${Math.round(battery.level*100)}%`;

//  		// Alert if low battery
// 		if(battery.level <= 0.2) {
// 			document.getElementById("low").style.display = "inline-block";
//       			label.style.color = 'red';
// 		}
// 		else {
// 			document.getElementById("low").style.display = "none";
// 			label.style.color = 'white';
// 		}
// 	}

// 	navigator.getBattery().then(function(battery) {
// 		// Update the battery status initially when the promise resolves ...
// 		updateBatteryStatus(battery);

// 		// .. and for any subsequent updates.
// 		battery.onchargingchange = function () {
// 			updateBatteryStatus(battery);
// 		};

// 		battery.onlevelchange = function () {
// 			updateBatteryStatus(battery);
// 		};

// 		battery.ondischargingtimechange = function () {
// 			updateBatteryStatus(battery);
// 		};
// 	});
// };

// // Get sensor data
// function loadData() {
//   const left = document.querySelector('.sensor-left');
//   fetch('Obstacles/leftsensor.txt').then(resp => resp.text()).then(data => {
//     left.textContent = `Left: ${data} cm`; // fetches text file, then displays its content
//     left.style.color = data <= 30.48 ? 'red' : 'white'; // = 1 ft
//   }).catch(err => {
//     console.log(err);
//   });
//   const right = document.querySelector('.sensor-right');
//   fetch('Obstacles/rightsensor.txt').then(resp => resp.text()).then(data => {
//     right.textContent = `Right: ${data} cm`; // fetches text file, then displays its content
//     right.style.color = data <= 30.48 ? 'red' : 'white'; // = 1 ft
//   }).catch(err => {
//     console.log(err);
//   });
// }

// setInterval(loadData, 1000); // numbers update every second
'use strict';

// Get location
'use strict';

// Get video feed setup
const videoElement = document.querySelector('video');
const videoSelect = document.querySelector('select#videoSource');
let stream = null;

// Initialize camera
async function initializeCamera() {
    try {
        // First, get permission for video
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        
        // Then enumerate devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        
        // Clear existing options
        while (videoSelect.firstChild) {
            videoSelect.removeChild(videoSelect.firstChild);
        }
        
        // Add available video devices
        devices.forEach(deviceInfo => {
            if (deviceInfo.kind === 'videoinput') {
                const option = document.createElement('option');
                option.value = deviceInfo.deviceId;
                option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
                videoSelect.appendChild(option);
            }
        });
    } catch (err) {
        console.error('Error initializing camera:', err);
        alert('Error accessing camera. Please check permissions.');
    }
}

// Handle camera switching
videoSelect.onchange = async () => {
    try {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        const constraints = {
            video: {
                deviceId: { exact: videoSelect.value }
            }
        };
        
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
    } catch (err) {
        console.error('Error switching camera:', err);
    }
};

// Toggle video visibility
function toggleVideo() {
    const video = document.querySelector('#video');
    if (video) {
        video.hidden = !video.hidden;
    }
}

// Initialize everything else
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize camera
    await initializeCamera();
    
    // Setup power button
    const powerBtn = document.querySelector('.fa-power-off');
    if (powerBtn) {
        powerBtn.onclick = toggleVideo;
    }

    // Get location
    let x = document.getElementById("demo");
    let lat2 = null;
    let long2 = null;
    let tries = 0;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else if (x) {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        if (!x) return;
        
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        ++tries;
        
        if (lat === lat2 && long === long2) {
            return;
        }
        
        x.innerHTML = "Location:<br>Lat: " + Math.round(lat*100000)/100000 +
        "&deg;<br>Long: " + Math.round(long*100000)/100000 + "&deg;";
        
        const velocity = getSpeed(lat, lat2, long, long2);
        const speedElement = document.querySelector(".speed");
        if (lat2 !== null && speedElement) {
            speedElement.innerHTML = `Speed: ${Math.round(velocity*100)/100} m/s`;
        }
        
        lat2 = lat;
        long2 = long;
        tries = 0;
    }

    function getSpeed(lat, lat2, long, long2) {
        const r = 6371;
        const latDist = (lat2-lat)*(1/2);
        const rad1 = latDist*Math.PI/180;
        const longDist = (long2-long)*(1/2)
        const rad2 = latDist*Math.PI/180;
        const val1 = lat*Math.PI/180;
        const val2 = lat2*Math.PI/180;
        const dist = Math.sin(rad1)*Math.sin(rad1)+Math.cos(val1)*Math.cos(val2)*Math.sin(rad2)*Math.sin(rad2);
        const value = 2*r*1000*Math.asin(Math.pow(dist,0.5));
        return value/(3*tries);
    }

    // Start location updates
    setInterval(getLocation, 3000);

    // Battery status
    function updateBatteryStatus(battery) {
        const label = document.querySelector('#level');
        if (!label) return;
        
        label.textContent = `${Math.round(battery.level*100)}%`;
        const lowBattery = document.getElementById("low");

        if (battery.level <= 0.2) {
            if (lowBattery) lowBattery.style.display = "inline-block";
            label.style.color = 'red';
        } else {
            if (lowBattery) lowBattery.style.display = "none";
            label.style.color = 'white';
        }
    }

    if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        updateBatteryStatus(battery);

        battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
        battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
        battery.addEventListener('dischargingtimechange', () => updateBatteryStatus(battery));
    }

    // Simulated sensor data
    function loadData() {
        const left = document.querySelector('.sensor-left');
        const right = document.querySelector('.sensor-right');
        
        if (left && right) {
            const leftValue = Math.round(Math.random() * 80 + 20);
            const rightValue = Math.round(Math.random() * 80 + 20);
            
            left.textContent = `Left: ${leftValue} cm`;
            right.textContent = `Right: ${rightValue} cm`;
            
            left.style.color = leftValue <= 30.48 ? 'red' : 'white';
            right.style.color = rightValue <= 30.48 ? 'red' : 'white';
        }
    }

    setInterval(loadData, 1000);
});
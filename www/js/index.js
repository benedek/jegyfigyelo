/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        alert("app.initialize");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert("onDeviceReady");
        var push = PushNotification.init({
            "android": {
                "senderID": "582404099538"
            },
            "ios": {"alert": "true", "badge": "true", "sound": "true"}, 
            "windows": {} 
        });
        
        alert("push created"+push);
        push.on('registration', function(mydata) {
            alert("registration");
            console.log("\n\nregistration event");
            document.getElementById("regId").innerHTML = "ezitt: "+mydata.registrationId;
            console.log(JSON.stringify(mydata));
            document.getElementById("logMsg").innerHTML = "Sending...";
            
            $.ajax({
        type: 'GET',
        data: mydata,
        url: 'https://app.jegyfigyelo.hu/register.php',
        success: function(data){
//            console.log(data);
            console.log("Registration sent OK GET");
            document.getElementById("logMsg").innerHTML = "Registration sent OK GET";
           
            
        },
        error: function(jqXHR, textStatus, error){
//            console.log(data);
            console.log("Registration sent ERROR GET");
            if (textStatus!=null) {
                document.getElementById("logMsg").innerHTML = "ERROR: "+ textStatus;
                document.getElementById("regId").innerHTML = "ERROR: "+ error;
            }
        }
    });           
            console.log("\nPOST message sent");

        });

        push.on('notification', function(data) {
        	console.log("notification event");
            console.log(JSON.stringify(data));
            var cards = document.getElementById("cards");
            var card = '<div class="row">' +
		  		  '<div class="col s12 m6">' +
				  '  <div class="card darken-1">' +
				  '    <div class="card-content black-text">' +
				  '      <span class="card-title black-text">' + data.title + '</span>' +
				  '      <p>' + data.message + '</p>' +
				  '    </div>' +
				  '  </div>' +
				  ' </div>' +
				  '</div>';
            cards.innerHTML += card;
            
            push.finish(function () {
                console.log('finish successfully called');
            });
        });

        push.on('error', function(e) {
            console.log("push error");
        });
    }
};

app.initialize();
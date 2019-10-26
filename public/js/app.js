(() => {
  const getList = () => {
    const url = "http://localhost:3000/api/list";
    return fetch(url)
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(err => new Error(err));
  };

  const postList = () => {
    const url = "http://localhost:3000/api/list";
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        english: "apple",
        japanese: "りんご",
        sentence: "I eat an apple.",
        memo: "appleappleapple"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .catch(err => new Error(err));
  };

  const deleteList = () => {
    const url = "http://localhost:3000/api/list";
    return fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        english: "apple",
        japanese: "りんご",
        sentence: "I eat an apple.",
        memo: "appleappleapple"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .catch(err => new Error(err));
  };

  const patchList = () => {
    const url = "http://localhost:3000/api/list";
    return fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        english: "apple",
        japanese: "りんご!!!",
        sentence: "I eat an apple!!!.",
        memo: "appleappleapple!!!!!"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .catch(err => new Error(err));
  };
  window.getList = getList;
  window.postList = postList;
  window.deleteList = deleteList;
  window.patchList = patchList;
})();

// let vocamanager = new Vocamanager();
// vocamanager.getList().then(resp => {
//   console.log(resp);
// });

/* global app, $ */
/*
app.controller("MessagesController", [
  "$scope",
  "$http",
  function($scope, $http) {
    $scope.user = {};
    $scope.users = [];
    $scope.channels = [];
    $scope.messageTarget = null;
    $scope.currentChannel = null;
    $scope.currentUser = null;
    $scope.usernameRecieved = false;
    $scope.currentMessages = [];

    const getUsers = function() {
      $http.get("http://localhost:3000/api/users").then(response => {
        $scope.users = response.data;
      });
    };

    const getChannels = function() {
      $http.get("http://localhost:3000/api/channels").then(response => {
        $scope.channels = response.data;
      });
    };

    $scope.signIn = function(e) {
      //post the new user and then get all the existing users and channels
      const postData = { username: $("#username-input")[0].value };
      $http({
        method: "POST",
        url: "http://localhost:3000/api/users",
        data: postData,
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        $scope.usernameRecieved = true;
        $scope.user = response.data;
        getUsers();
        getChannels();
      });
    };

    $scope.refreshUsers = () => getUsers();
    $scope.refreshChannels = () => getChannels();

    $scope.sendMessage = function() {
      //post message to server and refresh the messages displayed
      if ($scope.messageTarget === "user") {
        const postData = {
          fromId: $scope.user.id,
          message: $("#messageArea")[0].value
        };
        $http({
          method: "POST",
          url: `http://localhost:3000/api/users/${$scope.currentUser.id}/messages`,
          data: postData,
          headers: { "Content-Type": "application/json" }
        }).then(response => {
          $scope.currentMessages = response.data;
          $("#messageArea")[0].value = "";
        });
      } else if ($scope.messageTarget === "channel") {
        const postData = {
          fromId: $scope.user.id,
          message: $("#messageArea")[0].value
        };
        $http({
          method: "POST",
          url: `http://localhost:3000/api/channels/${$scope.currentChannel.id}/messages`,
          data: postData,
          headers: { "Content-Type": "application/json" }
        }).then(response => {
          $scope.currentMessages = response.data;
          $("#messageArea")[0].value = "";
        });
      }
    };

    $scope.getUser = function(userIndex) {
      $scope.messageTarget = "user";
      $scope.currentUser = $scope.users[userIndex];
      $http
        .get(
          `http://localhost:3000/api/users/${$scope.currentUser.id}/messages?fromId=${$scope.user.id}`
        )
        .then(response => {
          $scope.currentMessages = response.data;
        });
    };

    $scope.getChannel = function(channelIndex) {
      $scope.messageTarget = "channel";
      $scope.currentChannel = $scope.channels[channelIndex];
      $http
        .get(`http://localhost:3000/api/channels/${$scope.currentChannel.id}`)
        .then(response => {
          $scope.currentMessages = response.data;
        });
    };
  }
]);
*/

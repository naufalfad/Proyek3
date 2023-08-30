document.addEventListener("DOMContentLoaded", function() {
  const followBtns = document.querySelectorAll(".btn-container button:first-of-type");
  const unfollowBtns = document.querySelectorAll(".btn-container button:last-of-type");
  const userNames = document.querySelectorAll(".user-info h2");
  const followedList = document.getElementById("followedList");
  const totalUserCount = document.getElementById("totalUserCount");
  const followedUserCount = document.getElementById("followedUserCount");

  let isFollowing = [false, false]; // Menyimpan status apakah pengguna di-follow atau tidak
  let followCounts = [0, 0]; // Menyimpan jumlah pengikut untuk setiap pengguna di-follow
  const followedUsers = [[], [], []]; // Menyimpan daftar pengguna yang di-follow untuk setiap pengguna

  const availableUsers = [
    "Dull",
    "Rere",
    "Koni"
  ];

  totalUserCount.textContent = availableUsers.length;

  followBtns.forEach((btn, index) => {
    btn.addEventListener("click", function() {
      if (!isFollowing[index]) {
        simulateFollow();
        isFollowing[index] = true;
        btn.textContent = "Following";
        unfollowBtns[index].removeAttribute("disabled");
        followCounts[index]++;

        const newUser = availableUsers[followCounts[index] - 1];
        followedUsers[index].push(newUser);
        updateFollowedList();

        updateFollowCount(index);
      }
    });
  });

  unfollowBtns.forEach((btn, index) => {
    btn.addEventListener("click", function() {
      if (isFollowing[index]) {
        simulateUnfollow();
        isFollowing[index] = false;
        followBtns[index].textContent = "Follow";
        btn.setAttribute("disabled", "true");
        followCounts[index]--;
        updateFollowCount(index);
        followedUsers[index].pop();
        updateFollowedList();
      }
    });
  });

  function updateFollowCount(index) {
    userNames[index].textContent = `${availableUsers[index]} `;
  }

  function updateFollowedList() {
    followedList.innerHTML = "";
    followedUserCount.textContent = followedUsers.flat().length;
    followedUsers.forEach((users, index) => {
      const userName = availableUsers[index];
      users.forEach((subIndex) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${userName}`;
        const unfollowButton = document.createElement("button");
        unfollowButton.textContent = "Unfollow";
        unfollowButton.className = "btn unfollow-btn-list";
        unfollowButton.addEventListener("click", function() {
          users.splice(subIndex, 1);
          updateFollowedList();
          updateFollowCount(index);
        });
        listItem.appendChild(unfollowButton);
        followedList.appendChild(listItem);
      });
    });
  }  

  function simulateFollow() {
    console.log("Simulated follow action");
  }

  function simulateUnfollow() {
    console.log("Simulated unfollow action");
  }
});

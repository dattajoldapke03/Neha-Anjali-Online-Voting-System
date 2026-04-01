const users = {
  "neha": "1234",
  "admin": "admin"
};

let votes = JSON.parse(localStorage.getItem("votes")) || {
  A: 0,
  B: 0,
  C: 0
};

let selectedCandidate = null;

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (users[user] && users[user] === pass) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("votingBox").style.display = "block";
    document.getElementById("loginError").innerText = "";
  } else {
    document.getElementById("loginError").innerText = "Invalid username or password";
  }
}

function selectCandidate(candidate, event) {
  selectedCandidate = candidate;

  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("selected");
  });

  event.currentTarget.classList.add("selected");
}

function submitVote() {
  if (localStorage.getItem("voted")) {
    alert("You have already voted!");
    return;
  }

  if (!selectedCandidate) {
    alert("Please select a candidate!");
    return;
  }

  votes[selectedCandidate]++;
  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("voted", true);

  updateResults();
  document.getElementById("resultBox").style.display = "block";

  alert("Vote submitted successfully!");
}

function updateResults() {
  document.getElementById("voteA").innerText = votes.A;
  document.getElementById("voteB").innerText = votes.B;
  document.getElementById("voteC").innerText = votes.C;
}

updateResults();

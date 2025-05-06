document.getElementById("songForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const title = document.getElementById("title").value;
    const artist = document.getElementById("artist").value;
    const genre = document.getElementById("genre").value;
    const bpm = document.getElementById("bpm").value;
    const event = document.getElementById("event").value;
  
    const listItem = document.createElement("li");
    listItem.textContent = `${title} by ${artist} (${genre || "Unknown genre"}, ${bpm || "N/A"} BPM) - for a ${event || "general"} event`;
    document.getElementById("setlist").appendChild(listItem);
  
    this.reset();
  });
  
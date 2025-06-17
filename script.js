let [hr, min, sec] = [0, 0, 0];
let timer = null;
let lapList = [];

function updateDisplay() {
  const format = (val) => val.toString().padStart(2, '0');
  document.getElementById("display").innerText = `${format(hr)}:${format(min)}:${format(sec)}`;
}

function stopwatch() {
  sec++;
  if (sec == 60) { sec = 0; min++; }
  if (min == 60) { min = 0; hr++; }
  updateDisplay();
}

function start() {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  clearInterval(timer);
  timer = null;
  [hr, min, sec] = [0, 0, 0];
  updateDisplay();
  document.getElementById("laps").innerHTML = '';
  lapList = [];
}

function lap() {
  const format = (val) => val.toString().padStart(2, '0');
  let time = `${format(hr)}:${format(min)}:${format(sec)}`;
  lapList.push(time);
  let li = document.createElement("li");
  li.innerText = `Lap ${lapList.length}: ${time}`;
  document.getElementById("laps").appendChild(li);
}

function downloadLaps() {
  if (lapList.length === 0) return alert("No laps to download.");
  const blob = new Blob([lapList.join('\n')], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "lap_times.txt";
  a.click();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

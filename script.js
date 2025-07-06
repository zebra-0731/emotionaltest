
const pages = [
  {
    story: "你醒來發現身處魔法學院的宿舍…",
    npc: "歡迎，年輕的巫師。準備接受命運吧！",
    options: null
  },
  {
    story: "任務佈告欄上飄浮著四張卷軸，你會選哪一張？",
    npc: "每一卷軸都將改變你的未來。",
    options: [
      { text: "✨ 動口就可觸發改變", value: "語靈使者" },
      { text: "📸 成為魔法界大網紅", value: "星燦引流者" },
      { text: "🏰 成為魔法導師", value: "迴響探索師" },
      { text: "📹 活動策劃主辦人", value: "魔訊主辦師" }
    ]
  },
  {
    story: "你面對未知時會怎麼做？",
    npc: "你面對試煉的第一步是什麼？",
    options: [
      { text: "🔍 觀察周圍", value: "迴響探索師" },
      { text: "⚡ 直接行動", value: "魔訊主辦師" },
      { text: "🧠 詢問他人", value: "星燦引流者" },
      { text: "🌙 憑直覺前進", value: "語靈使者" }
    ]
  },
  {
    story: "你喚醒了魔法，哪項天賦最吸引你？",
    npc: "你的內在魔法會是什麼？",
    options: [
      { text: "語言魔法", value: "語靈使者" },
      { text: "能量建構", value: "迴響探索師" },
      { text: "魅力吸引", value: "星燦引流者" },
      { text: "頂天之術", value: "魔訊主辦師" }
    ]
  },
  {
    story: "你要進入『命運之夜』前，必須獻出一樣物品…",
    npc: "內在的力量即將顯現。",
    options: [
      { text: "📓 筆記本", value: "迴響探索師" },
      { text: "🪞 魔鏡", value: "語靈使者" },
      { text: "📱 魔法手機", value: "星燦引流者" },
      { text: "🧩 命運拼圖", value: "魔訊主辦師" }
    ]
  }
];

let pageIndex = 0;
let answers = {};

function nextPage(delay = 0) {
  setTimeout(() => {
    if (pageIndex >= pages.length) {
      showResult();
      return;
    }

    const page = pages[pageIndex];
    document.getElementById("storyText").innerText = page.story;
    document.getElementById("npcText").innerText = page.npc;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    if (page.options) {
      page.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option.text;
        btn.onclick = () => {
          answers[pageIndex] = option.value;
          pageIndex++;
          nextPage(3000);
        };
        choicesDiv.appendChild(btn);
      });
      document.getElementById("nextBtn").style.display = "none";
    } else {
      document.getElementById("nextBtn").style.display = "block";
      pageIndex++;
    }
  }, delay);
}

function showResult() {
  const count = {};
  Object.values(answers).forEach(val => {
    count[val] = (count[val] || 0) + 1;
  });
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const result = sorted[0][0];
  const data = characterResults[result];

  document.getElementById("storyText").innerHTML = `<h2>你是：${data.name}</h2>
    <p>${data.role}</p><p>${data.desc}</p>
    <img src="${data.image}" width="100%" />
    <p><a href="${data.link}" target="_blank">👉 點我看展板</a></p>
    <p>🎁 集滿章節可至展板區兌換禮物！</p>`;
  document.getElementById("npcText").innerText = "你的命運之輪完成了。";
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  const restartBtn = document.createElement("button");
  restartBtn.innerText = "🔁 回首頁";
  restartBtn.onclick = () => {
    pageIndex = 0;
    answers = {};
    nextPage();
  };
  choicesDiv.appendChild(restartBtn);

  document.getElementById("nextBtn").style.display = "none";

  sendResultToBackend(result, answers);
}

function sendResultToBackend(result, answers) {
  fetch("https://script.google.com/macros/s/AKfycbxJ--deU0iFNcQHr-ZdqJfAeuk5UPF09LtWfQgjtqYVR5-aOnBqTj6p2BxQ42dGVnTq/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      result: result,
      selections: answers
    })
  }).then(res => res.ok ? console.log("✅ 傳送成功") : console.error("❌ 傳送失敗"))
    .catch(err => console.error("❌ 錯誤發生", err));
}

nextPage();

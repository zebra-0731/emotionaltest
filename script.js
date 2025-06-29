const pages = [
  {
    story: "你醒來發現身處魔法學院的宿舍…",
    npc: "歡迎，年輕的巫師。準備接受命運吧！",
    options: null
  },
  {
    story: "任務佈告欄上有四項任務，你會選哪個？",
    npc: "選一項任務，揭開你的潛能。",
    options: [
      { text: "✨ 語言魔法師", value: "語靈使者" },
      { text: "📸 魔法網紅", value: "星燦引流者" },
      { text: "🏰 系統設計者", value: "魔訊主控師" },
      { text: "📹 音聲導師", value: "迴響語咒師" }
    ]
  },
  {
    story: "你遇到挑戰時會？",
    npc: "做出選擇，測試你的特質。",
    options: [
      { text: "🔍 觀察與思考", value: "理性" },
      { text: "⚡ 直接行動", value: "衝勁" },
      { text: "🧠 尋求協助", value: "合作" },
      { text: "🌙 憑直覺前進", value: "直覺" }
    ]
  },
  {
    story: "你最想擁有哪種魔法？",
    npc: "你的內在渴望，是你的力量來源。",
    options: [
      { text: "🗣️ 語言控制術", value: "語靈使者" },
      { text: "🛠️ 能量建構", value: "魔訊主控師" },
      { text: "💫 魅力操控", value: "星燦引流者" },
      { text: "🎤 語聲魔咒", value: "迴響語咒師" }
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
          nextPage(3000); // 等待3秒進入下一頁
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

  document.getElementById("storyText").innerText = `你是：${result}`;
  document.getElementById("npcText").innerText = "你的魔法之路，正式開始。";
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  // ✅ 增加回首頁按鈕
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
  fetch("https://script.google.com/macros/s/AKfycbyVDv9X7LZGkzkY4nZ8x7oO6Gg_fjjE4vYr_jCri6orBPQPrAvXuZfj9TzgcGsCGvwT/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      result: result,
      selections: answers
    })
  })
    .then(res => res.ok ? console.log("✅ 成功送出結果") : console.error("❌ 傳送失敗"))
    .catch(err => console.error("❌ 錯誤發生", err));
}

nextPage();

const pages = [
  {
    story: "你一覺醒來，發現自己躺在一張古老的木床上...",
    npc: "你終於醒來了，新手巫師。你的命運，就從現在開始編織……",
    options: null
  },
  {
    story: "你看著窗外陌生的天空，決定起身外出...",
    npc: "這個世界需要你的魔法才能改變。",
    options: null
  },
  {
    story: "你走到村子中央的任務佈告欄，你想選哪張卷軸？",
    npc: "選擇一條路，開啟你的命運。",
    options: [
      { text: "✨ 動口改變世界", value: "語靈使者" },
      { text: "📸 成為大網紅", value: "星燦引流者" },
      { text: "🏰 網路管理師", value: "魔訊主控師" },
      { text: "📹 聲音改變世界", value: "迴響語咒師" }
    ]
  },
  {
    story: "當你面對未知，你會如何做出第一步？",
    npc: "試煉開始，你的第一步將決定你的方向。",
    options: [
      { text: "🔍 觀察蒐集資訊", value: "理性" },
      { text: "⚡ 行動感受魔法", value: "行動" },
      { text: "🧠 詢問他人建議", value: "合作" },
      { text: "🌙 靠直覺行動", value: "直覺" }
    ]
  },
  {
    story: "你覺醒了魔法，請選擇第一項魔法天賦：",
    npc: "年輕巫師，你的魔法天賦將指引未來。",
    options: [
      { text: "語言魔法", value: "語靈使者" },
      { text: "能量建構", value: "魔訊主控師" },
      { text: "魅力吸引", value: "星燦引流者" },
      { text: "聲願術", value: "迴響語咒師" }
    ]
  },
  {
    story: "白色貓頭鷹降臨，請選擇你獻出的內在物品：",
    npc: "你獻出的，不只是物品，更是你內在的力量。",
    options: [
      { text: "📓 筆記本", value: "星燦引流者" },
      { text: "🪞 真實魔鏡", value: "語靈使者" },
      { text: "📱 魔法手機", value: "迴響語咒師" },
      { text: "🧩 命運拼圖", value: "魔訊主控師" }
    ]
  },
  {
    story: "你的命運之輪完成，魔法紋章浮現空中。",
    npc: "你的選擇，決定了你是...",
    options: null
  }
];

let pageIndex = 0;
let results = {};

function nextPage() {
  const page = pages[pageIndex];
  document.getElementById("storyText").innerText = page.story;
  document.getElementById("npcText").innerText = page.npc;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  if (page.options) {
    page.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option.text;
      btn.onclick = () => {
        // 記錄選擇結果
        results[pageIndex] = option.value;
        pageIndex++;
        nextPage();
      };
      choicesDiv.appendChild(btn);
    });
    document.getElementById("nextBtn").style.display = "none";
  } else {
    document.getElementById("nextBtn").style.display = "block";

    if (pageIndex === pages.length - 1) {
      showFinalResult();
    } else {
      pageIndex++;
    }
  }
}

function showFinalResult() {
  // 統計出現最多的職業
  const freq = {};
  Object.values(results).forEach(val => {
    if (!freq[val]) freq[val] = 0;
    freq[val]++;
  });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const final = sorted[0][0];

  const npcText = {
    "語靈使者": "你善於用語言影響他人，是天生的演說家。",
    "星燦引流者": "你是社群中的閃耀之星，具有強大吸引力。",
    "魔訊主控師": "你適合在後台控制大局，擅長系統與技術。",
    "迴響語咒師": "你能用聲音撼動人心，是情感的傳播者。"
  };

  document.getElementById("storyText").innerText = `你是：${final}`;
  document.getElementById("npcText").innerText = npcText[final];
  document.getElementById("choices").innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";
}

nextPage();

const pages = [
  {
    story: "你一覺醒來，發現自己躺在一張古老的木床上。四周瀰漫著神祕的魔法氣息，牆上掛滿了會動的畫像，一個低沉的聲音對你說：",
    npc: "你終於醒來了，新手巫師。你的命運，就從現在開始編織……",
    options: null
  },
  {
    story: "你看著窗外陌生的天空，決定起身外出，踏出門後，走著走著，你不知不覺走到了一個熱鬧的村莊。在村子中央，有一個木製的任務佈告欄，上面飄浮著幾項神秘的初始任務。",
    npc: "請問，你最想靠近哪一張任務卷軸，並伸手觸碰它？",
    options: [
      { text: "✨ 只要動口就可以觸發改變", value: "語靈使者" },
      { text: "📸 成為魔法界大網紅", value: "星燦引流者" },
      { text: "🏰 成為魔法人生導師", value: "迴響探索師" },
      { text: "📹 魔法界的活動主辦人", value: "魔訊主辦師" }
    ]
  },
  {
    story: "你剛觸碰完任務卷軸，光芒一閃，你的面前出現了一位神秘的老魔法師。他說：",
    npc: "年輕的巫師，既然你已選擇命運的方向，就必須通過第一道試煉。告訴我，當你面對未知，你會如何做出第一步？",
    options: [
      { text: "🔍 觀察周圍，蒐集資訊再行動", value: "迴響探索師" },
      { text: "⚡ 立刻嘗試，用行動感受魔法的力量", value: "魔訊主辦師" },
      { text: "🧠 問問看身邊有沒有人能給建議", value: "星燦引流者" },
      { text: "🌙 閉上眼睛，用直覺感受哪個方向最對", value: "語靈使者" }
    ]
  },
  {
    story: "你完成了第一道試煉，並成功喚醒了你的初始魔法能力。老魔法師再次現身，遞給你一顆水晶球，問道：",
    npc: "巫師的力量起源不同，你的第一項魔法天賦會是什麼？",
    options: [
      { text: "語言魔法（口語表達）", value: "語靈使者" },
      { text: "能量建構（自主學習）", value: "迴響探索師" },
      { text: "魅力吸引（社群經營）", value: "星燦引流者" },
      { text: "頂天之術（活動企劃）", value: "魔訊主辦師" }
    ]
  },
  {
    story: "當你以為生活即將進入正軌，一隻白色貓頭鷹從天空降落，叼來一封閃著銀光的信件。這是一封邀請你參加「命運之夜」的通知，但你必須獻上一件代表你內在力量的物品。",
    npc: "請問，你會選擇哪一樣？",
    options: [
      { text: "📓 一本你寫滿想法與創作的筆記本", value: "迴響探索師" },
      { text: "🪞 一面能反映他人真實樣貌的魔鏡", value: "語靈使者" },
      { text: "📱 一支你曾用來錄下很多內容的魔法手機", value: "星燦引流者" },
      { text: "🧩 一顆你花時間組成的命運拼圖", value: "魔訊主辦師" }
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
          nextPage(1);
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
    <img src="${data.image}" width="15%" />
    <p>${data.desc}</p>
    <h3>快到 <span class="highlight">校園大使展覽區</span> 看看你的 <span class="highlight"> 代表人物</span>是誰？</h3>
    <h4>別忘了將<span class="highlight">本結果頁</span>與<span class="highlight">集點卡</span>一起交給展區工作人員，兌換精美小禮物喔！</h4>`;
  document.getElementById("npcText").innerText = "你的命運之輪完成了。";
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

const restartBtn = document.createElement("button.cta");
restartBtn.innerText = "搶先報名第五屆校園大使說明會";
restartBtn.classList.add("cta");
restartBtn.onclick = () => {
  window.open("https://fmp.wizigo.tw/fmi/webd/Envoyrecruit5", "_blank");
};
choicesDiv.appendChild(restartBtn);

  // document.getElementById("nextBtn").style.display = "none";

  // sendResultToBackend(result, answers);
}

// function sendResultToBackend(result, answers) {
//   fetch("https://script.google.com/macros/s/AKfycbxJ--deU0iFNcQHr-ZdqJfAeuk5UPF09LtWfQgjtqYVR5-aOnBqTj6p2BxQ42dGVnTq/exec", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       result: result,
//       selections: answers
//     })
//   }).then(res => res.ok ? console.log("✅ 傳送成功") : console.error("❌ 傳送失敗"))
//     .catch(err => console.error("❌ 錯誤發生", err));
// }

nextPage();

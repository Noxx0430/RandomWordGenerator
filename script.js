AllWord = "||ひらがな||あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょ\n\n||カタカナ||アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョヴ\n\n||小文字||abcdefghijklmnopqrstuvwxyz\n\n||大文字||ABCDEFGHIJKLMNOPQRSTUVWXYZ\n\n||数字||0123456789"

const settingContentElm = document.getElementById("settingContent");
const openAdvancedSettingBtnElm = document.getElementById("openAdvancedSettingBtn");
const resetBtnElm = document.getElementById("resetBtn");
const allWordTextareaElm = document.getElementById("allWordTextarea");
const wordCountElm = document.getElementById("wordCount");
const numberOfGenelateElm = document.getElementById("numberOfGenelate");
const genelateBtnElm = document.getElementById("genelateBtn");
const resultArea = document.getElementById("resultArea");
const backTextareaElm = document.getElementById("backTextarea")
const backTextareaElm2 = document.getElementById("backTextarea2")

// チェックボックス生成
window.onload = function(){
  wordCountElm.value = "5";
  numberOfGenelateElm.value = "20";
  
  const localData = localStorage.getItem("RNG_allWord");
  if(localData){
    allWordTextareaElm.value = localData;
  }else{
    allWordTextareaElm.value = AllWord;
  }
  
  const allWord = allWordTextareaElm.value;
  if(allWord){
    settingContentElm.innerHTML = "";
    const shapText = allWord.replace(/\n/g, "").replace(/ /g, "").replace(/\|\|(.*?)\|\|/g, "[br][name=$1]");
    const splitList = shapText.split("[br]").filter(Boolean);
    for(let i=0; i<splitList.length; i++){
      const nowList = splitList[i];
      const name = nowList.replace(/\[name\=(.*)\].*/, "$1");
      const encodeName = encodeURIComponent(name);
      const label = document.createElement("label");
      label.setAttribute("for", encodeName);
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = encodeName;
      input.checked = true;
      label.appendChild(input)
      label.append(name);
      settingContentElm.appendChild(label);
    }
  }
}

// チェックボックス変更
allWordTextareaElm.onchange = function(){
  const allWord = allWordTextareaElm.value;
  if(allWord){
    settingContentElm.innerHTML = "";
    const shapText = allWord.replace(/\n/g, "").replace(/ /g, "").replace(/\|\|(.*?)\|\|/g, "[br][name=$1]");
    const splitList = shapText.split("[br]").filter(Boolean);
    for(let i=0; i<splitList.length; i++){
      const nowList = splitList[i];
      const name = nowList.replace(/\[name\=(.*)\].*/, "$1");
      const encodeName = encodeURIComponent(name);
      const label = document.createElement("label");
      label.setAttribute("for", encodeName);
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = encodeName;
      input.checked = true;
      label.appendChild(input)
      label.append(name);
      settingContentElm.appendChild(label);
    }
  }
}

// テキストボックス保存
allWordTextareaElm.onkeyup = function(){
  const allWord = allWordTextareaElm.value;
  localStorage.setItem("RNG_allWord", allWord);
}

// 詳細設定開閉ボタン
openAdvancedSettingBtnElm.onclick = function(){
  const detect = allWordTextareaElm.getAttribute("style");
  if(detect == "display: block;"){
    allWordTextareaElm.setAttribute("style", "display: none;");
    openAdvancedSettingBtnElm.value = "詳細設定\u{25BC}";
  }else{
    allWordTextareaElm.setAttribute("style", "display: block;");
    openAdvancedSettingBtnElm.value = "閉じる\u{25B2}";
  }
}

// 設定初期化ボタン
resetBtnElm.onclick = function(){
  const userSelected = confirm("全ての設定を初期状態に戻します。この操作は取り消せません。\n\n本当に実行しますか？");
  if(userSelected == true){
    allWordTextareaElm.value = AllWord;
    localStorage.removeItem("RNG_allWord");
    allWordTextareaElm.onchange();
  }
}

// 生成ボタン
genelateBtnElm.onclick = function(){
  const totalNum = Number(wordCountElm.value) + Number(numberOfGenelateElm.value);
  if(totalNum > 400){
    wordCountElm.value = "5";
    numberOfGenelateElm.value = "20";
    alert("文字数及び生成数が大きすぎます。");
    return false;
  }
  backTextareaElm.value = "";
  backTextareaElm2.value = "";
  resultArea.innerHTML = "";
  const allWord = allWordTextareaElm.value;
  const list = allWord.replace(/\n/g, "").replace(/ /g, "").replace(/\|\|(.*?)\|\|/g, "[sp]$1|").split("[sp]").filter(Boolean);
  for(let i=0; i<list.length; i++){
    const text = list[i] + ",";
    backTextareaElm.value += text;
  }

  const allChild = settingContentElm.children;
  for(let i=0; i<allChild.length; i++){
    const id = allChild[i].getAttribute("for");
    const name = decodeURIComponent(id);
    if(document.getElementById(id).checked){
      const text = backTextareaElm.value;
      const text2 = text.replace(name, "|no");
      const text3 = text2.replace(/.*\|no\|(.*?)\,.*/, "$1");
      backTextareaElm2.value += text3;
    }
  }

  const wordCount = Number(wordCountElm.value);
  const numberOfGenelate = Number(numberOfGenelateElm.value);
  const allWord2 = backTextareaElm2.value;
  if(allWord2){
    const allList = allWord2.split("");
    for(let i=0; i<numberOfGenelate; i++){
      const div = document.createElement("div");
      for(let i=0; i<wordCount; i++){
        const num = Math.floor(Math.random() * allList.length);
        div.textContent += allList[num];
      }
      resultArea.appendChild(div);
    }
  }
}
(() => {
  const getList = () => {
    const url = "http://localhost:3000/api/list";
    let getData = "";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const rmTbody = document.getElementById("tbody");
        tbody_parent = rmTbody.parentNode;
        tbody_parent.removeChild(rmTbody);
        // build DOM
        const table = document.getElementById("table");
        const tbody = document.createElement("tbody");
        tbody.setAttribute("id", "tbody");
        const thtr = document.createElement("tr");
        const thId = document.createElement("th");
        const thEn = document.createElement("th");
        const thJa = document.createElement("th");
        const thSe = document.createElement("th");
        const thMe = document.createElement("th");
        const thAt = document.createElement("th");
        thId.textContent = "No";
        thEn.textContent = "English";
        thJa.textContent = "Japanese";
        thSe.textContent = "Sentence";
        thMe.textContent = "Memo";
        thAt.textContent = "Date";
        thtr.appendChild(thId);
        thtr.appendChild(thEn);
        thtr.appendChild(thJa);
        thtr.appendChild(thSe);
        thtr.appendChild(thMe);
        thtr.appendChild(thAt);
        tbody.appendChild(thtr);
        table.appendChild(tbody);
        data.forEach(data => {
          const tdtr = document.createElement("tr");
          const tdId = document.createElement("td");
          const tdEn = document.createElement("td");
          const tdJa = document.createElement("td");
          const tdSe = document.createElement("td");
          const tdMe = document.createElement("td");
          const tdAt = document.createElement("td");
          tdId.textContent = data.id;
          tdEn.textContent = data.english;
          tdJa.textContent = data.japanese;
          tdSe.textContent = data.sentence;
          tdMe.textContent = data.memo;
          tdAt.textContent = data.createdAt;
          tdtr.appendChild(tdId);
          tdtr.appendChild(tdEn);
          tdtr.appendChild(tdJa);
          tdtr.appendChild(tdSe);
          tdtr.appendChild(tdMe);
          tdtr.appendChild(tdAt);
          tbody.appendChild(tdtr);
        });
        return data;
      })
      .catch(err => new Error(err));
  };

  const postList = () => {
    const en = document.getElementById("enIn").value;
    const ja = document.getElementById("jaIn").value;
    const se = document.getElementById("seIn").value;
    const me = document.getElementById("meIn").value;
    const url = "http://localhost:3000/api/list";
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        english: en,
        japanese: ja,
        sentence: se,
        memo: me
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .catch(err => new Error(err));
  };

  const deleteList = () => {
    const en = document.getElementById("enIn").value;
    const url = "http://localhost:3000/api/list";
    return fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        english: en
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .catch(err => new Error(err));
  };

  const patchList = () => {
    const en = document.getElementById("enIn").value;
    const ja = document.getElementById("jaIn").value;
    const se = document.getElementById("seIn").value;
    const me = document.getElementById("meIn").value;
    const url = "http://localhost:3000/api/list";
    return fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        english: en,
        japanese: ja,
        sentence: se,
        memo: me
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

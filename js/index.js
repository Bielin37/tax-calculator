const sumNettoPreis = document.getElementById("sumNettoPreis");
sumNettoPreis.value = "0.00";
const sumBruttoPreis = document.getElementById("sumBruttoPreis");
sumBruttoPreis.value = "0.00";
const sumMwsTPreis = document.getElementById("sumMwsTPreis");
sumMwsTPreis.value = "0.00";
let newArrPreis = [];
let preisBrutto = 0;
let preisNetto = 0;
let preisElementId = 0;

const handleBruttoPrice = () => {
  let valuePreisBrutto = newArrPreis.reduce(
    (pv, cv) => pv + parseFloat(cv.priceBrutto),
    0
  );
  return valuePreisBrutto;
};

const handleNettoPrice = () => {
  let valuePreisNetto = newArrPreis.reduce(
    (pv, cv) => pv + parseFloat(cv.priceNetto),
    0
  );
  return valuePreisNetto;
};

const handleValidateInputPrice = (e) => {
  //start input text with 0 when we type as first character '.' or ','
  if (e.value[0] === "." || e.value[0] === ",") {
    e.value = 0;
  }
  //change comma to the dot
  if (e.value.includes(",")) {
    let newValue = e.value.replace(",", ".");
    e.value = newValue;
  }
  //check if is provide only numbers instead comma and dot
  if (
    e.value.match(/[a-z]/g) ||
    e.value.match(/[A-Z]/g) ||
    e.value.match(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi)
  ) {
    let str2 = e.value.slice(0, -1);
    e.value = str2;
  }
};

const handleChangePreisNetto = (event) => {
  handleValidateInputPrice(event.target);
  //take option tax(Steuer) value
  let select = document.getElementById(
    `inputGroupSelect${event.target.parentNode.parentNode.parentNode.id}`
  );

  if (event.target.value === "") {
    preisNetto = 0;
  } else {
    //parse target value and save on preisNetto value
    preisNetto = parseFloat(event.target.value).toFixed(2);
  }
  //take id from preisNetto parent element
  preisElementId = event.target.parentNode.parentNode.parentNode.id;
  //firstable delete element with this same id if exist
  let arr = newArrPreis.filter((el) => el.key !== preisElementId);
  newArrPreis = arr;
  //push element to the Arr and parse string value to float
  let valuePreis = parseFloat(preisNetto).toFixed(2);
  newArrPreis.push({
    key: preisElementId,
    priceNetto: valuePreis,
    priceBrutto: valuePreis,
    steuerValue: select.value,
  });
  //first filter array so stay only element what i need and then
  //take input brutto element and set the value
  let helpArr = newArrPreis.filter((el) => el.key === preisElementId);
  let bruttoPreis = document.getElementById(
    `preisBruttoInput${preisElementId}`
  );
  //check what tax(Steuer) is selected
  if (select.value === "1") {
    bruttoPreis.value = helpArr[0].priceBrutto;
  } else if (select.value === "2") {
    newArrPreis.map((el) => {
      if (el.key === event.target.parentNode.parentNode.parentNode.id) {
        el.priceBrutto =
          parseFloat(helpArr[0].priceBrutto) +
          parseFloat(helpArr[0].priceBrutto) * 0.07;
      }
    });
  } else {
    newArrPreis.map((el) => {
      if (el.key === event.target.parentNode.parentNode.parentNode.id) {
        el.priceBrutto =
          parseFloat(helpArr[0].priceBrutto) +
          parseFloat(helpArr[0].priceBrutto) * 0.19;
      }
    });
  }
  //value from preis netto fixed to '0.00'
  let newPriceValue = helpArr[0].priceBrutto;
  bruttoPreis.value = parseFloat(newPriceValue).toFixed(2);

  //add together priceNetto
  sumNettoPreis.value = parseFloat(handleNettoPrice()).toFixed(2);
  //add together priceBrutto
  sumBruttoPreis.value = parseFloat(handleBruttoPrice()).toFixed(2);
  //count MwsT Price
  let value = handleBruttoPrice() - handleNettoPrice();
  sumMwsTPreis.value = parseFloat(value).toFixed(2);
};

const handleChangePreisBrutto = (event) => {
  handleValidateInputPrice(event.target);
  //take option tax(Steuer) value
  let select = document.getElementById(
    `inputGroupSelect${event.target.parentNode.parentNode.parentNode.id}`
  );

  if (event.target.value === "") {
    preisBrutto = 0;
  } else {
    //parse target value and save on preisNetto value
    preisBrutto = parseFloat(event.target.value).toFixed(2);
  }

  //take id from preisNetto parent element
  preisElementId = event.target.parentNode.parentNode.parentNode.id;
  //firstable delete element with this same id if exist
  let arr = newArrPreis.filter((el) => el.key !== preisElementId);
  newArrPreis = arr;
  //push element to the Arr and parse string value to int
  let valuePreis = parseFloat(preisBrutto).toFixed(2);
  newArrPreis.push({
    key: preisElementId,
    priceNetto: valuePreis,
    priceBrutto: valuePreis,
    steuerValue: select.value,
  });
  //first filter array so stay only element what i need and then
  //take input brutto element and set the value
  let helpArr = newArrPreis.filter((el) => el.key === preisElementId);
  let nettoPreis = document.getElementById(`preisNettoInput${preisElementId}`);
  //check what tax(Steuer) is selected
  if (select.value === "1") {
    nettoPreis.value = helpArr[0].priceNetto;
  } else if (select.value === "2") {
    newArrPreis.map((el) => {
      if (el.key === event.target.parentNode.parentNode.parentNode.id) {
        el.priceNetto = parseFloat(helpArr[0].priceBrutto) / 1.07;
      }
    });
  } else {
    newArrPreis.map((el) => {
      if (el.key === event.target.parentNode.parentNode.parentNode.id) {
        el.priceNetto = parseFloat(helpArr[0].priceNetto) / 1.19;
      }
    });
  }
  //value from preis netto fixed to '0.00'
  let newPriceValue = helpArr[0].priceNetto;
  nettoPreis.value = parseFloat(newPriceValue).toFixed(2);
  //add together priceBrutto
  sumBruttoPreis.value = parseFloat(handleBruttoPrice()).toFixed(2);
  //add together priceNetto
  sumNettoPreis.value = parseFloat(handleNettoPrice()).toFixed(2);
  //count MwsT Price
  let value = handleBruttoPrice() - handleNettoPrice();
  sumMwsTPreis.value = parseFloat(value).toFixed(2);
};

const handleOnBlurPreisNetto = (event) => {
  //if on blur price netto automaticlly add '.00' to the number
  if (event.target.value === "") {
    return null;
  } else {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }
};

const handleSteuer = (event) => {
  //check if we have any element in Array
  if (newArrPreis.length === 0) {
    return null;
  }
  let helpArr = newArrPreis.filter(
    (el) => el.key === event.target.parentNode.parentNode.parentNode.id
  );
  if (helpArr.length === 0) {
    return null;
  }
  //set value of select
  helpArr[0].steuerValue = event.target.value;
  //take the preis brutto element
  let bruttoPreis = document.getElementById(
    `preisBruttoInput${event.target.parentNode.parentNode.parentNode.id}`
  );
  //change value with specific percentage
  if (event.target.value === "1") {
    newArrPreis.map((el) => {
      if (el.key === event.target.parentNode.parentNode.parentNode.id) {
        el.priceBrutto = parseFloat(helpArr[0].priceNetto);
      }
    });
  } else if (event.target.value === "2") {
    newArrPreis.map((el) => {
      if (el.key === event.target.parentNode.parentNode.parentNode.id) {
        el.priceBrutto =
          parseFloat(helpArr[0].priceNetto) +
          parseFloat(helpArr[0].priceNetto) * 0.07;
      }
    });
  } else {
    newArrPreis.map((el) => {
      if (el.key === event.target.parentNode.parentNode.parentNode.id) {
        el.priceBrutto =
          parseFloat(helpArr[0].priceNetto) +
          parseFloat(helpArr[0].priceNetto) * 0.19;
      }
    });
  }
  bruttoPreis.value = helpArr[0].priceBrutto.toFixed(2);

  //add together priceBrutto
  sumBruttoPreis.value = parseFloat(handleBruttoPrice()).toFixed(2);
  //add together priceNetto
  sumNettoPreis.value = parseFloat(handleNettoPrice()).toFixed(2);
  //count MwsT Price
  let value = handleBruttoPrice() - handleNettoPrice();
  sumMwsTPreis.value = parseFloat(value).toFixed(2);
};

const handleOnBlurPreisBrutto = (event) => {
  //if on blur price netto automaticlly add '.00' to the number
  if (event.target.value === "") {
    return null;
  } else {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }
};

const handleDeleteElement = (event) => {
  //we check which one element from trash icon we click on
  if (event.target.parentNode.parentNode.tagName === "TD") {
    const element = document.getElementById(
      event.target.parentNode.parentNode.parentNode.id
    );
    //we hide element
    element.style.transitionDuration = "0.6s";
    element.style.display = "none";
    //we filter newArrPreis Array
    let newArr = newArrPreis.filter(
      (el) => el.key !== event.target.parentNode.parentNode.parentNode.id
    );

    newArrPreis = newArr;
    //add together priceNetto
    sumNettoPreis.value = parseFloat(handleNettoPrice()).toFixed(2);
    //add together priceBrutto
    sumBruttoPreis.value = parseFloat(handleBruttoPrice()).toFixed(2);
    //count MwsT Price
    let value = handleBruttoPrice() - handleNettoPrice();
    sumMwsTPreis.value = parseFloat(value).toFixed(2);
  } else if (event.target.parentNode.parentNode.tagName === "TR") {
    const element = document.getElementById(
      event.target.parentNode.parentNode.id
    );
    element.style.transitionDuration = "0.6s";
    element.style.display = "none";

    let newArr = newArrPreis.filter(
      (el) => el.key !== event.target.parentNode.parentNode.id
    );

    newArrPreis = newArr;
    //add together priceNetto
    sumNettoPreis.value = parseFloat(handleNettoPrice()).toFixed(2);
    //add together priceBrutto
    sumBruttoPreis.value = parseFloat(handleBruttoPrice()).toFixed(2);
    //count MwsT Price
    let value = handleBruttoPrice() - handleNettoPrice();
    sumMwsTPreis.value = parseFloat(value).toFixed(2);
  }
};

//create new table element
const handleAddNewElement = () => {
  const elements = document.querySelectorAll(".element");
  const tableBody = document.getElementById("tableBody");
  //tr element
  const tr = document.createElement("tr");
  //first td element with children elements
  const td = document.createElement("td");
  const div = document.createElement("div");
  const input = document.createElement("input");
  //second td element with children elements
  const td2 = document.createElement("td");
  const div2 = document.createElement("div");
  const select = document.createElement("select");
  const option = document.createElement("option");
  //third td element with children elements
  const td3 = document.createElement("td");
  const div3 = document.createElement("div");
  const input2 = document.createElement("input");
  const div4 = document.createElement("div");
  const span = document.createElement("span");
  //fourth td element with children elements
  const td4 = document.createElement("td");
  const div5 = document.createElement("div");
  const select2 = document.createElement("select");
  const option2 = document.createElement("option");
  const option3 = document.createElement("option");
  const option4 = document.createElement("option");
  //fifth td element with children elements
  const td5 = document.createElement("td");
  const div6 = document.createElement("div");
  const input3 = document.createElement("input");
  const div7 = document.createElement("div");
  const span2 = document.createElement("span");
  //sixth td element with children elements
  const td6 = document.createElement("td");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");

  //tr element
  tr.className = "element";
  tr.id = elements.length;
  //first td element with children elements
  td.scope = "row";
  div.className = "input-group mb-3";
  input.type = "text";
  input.className = "form-control";
  input.placeholder = "Leistung";
  //second td element with children elements
  div2.className = "input-group mb-3";
  select.className = "custom-select";
  select.id = `inputGroupSelect0${elements.length + 1}`;
  option.innerText = "Object";
  //third td element with children elements
  td3.className = "td1";
  div3.className = "input-group";
  input2.id = `preisNettoInput${elements.length}`;
  input2.setAttribute("oninput", "handleChangePreisNetto(event)");
  input2.setAttribute("onblur", "handleOnBlurPreisNetto(event)");
  input2.type = "text";
  input2.className = "form-control";
  div4.className = "input-group-append";
  span.className = "input-group-text";
  span.innerText = "€";
  //fourth td element with children elements
  td4.className = "td1";
  div5.className = "input-group mb-3";
  select2.className = "custom-select";
  select2.id = `inputGroupSelect${elements.length}`;
  select2.setAttribute("onchange", "handleSteuer(event)");
  option2.innerText = "0%";
  option2.value = "1";
  option3.innerText = "7%";
  option3.value = "2";
  option4.innerText = "19%";
  option4.value = "3";
  //fifth td element with children elements
  td5.className = "td1";
  div6.className = "input-group";
  input3.type = "text";
  input3.className = "form-control";
  input3.id = `preisBruttoInput${elements.length}`;
  input3.setAttribute("oninput", "handleChangePreisBrutto(event)");
  input3.setAttribute("onblur", "handleOnBlurPreisBrutto(event)");
  div7.className = "input-group-append";
  span2.className = "input-group-text";
  span2.innerText = "€";
  //sixth td element with children elements
  svg.setAttribute("width", "1em");
  svg.setAttribute("height", "1em");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("class", "bi bi-trash");
  path.setAttribute(
    "d",
    "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
  );
  path2.setAttribute("fill-rule", "evenodd");
  path2.setAttribute(
    "d",
    "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
  );
  svg.setAttribute("onclick", "handleDeleteElement(event)");

  //table element
  tableBody.appendChild(tr);
  //tr element
  tr.appendChild(td);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  //first td element with children elements
  td.appendChild(div);
  div.appendChild(input);
  //second td element with children elements
  td2.appendChild(div2);
  div2.appendChild(select);
  select.appendChild(option);
  //third td element with children elements
  td3.appendChild(div3);
  div3.appendChild(input2);
  div3.appendChild(div4);
  div4.appendChild(span);
  //fourth td element with children elements
  td4.appendChild(div5);
  div5.appendChild(select2);
  select2.appendChild(option2);
  select2.appendChild(option3);
  select2.appendChild(option4);
  //fifth td element with children elements
  td5.appendChild(div6);
  div6.appendChild(input3);
  div6.appendChild(div7);
  div6.appendChild(span2);
  //sixth td element with children elements
  td6.appendChild(svg);
  svg.appendChild(path);
  svg.appendChild(path2);
};

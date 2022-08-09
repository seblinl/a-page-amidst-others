const getData = async (tab) => {
  try {
    const res = await fetch("/data/" + tab);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

const createCard = (cardClasses, bodyClasses) => {
  const card = document.createElement("div");
  card.className = cardClasses;
  const cardBody = document.createElement("div");
  cardBody.className = bodyClasses;

  return { card, cardBody };
};

const createTitle = (title, classes) => {
  const cardTitle = document.createElement("h3");
  cardTitle.className = classes;
  cardTitle.textContent = title;

  return cardTitle;
};

const createText = (text, classes) => {
  const cardText = document.createElement("p");
  cardText.className = classes;
  cardText.textContent = text;

  return cardText;
};

const createFooter = (classes) => {
  const cardFooter = document.createElement("div");
  cardFooter.className = classes;

  return cardFooter;
};

const createLinks = (links, classes) => {
  const cardLinks = [];
  for (let link of links) {
    const newLink = document.createElement("a");
    newLink.className = classes;
    newLink.textContent = link.text;
    newLink.href = link.url;
    cardLinks.push(newLink);
  }

  return cardLinks;
};

export {
  getData,
  createCard,
  createTitle,
  createLinks,
  createFooter,
  createText,
};

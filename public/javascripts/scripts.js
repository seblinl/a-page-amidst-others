const createCard = () => {
  const card = document.createElement("div");
  card.className = "card mt-1";
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  return { card, cardBody };
};

const createTitle = (title) => {
  const cardTitle = document.createElement("h3");
  cardTitle.className = "card-title text-center";
  cardTitle.textContent = title;

  return cardTitle;
};

const createText = (text) => {
  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = text;

  return cardText;
};

const createFooter = () => {
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";

  return cardFooter;
};

const createLinks = (links) => {
  const cardLinks = [];
  for (let link of links) {
    const newLink = document.createElement("a");
    newLink.className = "card-link d-block d-md-inline";
    newLink.textContent = link.text;
    newLink.href = link.url;
    cardLinks.push(newLink);
  }

  return cardLinks;
};

export { createCard, createTitle, createLinks, createFooter, createText };

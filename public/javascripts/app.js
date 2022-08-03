import {
  createCard,
  createTitle,
  createLinks,
  createFooter,
  createText,
} from "./scripts.js";

const udemyCSS = document.querySelector("#cssContent");
const otherContent = document.querySelector("#otherContent");

const getData = async (tab) => {
  const res = await fetch("/data/" + tab);
  const data = await res.json();

  return data;
};

const populateUdemy = async (
  getData,
  parent,
  newCard,
  newLink,
  newFooter,
  newTitle,
  newText
) => {
  const data = await getData("udemy");
  for (let section in data) {
    for (let item of data[section]) {
      const { card, cardBody } = newCard();
      if (item.title) {
        const cardTitle = newTitle(item.title);
        cardBody.appendChild(cardTitle);
      }
      const cardText = newText(item.text);
      const cardFooter = newFooter();
      const cardLink = newLink(item.link);

      parent.appendChild(card);
      card.appendChild(cardBody);
      cardBody.appendChild(cardText);
      card.appendChild(cardFooter);
      cardFooter.appendChild(cardLink[0]);
    }
  }
};

const populateOther = async (getData, parent, newCard, newTitle, newLinks) => {
  const data = await getData("other");
  for (let item of data) {
    const { card, cardBody } = newCard();
    const cardTitle = newTitle(item.title);
    const cardLinks = newLinks(item.links);

    parent.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardLinks.forEach((link) => cardBody.appendChild(link));
  }
};

populateUdemy(
  getData,
  udemyCSS,
  createCard,
  createLinks,
  createFooter,
  createTitle,
  createText
);

populateOther(getData, otherContent, createCard, createTitle, createLinks);

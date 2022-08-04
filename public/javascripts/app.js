import {
  createCard,
  createTitle,
  createLinks,
  createFooter,
  createText,
} from "./scripts.js";

const udemyContent = document.querySelectorAll(".accordion-body");
const otherContent = document.querySelector("#otherContent");

const getData = async (tab) => {
  try {
    const res = await fetch("/data/" + tab);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

const populateUdemy = async (
  getData,
  parents,
  newCard,
  newLink,
  newFooter,
  newTitle,
  newText
) => {
  const data = await getData("udemy");
  for (let i = 0; i < parents.length; i++) {
    for (let item of data[i]) {
      const { card, cardBody } = newCard();
      if (item.title) {
        const cardTitle = newTitle(item.title);
        cardBody.appendChild(cardTitle);
      }
      const cardText = newText(item.bodyText);
      const cardFooter = newFooter();
      const cardLink = newLink(item.links);

      parents[i].appendChild(card);
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
  udemyContent,
  createCard,
  createLinks,
  createFooter,
  createTitle,
  createText
);

populateOther(getData, otherContent, createCard, createTitle, createLinks);

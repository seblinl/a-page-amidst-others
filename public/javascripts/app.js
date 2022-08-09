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
      const cardClasses = "card mt-1";
      const bodyClasses = "card-body d-md-flex align-items-md-baseline";
      const { card, cardBody } = newCard(cardClasses, bodyClasses);

      if (item.title) {
        const titleClasses = "card-title text-center me-md-3 pe-md-3";
        const cardTitle = newTitle(item.title, titleClasses);
        cardBody.appendChild(cardTitle);
      }

      const textClasses = "card-text text-center";
      const cardText = newText(item.bodyText, textClasses);

      const footerClasses = "card-footer";
      const cardFooter = newFooter(footerClasses);

      const linkClasses = "card-link d-block d-md-inline";
      const cardLink = newLink(item.links, linkClasses);

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
    const cardClasses = "card mt-1";
    const bodyClasses = "card-body";
    const { card, cardBody } = newCard(cardClasses, bodyClasses);

    const titleClasses = "card-title text-center me-md-3 pe-md-3";
    const cardTitle = newTitle(item.title, titleClasses);

    const linkClasses = "card-link text-center d-block d-md-inline";
    const cardLinks = newLinks(item.links, linkClasses);

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

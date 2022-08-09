import {
  getData,
  createCard,
  createTitle,
  createLinks,
  createFooter,
  createText,
} from "./scripts.js";

const udemyContent = document.querySelectorAll(".accordion-body");
const otherContent = document.querySelector("#otherContent");

const populateUdemy = async () => {
  const data = await getData("udemy");
  for (let i = 0; i < udemyContent.length; i++) {
    for (let item of data[i]) {
      const cardClasses = "card mt-1";
      const bodyClasses = "card-body d-md-flex align-items-md-baseline";
      const { card, cardBody } = createCard(cardClasses, bodyClasses);

      if (item.title) {
        const titleClasses = "card-title text-center me-md-3 pe-md-3";
        const cardTitle = createTitle(item.title, titleClasses);
        cardBody.appendChild(cardTitle);
      }

      const textClasses = "card-text text-center";
      const cardText = createText(item.bodyText, textClasses);

      const footerClasses = "card-footer";
      const cardFooter = createFooter(footerClasses);

      const linkClasses = "card-link d-block d-md-inline";
      const cardLink = createLinks(item.links, linkClasses);

      udemyContent[i].appendChild(card);
      card.appendChild(cardBody);
      cardBody.appendChild(cardText);
      card.appendChild(cardFooter);
      cardFooter.appendChild(cardLink[0]);
    }
  }
};

const populateOther = async () => {
  const data = await getData("other");
  for (let item of data) {
    const cardClasses = "card mt-1";
    const bodyClasses = "card-body";
    const { card, cardBody } = createCard(cardClasses, bodyClasses);

    const titleClasses = "card-title text-center me-md-3 pe-md-3";
    const cardTitle = createTitle(item.title, titleClasses);

    const linkClasses = "card-link text-center d-block d-md-inline";
    const cardLinks = createLinks(item.links, linkClasses);

    otherContent.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardLinks.forEach((link) => cardBody.appendChild(link));
  }
};

populateUdemy();
populateOther();

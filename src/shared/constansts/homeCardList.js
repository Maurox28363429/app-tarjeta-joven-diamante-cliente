import offersIcon from "../../assets/offersIcon.png";
import messageIcon from "../../assets/messageIcon.png";
import VIPIcon from "../../assets/VIPIcon.png";
import speakerIcon from "../../assets/speakerIcon.png";
import bagIcon from "../../assets/bagIcon.png";
import giftIcon from "../../assets/giftIcon.png";
import pachama from "../../assets/GifPachama.gif";
import universityIcon from "../../assets/universityIcon.png";
import helpIcon from "../../assets/heartIcon.png";
import newsIcon from "../../assets/newsIcon.png";

export const HOME_CARD_LIST = [
  {
    id: 1,
    title: "Contactanos",
    icon: messageIcon,
    link: "/cliente/contact",
  },
  {
    id: 2,
    title: "Membrersias",
    icon: VIPIcon,
    link: "/cliente/memberships-type",
  },
  {
    id: 3,
    title: "Ofertas",
    icon: offersIcon,
    link: "/cliente/Offers",
  },
  {
    id: 4,
    title: "Premios",
    icon: giftIcon,
    link: "",
  },
  {
    id: 5,
    title: "Promociones",
    icon: speakerIcon,
    link: "/cliente/news",
  },
  {
    id: 6,
    title: "Compras",
    icon: bagIcon,
    link: "/cliente/transactionsTable",
  },
  {
    id: 7,
    title: "Pachamá",
    icon: pachama,
    link: "/cliente/pachama",
  },
  {
    id: 8,
    title: "Universidades",
    icon: universityIcon,
    link: "",
  },
  {
    id: 9,
    title: "SOS",
    icon: helpIcon,
    link: "",
  },
  {
    id: 10,
    title: "Noticias",
    icon: newsIcon,
    link: "",
  },
];

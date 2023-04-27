import offersIcon from "../../assets/images/offersIcon.png";
import messageIcon from "../../assets/images/messageIcon.png";
import VIPIcon from "../../assets/images/VIPIcon.png";
import speakerIcon from "../../assets/images/speakerIcon.png";
import bagIcon from "../../assets/images/bagIcon.png";
import giftIcon from "../../assets/images/giftIcon.png";
import pachama from "../../assets/images/GifPachama.gif";
import universityIcon from "../../assets/images/universityIcon.png";
import helpIcon from "../../assets/images/heartIcon.png";
import newsIcon from "../../assets/images/newsIcon.png";

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

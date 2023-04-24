import offersIcon from "../../assets/offersIcon.png";
import messageIcon from "../../assets/messageIcon.png";
import VIPIcon from "../../assets/VIPIcon.png";
import speakerIcon from "../../assets/speakerIcon.png";
import profile from "../../assets/profile.jpg";
import bagIcon from "../../assets/bagIcon.png";

export const HOME_CARD_LIST = [
  {
    id: 1,
    title: "Ofertas",
    icon: offersIcon,
    link: "/cliente/products",
  },
  {
    id: 2,
    title: "Promociones",
    icon: speakerIcon,
    link: "/cliente/news",
  },
  {
    id: 3,
    title: "Membrersias",
    icon: VIPIcon,
    link: "/memberships",
  },
  {
    id: 4,
    title: "Perfil",
    icon: profile,
    link: "/cliente/account",
  },
  {
    id: 5,
    title: "Compras",
    icon: bagIcon,
    link: "/cliente/shopping",
  },
  {
    id: 6,
    title: "Contactanos",
    icon: messageIcon,
    link: "/cliente/shopping",
  },
];

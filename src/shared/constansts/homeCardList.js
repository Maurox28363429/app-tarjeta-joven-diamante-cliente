import offersIcon from '../../assets/images/offersIcon.png';
import messageIcon from '../../assets/images/messageIcon.png';
import VIPIcon from '../../assets/images/VIPIcon.png';
import speakerIcon from '../../assets/images/speakerIcon.png';
import bagIcon from '../../assets/images/bagIcon.png';
// import giftIcon from "../../assets/images/giftIcon.png";
import pachama from '../../assets/images/GifPachama.gif';
import universityIcon from '../../assets/images/universityIcon.png';
// import helpIcon from "../../assets/images/heartIcon.png";
import newsIcon from '../../assets/images/newsIcon.png';
import iconoTarjeta from '../../assets/images/t.webp';
import profileIcon from '../../assets/images/profileIcon.png';
import disableIcon from '../../assets/images/bandImage.png';

export const HOME_CARD_LIST = [
  {
    id: 1,
    title: 'Seguro',
    icon: iconoTarjeta,
    link: '#',
    evento: true,
    enabled: true,
  },
  {
    id: 2,
    title: "Contáctanos",
    icon: messageIcon,
    link: '/cliente/contact',
    enabled: true,
  },
  {
    id: 3,
    title: 'Membresías',
    icon: VIPIcon,
    link: '/cliente/memberships-type',
    enabled: true,
  },
  {
    id: 4,
    title: 'Ofertas',
    icon: offersIcon,
    link: '/cliente/Offers',
    enabled: true,
  },
  /*   {
    id: 5,
    title: "Servicios",
    icon: bagIcon,
    link: "/cliente/services",
    enabled: true,
  }, */
  {
    id: 6,
    title: 'Premios',
    icon: disableIcon,
    link: '',
    enabled: false,
  },
  {
    id: 7,
    title: 'Promociones',
    icon: speakerIcon,
    link: '/cliente/promotions',
    enabled: true,
  },
  {
    id: 8,
    title: 'Compras',
    icon: bagIcon,
    link: '/cliente/transactionsTable',
    enabled: true,
  },
  {
    id: 9,
    title: "",
    icon: pachama,
    link: '/cliente/pachama',
    enabled: true,
  },
  {
    id: 10,
    title: 'Universidades y otros',
    icon: universityIcon,
    link: '/cliente/OffersForUniversitys/Panamá',
    enabled: true,
  },
  {
    id: 11,
    title: 'SOS',
    icon: disableIcon,
    link: '',
    enabled: false,
  },
  {
    id: 12,
    title: 'Noticias',
    icon: newsIcon,
    link: '/cliente/news',
    enabled: true,
  },
  {
    id: 13,
    title: 'Perfil',
    icon: profileIcon,
    link: '/cliente/account/profile',
    enabled: true,
  },
];

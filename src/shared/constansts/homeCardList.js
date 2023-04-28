import offersIcon from '../../assets/images/offersIcon.png'
import messageIcon from '../../assets/images/messageIcon.png'
import VIPIcon from '../../assets/images/VIPIcon.png'
import speakerIcon from '../../assets/images/speakerIcon.png'
import bagIcon from '../../assets/images/bagIcon.png'
import giftIcon from '../../assets/images/giftIcon.png'
import pachama from '../../assets/images/GifPachama.gif'
import universityIcon from '../../assets/images/universityIcon.png'
import helpIcon from '../../assets/images/heartIcon.png'
import newsIcon from '../../assets/images/newsIcon.png'
import iconoTarjeta from '../../assets/images/t.webp'

export const HOME_CARD_LIST = [
  {
    id: 1,
    title: 'Seguro',
    icon: iconoTarjeta,
    link: '#',
    evento: true
  },
  {
    id: 2,
    title: 'Contactanos',
    icon: messageIcon,
    link: '/cliente/contact'
  },
  {
    id: 3,
    title: 'Membrersias',
    icon: VIPIcon,
    link: '/cliente/memberships-type'
  },
  {
    id: 4,
    title: 'Ofertas',
    icon: offersIcon,
    link: '/cliente/Offers'
  },
  {
    id: 5,
    title: 'Premios',
    icon: giftIcon,
    link: ''
  },
  {
    id: 6,
    title: 'Promociones',
    icon: speakerIcon,
    link: '/cliente/news'
  },
  {
    id: 7,
    title: 'Compras',
    icon: bagIcon,
    link: '/cliente/transactionsTable'
  },
  {
    id: 8,
    title: 'Pachamá',
    icon: pachama,
    link: '/cliente/pachama'
  },
  {
    id: 9,
    title: 'Universidades',
    icon: universityIcon,
    link: ''
  },
  {
    id: 10,
    title: 'SOS',
    icon: helpIcon,
    link: ''
  },
  {
    id: 11,
    title: 'Noticias',
    icon: newsIcon,
    link: ''
  }
]

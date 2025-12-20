import ateneoLogo from '../assets/images/community/Ateneo.png'
import uapsaLogo from '../assets/images/community/UAPSA BISCAST Logo.png'
import acesLogo from '../assets/images/community/ACES_LOGO.png'
import uapgaLogo from '../assets/images/community/UAPGA CAMARINES-TERM LOGO.png'

import type { CommunityData } from '../types/community'

export const communityData: CommunityData = {
  featuredEvents: [
    {
      id: 1,
      title: 'CE BLAZE: Civil Engineering Days 2025',
      date: 'April 2025',
      location: 'BISCAST Pavilion',
      organization: 'Association of Civil Engineering Students',
      description: 'Featured at this flagship event showcasing educational programs, innovation competitions, and academic festivities celebrating civil engineering excellence.',
      icon: acesLogo,
      socialLinks: {
        facebook: 'https://www.facebook.com/photo/?fbid=1051016330382402&set=a.457555103061864'
      },
    },
  ],
  partnerships: [
    {
      id: 1,
      name: 'BISCAST Association of Civil Engineering Students (ACES)',
      discount: '20% discount',
      effectiveDate: 'Effective September 3, 2025',
      description: 'Official partnership providing exclusive discounts to ACES members for coworking space access.',
      icon: acesLogo,
      socialLinks: {
        facebook: 'https://www.facebook.com/biscastaces'
      },
    },
    {
      id: 2,
      name: 'UAPSA BISCAST Chapter',
      discount: '20% discount',
      effectiveDate: 'Effective October 9, 2025',
      description: 'United Architects of The Philippines Students Auxiliary - Partnership offering special rates for architecture students.',
      icon: uapsaLogo,
      socialLinks: {
        facebook: 'https://www.facebook.com/uapsabiscast1999'
      },
    },
    {
      id: 3,
      name: 'UAPGA CAMARINES CHAPTER',
      discount: '20% discount',
      effectiveDate: 'Effective October 31, 2025',
      description: 'The official organization of architecture graduates providing professional networking, community development programs, and leadership training opportunities.',
      icon: uapgaLogo,
      socialLinks: {
        facebook: 'https://www.facebook.com/uapgacamarines'
      },
    },
  ],
  sponsorships: [
    {
      id: 1,
      name: 'Ateneo De Naga University - Senior High School Guidance Office',
      event: 'Senior High School Orientation Seminar (ORSEM)',
      eventDate: 'June 23-25, 2025',
      theme: 'Adhika: Thriving with Hope Towards Youthful Potential',
      description: 'Supporting student orientation through coworking vouchers for ORSEM preparation and activities.',
      icon: ateneoLogo,
    },
    {
      id: 2,
      name: 'Ateneo De Naga University - College Guidance Center',
      event: 'Mental Health Month 2025',
      eventDate: 'October 1-17, 2025',
      theme: 'Atamanon asin Padanayon: Mental Health, We Care',
      description: 'Supporting mental health awareness by providing coworking vouchers for Mental Health Month activities and programs.',
      icon: ateneoLogo,
      socialLinks: {
        facebook: 'https://www.facebook.com/adnu.college.guidance.center/posts/pfbid032Q2uZYextZaQ5Z6goZnRWrMC8bGthiQ4EzP1EiptSxoSCxPNK4ArRiqva66EY1uBl'
      },
    },
  ],
}
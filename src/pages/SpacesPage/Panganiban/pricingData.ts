// Import workspace images
import entranceAreaImage from '../../../assets/images/panganiban/entrance-area.jpg'
import innerAreaImage from '../../../assets/images/panganiban/inner-area.jpg'
import callBoothImage from '../../../assets/images/panganiban/call-booth.jpg'
import allAccessMembershipImage from '../../../assets/images/panganiban/all-access-membership.jpg'
import wholeInnerAreaImage from '../../../assets/images/panganiban/whole-inner-area.jpg'

export const PricingType = {
  NONE: 'none',
  EXTENSION: 'extension',
  LEGACY: 'legacy'
} as const

export type PricingType = typeof PricingType[keyof typeof PricingType]

export interface PricingOption {
  id: string
  name: string
  description?: string
  icon: 'clock' | 'sparkles' | 'users' | 'star'
  color: 'amber' | 'blue' | 'green' | 'purple'
  durationPrefix?: string
  coverImage?: string
  mainPricing: {
    duration: {
      value: number
      unit: 'hours' | 'months'
    }
    partnerPrice: number
    walkinPrice: number
  }
  additionalPricing: Array<{
    duration: {
      value: number
      unit: 'hours' | 'months'
      customText?: string
    }
    partnerPrice: number
    walkinPrice: number
    savings?: string
    partnerLabel?: string
    walkinLabel?: string
    pricingType?: PricingType
  }>
}

// Utility function to decode duration to display text
export function formatDuration(duration: {
  value: number
  unit: 'hours' | 'months'
  customText?: string
}): string {
  if (duration.customText) {
    return duration.customText
  }

  switch (duration.unit) {
    case 'hours':
      return `${duration.value} hours`
    case 'months':
      return `${duration.value} Month${duration.value > 1 ? 's' : ''}`
    default:
      return `${duration.value}`
  }
}

export const pricingData: PricingOption[] = [
  {
    id: 'entrance-area',
    name: 'Entrance Area',
    description: 'Prime location near entrance with relaxed vibe and comfortable seating',
    icon: 'clock',
    color: 'amber',
    durationPrefix: 'for',
    coverImage: entranceAreaImage,
    mainPricing: {
      duration: {
        value: 4,
        unit: 'hours'
      },
      partnerPrice: 79,
      walkinPrice: 99
    },
    additionalPricing: [
      {
        duration: {
          value: 8,
          unit: 'hours'
        },
        partnerPrice: 94,
        walkinPrice: 118
      },
      {
        duration: {
          value: 1,
          unit: 'hours'
        },
        partnerPrice: 24,
        walkinPrice: 30,
        pricingType: PricingType.EXTENSION
      }
    ]
  },
  {
    id: 'inner-area',
    name: 'Inner Area',
    description: 'Premium workspace with ergonomic chairs, dedicated WiFi, and quiet environment',
    icon: 'sparkles',
    color: 'blue',
    durationPrefix: 'for',
    coverImage: innerAreaImage,
    mainPricing: {
      duration: {
        value: 4,
        unit: 'hours'
      },
      partnerPrice: 119,
      walkinPrice: 149
    },
    additionalPricing: [
      {
        duration: {
          value: 8,
          unit: 'hours'
        },
        partnerPrice: 142,
        walkinPrice: 178
      },
      {
        duration: {
          value: 1,
          unit: 'hours'
        },
        partnerPrice: 24,
        walkinPrice: 30,
        pricingType: PricingType.EXTENSION
      }
    ]
  },
  {
    id: 'call-booth',
    name: 'Call Booth',
    description: 'Sound-proof private space perfect for 2-person meetings and calls',
    icon: 'users',
    color: 'green',
    durationPrefix: 'for',
    coverImage: callBoothImage,
    mainPricing: {
      duration: {
        value: 5,
        unit: 'hours'
      },
      partnerPrice: 238,
      walkinPrice: 298
    },
    additionalPricing: [
      {
        duration: {
          value: 1,
          unit: 'hours'
        },
        partnerPrice: 57,
        walkinPrice: 71,
        pricingType: PricingType.EXTENSION
      }
    ]
  }
]

export const additionalPricingData: PricingOption[] = [
  {
    id: 'whole-inner-area',
    name: 'Whole Inner Area',
    description: 'Exclusive space for workshops and large groups (5-day advance booking)',
    icon: 'sparkles',
    color: 'purple',
    durationPrefix: 'for',
    coverImage: wholeInnerAreaImage,
    mainPricing: {
      duration: {
        value: 2,
        unit: 'hours'
      },
      partnerPrice: 1440,
      walkinPrice: 1800
    },
    additionalPricing: [
      {
        duration: {
          value: 1,
          unit: 'hours'
        },
        partnerPrice: 720,
        walkinPrice: 900,
        pricingType: PricingType.EXTENSION
      }
    ]
  },
  {
    id: 'all-access-membership',
    name: 'All-Access Membership',
    description: '24/7 biometric access - enter anytime without front desk hassle',
    icon: 'star',
    color: 'amber',
    durationPrefix: 'for',
    coverImage: allAccessMembershipImage,
    mainPricing: {
      duration: {
        value: 1,
        unit: 'months'
      },
      partnerPrice: 2800,
      walkinPrice: 3500
    },
    additionalPricing: [
      {
        duration: {
          value: 3,
          unit: 'months'
        },
        partnerPrice: 7497,
        walkinPrice: 9371,
        savings: 'Save 11%'
      },
      {
        duration: {
          value: 0,
          unit: 'hours',
          customText: 'Renewal - Existing Members'
        },
        partnerPrice: 1499,
        walkinPrice: 2249,
        partnerLabel: 'Entrance',
        walkinLabel: 'All-Access',
        pricingType: PricingType.LEGACY
      }
    ]
  }
]
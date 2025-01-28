import React from 'react'
import ACAPImg from '../../Images/Shelters/ACAP.jpg'
import Adopt from '../../Images/Shelters/Adopt.jpg'
import Todd from '../../Images/Shelters/Todd.jpg'
import Foster from '../../Images/Shelters/Foster.jpg'
import PAWS from '../../Images/Shelters/PAWS.png'
import Snow from '../../Images/Shelters/snow.jpg'

const SheltersData = [
    {
        id: 1,
        image: PAWS,
        link: 'https://www.facebook.com/pawspakistan/',
        name: 'PAWS- Pakistan Animal Welfare Society',
        location: 'Karachi, Pakistan',
        detail: 'Pakistan Animal Welfare Society - PAWS works for welfare of animals in Pakistan. This Karachi based animal welfare NGO also helps in arranging adoption for rescued animals as well as increasing compassion towards animals in Pakistani society.',
    },
    {
        id: 2,
        image: Snow,
        link: 'https://www.facebook.com/slfpak',
        name: 'Snow Leopard Foundation - SLF',
        location: 'Islamabad, Pakistan',
        detail: 'SLF is a wildlife protection NGO in Pakistan that works for conservation of snow leopards and other wild carnivores.',
    },
    {
        id: 3,
        image: Adopt,
        link: 'https://www.facebook.com/adoptapetpak/',
        name: 'Adopt A Pet',
        location: 'Karachi, Pakistan',
        detail: 'Adopt a pet is a Karachi based animal welfare NGO that is dedicated to finding homes for rescued and abandoned animals. It tries to arrange adoption for such animals. Focuses on cat adoption.',
    },
    {
        id: 4,
        image: ACAPImg,
        link: 'https://www.facebook.com/a.c.a.pak/',
        name: 'Animal Care Association Pakistan - ACAP',
        location: 'Islamabad, Pakistan',
        detail: 'ACAP aims to prevent cruelty and promote kindness toward animals. The ACAP five main goals are to RESCUE, SHELTER, FEED, MEDICAL AID, and Raise AWARENESS in the general public. focuses on animal shelter, rescue, and animal aid.'
    },
    {
        id: 5,
        image: Foster,
        link: 'https://www.facebook.com/foststrays/',
        name: 'Foster Stray Animal Rescue - FSA Save The Strays',
        location: 'Islambad, Pakistan',
        detail: 'FSA is an Islamabad-based animal rescue and welfare NGO. Its work focus is especially saving stray cats and dogs. Their focus is to rescue dogs.',
    },
    {
        id: 6,
        image: Todd,
        link: 'https://www.facebook.com/TWSPakistan',
        name: "Todd's Welfare Society",
        location: 'Lahore, Pakistan',
        detail: "Todd's welfare established Lahore's first shelter for animals. This Lahore based NGO works for saving lives of the sick, injured and abused animals.",
    },
];

export default SheltersData
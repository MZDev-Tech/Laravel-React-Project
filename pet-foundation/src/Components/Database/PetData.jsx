import cat1 from '../../Images/cats/cc1.jpg';
import cat2 from '../../Images/cats/cc5.jpg';
import cat3 from '../../Images/cats/cc6.jpg';
import cat4 from '../../Images/cats/cc2.jpg';
import dog1 from '../../Images/dogs/dd8.jpg';
import dog2 from '../../Images/dogs/dd1.jpg';
import dog3 from '../../Images/dogs/dd2.jpg';
import dog4 from '../../Images/dogs/dd4.jpg';
import bird1 from '../../Images/birds/b2.jpg';
import bird2 from '../../Images/birds/b3.jpg';
import rabbit1 from '../../Images/rabbits/r1.jpg';
import rabbit2 from '../../Images/rabbits/r2.jpg';

const PetData = [
  {
    id: 1,
    image: cat1,
    pet: 'Tigger Cat',
    gender: 'Male',
    age: '3 years',
    price: '100',
    breed: 'Mixed Breed',
    category: 'Cats',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Medium',
    color: 'Orange Tabby',
    location: 'Karachi, Pakistan', 
    publishDate: '15-June-2024',
    detail: 'Tigger is a friendly and playful cat who loves cuddles and chasing after toys. He enjoys lounging in sunny spots and gets along well with other cats and dogs.',
    energyLevel: 'Medium',
    friendliness: 'High',
    easeOfTraining: 'Low',
    status: 'Available',
    vendor: 'Pet Haven Rescue',
  },

  

  
  {
    id: 2,
    image: dog3,
    pet: 'Buddy',
    gender: 'Male',
    age: '2 years',
    price: '200',
    breed: 'Golden Retriever',
    category: 'Dogs',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Large',
    color: 'Golden',
    location: 'Lahore, Pakistan', 
    publishDate: '10-June-2024',
    detail: 'Buddy is a loyal and energetic dog who enjoys long walks and playing fetch. He is great with kids and loves meeting new people. Buddy is trained in basic commands and is looking for an active family to join.',
    energyLevel: 'High',
    friendliness: 'High',
    easeOfTraining: 'Medium',
    status: 'Available',
    vendor: 'Happy Tails Animal Shelter',
  },
  {
    id: 3,
    image: rabbit1,
    pet: 'Cotton',
    gender: 'Female',
    age: '1 year',
    price: '50',
    breed: 'Lop Rabbit',
    category: 'Rabbits',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Small',
    color: 'White',
    location: 'Islamabad, Pakistan', 
    publishDate: '05-June-2024',
    detail: 'Cotton is a gentle and curious rabbit who enjoys exploring her surroundings. She likes to hop around and munch on fresh greens. Cotton is litter-trained and would make a wonderful indoor companion.',
    energyLevel: 'Low',
    friendliness: 'Medium',
    easeOfTraining: 'Low',
    status: 'Adopted', // Updated status to 'Adopted'
    vendor: 'Rabbit Haven Rescue',
  },
  {
    id: 4,
    image: cat2,
    pet: 'Milo',
    gender: 'Male',
    age: '6 months',
    price: '75',
    breed: 'Domestic Shorthair',
    category: 'Cats',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Small',
    color: 'Gray',
    location: 'Karachi, Pakistan', 
    publishDate: '20-June-2024',
    detail: 'Milo is a playful and affectionate kitten who loves to climb and explore. He enjoys chasing after feather toys and lounging in cozy spots. Milo is litter-trained and gets along well with other cats.',
    energyLevel: 'High',
    friendliness: 'High',
    easeOfTraining: 'Medium',
    status: 'Available',
    vendor: 'Rescue Meow',
  },
  {
    id: 5,
    image: bird1,
    pet: 'Pablo',
    gender: 'Male',
    age: '1 year',
    price: '80',
    breed: 'Parrot',
    category: 'Birds',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Small',
    color: 'Blue and Yellow',
    location: 'Islamabad, Pakistan', 
    publishDate: '25-May-2024',
    detail: 'Pablo is a vibrant parrot who loves to mimic sounds and learn new tricks. He enjoys spending time outside of his cage and interacting with his human companions. Pablo comes with a spacious cage and toys.',
    energyLevel: 'High',
    friendliness: 'High',
    easeOfTraining: 'High',
    status: 'Available',
    vendor: 'Exotic Wings',
  },
  {
    id: 6,
    image: dog2,
    pet: 'Luna',
    gender: 'Female',
    age: '1.5 years',
    price: '150',
    breed: 'Labrador Retriever',
    category: 'Dogs',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Medium',
    color: 'Black and White',
    location: 'Lahore, Pakistan', 
    publishDate: '12-June-2024',
    detail: 'Luna is a sweet and gentle dog who adores belly rubs and cuddling on the couch. She is well-behaved indoors and enjoys short walks in the park. Luna is looking for a loving home with a cozy bed.',
    energyLevel: 'Medium',
    friendliness: 'High',
    easeOfTraining: 'Medium',
    status: 'Available',
    vendor: 'Texas Paws Rescue',
  },
  {
    id: 7,
    image: rabbit2,
    pet: 'Oreo',
    gender: 'Male',
    age: '8 months',
    price: '60',
    breed: 'Mixed Breed',
    category: 'Rabbits',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Small',
    color: 'Black and White',
    location: 'Karachi, Pakistan', 
    publishDate: '08-June-2024',
    detail: 'Oreo is an active and curious bunny who loves hopping around and exploring new spaces. He enjoys playing with chew toys and nibbling on fresh vegetables. Oreo is litter-trained and ready to hop into his new home.',
    energyLevel: 'High',
    friendliness: 'Medium',
    easeOfTraining: 'Low',
    status: 'Available',
    vendor: 'Bay Area Bunnies',
  },
  {
    id: 8,
    image: dog1,
    pet: 'Bella',
    gender: 'Female',
    age: '8 months',
    price: '180',
    breed: 'Australian Shepherd',
    category: 'Dogs',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Medium',
    color: 'Brown',
    location: 'Lahore, Pakistan', 
    publishDate: '18-June-2024',
    detail: 'Bella is a loyal and intelligent dog who loves going for runs and learning new tricks. She enjoys playing fetch and spending time with her human companions. Bella is house-trained and gets along well with other pets.',
    energyLevel: 'High',
    friendliness: 'High',
    easeOfTraining: 'High',
    status: 'Available',
    vendor: 'Southern Paws Rescue',
  },

  {
    id: 9,
    image: dog4,
    pet: 'Tony',
    gender: 'Female',
    age: '1 years',
    price: '120',
    breed: 'Australian Shepherd',
    category: 'Dogs',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Medium',
    color: 'Brown',
    location: 'Lahore, Pakistan', 
    publishDate: '18-June-2024',
    detail: 'Tony is a loyal and intelligent dog who loves going for runs and learning new tricks. She enjoys playing fetch and spending time with her human companions. Bella is house-trained and gets along well with other pets.',
    energyLevel: 'High',
    friendliness: 'High',
    easeOfTraining: 'High',
    status: 'Available',
    vendor: 'Southern Paws Rescue',
  },
  {
    id: 10,
    image: bird2,
    pet: 'Poob',
    gender: 'Male',
    age: '6 Months',
    price: '60',
    breed: 'Squrale',
    category: 'Birds',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Small',
    color: 'Blue and Yellow',
    location: 'Lahore, Pakistan', 
    publishDate: '25-May-2024',
    detail: 'Poob is a vibrant parrot who loves to mimic sounds and learn new tricks. He enjoys spending time outside of his cage and interacting with his human companions. Pablo comes with a spacious cage and toys.',
    energyLevel: 'High',
    friendliness: 'High',
    easeOfTraining: 'High',
    status: 'Available',
    vendor: 'Southern Paws Rescue',
  },
  {
    id: 11,
    image: cat3,
    pet: 'Tinker ',
    gender: 'Female',
    age: '1 years',
    price: '100',
    breed: 'Mixed Breed',
    category: 'Cats',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Medium',
    color: 'Orange Tabby',
    location: 'Lahore, Pakistan', 
    publishDate: '15-June-2024',
    detail: 'Tinker is a friendly and playful cat who loves cuddles and chasing after toys. He enjoys lounging in sunny spots and gets along well with other cats and dogs.',
    energyLevel: 'Medium',
    friendliness: 'High',
    easeOfTraining: 'Low',
    status: 'Available',
    vendor: 'Pet Haven Rescue',
  },
  {
    id: 12,
    image: cat4,
    pet: 'Dom Dom',
    gender: 'Male',
    age: '9 Months',
    price: '100',
    breed: 'Mixed Breed',
    category: 'Cats',
    healthDetails: 'Vaccinated, Dewormed',
    size: 'Medium',
    color: 'Orange Tabby',
    location: 'Karachi, Pakistan', 
    publishDate: '15-June-2024',
    detail: 'Dom Dom is a friendly and playful cat who loves cuddles and chasing after toys. He enjoys lounging in sunny spots and gets along well with other cats and dogs.',
    energyLevel: 'Medium',
    friendliness: 'High',
    easeOfTraining: 'Low',
    status: 'Available',
    vendor: 'Pet Haven Rescue',
  },
]
export default PetData
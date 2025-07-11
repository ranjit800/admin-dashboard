let listings = [
  {
    id: 1,
    title: 'Maruti Suzuki Swift',
    price: '₹6,50,000',
    location: 'Delhi',
    owner: 'Ravi Sharma',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Hyundai Creta',
    price: '₹10,00,000',
    location: 'Mumbai',
    owner: 'Neha Verma',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Tata Nexon',
    price: '₹9,00,000',
    location: 'Kolkata',
    owner: 'Amit Singh',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Mahindra Thar',
    price: '₹15,00,000',
    location: 'Pune',
    owner: 'Pooja Iyer',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Kia Seltos',
    price: '₹11,00,000',
    location: 'Bangalore',
    owner: 'Vikram Joshi',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Maruti Suzuki Baleno',
    price: '₹8,00,000',
    location: 'Chennai',
    owner: 'Divya Rao',
    status: 'pending',
  },
  {
    id: 7,
    title: 'Toyota Innova Crysta',
    price: '₹18,00,000',
    location: 'Hyderabad',
    owner: 'Sanjay Patel',
    status: 'pending',
  },
  {
    id: 8,
    title: 'MG Hector',
    price: '₹17,50,000',
    location: 'Ahmedabad',
    owner: 'Kiran Shah',
    status: 'pending',
  },
  {
    id: 9,
    title: 'Renault Kwid',
    price: '₹4,80,000',
    location: 'Lucknow',
    owner: 'Shruti Mehta',
    status: 'pending',
  },
  {
    id: 10,
    title: 'Honda Amaze',
    price: '₹8,70,000',
    location: 'Jaipur',
    owner: 'Manish Yadav',
    status: 'pending',
  },
  {
    id: 11,
    title: 'Skoda Slavia',
    price: '₹12,20,000',
    location: 'Surat',
    owner: 'Anjali Desai',
    status: 'pending',
  },
  {
    id: 12,
    title: 'Volkswagen Virtus',
    price: '₹13,10,000',
    location: 'Bhopal',
    owner: 'Rajeev Nair',
    status: 'pending',
  },
  {
    id: 13,
    title: 'Tata Punch',
    price: '₹7,50,000',
    location: 'Indore',
    owner: 'Meena Kumari',
    status: 'pending',
  },
  {
    id: 14,
    title: 'Hyundai Venue',
    price: '₹9,80,000',
    location: 'Nagpur',
    owner: 'Shubham Thakur',
    status: 'pending',
  },
  {
    id: 15,
    title: 'Maruti Suzuki Brezza',
    price: '₹10,20,000',
    location: 'Patna',
    owner: 'Preeti Sinha',
    status: 'pending',
  }
];


export function getListings() {
  return listings;
}

export function updateListing(id, data) {
  listings = listings.map((item) =>
    item.id === id ? { ...item, ...data } : item
  );
}

export function addListing(data) {
  listings.push({ id: Date.now(), ...data, status: 'pending' });
}

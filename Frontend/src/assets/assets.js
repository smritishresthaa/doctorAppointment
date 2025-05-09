import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import profile_pic from './profile_pic.png'
import contact from './contact.jpg'
import about from './about.jpg'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.jpeg'
import Gastroenterologist from './Gastroenterologist.jpeg'
import General_physician from './General_physician.jpg'
import Gynecologist from './Gynecologist.jpeg'
import Neurologist from './Neurologist.jpeg'
import Pediatricians from './Pediatricians.jpg'


export const assets = {
  appointment_img,
  header_img,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact,
  about,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo
}

export const specialityData = [
  {
    speciality: 'General physician',
    image: General_physician
  },
  {
    speciality: 'Gynecologist',
    image: Gynecologist
  },
  {
    speciality: 'Dermatologist',
    image: Dermatologist
  },
  {
    speciality: 'Pediatricians',
    image: Pediatricians
  },
  {
    speciality: 'Neurologist',
    image: Neurologist
  },
  {
    speciality: 'Gastroenterologist',
    image: Gastroenterologist
  },
]

export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Sita Sharma',
    image: doc1,
    speciality: 'Gynocologist',
    experience: '5 years',
    about: 'Focused on women’s reproductive health.',
    fees: 500,
    address: 'Naxal,Kathmandu'

  },
  {
    _id: 'doc2',
    name: 'Dr.Ram Prasad',
    image: doc2,
    speciality: 'General physician',
    experience: '7 years',
    about: 'He has a strong commitment to delevery comprehensive medical care.',
    fees: 600,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc3',
    name: 'Dr. Rajesh Adhikari',
    image: doc3,
    speciality: 'Neurologist',
    experience: '10 years',
    about: 'He is xpert in heart-related diagnosis and treatment.',
    fees: 1000,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc4',
    name: 'Dr. Anju KC',
    image: doc4,
    speciality: 'Dermatologist',
    experience: '6 years',
    about: 'She is experienced in skin treatment and cosmetic procedures.',
    fees: 700,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc5',
    name: 'Dr. Bijay Gautam',
    image: doc5,
    speciality: 'Psychiatrist',
    experience: '9 years',
    about: 'He helps patients with mental health and counseling.',
    fees: 850,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc6',
    name: 'Dr. Prakash Thapa',
    image: doc6,
    speciality: 'Gynecologist',
    experience: '8 years',
    about: 'Focused on women’s reproductive health.',
    fees: 750,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc7',
    name: 'Dr. Suraj Maharjan',
    image: doc7,
    speciality: 'Dentist',
    experience: '6 years',
    about: 'Expert in ear, nose, and throat disorders.',
    fees: 650,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc8',
    name: 'Dr. Nisha Joshi',
    image: doc8,
    speciality: 'Dentist',
    experience: '7 years',
    about: 'Helps patients with mental health and counseling.',
    fees: 900,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc9',
    name: 'Dr. Meera Rana',
    image: doc9,
    speciality: 'Neurologist',
    experience: '11 years',
    about: 'Treats brain, spine, and nervous system issues.',
    fees: 1100,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc10',
    name: 'Dr. Rina Lama',
    image: doc10,
    speciality: 'Cardiologist',
    experience: '4 years',
    about: 'Expert in heart-related diagnosis and treatment.',
    fees: 500,
    address: 'Naxal, Kathmandu'
  },
  {
    _id: 'doc11',
    name: 'Dr. Deepak Acharya',
    image: doc11,
    speciality: 'Neurologist',
    experience: '12 years',
    about: 'Treats brain, spine, and nervous system issues.',
    fees: 1200,
    address: 'Naxal, Kathmandu'

  },

  {
    _id: 'doc12',
    name: 'Dr. Daya Khadka',
    image: doc12,
    speciality: 'General physician',
    experience: '12 years',
    about: 'He has a strong commitment to delevery comprehensive medical care.',
    fees: 1200,
    address: 'Naxal, Kathmandu'
  },
]
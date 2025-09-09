// Custom user names and law firms
const userNames = [
  "Isabela Orlacchio-Garcia",
  "April Bonifatto-Martinick", 
  "Ashley Dominguez Garcia",
  "Shahab Mossavar-Rahmani",
  "Carson Phillips-Spotts",
  "Michelle Fonseca-Kamana",
  "Annie Martin-McDonough",
  "LaShaunté Henry-Steele",
  "Neyleen Ortiz-Beljajev",
  "Jennifer Gore-Cuthbert",
  "Timothy Walker-Dupler",
  "Christopher Mandalian",
  "Spencer K. Schneider", 
  "Alexandra Stevenson",
  "Mansour Soltanmoradi",
  "Kingsley Forrester",
  "Valentina Ambarchyan",
  "Christopher Earley",
  "Maximilian Mescall",
  "Clair Hollingsworth"
];

const lawFirms = [
  "Sutton Street Group",
  "McMullin Injury Law",
  "The Tuke Firm, PLLC",
  "Singleton Schreiber",
  "The Byrne Law Group",
  "Hymanson & Hymanson",
  "Woolsey Morcom PLLC",
  "The Mattox Law Firm",
  "Clark Frost Zucchi",
  "Schaar & Silva LLP",
  "Iarusso Legal, APC",
  "Clayton Robertson",
  "United Citizen Law",
  "Ikuta Hemesath LLP",
  "Irwin Fraley, PLLC",
  "The Lake Law Firm",
  "Shifrin Law Group",
  "LegalRideshare LLC",
  "Betts Law Group PC",
  "Phillips Law Group",
  "Charpia and Hammes",
  "Mandelaris Law LLC",
  "Trevino Law Office",
  "WILKES & MEE, PLLC",
  "Donaldson Law, LLC",
  "Schneider & Branch",
  "Chaffin Luhana LLP",
  "Goodman Law Center",
  "Clancy & Diaz, LLP",
  "Trujillo & Winnick"
];

// Attorney Data
export const attorneyData = {
  referred: [
    { name: userNames[10], firm: lawFirms[10], location: "Los Angeles, CA", specialties: ["Personal Injury", "Car Accidents"], initials: "TW" },
    { name: userNames[11], firm: lawFirms[11], location: "San Francisco, CA", specialties: ["Medical Malpractice"], initials: "CM" },
    { name: userNames[12], firm: lawFirms[12], location: "San Diego, CA", specialties: ["Workers' Comp"], initials: "SS" },
    { name: userNames[13], firm: lawFirms[13], location: "Los Angeles, CA", specialties: ["Personal Injury"], initials: "AS" },
    { name: userNames[14], firm: lawFirms[14], location: "Oakland, CA", specialties: ["Car Accidents"], initials: "MS" },
    { name: userNames[15], firm: lawFirms[15], location: "San Jose, CA", specialties: ["Personal Injury"], initials: "KF" },
    { name: userNames[16], firm: lawFirms[16], location: "Los Angeles, CA", specialties: ["Medical Malpractice"], initials: "VA" },
    { name: userNames[17], firm: lawFirms[17], location: "San Francisco, CA", specialties: ["Workers' Comp"], initials: "CE" },
    { name: userNames[18], firm: lawFirms[18], location: "San Diego, CA", specialties: ["Car Accidents"], initials: "MM" },
    { name: userNames[19], firm: lawFirms[19], location: "Los Angeles, CA", specialties: ["Personal Injury"], initials: "CH" }
  ],
  
  invited: [
    { name: userNames[0], firm: lawFirms[20], location: "Cincinnati, OH", specialties: ["Criminal Defense", "DUI"], initials: "IO" },
    { name: userNames[1], firm: lawFirms[21], location: "Miami, FL", specialties: ["Immigration Law"], initials: "AB" },
    { name: userNames[2], firm: lawFirms[22], location: "Seattle, WA", specialties: ["Business Law"], initials: "AD" },
    { name: userNames[3], firm: lawFirms[23], location: "Denver, CO", specialties: ["Family Law"], initials: "SM" },
    { name: userNames[4], firm: lawFirms[24], location: "Austin, TX", specialties: ["Real Estate Law"], initials: "CP" },
    { name: userNames[5], firm: lawFirms[25], location: "Portland, OR", specialties: ["Employment Law"], initials: "MF" },
    { name: userNames[6], firm: lawFirms[26], location: "Chicago, IL", specialties: ["Corporate Law"], initials: "AM" },
    { name: userNames[7], firm: lawFirms[27], location: "Atlanta, GA", specialties: ["Bankruptcy Law"], initials: "LH" },
    { name: userNames[8], firm: lawFirms[28], location: "Phoenix, AZ", specialties: ["Tax Law"], initials: "NO" },
    { name: userNames[9], firm: lawFirms[29], location: "Las Vegas, NV", specialties: ["Estate Planning"], initials: "JG" }
  ],
  
  losAngeles: [
    { name: userNames[10], firm: lawFirms[0], location: "Los Angeles, CA", specialties: ["Personal Injury", "Medical Malpractice"], initials: "TW" },
    { name: userNames[11], firm: lawFirms[1], location: "Beverly Hills, CA", specialties: ["Car Accidents", "Slip & Fall"], initials: "CM" },
    { name: userNames[12], firm: lawFirms[2], location: "Santa Monica, CA", specialties: ["Workers' Comp", "Personal Injury"], initials: "SS" },
    { name: userNames[13], firm: lawFirms[3], location: "Pasadena, CA", specialties: ["Medical Malpractice", "Wrongful Death"], initials: "AS" },
    { name: userNames[14], firm: lawFirms[4], location: "Long Beach, CA", specialties: ["Car Accidents", "Personal Injury"], initials: "MS" },
    { name: userNames[15], firm: lawFirms[5], location: "Glendale, CA", specialties: ["Slip & Fall", "Workers' Comp"], initials: "KF" },
    { name: userNames[16], firm: lawFirms[6], location: "Burbank, CA", specialties: ["Personal Injury", "Medical Malpractice"], initials: "VA" },
    { name: userNames[17], firm: lawFirms[7], location: "Torrance, CA", specialties: ["Car Accidents", "Wrongful Death"], initials: "CE" },
    { name: userNames[18], firm: lawFirms[8], location: "El Segundo, CA", specialties: ["Workers' Comp", "Personal Injury"], initials: "MM" },
    { name: userNames[19], firm: lawFirms[9], location: "Manhattan Beach, CA", specialties: ["Medical Malpractice", "Slip & Fall"], initials: "CH" }
  ],
  
  carAccidents: [
    { name: userNames[0], firm: lawFirms[10], location: "Los Angeles, CA", specialties: ["Car Accidents", "Motorcycle Accidents"], initials: "IO" },
    { name: userNames[1], firm: lawFirms[11], location: "San Francisco, CA", specialties: ["Car Accidents", "Truck Accidents"], initials: "AB" },
    { name: userNames[2], firm: lawFirms[12], location: "San Diego, CA", specialties: ["Car Accidents", "Pedestrian Accidents"], initials: "AD" },
    { name: userNames[3], firm: lawFirms[13], location: "Sacramento, CA", specialties: ["Car Accidents", "Bicycle Accidents"], initials: "SM" },
    { name: userNames[4], firm: lawFirms[14], location: "Fresno, CA", specialties: ["Car Accidents", "Hit & Run"], initials: "CP" },
    { name: userNames[5], firm: lawFirms[15], location: "Oakland, CA", specialties: ["Car Accidents", "DUI Accidents"], initials: "MF" },
    { name: userNames[6], firm: lawFirms[16], location: "Bakersfield, CA", specialties: ["Car Accidents", "Commercial Vehicle"], initials: "AM" },
    { name: userNames[7], firm: lawFirms[17], location: "Anaheim, CA", specialties: ["Car Accidents", "Uber/Lyft Accidents"], initials: "LH" },
    { name: userNames[8], firm: lawFirms[18], location: "Riverside, CA", specialties: ["Car Accidents", "Uninsured Motorist"], initials: "NO" },
    { name: userNames[9], firm: lawFirms[19], location: "Stockton, CA", specialties: ["Car Accidents", "Multi-Vehicle"], initials: "JG" }
  ],
  
  personalInjury: [
    { name: userNames[10], firm: lawFirms[20], location: "Los Angeles, CA", specialties: ["Personal Injury", "Catastrophic Injury"], initials: "TW" },
    { name: userNames[11], firm: lawFirms[21], location: "San Francisco, CA", specialties: ["Personal Injury", "Spinal Cord Injury"], initials: "CM" },
    { name: userNames[12], firm: lawFirms[22], location: "San Diego, CA", specialties: ["Personal Injury", "Brain Injury"], initials: "SS" },
    { name: userNames[13], firm: lawFirms[23], location: "San Jose, CA", specialties: ["Personal Injury", "Burn Injury"], initials: "AS" },
    { name: userNames[14], firm: lawFirms[24], location: "Fresno, CA", specialties: ["Personal Injury", "Construction Accidents"], initials: "MS" },
    { name: userNames[15], firm: lawFirms[25], location: "Long Beach, CA", specialties: ["Personal Injury", "Product Liability"], initials: "KF" },
    { name: userNames[16], firm: lawFirms[26], location: "Oakland, CA", specialties: ["Personal Injury", "Premises Liability"], initials: "VA" },
    { name: userNames[17], firm: lawFirms[27], location: "Santa Ana, CA", specialties: ["Personal Injury", "Dog Bites"], initials: "CE" },
    { name: userNames[18], firm: lawFirms[28], location: "Riverside, CA", specialties: ["Personal Injury", "Nursing Home Abuse"], initials: "MM" },
    { name: userNames[19], firm: lawFirms[29], location: "Stockton, CA", specialties: ["Personal Injury", "Wrongful Death"], initials: "CH" }
  ],
  
  lawTigers: [
    { name: userNames[0], firm: lawFirms[0], location: "Los Angeles, CA", specialties: ["Motorcycle Accidents", "Biker Rights"], initials: "IO" },
    { name: userNames[1], firm: lawFirms[1], location: "San Diego, CA", specialties: ["Motorcycle Accidents", "Road Rash"], initials: "AB" },
    { name: userNames[2], firm: lawFirms[2], location: "San Francisco, CA", specialties: ["Motorcycle Accidents", "Lane Splitting"], initials: "AD" },
    { name: userNames[3], firm: lawFirms[3], location: "Sacramento, CA", specialties: ["Motorcycle Accidents", "Helmet Laws"], initials: "SM" },
    { name: userNames[4], firm: lawFirms[4], location: "Fresno, CA", specialties: ["Motorcycle Accidents", "Insurance Claims"], initials: "CP" },
    { name: userNames[5], firm: lawFirms[5], location: "San Jose, CA", specialties: ["Motorcycle Accidents", "Passenger Rights"], initials: "MF" },
    { name: userNames[6], firm: lawFirms[6], location: "Long Beach, CA", specialties: ["Motorcycle Accidents", "Custom Bikes"], initials: "AM" },
    { name: userNames[7], firm: lawFirms[7], location: "Oakland, CA", specialties: ["Motorcycle Accidents", "Group Rides"], initials: "LH" },
    { name: userNames[8], firm: lawFirms[8], location: "Anaheim, CA", specialties: ["Motorcycle Accidents", "Safety Gear"], initials: "NO" },
    { name: userNames[9], firm: lawFirms[9], location: "Riverside, CA", specialties: ["Motorcycle Accidents", "Track Days"], initials: "JG" }
  ]
};

export const categoryNames = {
  referred: "Attorneys you've referred cases",
  invited: "Attorneys who invited you to their cases", 
  losAngeles: "Bests in Los Angeles",
  carAccidents: "Bests in Car Accidents",
  personalInjury: "Bests in Personal Injury",
  lawTigers: "Law Tigers Community members"
};
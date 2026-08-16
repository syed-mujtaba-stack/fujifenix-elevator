"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/app/data/content";

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  Afghanistan: ["Kabul", "Herat", "Mazar-i-Sharif"],
  Albania: ["Tirana", "Durrës", "Vlorë"],
  Algeria: ["Algiers", "Oran", "Constantine"],
  Angola: ["Luanda", "Huambo", "Lobito"],
  Argentina: ["Buenos Aires", "Córdoba", "Rosario"],
  Armenia: ["Yerevan", "Gyumri", "Vanadzor"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  Austria: ["Vienna", "Graz", "Linz", "Salzburg"],
  Azerbaijan: ["Baku", "Ganja", "Sumqayit"],
  Bahamas: ["Nassau", "Freeport"],
  Bahrain: ["Manama", "Riffa", "Muharraq"],
  Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Sylhet"],
  Barbados: ["Bridgetown", "Speightstown"],
  Belarus: ["Minsk", "Gomel", "Mogilev"],
  Belgium: ["Brussels", "Antwerp", "Ghent", "Liège"],
  Benin: ["Porto-Novo", "Cotonou"],
  Bhutan: ["Thimphu", "Phuntsholing"],
  Bolivia: ["La Paz", "Santa Cruz", "Cochabamba"],
  "Bosnia and Herzegovina": ["Sarajevo", "Banja Luka", "Tuzla"],
  Botswana: ["Gaborone", "Francistown", "Maun"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Belo Horizonte"],
  Brunei: ["Bandar Seri Begawan", "Tutong"],
  Bulgaria: ["Sofia", "Plovdiv", "Varna", "Burgas"],
  "Burkina Faso": ["Ouagadougou", "Bobo-Dioulasso"],
  Burundi: ["Bujumbura", "Gitega"],
  Cambodia: ["Phnom Penh", "Siem Reap", "Battambang"],
  Cameroon: ["Yaoundé", "Douala", "Bamenda"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  "Cape Verde": ["Praia", "Mindelo"],
  Chad: ["N'Djamena", "Moundou"],
  Chile: ["Santiago", "Valparaíso", "Concepción"],
  China: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Hangzhou", "Chengdu", "Wuhan", "Hong Kong"],
  Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
  Comoros: ["Moroni", "Mutsamudu"],
  Congo: ["Brazzaville", "Pointe-Noire"],
  "Costa Rica": ["San José", "Limón", "Cartago"],
  Croatia: ["Zagreb", "Split", "Rijeka", "Dubrovnik"],
  Cuba: ["Havana", "Santiago de Cuba", "Camagüey"],
  Cyprus: ["Nicosia", "Limassol", "Larnaca"],
  "Czech Republic": ["Prague", "Brno", "Ostrava", "Plzeň"],
  Denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
  Djibouti: ["Djibouti City"],
  Dominica: ["Roseau", "Portsmouth"],
  "Dominican Republic": ["Santo Domingo", "Santiago", "La Romana"],
  "East Timor": ["Dili", "Baucau"],
  Ecuador: ["Quito", "Guayaquil", "Cuenca"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Luxor"],
  "El Salvador": ["San Salvador", "Santa Ana", "San Miguel"],
  Eritrea: ["Asmara", "Keren", "Massawa"],
  Estonia: ["Tallinn", "Tartu", "Narva"],
  Ethiopia: ["Addis Ababa", "Dire Dawa", "Mekelle"],
  Fiji: ["Suva", "Nadi", "Lautoka"],
  Finland: ["Helsinki", "Espoo", "Tampere", "Turku"],
  France: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
  Gabon: ["Libreville", "Port-Gentil", "Franceville"],
  Gambia: ["Banjul", "Serekunda"],
  Georgia: ["Tbilisi", "Batumi", "Kutaisi"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Düsseldorf"],
  Ghana: ["Accra", "Kumasi", "Tamale", "Takoradi"],
  Greece: ["Athens", "Thessaloniki", "Patras", "Heraklion"],
  Guatemala: ["Guatemala City", "Quetzaltenango", "Escuintla"],
  Guinea: ["Conakry", "Nzérékoré", "Kankan"],
  "Guinea-Bissau": ["Bissau", "Bafatá"],
  Guyana: ["Georgetown", "Linden"],
  Haiti: ["Port-au-Prince", "Cap-Haïtien", "Gonaïves"],
  Honduras: ["Tegucigalpa", "San Pedro Sula", "Choloma"],
  Hungary: ["Budapest", "Debrecen", "Szeged", "Miskolc"],
  Iceland: ["Reykjavik", "Kópavogur", "Hafnarfjörður"],
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"],
  Indonesia: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"],
  Iran: ["Tehran", "Isfahan", "Mashhad", "Shiraz", "Tabriz"],
  Iraq: ["Baghdad", "Basra", "Erbil", "Mosul"],
  Ireland: ["Dublin", "Cork", "Galway", "Limerick"],
  Israel: ["Jerusalem", "Tel Aviv", "Haifa", "Be'er Sheva"],
  Italy: ["Rome", "Milan", "Naples", "Turin", "Florence"],
  "Ivory Coast": ["Abidjan", "Bouaké", "Yamoussoukro"],
  Jamaica: ["Kingston", "Montego Bay", "Spanish Town"],
  Japan: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Kyoto"],
  Jordan: ["Amman", "Zarqa", "Irbid", "Aqaba"],
  Kazakhstan: ["Astana", "Almaty", "Shymkent", "Karaganda"],
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
  Kuwait: ["Kuwait City", "Hawalli", "Salmiya"],
  Kyrgyzstan: ["Bishkek", "Osh", "Jalal-Abad"],
  Laos: ["Vientiane", "Luang Prabang", "Savannakhet"],
  Latvia: ["Riga", "Daugavpils", "Liepāja"],
  Lebanon: ["Beirut", "Tripoli", "Sidon", "Tyre"],
  Liberia: ["Monrovia", "Gbarnga"],
  Libya: ["Tripoli", "Benghazi", "Misrata"],
  Lithuania: ["Vilnius", "Kaunas", "Klaipėda", "Šiauliai"],
  Luxembourg: ["Luxembourg City", "Esch-sur-Alzette"],
  Madagascar: ["Antananarivo", "Toamasina", "Antsirabe"],
  Malawi: ["Lilongwe", "Blantyre", "Mzuzu"],
  Malaysia: ["Kuala Lumpur", "Penang", "Johor Bahru", "Kota Kinabalu", "Kuching"],
  Maldives: ["Malé", "Addu City"],
  Mali: ["Bamako", "Sikasso", "Mopti"],
  Malta: ["Valletta", "Birkirkara", "Mosta"],
  Mauritania: ["Nouakchott", "Nouadhibou"],
  Mauritius: ["Port Louis", "Beau Bassin-Rose Hill", "Vacoas-Phoenix"],
  Mexico: ["Mexico City", "Monterrey", "Guadalajara", "Puebla", "Tijuana"],
  Moldova: ["Chișinău", "Tiraspol", "Bălți"],
  Monaco: ["Monaco"],
  Mongolia: ["Ulaanbaatar", "Erdenet", "Darkhan"],
  Montenegro: ["Podgorica", "Nikšić", "Herceg Novi"],
  Morocco: ["Casablanca", "Rabat", "Marrakech", "Fez", "Tangier"],
  Mozambique: ["Maputo", "Beira", "Nampula"],
  Myanmar: ["Yangon", "Mandalay", "Naypyidaw"],
  Namibia: ["Windhoek", "Rundu", "Walvis Bay"],
  Nepal: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"],
  Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
  "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton"],
  Nicaragua: ["Managua", "León", "Masaya"],
  Niger: ["Niamey", "Zinder", "Maradi"],
  Nigeria: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
  "North Korea": ["Pyongyang", "Hamhung", "Chongjin"],
  "North Macedonia": ["Skopje", "Bitola", "Kumanovo"],
  Norway: ["Oslo", "Bergen", "Trondheim", "Stavanger"],
  Oman: ["Muscat", "Salalah", "Sohar"],
  Pakistan: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi"],
  Palestine: ["Ramallah", "Gaza City", "Hebron"],
  Panama: ["Panama City", "San Miguelito", "Colón"],
  "Papua New Guinea": ["Port Moresby", "Lae", "Mount Hagen"],
  Paraguay: ["Asunción", "Ciudad del Este", "Encarnación"],
  Peru: ["Lima", "Arequipa", "Trujillo", "Cusco"],
  Philippines: ["Manila", "Cebu", "Davao", "Quezon City", "Makati"],
  Poland: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań"],
  Portugal: ["Lisbon", "Porto", "Faro", "Braga"],
  Qatar: ["Doha", "Al Wakrah", "Al Khor"],
  Romania: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași"],
  Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan"],
  Rwanda: ["Kigali", "Butare", "Gitarama"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"],
  Senegal: ["Dakar", "Thiès", "Saint-Louis"],
  Serbia: ["Belgrade", "Novi Sad", "Niš", "Kragujevac"],
  Seychelles: ["Victoria"],
  "Sierra Leone": ["Freetown", "Bo", "Kenema"],
  Singapore: ["Singapore"],
  Slovakia: ["Bratislava", "Košice", "Prešov", "Žilina"],
  Slovenia: ["Ljubljana", "Maribor", "Celje", "Kranj"],
  Somalia: ["Mogadishu", "Hargeisa", "Kismayo"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
  "South Sudan": ["Juba", "Wau", "Malakal"],
  Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
  "Sri Lanka": ["Colombo", "Kandy", "Galle", "Jaffna"],
  Sudan: ["Khartoum", "Omdurman", "Port Sudan"],
  Suriname: ["Paramaribo", "Lelydorp"],
  Sweden: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
  Switzerland: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
  Syria: ["Damascus", "Aleppo", "Homs", "Latakia"],
  Taiwan: ["Taipei", "Kaohsiung", "Taichung", "Tainan"],
  Tajikistan: ["Dushanbe", "Khujand", "Kulob"],
  Tanzania: ["Dar es Salaam", "Dodoma", "Arusha", "Mwanza"],
  Thailand: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Nakhon Ratchasima"],
  Togo: ["Lomé", "Sokodé", "Kara"],
  Tonga: ["Nuku'alofa"],
  "Trinidad and Tobago": ["Port of Spain", "San Fernando", "Chaguanas"],
  Tunisia: ["Tunis", "Sfax", "Sousse", "Kairouan"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  Turkmenistan: ["Ashgabat", "Türkmenabat", "Daşoguz"],
  Uganda: ["Kampala", "Gulu", "Lira", "Mbarara"],
  Ukraine: ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Francisco"],
  Uruguay: ["Montevideo", "Salto", "Punta del Este"],
  Uzbekistan: ["Tashkent", "Samarkand", "Bukhara", "Namangan"],
  Vanuatu: ["Port Vila", "Luganville"],
  Venezuela: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto"],
  Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hải Phòng", "Can Tho"],
  Yemen: ["Sana'a", "Aden", "Taiz"],
  Zambia: ["Lusaka", "Kitwe", "Ndola"],
  Zimbabwe: ["Harare", "Bulawayo", "Chitungwiza"],
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const cities = CITIES_BY_COUNTRY[country] || [];

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            FULL NAME *
          </label>
          <input id="name" name="name" type="text" required className="ff-field" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            EMAIL *
          </label>
          <input id="email" name="email" type="email" required className="ff-field" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            PHONE
          </label>
          <input id="phone" name="phone" type="tel" className="ff-field" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="country" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            COUNTRY *
          </label>
          <select
            id="country"
            name="country"
            className="ff-field"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            CITY
          </label>
          {cities.length > 0 ? (
            <select id="city" name="city" className="ff-field">
              <option value="">Select your city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : (
            <input id="city" name="city" type="text" placeholder="Enter your city" className="ff-field" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            SUBJECT
          </label>
          <select id="subject" name="subject" className="ff-field">
            <option>Passenger Elevators</option>
            <option>Home Elevators</option>
            <option>Escalators & Moving Walks</option>
            <option>After-Sales & Maintenance</option>
            <option>Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="message" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            MESSAGE *
          </label>
          <textarea id="message" name="message" rows={5} required className="ff-field resize-none" />
        </div>
        <div className="sm:col-span-2 flex flex-col items-start gap-4">
          <button
            type="submit"
            className="group inline-flex items-center gap-4 bg-[#2563EB] text-white px-8 py-4 eyebrow hover:bg-[#1d4ed8] transition-colors"
          >
            SEND MESSAGE
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          {submitted && (
            <p
              className="eyebrow text-[#2563EB]"
              style={{ fontSize: "12px" }}
            >
              Thank you! Please reach us at {CONTACT.email} or call {CONTACT.phone}.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

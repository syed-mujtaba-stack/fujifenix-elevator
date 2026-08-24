"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/app/data/content";
import { submitContact } from "@/app/actions/contact";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
  "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
  "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji",
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
  "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
  "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
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
  Bahrain: ["Manama", "Riffa", "Muharraq"],
  Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Sylhet"],
  Belgium: ["Brussels", "Antwerp", "Ghent", "Liège"],
  Bolivia: ["La Paz", "Santa Cruz", "Cochabamba"],
  "Bosnia and Herzegovina": ["Sarajevo", "Banja Luka", "Tuzla"],
  Botswana: ["Gaborone", "Francistown", "Maun"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Belo Horizonte"],
  Bulgaria: ["Sofia", "Plovdiv", "Varna", "Burgas"],
  Cambodia: ["Phnom Penh", "Siem Reap", "Battambang"],
  Cameroon: ["Yaoundé", "Douala", "Bamenda"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  Chile: ["Santiago", "Valparaíso", "Concepción"],
  China: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Hangzhou", "Chengdu", "Wuhan", "Hong Kong"],
  Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
  "Costa Rica": ["San José", "Limón", "Cartago"],
  Croatia: ["Zagreb", "Split", "Rijeka", "Dubrovnik"],
  Cuba: ["Havana", "Santiago de Cuba", "Camagüey"],
  Cyprus: ["Nicosia", "Limassol", "Larnaca"],
  "Czech Republic": ["Prague", "Brno", "Ostrava", "Plzeň"],
  Denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
  "Dominican Republic": ["Santo Domingo", "Santiago", "La Romana"],
  Ecuador: ["Quito", "Guayaquil", "Cuenca"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Luxor"],
  "El Salvador": ["San Salvador", "Santa Ana", "San Miguel"],
  Ethiopia: ["Addis Ababa", "Dire Dawa", "Mekelle"],
  Finland: ["Helsinki", "Espoo", "Tampere", "Turku"],
  France: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
  Georgia: ["Tbilisi", "Batumi", "Kutaisi"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Düsseldorf"],
  Ghana: ["Accra", "Kumasi", "Tamale", "Takoradi"],
  Greece: ["Athens", "Thessaloniki", "Patras", "Heraklion"],
  Guatemala: ["Guatemala City", "Quetzaltenango", "Escuintla"],
  Hungary: ["Budapest", "Debrecen", "Szeged", "Miskolc"],
  Iceland: ["Reykjavik", "Kópavogur"],
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"],
  Indonesia: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"],
  Iran: ["Tehran", "Isfahan", "Mashhad", "Shiraz", "Tabriz"],
  Iraq: ["Baghdad", "Basra", "Erbil", "Mosul"],
  Ireland: ["Dublin", "Cork", "Galway", "Limerick"],
  Israel: ["Jerusalem", "Tel Aviv", "Haifa"],
  Italy: ["Rome", "Milan", "Naples", "Turin", "Florence"],
  "Ivory Coast": ["Abidjan", "Bouaké", "Yamoussoukro"],
  Jamaica: ["Kingston", "Montego Bay"],
  Japan: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Kyoto"],
  Jordan: ["Amman", "Zarqa", "Irbid", "Aqaba"],
  Kazakhstan: ["Astana", "Almaty", "Shymkent"],
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
  Kuwait: ["Kuwait City", "Hawalli", "Salmiya"],
  Latvia: ["Riga", "Daugavpils", "Liepāja"],
  Lebanon: ["Beirut", "Tripoli", "Sidon"],
  Libya: ["Tripoli", "Benghazi", "Misrata"],
  Lithuania: ["Vilnius", "Kaunas", "Klaipėda"],
  Luxembourg: ["Luxembourg City", "Esch-sur-Alzette"],
  Malaysia: ["Kuala Lumpur", "Penang", "Johor Bahru", "Kota Kinabalu", "Kuching"],
  Mexico: ["Mexico City", "Monterrey", "Guadalajara", "Puebla", "Tijuana"],
  Moldova: ["Chișinău", "Tiraspol", "Bălți"],
  Morocco: ["Casablanca", "Rabat", "Marrakech", "Fez", "Tangier"],
  Mozambique: ["Maputo", "Beira", "Nampula"],
  Myanmar: ["Yangon", "Mandalay", "Naypyidaw"],
  Nepal: ["Kathmandu", "Pokhara", "Lalitpur"],
  Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
  "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton"],
  Nigeria: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
  Norway: ["Oslo", "Bergen", "Trondheim", "Stavanger"],
  Oman: ["Muscat", "Salalah", "Sohar"],
  Pakistan: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi"],
  Palestine: ["Ramallah", "Gaza City", "Hebron"],
  Peru: ["Lima", "Arequipa", "Trujillo", "Cusco"],
  Philippines: ["Manila", "Cebu", "Davao", "Quezon City", "Makati"],
  Poland: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań"],
  Portugal: ["Lisbon", "Porto", "Faro", "Braga"],
  Qatar: ["Doha", "Al Wakrah", "Al Khor"],
  Romania: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași"],
  Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg"],
  Rwanda: ["Kigali", "Butare"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"],
  Senegal: ["Dakar", "Thiès", "Saint-Louis"],
  Serbia: ["Belgrade", "Novi Sad", "Niš"],
  Singapore: ["Singapore"],
  Slovakia: ["Bratislava", "Košice", "Prešov"],
  Slovenia: ["Ljubljana", "Maribor", "Celje"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
  Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
  "Sri Lanka": ["Colombo", "Kandy", "Galle"],
  Sweden: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
  Switzerland: ["Zurich", "Geneva", "Basel", "Bern"],
  Syria: ["Damascus", "Aleppo", "Homs"],
  Taiwan: ["Taipei", "Kaohsiung", "Taichung"],
  Tanzania: ["Dar es Salaam", "Dodoma", "Arusha"],
  Thailand: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"],
  Tunisia: ["Tunis", "Sfax", "Sousse"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  Uganda: ["Kampala", "Gulu", "Mbarara"],
  Ukraine: ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Francisco"],
  Uruguay: ["Montevideo", "Salto"],
  Uzbekistan: ["Tashkent", "Samarkand", "Bukhara"],
  Venezuela: ["Caracas", "Maracaibo", "Valencia"],
  Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hải Phòng"],
  Yemen: ["Sana'a", "Aden", "Taiz"],
  Zambia: ["Lusaka", "Kitwe", "Ndola"],
  Zimbabwe: ["Harare", "Bulawayo"],
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [country, setCountry] = useState("");

  const cities = CITIES_BY_COUNTRY[country] ?? [];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    const data = new FormData(e.currentTarget);

    const result = await submitContact({
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: (data.get("phone") as string) || undefined,
      country: (data.get("country") as string) || undefined,
      city: (data.get("city") as string) || undefined,
      subject: (data.get("subject") as string) || undefined,
      message: data.get("message") as string,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-10 text-center flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#0047BB]/10 flex items-center justify-center text-[#0047BB] text-2xl">
          ✓
        </div>
        <p className="heading text-[#0f172a]" style={{ fontSize: "22px" }}>
          MESSAGE SENT
        </p>
        <p className="body-text text-slate-500" style={{ fontSize: "15px" }}>
          Thank you! We&apos;ll get back to you within 24 hours. You can also reach us at{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-[#0047BB] hover:underline">
            {CONTACT.email}
          </a>{" "}
          or call{" "}
          <a href={CONTACT.phoneHref} className="text-[#0047BB] hover:underline">
            {CONTACT.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            FULL NAME *
          </label>
          <input id="cf-name" name="name" type="text" required className="ff-field" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            EMAIL *
          </label>
          <input id="cf-email" name="email" type="email" required className="ff-field" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-phone" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            PHONE
          </label>
          <input id="cf-phone" name="phone" type="tel" className="ff-field" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-country" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            COUNTRY *
          </label>
          <select
            id="cf-country"
            name="country"
            required
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
          <label htmlFor="cf-city" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            CITY
          </label>
          {cities.length > 0 ? (
            <select id="cf-city" name="city" className="ff-field">
              <option value="">Select your city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : (
            <input id="cf-city" name="city" type="text" placeholder="Enter your city" className="ff-field" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-subject" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            SUBJECT
          </label>
          <select id="cf-subject" name="subject" className="ff-field">
            <option value="">Select a subject</option>
            <option>Passenger Elevators</option>
            <option>Home Elevators</option>
            <option>Escalators &amp; Moving Walks</option>
            <option>After-Sales &amp; Maintenance</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="cf-message" className="eyebrow text-slate-500" style={{ fontSize: "11px" }}>
            MESSAGE *
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            required
            className="ff-field resize-none"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col items-start gap-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex items-center gap-4 bg-[#0047BB] text-white px-8 py-4 eyebrow hover:bg-[#003A94] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "SENDING…" : "SEND MESSAGE"}
            {status !== "submitting" && (
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            )}
          </button>

          {status === "error" && (
            <p className="eyebrow text-red-500" style={{ fontSize: "12px" }}>
              {errorMsg}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/app/data/content";

const COUNTRIES = [
  "China",
  "United Arab Emirates",
  "Saudi Arabia",
  "India",
  "Pakistan",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "South Korea",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Thailand",
  "Turkey",
  "Egypt",
  "Nigeria",
  "South Africa",
  "Brazil",
  "Mexico",
  "Canada",
  "Other",
];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  China: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Hangzhou", "Chengdu", "Wuhan", "Other"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Other"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Other"],
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Other"],
  Pakistan: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Other"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Other"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Other"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Other"],
  France: ["Paris", "Lyon", "Marseille", "Other"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Other"],
  Japan: ["Tokyo", "Osaka", "Yokohama", "Other"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Other"],
  Singapore: ["Singapore"],
  Malaysia: ["Kuala Lumpur", "Penang", "Johor Bahru", "Other"],
  Indonesia: ["Jakarta", "Surabaya", "Bandung", "Other"],
  Philippines: ["Manila", "Cebu", "Other"],
  Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Other"],
  Thailand: ["Bangkok", "Chiang Mai", "Other"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Other"],
  Egypt: ["Cairo", "Alexandria", "Other"],
  Nigeria: ["Lagos", "Abuja", "Other"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Other"],
  Brazil: ["Sao Paulo", "Rio de Janeiro", "Other"],
  Mexico: ["Mexico City", "Monterrey", "Guadalajara", "Other"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Other"],
  Other: [],
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

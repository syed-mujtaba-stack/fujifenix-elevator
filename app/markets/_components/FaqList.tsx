interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="border-t border-slate-200">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-slate-200 py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
            <span className="subheading text-[14px] leading-snug text-[#0f172a] md:text-[15px]">
              {faq.question}
            </span>
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-slate-300 text-[16px] leading-none text-[#0047BB] transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-slate-500 md:text-[15px]">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

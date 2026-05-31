import { FAQ_ITEMS } from '@/lib/static-content'

export default function FaqSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 py-28">

        <h2 className="text-[36px] sm:text-[48px] font-bold text-[#0b1b35] text-center leading-[1.1] tracking-[-2.4px] mb-16">
          자주 묻는 질문 (FAQ)
        </h2>

        <div className="max-w-[896px] mx-auto flex flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-[14px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
            >
              <div className="bg-[#d6f2ff] px-7 py-5">
                <p className="text-[18px] font-bold text-[#0b1b35] leading-7 mb-1">
                  {i + 1}. {item.question}
                </p>
                <p className="text-[16px] font-medium text-[#45556c] leading-7">
                  {item.answer}
                </p>
                {item.link && (
                  <p className="text-[16px] font-medium text-[#45556c] leading-7 mt-1">
                    {'→ '}
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 text-[#314158] hover:text-[#33c3ff] transition-colors"
                    >
                      {item.link.text}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

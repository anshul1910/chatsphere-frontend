const features = ["Live delivery", "Group rooms", "Read receipts"];

export function LoginHero() {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
        Real-time messaging
      </p>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] font-bold text-fg lg:text-7xl">
        Conversations that feel instant.
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-2">
        Direct messages, group rooms, live typing and read receipts, in one
        calm, glassy space.
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {features.map((feature, index) => (
          <span
            key={feature}
            style={{ animationDelay: `${300 + index * 90}ms` }}
            className="animate-fade-up rounded-full border border-line bg-glass px-3.5 py-1.5 text-[13px] font-medium text-fg-2"
          >
            {feature}
          </span>
        ))}
      </div>

      <div className="glass mt-10 hidden max-w-md -rotate-2 flex-col gap-3 rounded-3xl p-5 md:flex">
        <div className="bubble-in max-w-[80%] self-start text-[15px] text-fg">
          Did you see the new design?
        </div>
        <div className="bubble-out max-w-[80%] self-end text-[15px]">
          Looks incredible. Shipping it.
        </div>
        <div
          className="bubble-in flex items-center gap-1.5 self-start py-3.5"
          role="img"
          aria-label="Typing"
        >
          <span className="typing-dot" />
          <span className="typing-dot [animation-delay:150ms]" />
          <span className="typing-dot [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

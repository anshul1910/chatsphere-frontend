import type { ComponentType, SVGProps } from "react";
import { BoltIcon, CheckCheckIcon, UsersIcon } from "../common/icons";

interface Point {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
}

const points: Point[] = [
  {
    icon: BoltIcon,
    title: "Messages arrive live",
    text: "No refreshing, no waiting.",
  },
  {
    icon: UsersIcon,
    title: "Direct chats and group rooms",
    text: "Spin up a room for any crew.",
  },
  {
    icon: CheckCheckIcon,
    title: "Typing and read receipts",
    text: "Know when it has been seen.",
  },
];

export function RegisterHero() {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
        Join ChatSphere
      </p>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] font-bold text-fg lg:text-6xl">
        Your people. One sphere.
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-2">
        Create an account in seconds and start chatting one-to-one or with the
        whole crew.
      </p>

      <div className="mt-8 flex max-w-md flex-col gap-3.5">
        {points.map(({ icon: PointIcon, title, text }, index) => (
          <div
            key={title}
            style={{ animationDelay: `${250 + index * 100}ms` }}
            className="glass flex animate-fade-up items-center gap-4 rounded-2xl px-5 py-4"
          >
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-action text-white">
              <PointIcon />
            </div>
            <div>
              <p className="text-base font-semibold text-fg">{title}</p>
              <p className="mt-0.5 text-sm text-fg-3">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

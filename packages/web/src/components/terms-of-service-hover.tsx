import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

export const TermsOfServiceHover: React.FC = (): JSX.Element => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className="text-sm text-gray-500 underline underline-dotted cursor-pointer">
          Terms of Service
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm text-gray-400">
        <p>
          This site was built as a playground to explore <b>AWS AppSync</b>. If
          you haven’t explored it yet, you should—it’s seriously impressive.
        </p>
        <div className="mt-2 border-t border-dotted pt-2">
          <p>
            That said, this site includes basic auth features I built myself to
            support some chat functionality. It’s the <b>bare minimum</b>{" "}
            username/password auth. I wouldn’t use credentials you care about,
            and you should use this site at your own risk.
          </p>
          <p className="mt-1 font-semibold">
            HAPPY CHATTING. ENJOY THE SERVERLESS WEBSOCKETS!
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

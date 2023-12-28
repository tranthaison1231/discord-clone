import { Button, Html, Tailwind } from "@react-email/components";

interface Props {
  url: string;
}

export const ForgotPassword = ({ url }: Props) => (
  <Html lang="en">
    <Tailwind>
      <Button
        className="bg-[#000000] px-6 py-2 rounded text-white text-[12px] font-semibold no-underline text-center"
        href={url}
      >
        Join the team
      </Button>
    </Tailwind>
  </Html>
);

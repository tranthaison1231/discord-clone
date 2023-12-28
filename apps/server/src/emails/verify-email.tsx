import { Button, Html } from "@react-email/components";

interface Props {
  url: string;
}

export const VerifyEmail = ({ url }: Props) => (
  <Html lang="en">
    <Button href={url} style={{ color: "#61dafb" }}>
      Verify Email
    </Button>
  </Html>
);

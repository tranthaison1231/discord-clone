import nitroVideo from "@/assets/videos/nitro.webm";

export default function Component() {
  return (
    <div className="w-full relative">
      <video width="100%" height="100%" autoPlay loop muted>
        <source src={nitroVideo} type="video/webm" />
      </video>
      <div className="absolute w-full top-0">
        <div className="max-w-7xl  mx-auto">
          <header className="h-20 bg-red-500">Hello</header>
          <div className="w-1/3 px-10 mt-40">
            <h1 className="text-7xl text-white font-bold">
              Unleash more fun with Nitro
            </h1>
            <p>
              Subscribe to Nitro to upgrade your emoji, personalize your
              profile, share bigger files, and so much more.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

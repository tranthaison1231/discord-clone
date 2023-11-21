
import fandom from '@/assets/svgs/fandom.svg'
import SectionInView from '@/components/SectionInView';


export default function Component() {
  return (
    <div className="max-w-7xl w-full mx-auto space-y-80">
      <SectionInView className="flex bg-green-500 w-full justify-between gap-10 mt-80">
        <img src={fandom} className="w-1/2" />
        <div className="w-1/3">
          <h1 className="font-bold text-5xl">
            Create an invite- <br /> only place where you belong
          </h1>
          <p className="mt-8 text-xl ">
            Discord servers are organized into topic-based channels where you can collaborate, share, and just talk
            about your day without clogging up a group chat
          </p>
        </div>
      </SectionInView>
      <SectionInView animateClass="animate-fade-right" className="flex w-full bg-pink-100 justify-between gap-10">
        <img src={fandom} className="w-1/2" />
        <div className="w-1/3">
          <h1 className="font-bold text-5xl">
            Create an invite- <br /> only place where you belong
          </h1>
          <p className="mt-8 text-xl ">
            Discord servers are organized into topic-based channels where you can collaborate, share, and just talk
            about your day without clogging up a group chat
          </p>
        </div>
      </SectionInView>
      <SectionInView animateClass="animate-fade-right" className="flex bg-red-500 w-full justify-between gap-10">
        <img src={fandom} className="w-1/2" />
        <div className="w-1/3">
          <h1 className="font-bold text-5xl">
            Create an invite- <br /> only place where you belong
          </h1>
          <p className="mt-8 text-xl ">
            Discord servers are organized into topic-based channels where you can collaborate, share, and just talk
            about your day without clogging up a group chat
          </p>
        </div>
      </SectionInView>
    </div>
  );
}

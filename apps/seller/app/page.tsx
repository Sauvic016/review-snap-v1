import { Landing } from "@/components/landing/Landing";

export default function Home() {
  return (
    <div className="flex flex-col items-center absolute top-0 w-screen transform bg-white bg-[radial-gradient(circle, rgba(176,176,169,0.06214985994397759) 28%, rgba(252,225,132,0.9159313383556548) 62%)]">
      <Landing />
    </div>
  );
}

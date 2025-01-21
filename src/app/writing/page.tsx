import WholePage from "@/components/pages/writing/root/WholePage";

export async function generateMetadata() {
  return {
    title: "Akshith Garapati | Writing",
    description:
      'A list of the "blog" posts that I write alongside the microblog I keep track of. Written and maintained by Akshith Garapati.',
    openGraph: {
      title: "Akshith Garapati | Writing",
      description:
        'A list of the "blog" posts that I write alongside the microblog I keep track of. Written and maintained by Akshith Garapati.',
      url: `https://akshith.io/writing/`,
      siteName: "Akshith Garapati",
    },
  };
}

export default function WritingPage() {
  return (
    <>
      <WholePage />
    </>
  );
}

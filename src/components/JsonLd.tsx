import { gym } from "@/lib/content";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["HealthClub", "LocalBusiness"],
    name: gym.name,
    description:
      "Wirral's original CrossFit gym since 2012. Coached group classes for every level in Birkenhead. First session free.",
    image: "https://crossfitwirral.co.uk/gym/p11.jpg",
    url: "https://crossfitwirral.co.uk",
    telephone: gym.phoneIntl,
    email: gym.email,
    priceRange: "££",
    slogan: gym.tagline,
    foundingDate: String(gym.established),
    founder: { "@type": "Person", name: "Chris Lawler" },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${gym.address.line1}, Appin Road`,
      addressLocality: "Birkenhead",
      addressRegion: "Merseyside",
      postalCode: gym.address.postcode,
      addressCountry: "GB",
    },
    sameAs: [gym.social.instagram, gym.social.facebook],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "06:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "07:00",
        closes: "12:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import { Festival } from "@/lib/schemas/festival";

export const festivals: Festival[] = [
  {
    slug: "rock-fest-2024",
    name: "Rock Fest 2024",
    date: "2024-07-15",
    location: {
      city: "Austin",
      country: "USA",
      venue: "Zilker Park",
      coordinates: { lat: 30.2672, lng: -97.7431 },
    },
    stage: "Main Stage",
    descriptionMD: `Our headlining performance at Rock Fest 2024 was nothing short of spectacular. Playing to a crowd of over 50,000 passionate rock fans, we delivered a high-energy set that showcased both our classic hits and new material from "Electric Nights."

The festival atmosphere was electric, with fans singing along to every word. Our performance of "Thunder Road" during the golden hour sunset created one of those magical moments that remind us why we do this.

This festival marked a significant milestone in our career, being our largest headlining slot to date. The production value was incredible, with a massive LED wall backdrop and pyrotechnics that perfectly complemented our sound.`,
    photos: [
      {
        url: "/images/festivals/rock-fest-2024-1.jpg",
        caption: "Opening with 'Electric Storm' as the sun set over Austin",
        photographer: "Sarah Mitchell",
      },
      {
        url: "/images/festivals/rock-fest-2024-2.jpg",
        caption: "The crowd during our performance of 'Thunder Road'",
        photographer: "Mike Rodriguez",
      },
      {
        url: "/images/festivals/rock-fest-2024-3.jpg",
        caption: "Maya's guitar solo during 'Steel Heart'",
        photographer: "Sarah Mitchell",
      },
    ],
    videos: [
      {
        url: "https://youtube.com/watch?v=example1",
        title: "Thunder Road - Live at Rock Fest 2024",
        thumbnail: "/images/video-thumbs/thunder-road-live.jpg",
        platform: "youtube",
      },
    ],
    setlist: [
      "Electric Storm",
      "Neon Dreams",
      "Rebel Soul",
      "Steel Heart",
      "Midnight Fire",
      "Thunder Road",
    ],
    pressQuotes: [
      {
        quote:
          "RockBand's headlining set was the perfect culmination of Rock Fest 2024. Their energy was infectious and their musicianship was flawless.",
        source: "Austin Music Weekly",
        author: "Jennifer Clark",
        url: "https://example.com/review1",
      },
    ],
    status: "completed",
  },
  {
    slug: "summer-sonic-2024",
    name: "Summer Sonic Festival",
    date: "2024-08-20",
    location: {
      city: "Tokyo",
      country: "Japan",
      venue: "Makuhari Messe",
      coordinates: { lat: 35.6479, lng: 140.0341 },
    },
    stage: "Mountain Stage",
    descriptionMD: `Our international debut at Summer Sonic was an unforgettable experience. Playing to a Japanese audience for the first time, we were blown away by the enthusiasm and respect of the crowd.

The festival's organization was impeccable, and sharing the stage with international acts was both humbling and inspiring. The cultural exchange through music was profound - despite the language barrier, the universal language of rock connected us with every person in that audience.

This performance opened our eyes to the global potential of our music and has inspired us to plan a full international tour in 2025.`,
    photos: [
      {
        url: "/images/festivals/summer-sonic-2024-1.jpg",
        caption: "First time performing in Japan - an incredible experience",
        photographer: "Takeshi Yamamoto",
      },
      {
        url: "/images/festivals/summer-sonic-2024-2.jpg",
        caption: "The respectful and energetic Japanese crowd",
        photographer: "Takeshi Yamamoto",
      },
    ],
    videos: [
      {
        url: "https://youtube.com/watch?v=example2",
        title: "Midnight Fire - Live at Summer Sonic 2024",
        thumbnail: "/images/video-thumbs/midnight-fire-live.jpg",
        platform: "youtube",
      },
    ],
    setlist: [
      "Thunder Road",
      "Midnight Fire",
      "Steel Heart",
      "Neon Dreams",
      "Rebel Soul",
    ],
    pressQuotes: [
      {
        quote:
          "The American rock band delivered a performance that transcended language barriers and connected with the Japanese audience on a visceral level.",
        source: "Tokyo Music Scene",
        author: "Hiroshi Tanaka",
      },
    ],
    status: "completed",
  },
  {
    slug: "coachella-2025",
    name: "Coachella Valley Music Festival",
    date: "2025-04-12",
    location: {
      city: "Indio",
      country: "USA",
      venue: "Empire Polo Club",
      coordinates: { lat: 33.6803, lng: -116.2378 },
    },
    stage: "Sahara Tent",
    descriptionMD: `We're thrilled to announce our upcoming performance at Coachella 2025! This will be our first time at one of the world's most prestigious music festivals.

Playing at Coachella has been a dream of ours since we started the band. The festival's reputation for launching careers and creating iconic moments makes this opportunity incredibly special.

We're planning a special setlist that will include some surprises and possibly debut new material. Stay tuned for more details as we get closer to the date!`,
    photos: [
      {
        url: "/images/festivals/summer-sonic-2024-1.jpg",
        caption: "First time performing in Japan - an incredible experience",
        photographer: "Takeshi Yamamoto",
      },
      {
        url: "/images/festivals/summer-sonic-2024-2.jpg",
        caption: "The respectful and energetic Japanese crowd",
        photographer: "Takeshi Yamamoto",
      },
    ],
    videos: [],
    setlist: [], // TBA
    pressQuotes: [],
    ticketUrl: "https://coachella.com/tickets",
    status: "upcoming",
  },
];

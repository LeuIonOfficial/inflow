import { Member } from "@/lib/schemas/member";

export const members: Member[] = [
  {
    slug: "alex-thunder",
    name: "Alex Thunder",
    role: "Lead Vocalist & Rhythm Guitar",
    bioMD: `Alex Thunder is the powerhouse voice and creative force behind INFLOW. With over 15 years of experience in the music industry, Alex's distinctive vocal style and commanding stage presence have become the band's signature.

Born and raised in Chișinău, Moldova, Alex grew up surrounded by the city's diverse musical heritage, blending Eastern European influences with modern rock. From garage bands in high school to opening for major acts, Alex's journey to the spotlight has been one of dedication and raw talent.

When not touring, Alex spends time writing lyrics and composing melodies, often drawing inspiration from personal experiences and social commentary. Known for connecting deeply with audiences, Alex believes music should move people both emotionally and physically.`,
    photo: "/images/band/alex-thunder.jpg",
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/alexthunder",
        handle: "@alexthunder",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/alexthunder",
        handle: "@alexthunder",
      },
    ],
    joinedYear: 2018,
    instruments: ["Vocals", "Rhythm Guitar", "Piano"],
  },
  {
    slug: "maya-steel",
    name: "Maya Steel",
    role: "Lead Guitar",
    bioMD: `Maya Steel's guitar wizardry is the driving force behind INFLOW's electrifying sound. Her technical prowess combined with emotional depth creates solos that are both technically impressive and deeply moving.

A classically trained musician who rebelled into rock, Maya brings a unique perspective to the band's sound. Her background in jazz and classical music adds sophisticated harmonies and unexpected chord progressions to their rock foundation.

Maya is also the band's primary arranger, taking Alex's raw compositions and transforming them into the complex, layered tracks that fans know and love. Her attention to detail and perfectionist approach ensures every note serves the song.`,
    photo: "/images/band/maya-steel.jpg",
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/mayasteel",
        handle: "@mayasteel",
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/mayasteel",
        handle: "Maya Steel",
      },
    ],
    joinedYear: 2018,
    instruments: ["Lead Guitar", "Bass Guitar", "Mandolin"],
  },
  {
    slug: "rick-bass",
    name: "Rick Bass",
    role: "Bass Guitar",
    bioMD: `Rick Bass provides the thunderous low-end that makes INFLOW's sound so distinctive. His bass lines don't just support the music—they drive it forward with relentless energy and groove.

Coming from a funk and R&B background, Rick brings a rhythmic sensibility that sets the band apart from typical rock acts. His ability to lock in with the drums creates an unshakeable foundation that allows the rest of the band to soar.

Rick is also the band's most experienced touring musician, having played with several notable acts before joining INFLOW. His professionalism and stage experience help keep the band grounded during high-energy performances.`,
    photo: "/images/band/rick-bass.jpg",
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/rickbass",
        handle: "@rickbass",
      },
    ],
    joinedYear: 2019,
    instruments: ["Bass Guitar", "Upright Bass"],
  },
  {
    slug: "danny-drums",
    name: "Danny Drums",
    role: "Drums & Percussion",
    bioMD: `Danny Drums is the heartbeat of INFLOW. His powerful, precise drumming provides the backbone for every song, while his creative fills and dynamic playing keep audiences on the edge of their seats.

A multi-instrumentalist who chose drums as his primary focus, Danny's understanding of melody and harmony informs his rhythmic choices. He doesn't just keep time—he contributes to the musical conversation with every beat.

Danny joined the band in 2020, bringing fresh energy and a modern approach to rock drumming. His incorporation of electronic elements and unconventional percussion instruments has helped evolve the band's sound while maintaining their rock roots.`,
    photo: "/images/band/danny-drums.jpg",
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/dannydrums",
        handle: "@dannydrums",
      },
      {
        platform: "TikTok",
        url: "https://tiktok.com/@dannydrums",
        handle: "@dannydrums",
      },
    ],
    joinedYear: 2020,
    instruments: ["Drums", "Percussion", "Electronic Pads"],
  },
];

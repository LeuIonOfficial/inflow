import { defineField, defineType } from "sanity";

export default defineType({
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trackId",
      title: "Track ID",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "Format: MM:SS (e.g., 4:32)",
      validation: (Rule) =>
        Rule.required().regex(/^[0-9]+:[0-5][0-9]$/, {
          name: "duration",
          invert: false,
        }),
    }),
    defineField({
      name: "cover",
      title: "Cover Art",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "audioFile",
      title: "Audio File",
      type: "file",
      options: {
        accept: "audio/*",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "album",
      title: "Album",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Release Year",
      type: "number",
      validation: (Rule) => Rule.min(2000).max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: "isSingle",
      title: "Is Single",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "string",
      options: {
        list: [
          { title: "Rock", value: "Rock" },
          { title: "Alternative Rock", value: "Alternative Rock" },
          { title: "Progressive Rock", value: "Progressive Rock" },
          { title: "Hard Rock", value: "Hard Rock" },
          { title: "Metal", value: "Metal" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  orderings: [
    {
      title: "Release Year, New",
      name: "yearDesc",
      by: [
        { field: "year", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "album",
      media: "cover",
    },
  },
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "festival",
  title: "Festival",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Festival Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "city",
          title: "City",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "country",
          title: "Country",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "venue",
          title: "Venue",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "coordinates",
          title: "Coordinates",
          type: "object",
          fields: [
            {
              name: "lat",
              title: "Latitude",
              type: "number",
            },
            {
              name: "lng",
              title: "Longitude",
              type: "number",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "stage",
      title: "Stage",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "photographer",
              title: "Photographer",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "url",
              title: "Video URL",
              type: "url",
            },
            {
              name: "title",
              title: "Video Title",
              type: "string",
            },
            {
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
            },
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "YouTube", value: "youtube" },
                  { title: "Vimeo", value: "vimeo" },
                  { title: "Direct", value: "direct" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "setlist",
      title: "Setlist",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "pressQuotes",
      title: "Press Quotes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quote",
              title: "Quote",
              type: "text",
            },
            {
              name: "source",
              title: "Source",
              type: "string",
            },
            {
              name: "author",
              title: "Author",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket URL",
      type: "url",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "completed",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "date",
      media: "photos.0.image",
    },
  },
});

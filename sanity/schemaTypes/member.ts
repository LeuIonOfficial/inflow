import { defineField, defineType } from "sanity";

export default defineType({
  name: "member",
  title: "Band Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socials",
      title: "Social Media",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "Instagram" },
                  { title: "Twitter", value: "Twitter" },
                  { title: "Facebook", value: "Facebook" },
                  { title: "YouTube", value: "YouTube" },
                  { title: "TikTok", value: "TikTok" },
                ],
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
            {
              name: "handle",
              title: "Handle",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "joinedYear",
      title: "Joined Year",
      type: "number",
      validation: (Rule) => Rule.min(2000).max(new Date().getFullYear()),
    }),
    defineField({
      name: "instruments",
      title: "Instruments",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});

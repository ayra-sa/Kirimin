import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'nearest',
  title: 'Nearest',
  type: 'document',
  fields: [
    defineField({
      name: 'restaurant_of_choice',
      title: 'Restaurant of Choice',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    }),
  ],
})

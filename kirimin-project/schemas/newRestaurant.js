import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'new_restaurant',
  title: 'New Restaurant',
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

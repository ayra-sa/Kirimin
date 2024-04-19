import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'db5ck59p',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-10-28',
})

export default client
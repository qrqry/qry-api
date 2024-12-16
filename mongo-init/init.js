db = db.getSiblingDB('qrqry')

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['_id', 'email', 'name', 'picture'],
      properties: {
        _id: {
          bsonType: 'objectId',
          description: 'User id. Must be an objectId and is required.',
        },
        email: {
          bsonType: 'string',
          pattern: '^.+@.+\..+$',
          description: 'User email. Must be a string and is required.',
        },
        name: {
          bsonType: 'string',
          description: 'User name. Must be a string and is required.',
        },
        picture: {
          bsonType: 'string',
          description: 'User picture URL. Must be a string.',
        },
      },
      additionalProperties: true,
    },
  },
})
db.users.createIndex({ email: 1 }, { name: 'unique_idx_email' })

db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['_id', 'name'],
      properties: {
        _id: {
          bsonType: 'objectId',
          description: 'Product id. Must be an objectId and is required.',
        },
        name: {
          bsonType: 'string',
          description: 'Product name. Must be a string and is required.',
        },
        txId: {
          bsonType: 'string',
          description: 'Blockchain save transtaction id. Must be a string.',
        },
      },
      additionalProperties: true,
    },
  },
})
db.products.createIndex({ parentId: 1 }, { name: 'idx_parentId' })

db.createCollection('qrs')

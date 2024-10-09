export type User = {
  _id: string,
  email: string,
  name: string,
  addressLine1: string,
  city: string,
  country: string
}

export type Response = {
  message: string,
  user: User
}
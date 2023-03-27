export interface Session {
  id: string | number,
  email: string,
  picture: string,
  data: {
    personal: {
      name: string,
    },
  },
}

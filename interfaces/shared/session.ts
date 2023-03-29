export interface Session {
  id: string,
  username: string,
  email: string,
  profile: {
    id: string,
    name: string,
    bio: string,
    image: string,
  },
  createdAt: Date,
}

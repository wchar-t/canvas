export default interface Board {
  id: string,
  name: string,
  owner: string,
  createdAt: Date,
  updatedAt: Date,
  data?: {
    version: string,
    objects: object[],
  },
}

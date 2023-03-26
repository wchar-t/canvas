interface IconOptions {
  name: string,
  type?: 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands',
  isSharp?: boolean,
}

export default function Icon({
  name,
  type = 'solid',
  isSharp = false,
}: IconOptions) {
  return <i className={`fa${isSharp ? '-sharp' : ''} fa-${type} fa-${name}`}> </i>;
}

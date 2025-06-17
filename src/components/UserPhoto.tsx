//@ts-nocheck
import { Image, IImageProps } from 'native-base'
import Graduation from '../assets/images/graduation.png'

type Props = IImageProps & {
  size: number;
}

export function UserPhoto({ size, ...rest }: Props) {
  return (
    <>
      <Image alt='Usuario' source={Graduation} resizeMode="contain" maxW={10} position={"absolute"} marginLeft={2} zIndex={9}/>
      <Image 
        w={size}
        h={size}
        rounded="full"
        alt='Usuario'
        {...rest}
      />
    </>
  )
}

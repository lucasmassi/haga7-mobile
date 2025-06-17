import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from 'expo-sharing';
import moment from 'moment';
import { VStack, FlatList, Text, Center, ScrollView, Modal, Button, Pressable, Skeleton, Progress, AspectRatio } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Dimensions, Platform, Image as ImageRN, ActivityIndicator } from 'react-native';
import { HomeHeader } from "../components/Header";
import { AuthContext } from "../contexts/auth";
import * as WebBrowser from 'expo-web-browser';
import * as MediaLibrary from 'expo-media-library';
import GalleryAw from 'react-native-awesome-gallery';
import api from "../services/api";
import Image from 'react-native-scalable-image';

const BOX_WIDTH = Dimensions.get('window').width
const BOX_HEIGHT = Dimensions.get('window').height

export function Gallery() {
  const { auth, handleLogout } = React.useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)
  const [showImageReview, setShowImageReview] = useState(false)
  const [previewUrlImage, setPreviewUrlImage] = useState('')
  const [downloadUrlImage, setDownloadUrlImage] = useState('')
  const [itemSelected, setItemSelected] = useState<any>({})
  const [numberOfSkeleton, setNumberOfSkeleton] = useState<any>([])
  const [galleryImages, setGalleryImages] = useState<any>([])
  const [imageLoading, setImageLoading] = useState(6)
  const [totalImages, setTotalImages] = useState(6)
  const [countImageLoading, setCountImageLoading] = useState(0)
  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [loadingImages, setLoadingImage] = useState(false)
  const [modalImageLoad, setModalImageLoad] = useState(false)

  function pressImage(item: any) {
    setPreviewUrlImage('')
    setItemSelected(item)
    setShowImageReview(false)

    setPreviewUrlImage(item.url)
    setDownloadUrlImage(item.url)
    setOpenModal(true)

    return
  }

  function onCloseModal() {
    setOpenModal(false)
    setPreviewUrlImage('')
    setDownloadUrlImage('')
  }

  const registerLibraryPermissions = async () => {
    try {
        const {status: existingStatus} = await MediaLibrary.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await MediaLibrary.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert("O acesso à biblioteca de mídia não pôde ser ativado no seu celular.");
            return false;
        }

        return true;
    } catch (error) {
        console.log('Erro ao solicitar a autorização do seu celular.', error);
    }
  };

  async function downloadAll() {
    // await Promise.all(await galleryImages.map(async (image: any) => {
    //   await saveFile(image.url, image.path, 'image/jpeg')
    // }))
  }

  async function downloadImage(item: any) {
    const result = await FileSystem.downloadAsync(
      previewUrlImage,
      FileSystem.documentDirectory + item.path
    );

    // Save the downloaded file
    await registerLibraryPermissions().then(async (granted) => granted ? await saveFile(result.uri, item.path, result.headers["Content-Type"]) : null)
  }

  async function saveFile(uri: any, filename: any, mimetype: any) {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri: any) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        await Sharing.shareAsync(uri)
      }
    } else {
      await Sharing.shareAsync(uri)
    }
  }

  function addNewSkeleton() {
    setNumberOfSkeleton([...numberOfSkeleton, 'item'])
  }

  function removeSkeleton() {
    const arrNumb = numberOfSkeleton

    setNumberOfSkeleton(arrNumb.splice(-1))
  }

  useEffect(() => {
    async function loadGalleryImages() {
      const urlImages: any = await api.get(`/downloadimages/${auth.uid}?page=${page}`)

      setGalleryImages(urlImages.data.images)
      setTotalImages(urlImages.data.total)
    }

    loadGalleryImages()
  }, [])

  async function handleLoadMoreImages() {
    setLoadingImage(true)
    setIsRefreshing(true)
    let imagesAux = galleryImages
    const urlImages: any = await api.get(`/downloadimages/${auth.uid}?page=${page + 1}`)

    setPage(page + 1)
    if (urlImages) {
      urlImages.data.images.map((image: any) => imagesAux.push(image))

      setGalleryImages(imagesAux)
    }

    setIsRefreshing(false)
    setTimeout(() => {
      setLoadingImage(false)
    }, 7000)
  }

  return (
    <>
        <HomeHeader />
        <VStack bgColor={"black"} paddingTop={0}>
          <Text paddingLeft={2} paddingRight={2} fontSize='lg' color='#FFFFFF' fontFamily='heading' >Galeria</Text>
          <Text paddingLeft={2} paddingRight={2} marginBottom={2} fontSize='sm' color='#FFFFFF' fontFamily='body' opacity={0.5} >Aprecie todas as fotos da sua formatura! Para visualizar em alta resolução, faça o download no seu celular.</Text>
          <Button isDisabled variant="subtle" mb={2} leftIcon={<Ionicons name="cloud-download-outline" color='#fff' size={20} />} bgColor='#131314' onPress={() => downloadAll()}>
            <Text color='#fff'>Baixar todas imagens <Text fontSize={12} fontFamily='body'>(Em breve)</Text></Text>
          </Button>
        </VStack>
        <ScrollView bgColor={"black"} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <FlatList
            data={galleryImages}
            refreshing={isRefreshing}
            numColumns={3}
            renderItem={({ item }) => {
              return (<Center style={{ flex: 1, marginTop: 5, maxWidth: '33%' }}>
                <Pressable onLongPress={() => downloadImage(item)} key={item.fileId} onPress={() => pressImage(item)}>
                  <Image
                    width={150}
                    height={150}
                    resizeMode="contain"
                    source={{
                      uri: item.url,
                    }}
                  />
                </Pressable>
              </Center>)
            }}
            keyExtractor={(item: any) => item.fileId}
            paddingBottom={100}
          />
          {galleryImages.length === totalImages ? '' : (
            <VStack mt={10} bottom={10} position='absolute' width='100%' paddingBottom={50}>
              {loadingImages ? <Button opacity={0.5} disabled bgColor='gray.500'>Buscando fotos..</Button> : '' }
              {!loadingImages ? <Button opacity={0.8} disabled={loadingImages} bgColor='gray.500' onPress={() => handleLoadMoreImages()}>Carregar mais fotos</Button> : ''}
            </VStack>
          )}
        </ScrollView>

        {previewUrlImage ? (
        <Modal isOpen={openModal} onClose={() => onCloseModal()}>
          <Modal.Content w={Dimensions.get('window').width} m={0} paddingRight={0} bg='transparent'>
            <Modal.CloseButton mt={-3} mr={-1} p={2} background='#464646' />
            <Modal.Body p={0} bg='transparent' mr={0}>
                {/* <Skeleton startColor='gray.600' rounded='md' height={Dimensions.get('window').height - (Dimensions.get('window').height * 0.10)} width={Dimensions.get('window').width - (Dimensions.get('window').width * 0.05)} /> */}
                
                {/* {setTimeout(() => { */}
                <Image
                  resizeMode="contain"
                  width={Dimensions.get('window').width - (Dimensions.get('window').width * 0.05)}
                  alt={itemSelected.path}
                  source={{
                    uri: itemSelected.url
                  }}
                  onLoadStart={() => setModalImageLoad(true)}
                  onLoadEnd={() => setModalImageLoad(false)}
                />
            </Modal.Body>
            <Modal.Footer  mr={-1} borderTopColor='transparent' bg='transparent'>
              <Button.Group space={1}>
                <Button variant="subtle" leftIcon={<Ionicons name="paper-plane-outline" size={20} />} bgColor='#19BAFF' onPress={() => downloadImage(itemSelected)} />
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        ) : ''}
    </>
  )
}

const styles = StyleSheet.create({
  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
});
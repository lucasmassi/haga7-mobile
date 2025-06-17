import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from 'expo-sharing';
import moment from 'moment';
import { 
  VStack, FlatList, Text, Center, ScrollView,
  Modal, Button, Pressable, Skeleton, Progress,
  Box, AspectRatio } from "native-base";
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

export function Albuns() {
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
          <Text paddingLeft={2} paddingRight={2} fontSize='lg' color='#FFFFFF' fontFamily='heading' >Álbuns</Text>
          <Text paddingLeft={2} paddingRight={2} marginBottom={2} fontSize='sm' color='#FFFFFF' fontFamily='body' opacity={0.5} >Acesso aos seus Álbuns da formatura.</Text>
        </VStack>
        <ScrollView bgColor={"black"} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <FlatList
            data={[{ title: 'Geral', url: '../assets/images/alunos.jpg' }, { title: 'Estúdio', url: '../assets/images/alunos.jpg' }, { title: 'Externas', url: '../assets/images/alunos.jpg' }, { title: 'Turma', url: '../assets/images/alunos.jpg' }, { title: 'Festa', url: '../assets/images/alunos.jpg' }]}
            refreshing={isRefreshing}
            numColumns={1}
            renderItem={({ item }) => {
              return (<Center style={{ flex: 1, marginTop: 5, width: '100%' }}>
                <Pressable width='100%' pr={3} onLongPress={() => downloadImage(item)} key={item.title} onPress={() => pressImage(item)}>
                  <Box height={200} width='100%' pt={5} m={2} background='#303030' borderRadius={5}>
                    <Box borderRadius={5} overflow="hidden" position="absolute" top="0" maxHeight={200}>
                      <AspectRatio width="100%" ratio={16 / 9}>
                        <Image width={500} source={require('../assets/images/alunosfundo.png')} alt="image" />
                      </AspectRatio>
                      <Center 
                        _text={{
                          color: "warmGray.50",
                          fontWeight: "700",
                          fontSize: "30",
                          fontFamily: 'heading'
                        }} position="absolute" alignSelf='center' marginBottom={-3} bottom="20">
                        {item.title}
                      </Center>
                    </Box>
                  </Box>
                </Pressable>
              </Center>)
            }}
            keyExtractor={(item: any) => item.title}
            paddingBottom={100}
          />
        </ScrollView>
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
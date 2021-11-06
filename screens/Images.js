import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  Image,
} from "react-native";
import {
  Card,
  List,
  Text,
  Layout,
  Spinner,
  Modal,
} from "@ui-kitten/components";

export const ImagesScreen = ({ route, navigation }) => {
  const { term } = route.params;
  const [images, setImages] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `https://pixabay.com/api/?key=1549686-a4ebf9846458d8d0a3846321b&q=${term}&image_type=photo&order=latest&orientation=horizontal&pretty=true&per_page=10&safesearch=true&editors_choice=true`
    );
    const imagesRes = await res.json();
    setImages(imagesRes.hits);
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  }, []);

  const renderItemHeader = (headerProps, info) => {
    return (
      <ImageBackground
        {...headerProps}
        style={styles.thumb}
        source={{
          uri: info.item.webformatURL,
        }}
      />
    );
  };

  const renderItemFooter = (footerProps, info) => (
    <View {...footerProps} style={styles.footer}>
      <View style={{ width: 200 }}>
        <Text>Views : {info.item.views}</Text>
      </View>
      <View style={{ width: 200 }}>
        <Text>Downloads : {info.item.downloads}</Text>
      </View>
    </View>
  );

  const openModal = useCallback((info) => {
    setSelectedImage(info);
    setVisible(true);
  }, []);

  const renderItem = (info) => (
    <Card
      onPress={() => openModal(info)}
      style={styles.item}
      status="primary"
      header={(headerProps) => renderItemHeader(headerProps, info)}
      footer={(footerProps) => renderItemFooter(footerProps, info)}
    >
      <Text category="h3">{info.item.tags}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          {selectedImage && (
            <Image
              style={{ width: 300, height: 200, marginBottom: 10 }}
              source={{ uri: selectedImage.item.webformatURL }}
            />
          )}
        </Card>
      </Modal>

      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {images && (
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={images}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            renderItem={renderItem}
          />
        )}
        {!images && <Spinner size="giant" />}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  thumb: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

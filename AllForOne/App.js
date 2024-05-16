import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; 

export default function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const handleDownload = async () => {
    try {
      setProcessing(true);
      const response = await axios.get('http://localhost:3000/api/' + youtubeUrl);
      console.log('Audio processing complete');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    finally {
      setProcessing(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://repository-images.githubusercontent.com/792939420/22ed9b78-f1ef-4b26-89b3-814e12138b1b',
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <TextInput
        value={youtubeUrl}
        onChangeText={setYoutubeUrl}
        style={styles.input}
        placeholder="Enter YouTube URL"
      />
      <Button 
        title="Download MP3" 
        onPress={handleDownload} 
        disabled={processing}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

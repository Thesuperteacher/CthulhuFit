
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
const CACHE_DIR = (FileSystem.documentDirectory ?? '') + 'images/';

export class ImageCacheService {

    static async ensureCacheDirExists() {
        if (Platform.OS === 'web') return;

        const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
        }
    }

    static getCatalogImageUrl(imagePath: string): string {
        // Return remote URL for Web or as fallback
        return `${BASE_URL}${imagePath}`;
    }

    static async getLocalImageUri(catalogId: string, imagePath: string): Promise<string> {
        if (Platform.OS === 'web') {
            return this.getCatalogImageUrl(imagePath);
        }

        await this.ensureCacheDirExists();

        // Sanitize filename from path (e.g. "Abs/0.jpg" -> "Abs_0.jpg") or just use catalogId + index
        // The imagePath is like "3_4_Sit-Up/0.jpg". 
        // We can flatten this to "3_4_Sit-Up_0.jpg"
        const safeFileName = imagePath.replace(/\//g, '_');
        const localUri = CACHE_DIR + safeFileName;

        const fileInfo = await FileSystem.getInfoAsync(localUri);
        if (fileInfo.exists) {
            return localUri;
        }

        // Download
        const remoteUrl = this.getCatalogImageUrl(imagePath);
        try {
            const downloadRes = await FileSystem.downloadAsync(remoteUrl, localUri);
            return downloadRes.uri;
        } catch (e) {
            console.warn(`Failed to download image for ${catalogId}`, e);
            return remoteUrl; // Fallback to remote if download fails (Image component might handle it or fail)
        }
    }
}

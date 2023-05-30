import { Dimensions, StatusBar } from 'react-native'

export const SCREEN_HEIGHT = Dimensions.get('screen').height
export const SCREEN_WIDTH = Dimensions.get('screen').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const BOTTOM_NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT - StatusBar.currentHeight

/**
 * In iOS devices, screenHeight === windowHeight.
 * In Android devices with bottom navigator bar, screen height === windowHeight + statusBarHeight +
 * bottomNavigatorBarHeight.
 * In Android devices without bottom navigator bar, bottomNavigatorBarHeight is zero.
 */

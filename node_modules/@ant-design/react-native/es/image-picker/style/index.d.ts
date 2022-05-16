import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export interface ImagePickerStyle {
    container: ViewStyle;
    size: ImageStyle;
    item: ViewStyle;
    image: ImageStyle;
    closeWrap: ViewStyle;
    closeText: TextStyle;
    plusWrap: ViewStyle;
    plusWrapNormal: ViewStyle;
    plusWrapHighlight: ViewStyle;
    plusText: TextStyle;
}
declare const _default: () => ImagePickerStyle;
export default _default;

import React from 'react';
import { WithThemeStyles } from '../style';
import { CameraRollPickerProps } from './CameraRollPicker';
import { ImageRollTexts } from './ImageRoll';
import { ImagePickerPropTypes } from './PropsType';
import ImagePickerStyles, { ImagePickerStyle } from './style/index';
export interface ImagePickerProps extends ImagePickerPropTypes, WithThemeStyles<ImagePickerStyle>, ImageRollTexts {
    cameraPickerProps?: CameraRollPickerProps;
}
export default class ImagePicker extends React.Component<ImagePickerProps, any> {
    static defaultProps: {
        onChange(): void;
        onFail(): void;
        files: never[];
        selectable: boolean;
    };
    plusText: any;
    plusWrap: any;
    constructor(props: ImagePickerProps);
    onPressIn: (styles: ReturnType<typeof ImagePickerStyles>) => () => void;
    onPressOut: (styles: ReturnType<typeof ImagePickerStyles>) => () => void;
    showPicker: () => void;
    addImage(imageObj: any): void;
    removeImage(idx: number): void;
    hideImageRoll: () => void;
    onImageClick(index: number): void;
    render(): JSX.Element;
}

import React, { Component } from 'react';
export declare type ImageItemProps = {
    item?: any;
    selected?: boolean;
    selectedMarker?: React.ReactElement;
    imageMargin: number;
    containerWidth?: number;
    imagesPerRow: number;
    onPress?: (...args: any[]) => any;
};
declare class ImageItem extends Component<ImageItemProps, {}> {
    static defaultProps: {
        item: {};
        selected: boolean;
    };
    _imageSize: number;
    constructor(props: ImageItemProps);
    UNSAFE_componentWillMount(): void;
    render(): JSX.Element | null;
    _handleClick(item: any): void;
}
export default ImageItem;

import React from 'react';
import { DatePickerProps } from './PropsType';
export default class DatePickerView extends React.Component<DatePickerProps, any> {
    static defaultProps: {
        mode: string;
        minuteStep: number;
        use12Hours: boolean;
    };
    static contextType: React.Context<{}>;
    render(): JSX.Element;
}
